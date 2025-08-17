import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Send, Brain, MessageCircle, BarChart3, History, Sparkles, Lightbulb, Target, TrendingUp, Star, Clock, Award } from 'lucide-react';

interface AIChatbotScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface AnalysisInsight {
  category: string;
  insight: string;
  confidence: number;
  recommendation: string;
}

interface HistorySession {
  id: number;
  date: string;
  messages: ChatMessage[];
  sessionTitle: string;
}

// Fresh welcome message for new chats
const welcomeMessage: ChatMessage = {
  id: 1,
  type: 'ai',
  content: 'Hi! I\'m your AI Support  Bot. How can I help you today?',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const analysisInsights: AnalysisInsight[] = [
  {
    category: 'Learning Pattern',
    insight: 'You perform best in the morning hours (9-11 AM)',
    confidence: 89,
    recommendation: 'Schedule challenging assessments during your peak hours'
  },
  {
    category: 'Skill Development',
    insight: 'Technical skills show faster improvement than soft skills',
    confidence: 92,
    recommendation: 'Balance technical learning with soft skill practice'
  },
  {
    category: 'Assessment Performance',
    insight: 'Scenario-based questions yield higher engagement',
    confidence: 85,
    recommendation: 'Request more interactive assessment formats'
  }
];

// Mock chat history sessions
const chatHistorySessions: HistorySession[] = [
  {
    id: 1,
    date: '2024-12-20',
    sessionTitle: 'Communication Skills Improvement',
    messages: [
      { id: 1, type: 'ai', content: 'Hi! I\'m your AI Support  Bot. How can I help you today?', timestamp: '10:30 AM' },
      { id: 2, type: 'user', content: 'I want to improve my communication skills', timestamp: '10:31 AM' },
      { id: 3, type: 'ai', content: 'Great choice! Based on your recent assessments, I see you\'ve scored well in active listening. Would you like to focus on presentation skills or cross-cultural communication?', timestamp: '10:31 AM' },
      { id: 4, type: 'user', content: 'I think presentation skills would be more valuable for my role', timestamp: '10:32 AM' },
      { id: 5, type: 'ai', content: 'Excellent! Here are some specific recommendations for improving your presentation skills...', timestamp: '10:32 AM' }
    ]
  },
  {
    id: 2,
    date: '2024-12-19',
    sessionTitle: 'Leadership Development Discussion',
    messages: [
      { id: 1, type: 'ai', content: 'Hi! I\'m your AI Support  Bot. How can I help you today?', timestamp: '2:15 PM' },
      { id: 2, type: 'user', content: 'What leadership style suits me best?', timestamp: '2:16 PM' },
      { id: 3, type: 'ai', content: 'Based on your assessment history, you show traits of both transformational and collaborative leadership styles...', timestamp: '2:16 PM' }
    ]
  },
  {
    id: 3,
    date: '2024-12-18',
    sessionTitle: 'System Architecture Learning Path',
    messages: [
      { id: 1, type: 'ai', content: 'Hi! I\'m your AI Support  Bot. How can I help you today?', timestamp: '9:45 AM' },
      { id: 2, type: 'user', content: 'Recommend learning path for system architecture', timestamp: '9:46 AM' },
      { id: 3, type: 'ai', content: 'System architecture is a great skill to develop! Let me create a personalized learning path based on your current technical skills...', timestamp: '9:46 AM' }
    ]
  }
];

const promptHistory = [
  { id: 1, prompt: 'How can I improve my database design skills?', date: '2024-12-20', category: 'Technical Skills' },
  { id: 2, prompt: 'What leadership style suits me best?', date: '2024-12-19', category: 'Soft Skills' },
  { id: 3, prompt: 'Recommend learning path for system architecture', date: '2024-12-18', category: 'Technical Skills' },
  { id: 4, prompt: 'How to handle difficult team conversations?', date: '2024-12-17', category: 'Communication' },
];

export function AIChatbotScreen({ onNavigate, onBack }: AIChatbotScreenProps) {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedHistorySession, setSelectedHistorySession] = useState<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Reset chat to fresh state when switching to chat tab
  useEffect(() => {
    if (activeTab === 'chat') {
      setMessages([{
        ...welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [activeTab]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now(), // Use timestamp for more reliable key
        type: 'user',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: Date.now() + 1, // Use timestamp for more reliable key
          type: 'ai',
          content: 'I understand your question. Let me analyze your learning profile and provide personalized recommendations...',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleHistorySessionClick = (sessionId: number) => {
    setSelectedHistorySession(selectedHistorySession === sessionId ? null : sessionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2 h-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-medium">AI Support Bot</h1>
            <p className="text-white/80 text-sm">Your personalized learning assistant</p>
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

          {/* AI Chat Tab - Fixed Height and Scrollable */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4 flex flex-col h-[32rem]">
                <div 
                  ref={chatContainerRef}
                  className="flex-1 space-y-4 mb-4 overflow-y-auto pr-2"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-[#aa0000] text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200">
                  <Input
                    placeholder="Ask me anything about your learning..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-[#aa0000] hover:bg-[#880000] text-white"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Suggestions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    'What skills should I focus on next?',
                    'How can I improve my assessment scores?',
                    'Recommend a learning path for my role',
                    'What are my learning strengths?'
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => {
                        setInputMessage(suggestion);
                        // Optional: auto-send the quick question
                        // handleSendMessage(); 
                      }}
                      className="w-full justify-start text-sm border-gray-200 hover:bg-gray-50"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#f6b60b]" />
                  AI Learning Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{insight.category}</h4>
                      <Badge variant="outline" className="text-xs">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{insight.insight}</p>
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-[#f6b60b] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#f6b60b] font-medium">{insight.recommendation}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#28a745]" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => onNavigate('learning')}
                  className="w-full justify-start bg-[#28a745] hover:bg-[#1e7e34] text-white"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Start Recommended Assessment
                </Button>
                <Button
                  onClick={() => onNavigate('strength')}
                  variant="outline"
                  className="w-full justify-start border-[#aa0000]/20 text-[#aa0000]"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Review Skills Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab - Shows Chat History */}
          <TabsContent value="history" className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="w-5 h-5 text-[#17a2b8]" />
                  Chat History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chatHistorySessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg">
                    <Button
                      variant="ghost"
                      onClick={() => handleHistorySessionClick(session.id)}
                      className="w-full p-3 h-auto justify-start hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="text-left">
                          <p className="text-sm font-medium">{session.sessionTitle}</p>
                          <p className="text-xs text-gray-600">{session.date}</p>
                        </div>
                        
                      </div>
                    </Button>
                    
                    {selectedHistorySession === session.id && (
                      <div className="px-3 pb-3 space-y-3 border-t border-gray-100 mt-3 pt-3">
                        {session.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-2 ${
                                message.type === 'user'
                                  ? 'bg-[#aa0000]/10 text-[#aa0000]'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <p className="text-xs">{message.content}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Prompt History */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Recent Prompts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {promptHistory.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium">{item.prompt}</p>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{item.date}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setActiveTab('chat');
                          setInputMessage(item.prompt);
                        }}
                        className="text-[#aa0000] hover:bg-[#aa0000]/5 h-auto p-1"
                      >
                        Ask again
                      </Button>
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