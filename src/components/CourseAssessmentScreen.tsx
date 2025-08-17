import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Brain, Mic, Video, MessageCircle, Lightbulb, Target, TrendingUp, Award, PlayCircle, Pause, Square, CheckCircle, Clock } from 'lucide-react';

interface CourseAssessmentScreenProps {
  courseTitle: string;
  skillName?: string;
  onNavigate: (screen: string, data?: any) => void;
  onComplete: () => void;
}

interface Question {
  id: number;
  type: 'text' | 'video' | 'scenario';
  question: string;
  context?: string;
  followUp?: string;
  category: string;
}

interface AIInsight {
  type: 'strength' | 'improvement' | 'recommendation';
  title: string;
  content: string;
  confidence: number;
}

const generateSkillQuestions = (skillName: string, userRole: string): Question[] => {
  const baseQuestions = {
    'Communication': [
      {
        id: 1,
        type: 'scenario' as const,
        question: 'You need to explain a complex technical issue to a non-technical stakeholder who seems frustrated. How would you approach this conversation?',
        context: 'Consider tone, language choice, and ensuring understanding',
        category: 'Conflict Resolution'
      },
      {
        id: 2,
        type: 'text' as const,
        question: 'Describe a time when you had to deliver difficult feedback to a colleague. What was your approach?',
        category: 'Difficult Conversations'
      },
      {
        id: 3,
        type: 'video' as const,
        question: 'Record yourself explaining how you would introduce a new process to your team. Focus on clarity and engagement.',
        context: 'Aim for 60-90 seconds',
        category: 'Presentation Skills'
      }
    ],
    'Leadership': [
      {
        id: 1,
        type: 'scenario' as const,
        question: 'Your team is missing deadlines and morale is low. Two team members are in conflict. How do you address this situation?',
        context: 'Consider both immediate actions and long-term solutions',
        category: 'Team Management'
      },
      {
        id: 2,
        type: 'text' as const,
        question: 'What does authentic leadership mean to you, and how do you demonstrate it in your current role?',
        category: 'Leadership Philosophy'
      },
      {
        id: 3,
        type: 'video' as const,
        question: 'Deliver a motivational message to your team about an upcoming challenging project.',
        context: 'Show confidence and inspire action',
        category: 'Inspiration & Motivation'
      }
    ],
    'Adaptability': [
      {
        id: 1,
        type: 'scenario' as const,
        question: 'Your company is implementing a major system change that affects your daily workflow. Some colleagues are resistant. How do you navigate this transition?',
        context: 'Consider personal adaptation and helping others',
        category: 'Change Management'
      },
      {
        id: 2,
        type: 'text' as const,
        question: 'Describe a time when you had to quickly learn a new skill or adapt to unexpected circumstances. What was your process?',
        category: 'Learning Agility'
      }
    ]
  };

  // Add role-specific technical questions
  const technicalQuestions = {
    'Developer': [
      {
        id: 10,
        type: 'scenario' as const,
        question: 'You discover a critical bug in production code that you wrote. The fix requires changes that might affect other features. Walk me through your decision-making process.',
        context: 'Consider technical approach, communication, and risk management',
        category: 'Problem Solving & Technical Judgment'
      },
      {
        id: 11,
        type: 'text' as const,
        question: 'How do you approach code reviews? What do you look for, and how do you provide constructive feedback?',
        category: 'Code Quality & Collaboration'
      },
      {
        id: 12,
        type: 'video' as const,
        question: 'Explain a complex technical concept (like microservices or database indexing) as if you were teaching a junior developer.',
        context: 'Focus on clarity and building understanding',
        category: 'Technical Communication'
      }
    ],
    'Designer': [
      {
        id: 10,
        type: 'scenario' as const,
        question: 'A stakeholder requests design changes that you believe will harm user experience. How do you handle this situation?',
        context: 'Balance stakeholder needs with user advocacy',
        category: 'Design Advocacy & Stakeholder Management'
      },
      {
        id: 11,
        type: 'text' as const,
        question: 'How do you approach user research and incorporate findings into your design decisions?',
        category: 'User-Centered Design'
      },
      {
        id: 12,
        type: 'video' as const,
        question: 'Present a design concept to stakeholders, explaining your design decisions and how they solve user problems.',
        context: 'Show confidence in your design rationale',
        category: 'Design Presentation'
      }
    ],
    'Analyst': [
      {
        id: 10,
        type: 'scenario' as const,
        question: 'You find conflicting data in your analysis that could significantly impact a business decision. How do you proceed?',
        context: 'Consider data integrity, communication, and next steps',
        category: 'Data Analysis & Critical Thinking'
      },
      {
        id: 11,
        type: 'text' as const,
        question: 'How do you ensure your analytical findings are actionable and clearly communicated to non-technical stakeholders?',
        category: 'Data Storytelling'
      }
    ],
    'Project Manager': [
      {
        id: 10,
        type: 'scenario' as const,
        question: 'Your project is behind schedule due to scope creep and resource constraints. How do you get back on track?',
        context: 'Consider stakeholder communication, prioritization, and team management',
        category: 'Project Recovery & Scope Management'
      },
      {
        id: 11,
        type: 'text' as const,
        question: 'How do you balance competing priorities and manage stakeholder expectations in a complex project?',
        category: 'Stakeholder Management'
      }
    ]
  };

  const questions = [...(baseQuestions[skillName as keyof typeof baseQuestions] || [])];
  
  // Add role-specific questions if available
  if (technicalQuestions[userRole as keyof typeof technicalQuestions]) {
    questions.push(...technicalQuestions[userRole as keyof typeof technicalQuestions]);
  }

  return questions;
};

export function CourseAssessmentScreen({ courseTitle, skillName, onNavigate, onComplete }: CourseAssessmentScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [finalInsights, setFinalInsights] = useState<AIInsight[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [questionElapsedTime, setQuestionElapsedTime] = useState(0);

  // Mock user role - in real app this would come from user data
  const userRole = 'Developer';
  const skill = skillName || courseTitle.split(' ')[0] || 'Communication';
  
  const questions = generateSkillQuestions(skill, userRole);
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Question timer - tracks elapsed time per question
  useEffect(() => {
    setQuestionStartTime(Date.now());
    setQuestionElapsedTime(0);
    
    const timer = setInterval(() => {
      setQuestionElapsedTime(Math.floor((Date.now() - questionStartTime) / 1000));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const generateRealTimeInsight = (questionId: number, answer: string): AIInsight => {
    const insights = {
      1: {
        type: 'strength' as const,
        title: 'Excellent Empathy',
        content: 'Your response shows strong emotional intelligence and stakeholder awareness. You understand the importance of addressing frustration first.',
        confidence: 92
      },
      2: {
        type: 'improvement' as const,
        title: 'Consider Structure',
        content: 'While your approach is thoughtful, consider using a more structured feedback framework like SBI (Situation-Behavior-Impact) for consistency.',
        confidence: 85
      },
      10: {
        type: 'strength' as const,
        title: 'Strong Technical Judgment',
        content: 'Your systematic approach to bug fixing shows excellent technical maturity. You balance urgency with thorough analysis.',
        confidence: 89
      }
    };

    return insights[questionId as keyof typeof insights] || {
      type: 'recommendation',
      title: 'Good Progress',
      content: 'Your response demonstrates thoughtful consideration of the scenario. Keep focusing on practical applications.',
      confidence: 78
    };
  };

  const generateFinalInsights = (): AIInsight[] => {
    return [
      {
        type: 'strength',
        title: 'Natural Problem Solver',
        content: 'You consistently demonstrate systematic thinking and consider multiple perspectives when approaching challenges. This is a key strength in your technical role.',
        confidence: 94
      },
      {
        type: 'improvement',
        title: 'Communication Structure',
        content: 'While your ideas are solid, practicing more structured communication frameworks will help you articulate complex concepts more clearly.',
        confidence: 87
      },
      {
        type: 'recommendation',
        title: 'Next Development Step',
        content: 'Focus on "Difficult Conversations" and "Technical Communication" modules. Your foundation is strong - now build advanced communication skills.',
        confidence: 91
      }
    ];
  };

  const handleAnswerSubmit = () => {
    const answer = answers[currentQuestion.id] || '';
    
    if (answer.trim()) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Assessment complete - generate final insights
        setFinalInsights(generateFinalInsights());
        setIsComplete(true);
      }
    }
  };

  const handleVideoRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
    } else {
      setIsRecording(false);
      // Simulate video recorded
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: `Video response recorded (${recordingTime}s)`
      }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        {/* Header */}
        <div className="bg-[#28a745] text-white px-6 pt-12 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-medium truncate">Assessment Complete!</h1>
              <p className="text-white/80 text-sm truncate">AI insights for {skill}</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6 pb-24">
          {/* Completion Status */}
          <Card className="border-0 shadow-sm bg-gradient-to-r from-[#28a745]/5 to-transparent">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#28a745] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-medium mb-2">Excellent Work!</h3>
              <p className="text-sm text-gray-600 mb-4 max-w-sm mx-auto leading-relaxed">
                You've completed all {questions.length} assessment questions for {skill}
              </p>
              <Badge className="bg-[#28a745]/20 text-[#28a745] border-[#28a745]/30 px-3 py-1">
                Assessment Completed
              </Badge>
            </CardContent>
          </Card>

          {/* AI Insights Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f6b60b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 text-[#f6b60b]" />
              </div>
              <h2 className="text-lg font-medium">AI-Powered Insights</h2>
            </div>
            
            <div className="grid gap-4">
              {finalInsights.map((insight, index) => (
                <Card key={index} className="border-0 shadow-sm overflow-hidden">
                  <div className={`h-1 w-full ${
                    insight.type === 'strength' ? 'bg-[#28a745]' :
                    insight.type === 'improvement' ? 'bg-[#f6b60b]' :
                    'bg-[#17a2b8]'
                  }`} />
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        insight.type === 'strength' ? 'bg-[#28a745]/10' :
                        insight.type === 'improvement' ? 'bg-[#f6b60b]/10' :
                        'bg-[#17a2b8]/10'
                      }`}>
                        {insight.type === 'strength' ? (
                          <TrendingUp className={`w-4 h-4 text-[#28a745]`} />
                        ) : insight.type === 'improvement' ? (
                          <Target className={`w-4 h-4 text-[#f6b60b]`} />
                        ) : (
                          <Lightbulb className={`w-4 h-4 text-[#17a2b8]`} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-medium text-sm leading-tight">{insight.title}</h4>
                          <Badge variant="outline" className="text-xs px-2 py-1 flex-shrink-0">
                            {insight.confidence}%
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {insight.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-[#aa0000]" />
                What's Next?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Button 
                onClick={() => onNavigate('course-recommendation', { skillName: skill })}
                className="w-full bg-[#f6b60b] hover:bg-[#e6a50a] text-[#333333] h-12 justify-start text-left"
              >
                <div className="flex items-center gap-3">
                  <PlayCircle className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 text-left">
                    <div className="font-medium">Continue Learning</div>
                    <div className="text-xs opacity-80">Recommended modules</div>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('strength')}
                className="w-full border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5 h-12 justify-start"
              >
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 text-left">
                    <div className="font-medium">View Profile</div>
                    <div className="text-xs opacity-80">Updated skill insights</div>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline"
                onClick={() => onNavigate('ai-chatbot')}
                className="w-full border-[#17a2b8]/20 text-[#17a2b8] hover:bg-[#17a2b8]/5 h-12 justify-start"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 flex-shrink-0" />
                  <div className="min-w-0 text-left">
                    <div className="font-medium">AI Coach</div>
                    <div className="text-xs opacity-80">Discuss your results</div>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('strength')}
            className="text-white hover:bg-white/20 p-2 h-auto"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-medium">AI Skill Assessment</h1>
            <p className="text-white/80 text-sm">{skill} Development</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs">Question</p>
            <p className="font-medium">{currentQuestionIndex + 1}/{questions.length}</p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/80">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>



      <div className="px-6 py-6 space-y-6">
        {/* Question Card */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between mb-3">
              <Badge className="bg-[#f6b60b]/20 text-[#f6b60b] border-[#f6b60b]/30">
                {currentQuestion.category}
              </Badge>
              <Badge variant="outline" className="text-[#aa0000] border-[#aa0000]/30">
                {currentQuestion.type.charAt(0).toUpperCase() + currentQuestion.type.slice(1)}
              </Badge>
            </div>
            {/* Question Timer */}
            <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#17a2b8]" />
                <span className="text-sm font-medium text-gray-700">Time:</span>
                <span className="font-mono text-base font-medium text-[#17a2b8]">
                  {Math.floor(questionElapsedTime / 60)}:{(questionElapsedTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-3 leading-relaxed">{currentQuestion.question}</h3>
              {currentQuestion.context && (
                <div className="p-3 bg-[#17a2b8]/5 rounded-lg border-l-4 border-l-[#17a2b8]">
                  <p className="text-sm text-gray-700">{currentQuestion.context}</p>
                </div>
              )}
            </div>

            {/* Answer Input */}
            {currentQuestion.type === 'text' || currentQuestion.type === 'scenario' ? (
              <div className="space-y-3">
                <Textarea
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => setAnswers(prev => ({ ...prev, [currentQuestion.id]: e.target.value }))}
                  placeholder="Share your thoughts and approach..."
                  className="min-h-[120px] resize-none"
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Take your time to provide a thoughtful response</span>
                  <span>{(answers[currentQuestion.id] || '').length} characters</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    isRecording ? 'bg-[#dc3545] animate-pulse' : 'bg-[#17a2b8]/10'
                  }`}>
                    {isRecording ? (
                      <Square className="w-8 h-8 text-white" />
                    ) : (
                      <Video className="w-8 h-8 text-[#17a2b8]" />
                    )}
                  </div>
                  
                  {isRecording && (
                    <div className="mb-4">
                      <p className="text-lg font-medium text-[#dc3545]">Recording...</p>
                      <p className="text-sm text-gray-600">{formatTime(recordingTime)}</p>
                    </div>
                  )}
                  
                  <Button
                    onClick={handleVideoRecord}
                    className={`${
                      isRecording 
                        ? 'bg-[#dc3545] hover:bg-[#c82333] text-white'
                        : 'bg-[#17a2b8] hover:bg-[#138496] text-white'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <Square className="w-4 h-4 mr-2" />
                        Stop Recording
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Start Recording
                      </>
                    )}
                  </Button>
                </div>
                
                {answers[currentQuestion.id] && (
                  <div className="p-3 bg-[#28a745]/5 rounded-lg border border-[#28a745]/20">
                    <p className="text-sm text-[#28a745] font-medium">✓ Video response recorded</p>
                    <p className="text-xs text-gray-600">{answers[currentQuestion.id]}</p>
                  </div>
                )}
              </div>
            )}


          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex">
          <Button 
            onClick={handleAnswerSubmit}
            disabled={!(answers[currentQuestion.id]?.trim())}
            className="w-full bg-[#aa0000] hover:bg-[#880000] text-white"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
}