import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, BookOpen, TrendingUp, BarChart3, Star, Clock, ChevronRight, MessageCircle, Zap, Users, Target, Brain, RefreshCw, Award, Lightbulb } from 'lucide-react';

interface LearningHistoryScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

// Mock learning history data with AI insights for each attempt
const learningHistory = [
  {
    id: 1,
    title: 'Communication Skills Assessment',
    category: 'Soft Skills',
    date: '2024-12-20',
    confidenceLevel: 91,
    timeSpent: '18 min',
    questions: 12,
    attempt: 2,
    icon: MessageCircle,
    color: '#28a745',
    insights: 'Excellent performance in active listening and presentation skills.',
    improvements: ['Public speaking confidence', 'Written clarity', 'Non-verbal awareness'],
    aiInsight: 'Your communication style shows exceptional empathy and clarity. You naturally adapt your tone and language to different audiences, demonstrating emotional intelligence. Consider focusing on public speaking to reach expert level.'
  },
  {
    id: 2,
    title: 'Communication Skills Assessment',
    category: 'Soft Skills',
    date: '2024-12-15',
    confidenceLevel: 78,
    timeSpent: '16 min',
    questions: 12,
    attempt: 1,
    icon: MessageCircle,
    color: '#f6b60b',
    insights: 'Good foundation in communication. Growth areas in presentation.',
    improvements: ['Presentation skills', 'Audience engagement', 'Expression clarity'],
    aiInsight: 'Good foundation established in interpersonal communication. Your active listening skills are strong, but presentation delivery could benefit from more confidence and structure. Practice with visual aids recommended.'
  },
  {
    id: 3,
    title: 'JavaScript Advanced Concepts',
    category: 'Technical Skills',
    date: '2024-12-18',
    confidenceLevel: 87,
    timeSpent: '22 min',
    questions: 15,
    attempt: 1,
    icon: Zap,
    color: '#28a745',
    insights: 'Strong grasp of advanced concepts and async patterns.',
    improvements: ['ES6 modules', 'Memory management', 'Performance optimization'],
    aiInsight: 'Impressive understanding of async/await patterns and modern JavaScript features. Your code architecture thinking is advanced. Ready for system design challenges and mentoring opportunities.'
  },
  {
    id: 4,
    title: 'Leadership Fundamentals',
    category: 'Leadership',
    date: '2024-12-10',
    confidenceLevel: 74,
    timeSpent: '14 min',
    questions: 8,
    attempt: 1,
    icon: Users,
    color: '#17a2b8',
    insights: 'Solid understanding of leadership principles.',
    improvements: ['Team motivation', 'Conflict resolution', 'Strategic planning'],
    aiInsight: 'Natural leadership instincts detected with strong empathy scores. Your collaborative approach builds trust effectively. Focus on strategic decision-making and delegation skills for advancement.'
  },
  {
    id: 5,
    title: 'Project Management Essentials',
    category: 'Leadership',
    date: '2024-12-05',
    confidenceLevel: 82,
    timeSpent: '19 min',
    questions: 11,
    attempt: 1,
    icon: Target,
    color: '#f6b60b',
    insights: 'Great understanding of Agile principles.',
    improvements: ['Stakeholder management', 'Resource planning', 'Timeline optimization'],
    aiInsight: 'Excellent grasp of Agile methodologies and iterative development. Your risk assessment skills are particularly strong. Consider exploring advanced project portfolio management techniques.'
  },
  {
    id: 6,
    title: 'Data Analysis Fundamentals',
    category: 'Technical Skills',
    date: '2024-11-28',
    confidenceLevel: 69,
    timeSpent: '20 min',
    questions: 10,
    attempt: 1,
    icon: BarChart3,
    color: '#17a2b8',
    insights: 'Good analytical thinking and SQL basics understood.',
    improvements: ['Data visualization', 'Statistical analysis', 'SQL optimization'],
    aiInsight: 'Strong logical reasoning foundation for data analysis. Your pattern recognition skills are developing well. Focus on statistical concepts and advanced SQL queries for significant improvement.'
  }
];

// Monthly stats
const monthlyStats = {
  assessmentsCompleted: 6,
  totalAttempts: 7,
  averageConfidence: 81,
  totalTimeSpent: '1h 49m',
  strongestArea: 'Communication',
  improvementArea: 'Data Analysis'
};

// Overall AI insights data
const overallAiInsights = [
  {
    id: 1,
    type: 'Strength Pattern',
    title: 'Communication Excellence',
    insight: 'Communication skills show consistent improvement with 13-point increase.',
    confidence: 92,
    actionable: true,
    color: '#28a745'
  },
  {
    id: 2,
    type: 'Learning Velocity',
    title: 'Fast Technical Learner',
    insight: 'Technical assessments consistently scored 80+ on first attempts.',
    confidence: 88,
    actionable: true,
    color: '#aa0000'
  },
  {
    id: 3,
    type: 'Growth Opportunity',
    title: 'Leadership Development',
    insight: 'Leadership scores show steady growth. Consider advanced modules.',
    confidence: 85,
    actionable: true,
    color: '#f6b60b'
  }
];

export function LearningHistoryScreen({ onNavigate, onBack }: LearningHistoryScreenProps) {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);
  const [selectedAttemptInsight, setSelectedAttemptInsight] = useState<number | null>(null);

  const getConfidenceColor = (level: number) => {
    if (level >= 85) return '#28a745';
    if (level >= 70) return '#f6b60b';
    if (level >= 55) return '#17a2b8';
    return '#ffc107';
  };

  const handleRetakeAssessment = (assessmentTitle: string) => {
    onNavigate('assessment', { courseTitle: assessmentTitle });
  };

  const handleInsightClick = (insightId: number) => {
    setSelectedInsight(selectedInsight === insightId ? null : insightId);
  };

  const handleAttemptInsightClick = (attemptId: number) => {
    setSelectedAttemptInsight(selectedAttemptInsight === attemptId ? null : attemptId);
  };

  // Group history by assessment title to show attempts
  const groupedHistory = learningHistory.reduce((acc, item) => {
    if (!acc[item.title]) {
      acc[item.title] = [];
    }
    acc[item.title].push(item);
    return acc;
  }, {} as Record<string, typeof learningHistory>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2 h-auto flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-medium truncate">Learning History</h1>
            <p className="text-white/80 text-sm truncate">Track your assessment progress and insights</p>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{monthlyStats.assessmentsCompleted}</p>
            <p className="text-xs text-white/80">Assessments</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{monthlyStats.averageConfidence}%</p>
            <p className="text-xs text-white/80">Avg Confidence</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{monthlyStats.totalTimeSpent}</p>
            <p className="text-xs text-white/80">Time Spent</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Overall AI Insights */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#17a2b8]/10 to-[#17a2b8]/5 border-l-4 border-l-[#17a2b8]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#17a2b8]" />
              AI Learning Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overallAiInsights.map((insight) => (
              <div
                key={insight.id}
                onClick={() => handleInsightClick(insight.id)}
                className="p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/70 transition-colors"
              >
                <div className="flex items-start gap-3 w-full">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${insight.color}15` }}
                  >
                    <TrendingUp className="w-4 h-4" style={{ color: insight.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1 gap-2">
                      <h4 className="font-medium text-sm flex-1 break-words leading-tight">{insight.title}</h4>
                      <Badge 
                        style={{ 
                          backgroundColor: `${insight.color}20`,
                          color: insight.color,
                          borderColor: `${insight.color}30`
                        }}
                        className="text-xs flex-shrink-0"
                      >
                        {insight.confidence}%
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed break-words">
                      {insight.insight}
                    </p>
                    {selectedInsight === insight.id && (
                      <div className="mt-3 p-3 bg-gray-50 rounded text-xs text-gray-700">
                        <p className="font-medium mb-2">Recommended Actions:</p>
                        <div className="space-y-1">
                          <p>• Continue building on this strength</p>
                          <p>• Share knowledge with team members</p>
                          <p>• Consider advanced modules in this area</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assessment History with AI Insights per Attempt */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Assessment History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(groupedHistory).map(([title, attempts]) => {
              const latestAttempt = attempts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
              const IconComponent = latestAttempt.icon;
              
              return (
                <div key={title} className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${latestAttempt.color}15` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: latestAttempt.color }} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h4 className="font-medium text-sm flex-1 break-words leading-tight">{title}</h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Badge variant="outline" className="text-xs">
                            {attempts.length} attempt{attempts.length > 1 ? 's' : ''}
                          </Badge>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: getConfidenceColor(latestAttempt.confidenceLevel) }}
                          >
                            {latestAttempt.confidenceLevel}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 truncate">{latestAttempt.category}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 gap-2">
                        <span className="truncate">Latest: {latestAttempt.date}</span>
                        <span className="flex-shrink-0">{latestAttempt.timeSpent} • {latestAttempt.questions} questions</span>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleRetakeAssessment(title)}
                      variant="outline"
                      size="sm"
                      className="border-[#28a745]/20 text-[#28a745] hover:bg-[#28a745]/5 flex-shrink-0"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Retake
                    </Button>
                  </div>

                  {/* Show all attempts with AI insights for this assessment */}
                  {attempts.length > 0 && (
                    <div className="ml-4 space-y-2">
                      {attempts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((attempt, index) => (
                        <div key={attempt.id} className="p-3 bg-white border border-gray-100 rounded-lg">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-medium flex-1 truncate">
                                Attempt #{attempt.attempt} {index === 0 && '(Latest)'}
                              </span>
                              <span 
                                className="text-xs font-medium flex-shrink-0"
                                style={{ color: getConfidenceColor(attempt.confidenceLevel) }}
                              >
                                {attempt.confidenceLevel}%
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500 gap-2">
                              <span className="truncate">{attempt.date}</span>
                              <span className="flex-shrink-0">{attempt.timeSpent}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed break-words">
                              {attempt.insights}
                            </p>
                            
                            {/* AI Insight for this specific attempt */}
                            <div className="mt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAttemptInsightClick(attempt.id)}
                                className="w-full justify-start text-[#17a2b8] hover:bg-[#17a2b8]/5 p-2 h-auto"
                              >
                                <div className="flex items-center gap-2">
                                  <Lightbulb className="w-4 h-4" />
                                  <span className="text-xs">AI Insights for this attempt</span>
                                  <ChevronRight className={`w-3 h-3 transition-transform ${
                                    selectedAttemptInsight === attempt.id ? 'rotate-90' : ''
                                  }`} />
                                </div>
                              </Button>
                              
                              {selectedAttemptInsight === attempt.id && (
                                <div className="mt-2 p-3 bg-[#17a2b8]/5 border-l-2 border-[#17a2b8] rounded">
                                  <div className="flex items-start gap-2">
                                    <Brain className="w-4 h-4 text-[#17a2b8] flex-shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium text-[#17a2b8] mb-1">AI Analysis</p>
                                      <p className="text-xs text-gray-700 leading-relaxed break-words italic">
                                        "{attempt.aiInsight}"
                                      </p>
                                      <div className="mt-2 space-y-1">
                                        <p className="text-xs font-medium text-gray-600">Key Improvements:</p>
                                        {attempt.improvements.map((improvement, idx) => (
                                          <p key={idx} className="text-xs text-gray-600">• {improvement}</p>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#28a745]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#28a745] flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[#28a745] mb-1">Performance Summary</p>
                <p className="text-sm text-gray-700 mb-2 leading-relaxed break-words">
                  Strong consistent performance across assessments. Your retake strategy shows excellent learning adaptation with an average 13% improvement in confidence levels.
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Strongest area: {monthlyStats.strongestArea} skills</p>
                  <p>• Growth opportunity: {monthlyStats.improvementArea} skills</p>
                  <p>• Total attempts: {monthlyStats.totalAttempts} across {monthlyStats.assessmentsCompleted} assessments</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Continue Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                onClick={() => onNavigate('learning')}
                className="w-full bg-[#28a745] hover:bg-[#1e7e34] text-white"
              >
                <Target className="w-4 h-4 mr-2" />
                Take New Assessment
              </Button>
              <Button
                onClick={() => onNavigate('strength')}
                variant="outline"
                className="w-full border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5"
              >
                <Star className="w-4 h-4 mr-2" />
                View Skills Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}