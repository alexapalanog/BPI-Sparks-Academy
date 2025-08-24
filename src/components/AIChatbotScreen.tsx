import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Send, BarChart3, History, Lightbulb, Target, TrendingUp, Star, Loader2, CheckCircle } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- START OF LIVE GEMINI API INTEGRATION & CONFIGURATION ---

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("Gemini API key not found. Please create a .env.local file with VITE_GEMINI_API_KEY.");
}
const genAI = new GoogleGenerativeAI(apiKey);

const masterPrompt = `
You are "Sparky," the AI Support Bot for BPI, a major bank in the Philippines.
Your sole purpose is to provide employees with fast and accurate answers to their questions about internal BPI processes and policies.

Your tone is professional, efficient, and helpful. You are an expert on BPI's internal processes, but your knowledge is STRICTLY limited to the information in the provided [CONTEXT].

**CRITICAL INSTRUCTIONS:**
1.  **Grounding is Paramount:** Base all answers exclusively on the [CONTEXT]. Do not use any external knowledge.
2.  **Concise and Clear:** Keep responses short and to the point. Use bullet points or numbered lists for steps. AVOID long paragraphs.
3.  **Vague Query Handling (IMPORTANT):** If the user's query is too vague or general (e.g., "I have a problem", "it's not working", "help"), your first response MUST be to ask for more specific details. DO NOT offer a ticket yet. Your action in this case should be "ANSWER".
4.  **Handle Missing Information & Pre-fill Ticket:** ONLY after the user has provided specific details, if you still cannot find the answer in the [CONTEXT], then you must offer to file a support ticket.
5.  **Use Conversation History:** You will be given the [CHAT HISTORY]. Use it to understand the context of the user's latest [USER QUERY].
6.  **JSON Output:** You MUST respond in a valid JSON format.
    - If you are providing an answer OR asking for clarification, the JSON should be: \`{"responseText": "...", "action": "ANSWER"}\`
    - If you have specific details but CANNOT find the answer, the JSON must be: \`{"responseText": "...", "action": "OFFER_TICKET", "ticketData": {"category": "...", "urgency": "...", "subject": "...", "description": "..."}}\`
    - **ticketData Rules:**
        - 'category': Infer from keywords (e.g., "software", "crashing" -> "IT Support > Software Issues").
        - 'urgency': Infer from user's language (e.g., "can't work", "month-end" -> "High"; "annoying" -> "Medium"; "question about" -> "Low").
        - 'subject': A concise summary of the user's problem.
        - 'description': A more detailed summary of the user's query and the conversation history for the support team.
`;


const knowledgeBase = [
  // --- Existing Entries ---
  { id: 'HR-001', title: 'Vacation Leave Policy', keywords: ['leave', 'vacation', 'pto', 'time off'], content: 'To file a vacation leave:\n1. Go to the Employee Self-Service (ESS) Portal.\n2. Submit the request at least 5 working days in advance.\n3. Navigate to "Leave Management" > "File New Leave".\n4. Your supervisor will be notified for approval.' },
  { id: 'IT-001', title: 'Password Reset Procedure', keywords: ['password', 'reset', 'forgot', 'login', 'account'], content: 'If you forgot your password, use the "Forgot Password" link on the main login page. A reset link will be sent to your BPI email. IT will never ask for your password.' },
  { id: 'FIN-001', title: 'Expense Claim Process', keywords: ['expense', 'claim', 'reimbursement'], content: 'To file an expense claim:\n1. Log in to the Finance Portal.\n2. Go to the "Expense Reimbursement" section.\n3. Fill out the form and attach scanned copies of all official receipts.\n4. Claims are processed within 3-5 business days.' },
  { id: 'IT-002', title: 'New Equipment Request', keywords: ['laptop', 'monitor', 'keyboard', 'mouse', 'equipment'], content: 'To request new IT equipment, file a ticket in the IT Support Portal under the category "Hardware Request". Please include a business justification for your request.' },
  { id: 'IT-003', title: 'Contacting IT Support', keywords: ['it support', 'help desk', 'contact it', 'tech support', 'problem', 'issue', 'help'], content: 'There are two ways to contact IT Support:\n1. **For most issues:** File a ticket through the IT Support Portal. Please select the most relevant category and provide a detailed description, including your device asset tag and screenshots if possible.\n2. **For urgent, system-wide outages:** Call the IT Hotline at extension 1234 during business hours (8 AM - 6 PM).' },
  { id: 'IT-004', title: 'Troubleshooting Monitor Issues', keywords: ['monitor', 'screen', 'not working', 'display', 'black screen', 'flickering', 'no signal'], content: 'If your monitor is not working, please try these basic steps first:\n1. Ensure the power cable is securely plugged into both the monitor and the power outlet.\n2. Check that the display cable (HDMI, DisplayPort, etc.) is firmly connected to both your computer and the monitor.\n3. Turn the monitor off and on again using its power button.\n4. Restart your computer.' },
  { id: 'PROD-001', title: 'Information on BPI Products & Promos', keywords: ['products', 'services', 'promo', 'interest rates', 'loans', 'credit cards', 'mortgage', 'investment'], content: 'For the most up-to-date information on BPI products, services, and current promotional offers, please refer to the "Product Hub" section on the company intranet. This is the official source for internal fact sheets, rates, and marketing materials.' },
  { id: 'POLICY-001', title: 'Handling Customer-Facing Banking Questions', keywords: ['customer', 'client', 'open account', 'balance', 'transaction', 'apply for', 'check deposit', 'transfer funds'], content: 'This AI bot is for internal employee support only. You must not provide financial advice, access customer accounts, or process transactions. If an employee asks a question on behalf of a customer, you should direct them to use the official BPI public website (bpi.com.ph) or the designated customer service channels for accurate and secure information.' },
  { id: 'IT-005', title: 'Connecting to Corporate VPN', keywords: ['vpn', 'connect', 'remote access', 'work from home', 'network'], content: 'To connect to the BPI VPN:\n1. Open the Cisco AnyConnect application on your laptop.\n2. Ensure the address field is set to "vpn.bpi.com.ph".\n3. Click "Connect" and enter your employee credentials when prompted.\n4. Complete the multi-factor authentication (MFA) prompt on your registered device.' },
  { id: 'HR-002', title: 'Viewing Payslips', keywords: ['payslip', 'payroll', 'salary', 'pay stub'], content: 'You can view and download your payslips at any time through the Employee Self-Service (ESS) Portal. Navigate to the "Payroll Information" section to see your history.' },
  { id: 'SEC-001', title: 'Reporting a Phishing Attempt', keywords: ['phishing', 'suspicious email', 'scam', 'security', 'report email', 'fake email'], content: 'If you receive a suspicious email, it is critical that you follow these steps:\n1. **DO NOT** click any links, open attachments, or reply to the email.\n2. Forward the entire email as an attachment to **phishing@bpi.com.ph**.\n3. After forwarding, **delete the suspicious email** immediately from your inbox and your "Deleted Items" folder.\n4. If you accidentally clicked a link, contact the IT Help Desk immediately.' },
  { id: 'COMP-001', title: 'Anti-Money Laundering (AML) Red Flags', keywords: ['aml', 'anti-money laundering', 'suspicious transaction', 'red flag', 'report transaction'], content: 'While not an exhaustive list, be vigilant for these common AML red flags:\n- Unusually large cash transactions.\n- Attempts to structure deposits to fall just below reporting thresholds.\n- Transactions that are inconsistent with a client\'s known business or personal activities.\n- Unexplained wire transfers to or from high-risk jurisdictions.\n\nIf you suspect a transaction may be related to money laundering, you must report it immediately through the "STR" (Suspicious Transaction Report) portal on the intranet.' },
  { id: 'OPS-001', title: 'Procedure During Core Banking System Downtime', keywords: ['system down', 'offline', 'outage', 'core banking', 'finacle', 't24'], content: 'In the event of an unscheduled Core Banking System outage:\n1. Immediately check the official IT Status Page on the intranet for updates and estimated resolution time.\n2. Inform your immediate supervisor of the impact on your tasks.\n3. **DO NOT** attempt manual workarounds or use personal devices unless explicitly authorized by IT.\n4. Reassure clients that we are aware of the issue and working on a solution.' },
  { id: 'PROD-002', title: 'Finding Official Foreign Exchange (FX) Rates', keywords: ['fx', 'foreign exchange', 'dollar rate', 'currency', 'exchange rate'], content: 'To ensure accuracy for client transactions, you must always use the official BPI rates. The official, daily FX rates are published every morning on the **"Treasury"** page of the company intranet. Do not use rates from external websites for official business.' },
  { id: 'CUST-001', title: 'Handling Client Complaints', keywords: ['complaint', 'angry customer', 'unhappy client', 'escalate issue', 'customer feedback'], content: 'When handling a client complaint, follow the L.E.A.P. method:\n1. **Listen:** Allow the client to explain their issue without interruption.\n2. **Empathize:** Acknowledge their frustration and validate their feelings.\n3. **Action:** Document the issue in the CRM and identify the resolution steps.\n4. **Prevent:** If resolved, identify how to prevent it in the future. If you cannot resolve it, escalate the case via the "Tier 2 Support" process in the CRM.' },
  { id: 'SEC-002', title: 'Data Privacy Policy for Client Information', keywords: ['data privacy', 'dpa', 'client information', 'confidential', 'pii'], content: 'Under the Data Privacy Act (DPA), all client Personally Identifiable Information (PII) is strictly confidential. You must not:\n- Share client details via unencrypted email or personal messaging apps.\n- Leave documents with client information unattended.\n- Access client records without a legitimate business reason.\n\nAll data privacy incidents must be reported to the Data Protection Officer (DPO) immediately.' },
  {
    id: 'IT-006',
    title: 'Generic Software Troubleshooting',
    keywords: ['software', 'app', 'program', 'crashing', 'freezing', 'error'],
    content: 'For general software issues, a good first step is to restart your computer. If the problem persists, please check if there are any pending updates for the application.'
  }
];

const retrieveContext = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return knowledgeBase.filter(doc => doc.keywords.some(keyword => lowerQuery.includes(keyword)));
};

async function fetchAiResponse(query: string, contextDocs: any[], chatHistory: ChatMessage[]) {
  if (!apiKey) return JSON.stringify({ responseText: "Error: Gemini API key is not configured.", action: "ERROR" });
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Changed to latest flash model
    const contextString = contextDocs.length > 0
      ? contextDocs.map(doc => `Document: ${doc.id}\nTitle: ${doc.title}\nContent: ${doc.content}`).join('\n---\n')
      : "- No relevant documents found.";

    // Format the chat history for the AI
    const historyString = chatHistory.map(msg => {
      return msg.type === 'user' ? `User: ${msg.content}` : `Sparky: ${msg.content}`;
    }).join('\n');

    const fullPrompt = `
      ${masterPrompt}
      ---
      [CONTEXT]:
      ${contextString}
      ---
      [CHAT HISTORY]:
      ${historyString}
      ---
      [USER QUERY]:
      ${query}
    `;

    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();
    const cleanJsonString = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJsonString);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { responseText: "Sorry, I'm having trouble connecting to my brain right now. Please try again later.", action: "ERROR" };
  }
}

// --- END OF LIVE GEMINI API INTEGRATION & CONFIGURATION ---


// --- INTERFACES AND MOCK DATA FOR ANALYSIS & HISTORY TABS ---
interface AIChatbotScreenProps { onNavigate: (screen: string, data?: any) => void; onBack: () => void; }
interface ChatMessage { id: number; type: 'user' | 'ai' | 'system'; content: string; timestamp: string; offerTicket?: boolean; }
interface AnalysisInsight { category: string; insight: string; confidence: number; recommendation: string; }
interface HistorySession { id: number; date: string; messages: ChatMessage[]; sessionTitle: string; }

const welcomeMessage: ChatMessage = { id: 1, type: 'ai', content: "Hi! I'm Sparky, your BPI AI Support Bot. How can I help you with BPI matters today?", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

const analysisInsights: AnalysisInsight[] = [
  { category: 'Query Trend', insight: 'Your most frequent queries are about IT policies (65%).', confidence: 95, recommendation: 'Bookmark the IT Support Portal for quick access.' },
  { category: 'Topic Focus', insight: 'Recent questions focused on HR and Finance procedures.', confidence: 88, recommendation: 'Check the Employee Self-Service (ESS) portal for related forms.' },
  { category: 'Resolution Rate', insight: '92% of your questions were answered directly without needing a support ticket.', confidence: 99, recommendation: 'Keep asking! I\'m here to help find information quickly.' }
];

const chatHistorySessions: HistorySession[] = [
  { id: 1, date: 'Yesterday', sessionTitle: 'Password Reset Procedure', messages: [ { id: 1, type: 'user', content: 'i forgot my password', timestamp: '10:31 AM' }, { id: 2, type: 'ai', content: 'If you forgot your password, use the "Forgot Password" link on the main login page. A reset link will be sent to your BPI email. IT will never ask for your password.', timestamp: '10:31 AM' } ]},
  { id: 2, date: '2 days ago', sessionTitle: 'Expense Claim Process Inquiry', messages: [ { id: 1, type: 'user', content: 'how to file expense claim', timestamp: '2:16 PM' }, { id: 2, type: 'ai', content: 'To file an expense claim:\n1. Log in to the Finance Portal.\n2. Go to the "Expense Reimbursement" section.\n3. Fill out the form and attach scanned copies of all official receipts.', timestamp: '2:16 PM' } ]},
  { id: 3, date: 'Last week', sessionTitle: 'Phishing Email Report', messages: [ { id: 1, type: 'user', content: 'what to do with suspicious email', timestamp: '9:46 AM' }, { id: 2, type: 'ai', content: 'Forward the entire email as an attachment to phishing@bpi.com.ph and then delete it immediately.', timestamp: '9:46 AM' } ]}
];

const promptHistory = [
  { id: 1, prompt: 'How do I report a phishing email?', date: 'Last week', category: 'Security' },
  { id: 2, prompt: 'What are the AML red flags?', date: 'Last week', category: 'Compliance' },
  { id: 3, prompt: 'Find official FX rates', date: 'Last month', category: 'Product' },
];

interface TicketData {
  category: string;
  urgency: string;
  subject: string;
  description: string;
}

// --- MAIN COMPONENT ---
export function AIChatbotScreen({ onNavigate, onBack }: AIChatbotScreenProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAwaitingTicketConfirmation, setIsAwaitingTicketConfirmation] = useState(false); // NEW "memory" state
  const [isLoading, setIsLoading] = useState(false);
  const [showTicketOffer, setShowTicketOffer] = useState(false);
  const [isFilingTicket, setIsFilingTicket] = useState(false);
  const [ticketData, setTicketData] = useState<TicketData | null>(null); // REPLACES ticketQuery and ticketDetails
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false); // NEW state for submission loading
  const [selectedHistorySession, setSelectedHistorySession] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages, isLoading, isFilingTicket]);

  const addMessage = (type: 'user' | 'ai' | 'system', content: string, offerTicket = false) => {
    const newMessage: ChatMessage = { id: Date.now(), type, content, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), offerTicket };
    setMessages(prev => [...prev, newMessage]);
  };

const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const currentQuery = inputMessage.toLowerCase().trim();
      const newMessages = [...messages, { id: Date.now(), type: 'user' as const, content: inputMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
      setMessages(newMessages);
      setInputMessage('');

      // --- NEW LOGIC BLOCK TO CHECK "MEMORY" ---
      if (isAwaitingTicketConfirmation) {
        const affirmativeResponses = ['yes', 'yep', 'ok', 'sure', 'please do', 'go ahead', 'yeah'];
        if (affirmativeResponses.includes(currentQuery)) {
          setIsAwaitingTicketConfirmation(false);
          setShowTicketOffer(false);
          setIsFilingTicket(true);
          return; // Skip the AI call
        }
        // If the response is not affirmative, reset the flag and proceed as a normal query
        setIsAwaitingTicketConfirmation(false);
      }
      setIsLoading(true);
      setShowTicketOffer(false);
      // Define the recent history to pass as memory
      const recentHistory = newMessages.slice(-5, -1); // Get the last 4 messages before the user's current one

      const context = retrieveContext(currentQuery);
      const aiResult = await fetchAiResponse(currentQuery, context, recentHistory); // <-- Pass history here

 addMessage('ai', aiResult.responseText, aiResult.action === 'OFFER_TICKET');
      if (aiResult.action === 'OFFER_TICKET' && aiResult.ticketData) {
        setTicketData(aiResult.ticketData);
        setShowTicketOffer(true);
        setIsAwaitingTicketConfirmation(true);
      }
      setIsLoading(false);
    }
  };

  const handleFileTicketRequest = () => {
    setShowTicketOffer(false);
    setIsAwaitingTicketConfirmation(false); // Reset the "memory" flag here too
    setIsFilingTicket(true);
  };

    const handleTicketFieldChange = (field: keyof TicketData, value: string) => {
    setTicketData(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  
  const handleSubmitTicket = () => {
    setIsSubmittingTicket(true);
    // Simulate API call delay
    setTimeout(() => {
      const ticketId = `BPI-${Math.floor(100000 + Math.random() * 900000)}`;
      console.log("Submitting Ticket:", { ...ticketData, ticketId });

      setIsFilingTicket(false);
      setIsSubmittingTicket(false);
      addMessage('system', `✓ Support ticket ${ticketId} created for "${ticketData?.subject}". You will receive an email confirmation shortly.`);
      setTicketData(null);
    }, 1500);
  };
  const handleHistorySessionClick = (sessionId: number) => {
    setSelectedHistorySession(selectedHistorySession === sessionId ? null : sessionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 p-2 h-auto"><ArrowLeft className="w-5 h-5" /></Button>
          <div>
            <h1 className="text-xl font-medium">AI Support Bot</h1>
            <p className="text-white/80 text-sm">Your partner for BPI internal processes</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-6 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 flex flex-col h-[32rem]">
                <div ref={chatContainerRef} className="flex-1 space-y-4 mb-4 overflow-y-auto pr-2">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.type === 'system' ? (
                        <div className="w-full text-center p-2 text-sm text-green-700 bg-green-100 rounded-md">{message.content}</div>
                      ) : (
                        <div className={`max-w-[80%] rounded-lg p-3 ${message.type === 'user' ? 'bg-[#aa0000] text-white' : 'bg-gray-100 text-gray-800'}`}>
                          <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
                          <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>{message.timestamp}</p>
                          {message.offerTicket && showTicketOffer && (
                            <div className="mt-3 flex flex-wrap gap-2"> {/* <--- FIXED LINE */}
                                <Button size="sm" className="bg-white text-blue-600 border-blue-200" variant="outline" onClick={handleFileTicketRequest}>Yes, file a ticket</Button>
                                <Button size="sm" className="bg-white text-gray-600 border-gray-200" variant="outline" onClick={() => setShowTicketOffer(false)}>No, thanks</Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                           <div className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-gray-500" /><p className="text-sm text-gray-600">Sparky is thinking...</p></div>
                        </div>
                    </div>
                  )}
                  {isFilingTicket && ticketData && (
                    <Card className="border-blue-300 bg-blue-50">
                        <CardHeader><CardTitle className="text-base text-blue-800">File a Support Ticket</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                                    <select value={ticketData.category} onChange={(e) => handleTicketFieldChange('category', e.target.value)} className="w-full p-2 border rounded-md bg-white">
                                        <option>IT Support {'>'} Software Issues</option>
                                        <option>IT Support {'>'} Hardware Issues</option>
                                        <option>HR {'>'} Payroll Inquiry</option>
                                        <option>HR {'>'} Leave Inquiry</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1">Urgency</label>
                                    <select value={ticketData.urgency} onChange={(e) => handleTicketFieldChange('urgency', e.target.value)} className="w-full p-2 border rounded-md bg-white">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Critical</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
                                <Input value={ticketData.subject} onChange={(e) => handleTicketFieldChange('subject', e.target.value)} className="bg-white" />
                            </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
                                <Textarea value={ticketData.description} onChange={(e) => handleTicketFieldChange('description', e.target.value)} className="bg-white min-h-[100px]" />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleSubmitTicket} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmittingTicket}>
                                    {isSubmittingTicket ? (
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    ) : (
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                    )}
                                    Submit Ticket
                                </Button>
                                <Button variant="ghost" onClick={() => setIsFilingTicket(false)} disabled={isSubmittingTicket}>Cancel</Button>
                            </div>
                        </CardContent>
                    </Card>
                  )}
                </div>
                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Input placeholder="Ask about BPI processes..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} disabled={isLoading || isFilingTicket} />
                  <Button onClick={handleSendMessage} className="bg-[#aa0000] hover:bg-[#880000] text-white" disabled={!inputMessage.trim() || isLoading || isFilingTicket}><Send className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-base">Quick Questions</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[ 'How do I file for vacation leave?', 'What is the process for expense claims?', 'How do I request a new laptop?', 'What should I do if I forgot my password?' ].map((suggestion, index) => (
                    <Button key={index} variant="outline" onClick={() => setInputMessage(suggestion)} className="w-full justify-start text-sm border-gray-200 hover:bg-gray-50">{suggestion}</Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#aa0000]" />
                  Support Interaction Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{insight.category}</h4>
                      <Badge variant="outline" className="text-xs">{insight.confidence}% confidence</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{insight.insight}</p>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-[#aa0000] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#aa0000] font-medium">{insight.recommendation}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={() => onNavigate('it-portal')} className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                  <Target className="w-4 h-4 mr-2" />
                  Go to IT Support Portal
                </Button>
                <Button onClick={() => onNavigate('hr-portal')} variant="outline" className="w-full justify-start border-[#aa0000]/20 text-[#aa0000]">
                  <Star className="w-4 h-4 mr-2" />
                  Open HR Self-Service Portal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  Chat History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chatHistorySessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg">
                    <Button variant="ghost" onClick={() => handleHistorySessionClick(session.id)} className="w-full p-3 h-auto justify-between hover:bg-gray-50">
                      <div className="text-left">
                        <p className="text-sm font-medium">{session.sessionTitle}</p>
                        <p className="text-xs text-gray-600">{session.date}</p>
                      </div>
                    </Button>
                    {selectedHistorySession === session.id && (
                      <div className="px-3 pb-3 space-y-3 border-t border-gray-100 mt-2 pt-3">
                        {session.messages.map((message) => (
                          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[90%] rounded-lg p-2 ${ message.type === 'user' ? 'bg-[#aa0000]/10 text-[#aa0000]' : 'bg-gray-100 text-gray-800' }`}>
                              <p className="text-xs" style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
                              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardHeader><CardTitle className="text-base">Recent Prompts</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {promptHistory.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium">{item.prompt}</p>
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{item.date}</span>
                      <Button size="sm" variant="ghost" onClick={() => { setActiveTab('chat'); setInputMessage(item.prompt); }} className="text-[#aa0000] hover:bg-[#aa0000]/5 h-auto p-1">Ask again</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}