import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Star, TrendingUp, BookOpen, Target, MessageCircle, Users, Clock, Award, Lightbulb, Brain, Zap, Code, Database, Monitor, Shield, ChevronRight } from 'lucide-react';

interface SkillDetailScreenProps {
  skillName: string;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

const skillDetails = {
  // Soft Skills
  Communication: {
    level: 88,
    status: 'Strong',
    color: '#28a745',
    icon: MessageCircle,
    type: 'soft',
    description: 'Your ability to convey ideas clearly and listen actively to others.',
    strengths: [
      'Clear verbal communication',
      'Active listening skills',
      'Written communication clarity',
      'Presentation confidence'
    ],
    improvements: [
      'Cross-cultural communication',
      'Difficult conversation navigation',
      'Public speaking mastery'
    ],
    recentActivity: [
      { date: '2024-12-18', activity: 'Completed "Active Listening" AI assessment', score: 'Excellent', insights: 3 },
      { date: '2024-12-15', activity: 'Finished "Presentation Skills" scenario', score: 'Good', insights: 2 },
      { date: '2024-12-12', activity: 'Participated in team communication workshop', score: 'Excellent', insights: 4 }
    ],
    aiInsights: 'Your communication style demonstrates exceptional empathy and clarity. AI analysis shows you naturally adapt your communication style to different audiences, making complex concepts accessible.',
    nextMilestone: 'Advanced Communication Strategies',
    recommendedAssessments: [
      'Cross-Cultural Communication Scenarios',
      'Difficult Conversations Practice',
      'Executive Presence Assessment'
    ]
  },
  Leadership: {
    level: 95,
    status: 'Exceptional',
    color: '#aa0000',
    icon: Star,
    type: 'soft',
    description: 'Your natural ability to guide, inspire, and influence others toward common goals.',
    strengths: [
      'Team inspiration and motivation',
      'Strategic decision making',
      'Conflict resolution',
      'Vision communication',
      'Delegation effectiveness'
    ],
    improvements: [
      'Remote team leadership',
      'Change management',
      'Emotional intelligence in leadership'
    ],
    recentActivity: [
      { date: '2024-12-20', activity: 'Led successful project retrospective', score: 'Outstanding', insights: 5 },
      { date: '2024-12-17', activity: 'Mentored junior team member', score: 'Excellent', insights: 3 },
      { date: '2024-12-14', activity: 'Facilitated team conflict resolution', score: 'Excellent', insights: 4 }
    ],
    aiInsights: 'AI analysis reveals exceptional leadership instincts. Your approach balances empathy with decisiveness, creating environments where people thrive. Consider scaling to larger team contexts.',
    nextMilestone: 'Executive Leadership Certification',
    recommendedAssessments: [
      'Strategic Leadership Assessment',
      'Change Management Scenarios',
      'Executive Decision Making'
    ]
  },
  // Technical Skills
  'JavaScript/TypeScript': {
    level: 92,
    status: 'Expert',
    color: '#f6b60b',
    icon: Code,
    type: 'technical',
    description: 'Modern JavaScript and TypeScript development skills including ES6+, async programming, and type safety.',
    strengths: [
      'ES6+ syntax mastery',
      'Async/await patterns',
      'TypeScript type system',
      'Modern framework integration',
      'Performance optimization'
    ],
    improvements: [
      'Advanced design patterns',
      'Memory management',
      'Web Workers usage'
    ],
    recentActivity: [
      { date: '2024-12-18', activity: 'Completed advanced TypeScript assessment', score: 'Expert', insights: 4 },
      { date: '2024-12-15', activity: 'Built complex async data flow', score: 'Excellent', insights: 3 },
      { date: '2024-12-12', activity: 'Performance optimization challenge', score: 'Good', insights: 2 }
    ],
    aiInsights: 'Your JavaScript/TypeScript skills show mastery level. AI analysis indicates strong architectural thinking and clean code practices. Ready for advanced system design challenges.',
    nextMilestone: 'Senior Developer Certification',
    recommendedAssessments: [
      'Advanced Design Patterns',
      'Performance Optimization',
      'System Architecture Design'
    ]
  },
  'Database Design': {
    level: 45,
    status: 'Needs Focus',
    color: '#ffc107',
    icon: Database,
    type: 'technical',
    description: 'Database architecture, schema design, query optimization, and data modeling principles.',
    strengths: [
      'Basic SQL queries',
      'Table relationships understanding',
      'Simple index usage'
    ],
    improvements: [
      'Complex query optimization',
      'Database normalization',
      'Performance tuning',
      'Schema design patterns',
      'Data modeling best practices'
    ],
    recentActivity: [
      { date: '2024-12-16', activity: 'Basic SQL assessment', score: 'Good', insights: 2 },
      { date: '2024-12-10', activity: 'Database fundamentals quiz', score: 'Needs Improvement', insights: 3 },
    ],
    aiInsights: 'Database design is a growth area with significant potential. Your logical thinking from programming will translate well. Focus on normalization principles and query optimization patterns.',
    nextMilestone: 'Database Design Fundamentals',
    recommendedAssessments: [
      'Database Normalization Practice',
      'Query Optimization Scenarios',
      'Schema Design Challenges'
    ]
  },
  'System Architecture': {
    level: 72,
    status: 'Developing',
    color: '#f6b60b',
    icon: Monitor,
    type: 'technical',
    description: 'Large-scale system design, microservices architecture, scalability patterns, and distributed systems.',
    strengths: [
      'Component-based thinking',
      'API design understanding',
      'Basic scalability concepts',
      'Security awareness'
    ],
    improvements: [
      'Microservices patterns',
      'Load balancing strategies',
      'Caching mechanisms',
      'Database sharding',
      'Event-driven architecture'
    ],
    recentActivity: [
      { date: '2024-12-17', activity: 'Microservices design challenge', score: 'Good', insights: 3 },
      { date: '2024-12-13', activity: 'Scalability assessment', score: 'Developing', insights: 4 },
    ],
    aiInsights: 'Strong foundation in system thinking. Your programming experience provides excellent groundwork. Focus on distributed systems patterns and scalability trade-offs for next level growth.',
    nextMilestone: 'Senior System Architecture',
    recommendedAssessments: [
      'Microservices Design Scenarios',
      'Scalability Challenge Assessment',
      'Distributed Systems Principles'
    ]
  }
};

export function SkillDetailScreen({ skillName, onNavigate, onBack }: SkillDetailScreenProps) {
  const skill = skillDetails[skillName as keyof typeof skillDetails] || skillDetails.Communication;
  const IconComponent = skill.icon;

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
          <div className="flex-1">
            <h1 className="text-xl font-medium">{skillName}</h1>
            <p className="text-white/80 text-sm">
              {skill.type === 'technical' ? 'Technical Skill' : 'Soft Skill'} • AI-Powered Assessment Available
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* 1. Combined Skill Overview + AI Assessment */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${skill.color}15` }}
              >
                <IconComponent className="w-8 h-8" style={{ color: skill.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-medium">{skillName}</h2>
                  <Badge 
                    variant="outline" 
                    style={{ 
                      color: skill.color,
                      borderColor: `${skill.color}30`,
                      backgroundColor: `${skill.color}10`
                    }}
                  >
                    {skill.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{skill.description}</p>

                
                {/* AI Assessment Section */}
                <div className="bg-gradient-to-r from-[#f6b60b]/10 to-[#f6b60b]/5 border border-[#f6b60b]/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f6b60b] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-2">Start AI Assessment Here</h3>
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        Take personalized AI assessment with {skill.type === 'technical' ? 'real-world coding scenarios' : 'situational challenges'} and get instant insights.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          onClick={() => onNavigate('assessment', { 
                            skillName,
                            courseTitle: `${skillName} AI Assessment`
                          })}
                          className="bg-[#f6b60b] hover:bg-[#e6a50a] text-[#333333] flex-shrink-0"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Start Assessment
                        </Button>
                        <Badge className="bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20 self-center flex-shrink-0">
                          3-5 questions • Adaptive AI
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Recent AI Learning Activity (Scrollable Modern Design) */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#aa0000]" />
              Recent AI Learning Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-3">
              {skill.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
                  <div className="w-3 h-3 bg-[#aa0000] rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.activity}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600">{activity.date}</span>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            activity.score === 'Outstanding' || activity.score === 'Expert' ? 'text-[#aa0000] border-[#aa0000]/30' :
                            activity.score === 'Excellent' ? 'text-[#28a745] border-[#28a745]/30' :
                            'text-[#f6b60b] border-[#f6b60b]/30'
                          }`}
                        >
                          {activity.score}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {activity.insights} AI insights
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. Your Strengths */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="w-5 h-5 text-[#28a745]" />
              Your Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {skill.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#28a745] rounded-full"></div>
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 4. Growth Opportunities */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-5 h-5 text-[#f6b60b]" />
              Growth Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {skill.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#f6b60b] rounded-full"></div>
                  <span className="text-sm">{improvement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Shortcut */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <Button 
              onClick={() => onNavigate('achievements')}
              className="w-full h-auto p-4 flex items-center justify-between bg-gradient-to-r from-[#f6b60b] to-[#e6a50a] hover:from-[#e6a50a] hover:to-[#d99500] text-[#333333]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">View All Achievements</div>
                  <div className="text-sm opacity-90">Badges, milestones & progress</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>

        {/* 5. Next Milestone */}
        <Card className="border-0 shadow-md border-l-4 border-l-[#f6b60b]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-[#f6b60b]" />
              Next Milestone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{skill.nextMilestone}</p>
                <p className="text-sm text-gray-600">Continue your growth journey</p>
              </div>
              <TrendingUp className="w-6 h-6 text-[#f6b60b]" />
            </div>
          </CardContent>
        </Card>

        {/* 6. Recommended AI Assessments */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#aa0000]" />
              Recommended AI Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {skill.recommendedAssessments.map((assessment, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5"
                  onClick={() => onNavigate('assessment', { 
                    skillName: assessment,
                    courseTitle: assessment
                  })}
                >
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>{assessment}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}