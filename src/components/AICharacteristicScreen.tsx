import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  ArrowLeft,
  Brain,
  Send,
  Sparkles,
  User,
  Bot,
  Lightbulb,
  BookOpen,
  Target,
} from "lucide-react";

interface AIChats {
  id: string;
  sender: "user" | "ai";
  message: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AICharacteristicScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function AICharacteristicScreen({
  onNavigate,
  onBack,
}: AICharacteristicScreenProps) {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<AIChats[]>([
    {
      id: "1",
      sender: "ai",
      message:
        "Hello Alex! I'm your AI learning companion. I can help you with skill development, career guidance, and personalized learning recommendations. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "How can I improve my leadership skills?",
        "What modules should I take next?",
        "How do I manage work-life balance?",
        "Career development advice",
      ],
    },
  ]);

  const quickResponses = [
    "How can I improve my communication skills?",
    "What are my skill gaps?",
    "Recommend a learning path",
    "How to handle workplace stress?",
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: AIChats = {
      id: Date.now().toString(),
      sender: "user",
      message: message.trim(),
      timestamp: new Date(),
    };

    setChats((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message.trim());
      const aiMessage: AIChats = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        message: aiResponse.message,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions,
      };
      setChats((prev) => [...prev, aiMessage]);
    }, 1000);

    setMessage("");
  };

  const generateAIResponse = (
    userMessage: string,
  ): { message: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("communication") ||
      lowerMessage.includes("speaking")
    ) {
      return {
        message:
          "Great question! Based on your current communication score of 88%, I recommend focusing on cross-cultural communication and public speaking. You already excel at active listening - let's build on that foundation. Would you like me to suggest specific modules?",
        suggestions: [
          "Show communication modules",
          "Practice scenarios",
          "Schedule speaking workshop",
        ],
      };
    } else if (
      lowerMessage.includes("leadership") ||
      lowerMessage.includes("lead")
    ) {
      return {
        message:
          "Your leadership skills are exceptional at 95%! To reach mastery level, consider exploring strategic leadership and change management. Your team feedback shows you inspire others naturally. Want to see advanced leadership tracks?",
        suggestions: [
          "Advanced leadership modules",
          "Team management strategies",
          "Strategic thinking courses",
        ],
      };
    } else if (
      lowerMessage.includes("stress") ||
      lowerMessage.includes("balance")
    ) {
      return {
        message:
          "Work-life balance is crucial for sustained performance. Your current well-being status shows you're thriving! I recommend maintaining your current rhythm while exploring stress management techniques. Shall we look at wellness modules?",
        suggestions: [
          "Stress management techniques",
          "Mindfulness practices",
          "Time management strategies",
        ],
      };
    } else if (
      lowerMessage.includes("skill") &&
      lowerMessage.includes("gap")
    ) {
      return {
        message:
          "Based on your profile, your main growth opportunities are in Adaptability (45%) and Problem Solving (52%). These complement your strong leadership foundation. I can create a personalized learning path targeting these areas.",
        suggestions: [
          "Create learning plan",
          "Show skill assessments",
          "Quick adaptability test",
        ],
      };
    } else {
      return {
        message:
          "I understand you're looking for guidance. Based on your learning history and current skills, I can provide personalized recommendations for your professional growth. What specific area interests you most?",
        suggestions: [
          "Career development",
          "Skill recommendations",
          "Learning schedule",
          "Team collaboration tips",
        ],
      };
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2 h-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-medium flex items-center gap-2">
              <Brain className="w-6 h-6" />
              AI Learning Assistant
            </h1>
            <p className="text-white/80 text-sm">
              Your personal growth companion
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex gap-3 ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {chat.sender === "ai" && (
                <div className="w-8 h-8 bg-[#f6b60b] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`max-w-[80%] ${chat.sender === "user" ? "order-1" : ""}`}
              >
                <div
                  className={`p-4 rounded-2xl ${
                    chat.sender === "user"
                      ? "bg-[#aa0000] text-white ml-auto"
                      : "bg-white shadow-md text-gray-800"
                  }`}
                >
                  <p className="text-sm leading-relaxed">
                    {chat.message}
                  </p>
                </div>

                {chat.suggestions && (
                  <div className="mt-3 space-y-2">
                    {chat.suggestions.map(
                      (suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleSuggestionClick(suggestion)
                          }
                          className="block w-full text-left border-[#f6b60b]/30 text-[#f6b60b] hover:bg-[#f6b60b]/5 text-xs"
                        >
                          {suggestion}
                        </Button>
                      ),
                    )}
                  </div>
                )}
              </div>

              {chat.sender === "user" && (
                <div className="w-8 h-8 bg-[#aa0000]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-[#aa0000]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Quick questions:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickResponses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleSuggestionClick(response)
                  }
                  className="text-xs border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5 h-auto py-2"
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about your learning journey..."
              onKeyPress={(e) =>
                e.key === "Enter" && handleSendMessage()
              }
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-[#aa0000] hover:bg-[#880000] text-white px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 text-[#f6b60b] hover:bg-[#f6b60b]/5"
            onClick={() =>
              handleSuggestionClick(
                "Create a personalized learning plan",
              )
            }
          >
            <Lightbulb className="w-5 h-5" />
            <span className="text-xs">Smart Plan</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 text-[#28a745] hover:bg-[#28a745]/5"
            onClick={() =>
              handleSuggestionClick(
                "Recommend modules based on my goals",
              )
            }
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Modules</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3 text-[#aa0000] hover:bg-[#aa0000]/5"
            onClick={() =>
              handleSuggestionClick("Analyze my skill gaps")
            }
          >
            <Target className="w-5 h-5" />
            <span className="text-xs">Analysis</span>
          </Button>
        </div>
      </div>
    </div>
  );
}