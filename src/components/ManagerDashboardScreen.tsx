import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Users, Calendar, MessageCircle, TrendingUp, BarChart3, Star, Award, CheckCircle, Clock, AlertTriangle, Plus, ChevronRight, Target, Heart, Zap, BookOpen, Settings, Eye, Bell, Brain, Database, Code, UserCheck, FileText, HelpCircle, ChevronUp, ChevronDown, Trophy, TrendingDown, ArrowUpRight, ChevronLeft, StickyNote } from 'lucide-react';

interface ManagerDashboardScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

// Skill level mapping for team matrix - Updated developing color to orange
const getSkillLevel = (score: number) => {
  if (score >= 85) return { label: 'Expert', color: '#28a745' };
  if (score >= 70) return { label: 'Proficient', color: '#17a2b8' };
  if (score >= 55) return { label: 'Developing', color: '#FFA726' }; // Changed to orange
  return { label: 'Needs Focus', color: '#ffc107' };
};

// Mock team data with more details
const teamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Developer',
    initials: 'AJ',
    wellness: 'thriving',
    strengths: ['Leadership - Creative', 'Communication', 'JavaScript/TypeScript'],
    recentActivity: 'Communication Skills Assessment',
    lastActive: '2 hours ago',
    skillsGrowth: '+3 skills this month',
    engagementScore: 92,
    confidenceLevel: 87,
    energyLevel: 'energized',
    skills: {
      technical: { javascript: 92, react: 88, database: 76, architecture: 70 },
      soft: { communication: 91, leadership: 85, teamwork: 86, problemSolving: 89 }
    }
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Designer',
    initials: 'SC',
    wellness: 'balanced',
    strengths: ['UI/UX Design', 'Creative Problem Solving', 'Leadership - Supportive'],
    recentActivity: 'Design Systems Module',
    lastActive: '4 hours ago',
    skillsGrowth: '+2 skills this month',
    engagementScore: 78,
    confidenceLevel: 82,
    energyLevel: 'balanced',
    skills: {
      technical: { design: 94, prototyping: 87, frontend: 72, testing: 68 },
      soft: { creativity: 95, communication: 83, teamwork: 88, adaptability: 80 }
    }
  },
  {
    id: 3,
    name: 'Mike Rodriguez',
    role: 'Analyst',
    initials: 'MR',
    wellness: 'needs-support',
    strengths: ['Data Analysis', 'Strategic Thinking', 'Problem Solving'],
    recentActivity: 'SQL Fundamentals',
    lastActive: '1 day ago',
    skillsGrowth: '+1 skill this month',
    engagementScore: 65,
    confidenceLevel: 74,
    energyLevel: 'tired',
    skills: {
      technical: { sql: 85, analytics: 89, excel: 91, python: 67 },
      soft: { analyticalThinking: 92, communication: 72, teamwork: 75, leadership: 68 }
    }
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Project Manager',
    initials: 'ED',
    wellness: 'thriving',
    strengths: ['Agile Methodologies', 'Leadership - Transformational', 'Communication'],
    recentActivity: 'Team Leadership Assessment',
    lastActive: '1 hour ago',
    skillsGrowth: '+4 skills this month',
    engagementScore: 95,
    confidenceLevel: 91,
    energyLevel: 'energized',
    skills: {
      technical: { agile: 93, projectManagement: 89, tools: 82, reporting: 78 },
      soft: { leadership: 94, communication: 90, organization: 88, mentoring: 85 }
    }
  }
];

// Team growth insights data
const teamGrowthInsights = {
  monthlyProgress: [
    {
      member: 'Emily Davis',
      initials: 'ED',
      improvements: [
        { skill: 'Leadership', previousScore: 89, currentScore: 94, change: +5 },
        { skill: 'Mentoring', previousScore: 80, currentScore: 85, change: +5 }
      ],
      achievements: ['Completed Advanced Leadership Module', 'Mentored 2 new team members'],
      trend: 'improving'
    },
    {
      member: 'Alex Johnson',
      initials: 'AJ',
      improvements: [
        { skill: 'Communication', previousScore: 86, currentScore: 91, change: +5 },
        { skill: 'JavaScript', previousScore: 88, currentScore: 92, change: +4 }
      ],
      achievements: ['Communication Excellence Certificate', 'Led 3 technical workshops'],
      trend: 'improving'
    },
    {
      member: 'Sarah Chen',
      initials: 'SC',
      improvements: [
        { skill: 'Design Systems', previousScore: 82, currentScore: 87, change: +5 },
        { skill: 'Prototyping', previousScore: 84, currentScore: 87, change: +3 }
      ],
      achievements: ['Design Systems Certification', 'Improved team design process'],
      trend: 'stable'
    },
    {
      member: 'Mike Rodriguez',
      initials: 'MR',
      improvements: [
        { skill: 'Communication', previousScore: 68, currentScore: 72, change: +4 },
        { skill: 'Python', previousScore: 63, currentScore: 67, change: +4 }
      ],
      achievements: ['Completed SQL Advanced Course'],
      trend: 'needs-attention'
    }
  ],
  teamMilestones: [
    { title: 'Team Communication Score', target: 85, current: 84, percentage: 99 },
    { title: 'Technical Skills Average', target: 80, current: 83, percentage: 104 },
    { title: 'Leadership Development', target: 75, current: 81, percentage: 108 }
  ],
  recommendations: [
    {
      priority: 'high',
      title: 'Focus on Mike\'s Development',
      description: 'Provide additional support and mentoring',
      actions: ['1-on-1 mentoring sessions', 'Skill-specific training', 'Confidence building workshops']
    },
    {
      priority: 'medium',
      title: 'Leverage Emily\'s Leadership',
      description: 'Utilize her strengths to mentor others',
      actions: ['Lead team training sessions', 'Mentor junior members', 'Knowledge sharing initiatives']
    },
    {
      priority: 'low',
      title: 'Cross-skill Development',
      description: 'Encourage diverse skill development',
      actions: ['Cross-functional projects', 'Skill exchange programs', 'Learning partnerships']
    }
  ]
};

// Team analytics data
const teamAnalytics = {
  skills: {
    strengths: ['Communication', 'Leadership', 'Technical Implementation'],
    gaps: ['Data Analysis', 'Innovation', 'Advanced Architecture'],
    riskAreas: ['Mobile Development', 'Cloud Security', 'Advanced Analytics']
  },
  resources: {
    trainingBudget: 85,
    utilization: 'High',
    tools: ['Learning Platform', 'Assessment Tools', 'Collaboration Software'],
    needsAttention: ['Advanced Training Materials', 'Mentorship Program']
  },
  people: {
    knowledgeGaps: {
      'Advanced Data Science': 'No team expert',
      'Cloud Architecture': 'Limited expertise', 
      'Mobile Development': 'Skill gap identified',
      'DevOps & CI/CD': 'Basic knowledge only',
      'Machine Learning': 'No current expertise',
      'Security Testing': 'Requires external support'
    }
  }
};

// AI Coach frequent questions - Extended list for scrolling
const frequentAIQuestions = [
  { question: 'How to improve communication skills?', frequency: 23, category: 'Soft Skills' },
  { question: 'Best practices for JavaScript?', frequency: 18, category: 'Technical' },
  { question: 'Leadership development tips?', frequency: 15, category: 'Leadership' },
  { question: 'Career advancement advice?', frequency: 12, category: 'Career' },
  { question: 'Time management strategies?', frequency: 10, category: 'Productivity' },
  { question: 'How to handle difficult conversations?', frequency: 9, category: 'Communication' },
  { question: 'Database optimization techniques?', frequency: 8, category: 'Technical' },
  { question: 'Team motivation strategies?', frequency: 7, category: 'Leadership' },
  { question: 'Work-life balance tips?', frequency: 6, category: 'Wellness' },
  { question: 'Presentation skills improvement?', frequency: 5, category: 'Communication' }
];

// Team skill matrix data for heatmap with labels - Complete skill names
const skillMatrix = [
  { skill: 'JavaScript Development', alex: 92, sarah: 72, mike: 45, emily: 60 },
  { skill: 'Team Communication', alex: 91, sarah: 83, mike: 72, emily: 90 },
  { skill: 'Leadership Skills', alex: 85, sarah: 75, mike: 68, emily: 94 },
  { skill: 'Data Analysis & Reporting', alex: 70, sarah: 55, mike: 89, emily: 65 },
  { skill: 'UI/UX Design', alex: 60, sarah: 94, mike: 40, emily: 70 },
  { skill: 'Project Management', alex: 75, sarah: 68, mike: 72, emily: 89 }
];

// Function to get dynamic weekly data based on current date
const getDynamicWeeklyData = () => {
  const today = new Date();
  const weeklyData = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    weeklyData.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toISOString().split('T')[0],
      dayIndex: i
    });
  }
  
  return weeklyData;
};

// Historical wellness data (dynamic - last 7 days)
const getTeamWellnessHistory = () => {
  const weekData = getDynamicWeeklyData();
  const wellnessValues = [7.2, 7.8, 6.5, 7.1, 7.9, 7.3, 7.6];
  
  return weekData.map((day, index) => ({
    ...day,
    value: wellnessValues[index] || 7.0,
    color: wellnessValues[index] >= 7.0 ? '#28a745' : '#ffc107'
  }));
};

// Historical engagement data (dynamic - last 7 days)
const getTeamEngagementHistory = () => {
  const weekData = getDynamicWeeklyData();
  const engagementValues = [78, 82, 75, 69, 85, 79, 87];
  
  return weekData.map((day, index) => ({
    ...day,
    value: engagementValues[index] || 75,
    color: engagementValues[index] >= 80 ? '#28a745' : engagementValues[index] >= 70 ? '#17a2b8' : '#ffc107'
  }));
};

export function ManagerDashboardScreen({ onNavigate }: ManagerDashboardScreenProps) {
  const [analyticsTab, setAnalyticsTab] = useState('skills');
  const [aiQuestionsStartIndex, setAiQuestionsStartIndex] = useState(0);
  const [monthlyProgressIndex, setMonthlyProgressIndex] = useState(0);
  const [teamMembersIndex, setTeamMembersIndex] = useState(0);
  const [recommendationTab, setRecommendationTab] = useState('high');
  const [knowledgeGapIndex, setKnowledgeGapIndex] = useState(0);

  const teamWellnessHistory = getTeamWellnessHistory();
  const teamEngagementHistory = getTeamEngagementHistory();

  const maxVisibleQuestions = 4;
  const canScrollUp = aiQuestionsStartIndex > 0;
  const canScrollDown = aiQuestionsStartIndex + maxVisibleQuestions < frequentAIQuestions.length;

  const handleScrollUp = () => {
    if (canScrollUp) {
      setAiQuestionsStartIndex(aiQuestionsStartIndex - 1);
    }
  };

  const handleScrollDown = () => {
    if (canScrollDown) {
      setAiQuestionsStartIndex(aiQuestionsStartIndex + 1);
    }
  };

  const handlePrevProgress = () => {
    setMonthlyProgressIndex(prev => Math.max(0, prev - 1));
  };
  const handleNextProgress = () => {
    setMonthlyProgressIndex(prev => Math.min(teamGrowthInsights.monthlyProgress.length - 1, prev + 1));
  };

  const handlePrevTeamMember = () => {
    setTeamMembersIndex(prev => Math.max(0, prev - 1));
  };
  const handleNextTeamMember = () => {
    setTeamMembersIndex(prev => Math.min(teamMembers.length - 1, prev + 1));
  };

  const knowledgeGapEntries = Object.entries(teamAnalytics.people.knowledgeGaps);
  const handlePrevKnowledgeGap = () => {
    setKnowledgeGapIndex(prev => Math.max(0, prev - 1));
  };
  const handleNextKnowledgeGap = () => {
    setKnowledgeGapIndex(prev => Math.min(knowledgeGapEntries.length - 1, prev + 1));
  };

  const currentProgressMember = teamGrowthInsights.monthlyProgress[monthlyProgressIndex];
  const visibleQuestions = frequentAIQuestions.slice(aiQuestionsStartIndex, aiQuestionsStartIndex + maxVisibleQuestions);

  const getWellnessColor = (wellness: string) => {
    switch (wellness) {
      case 'thriving': return 'bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20';
      case 'balanced': return 'bg-[#17a2b8]/10 text-[#17a2b8] border-[#17a2b8]/20';
      case 'needs-support': return 'bg-[#ffc107]/10 text-[#ffc107] border-[#ffc107]/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getWellnessIcon = (wellness: string) => {
    switch (wellness) {
      case 'thriving': return '🌟';
      case 'balanced': return '⚖️';
      case 'needs-support': return '⚠️';
      default: return '❓';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-[#28a745]" />;
      case 'stable': return <TrendingUp className="w-4 h-4 text-[#17a2b8]" />;
      case 'needs-attention': return <TrendingDown className="w-4 h-4 text-[#ffc107]" />;
      default: return <TrendingUp className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-[#dc3545] bg-[#dc3545]/10 border-[#dc3545]/20';
      case 'medium': return 'text-[#ffc107] bg-[#ffc107]/10 border-[#ffc107]/20';
      case 'low': return 'text-[#28a745] bg-[#28a745]/10 border-[#28a745]/20';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  // Calculate SVG path for line chart
  const createLinePath = (data: any[], maxHeight: number = 60) => {
    const width = 280;
    const stepX = width / (data.length - 1);
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    
    return data.map((point, index) => {
      const x = index * stepX;
      const y = maxHeight - ((point.value - minValue) / range) * maxHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-medium truncate">Team Dashboard</h1>
            <p className="text-white/80 text-sm truncate">Manage and support your team's growth</p>
          </div>
        </div>

        {/* Team Overview Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{teamMembers.length}</p>
            <p className="text-xs text-white/80">Team Members</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">85%</p>
            <p className="text-xs text-white/80">Avg Engagement</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">7.6</p>
            <p className="text-xs text-white/80">Wellness Score</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button 
                onClick={() => onNavigate('team-notice')}
                variant="outline"
                className="h-auto p-4 flex-col items-center gap-2 border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5"
              >
                <Bell className="w-5 h-5" />
                <span className="text-sm">Team Notice</span>
              </Button>
              <Button 
                onClick={() => onNavigate('schedule-appointment')}
                className="h-auto p-4 flex-col items-center gap-2 bg-[#28a745] hover:bg-[#1e7e34] text-white"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Schedule Meeting</span>
              </Button>
            </div>
            {/* New Feature Widgets */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => onNavigate('team-notifications-tracking')}
                variant="outline"
                className="h-auto p-4 flex-col items-center gap-2 border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5"
              >
                <Eye className="w-5 h-5" />
                <span className="text-sm">Track Notifications</span>
              </Button>
              <Button 
                onClick={() => onNavigate('team-member-notes')}
                variant="outline"
                className="h-auto p-4 flex-col items-center gap-2 border-[#17a2b8]/20 text-[#17a2b8] hover:bg-[#17a2b8]/5"
              >
                <StickyNote className="w-5 h-5" />
                <span className="text-sm">Member Notes</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-[#aa0000]" />
                Team
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('team-members')}
                className="text-[#aa0000] hover:bg-[#aa0000]/5"
              >
                View All
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Members</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{teamMembersIndex + 1} / {teamMembers.length}</span>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={handlePrevTeamMember} disabled={teamMembersIndex === 0} className="p-1 h-auto disabled:opacity-50">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleNextTeamMember} disabled={teamMembersIndex === teamMembers.length - 1} className="p-1 h-auto disabled:opacity-50">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {teamMembers[teamMembersIndex] && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-[#aa0000]/10 text-[#aa0000] text-xs">
                        {teamMembers[teamMembersIndex].initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium text-sm">{teamMembers[teamMembersIndex].name}</span>
                      <p className="text-xs text-gray-600">{teamMembers[teamMembersIndex].role}</p>
                    </div>
                  </div>
                  <Badge 
                    className={`text-xs ${getWellnessColor(teamMembers[teamMembersIndex].wellness)}`}
                  >
                    {getWellnessIcon(teamMembers[teamMembersIndex].wellness)} {teamMembers[teamMembersIndex].wellness.replace('-', ' ')}
                  </Badge>
                </div>
                
                <div className="text-xs">
                  <p className="text-gray-600 mb-1">Top 3 Strengths & Potential:</p>
                  <div className="flex flex-wrap gap-1">
                    {teamMembers[teamMembersIndex].strengths.slice(0, 3).map((strength, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Team Milestones (Separate Card) */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-5 h-5 text-[#17a2b8]" />
              Team Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamGrowthInsights.teamMilestones.map((milestone, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{milestone.title}</span>
                  <span className={`text-sm font-medium ${milestone.percentage >= 100 ? 'text-[#28a745]' : 'text-[#ffc107]'}`}>
                    {milestone.percentage}%
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${milestone.percentage >= 100 ? 'bg-[#28a745]' : 'bg-[#ffc107]'}`}
                      style={{ width: `${Math.min(milestone.percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Analytics with Tabs */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Team Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={analyticsTab} onValueChange={setAnalyticsTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="people">People</TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-3 pr-2">
                  <div className="p-3 bg-[#28a745]/10 border-l-4 border-l-[#28a745] rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#28a745] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs text-[#28a745] mb-2">Team Strengths</p>
                        <div className="flex flex-wrap gap-1">
                          {teamAnalytics.skills.strengths.map((strength, index) => (
                            <Badge key={index} className="bg-[#28a745]/20 text-[#28a745] border-[#28a745]/30 text-xs px-1.5 py-0.5">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#ffc107]/10 border-l-4 border-l-[#ffc107] rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#ffc107] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs text-[#ffc107] mb-2">Skills Gap Identified</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {teamAnalytics.skills.gaps.map((gap, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                              {gap}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          Consider targeted training programs in these areas.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#dc3545]/10 border-l-4 border-l-[#dc3545] rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#dc3545] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs text-[#dc3545] mb-2">Risk Areas</p>
                        <div className="flex flex-wrap gap-1">
                          {teamAnalytics.skills.riskAreas.map((risk, index) => (
                            <Badge key={index} className="bg-[#dc3545]/20 text-[#dc3545] border-[#dc3545]/30 text-xs px-1.5 py-0.5">
                              {risk}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="space-y-3 pr-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-xs mb-2">Training Budget</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-[#28a745]"
                            style={{ width: `${teamAnalytics.resources.trainingBudget}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{teamAnalytics.resources.trainingBudget}%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-xs mb-2">Utilization</h4>
                      <Badge className="bg-[#28a745]/20 text-[#28a745] border-[#28a745]/30 px-2 py-0.5 text-xs">
                        {teamAnalytics.resources.utilization}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-xs mb-2">Available Tools</h4>
                    <div className="flex flex-wrap gap-1">
                      {teamAnalytics.resources.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#f6b60b]/10 border-l-4 border-l-[#f6b60b] rounded-r-lg">
                    <h4 className="font-semibold text-xs text-[#f6b60b] mb-2">Needs Attention</h4>
                    <ul className="text-xs text-gray-700 space-y-1 leading-relaxed">
                      {teamAnalytics.resources.needsAttention.map((need, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-[#f6b60b] text-xs">•</span>
                          <span>{need}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="people" className="h-72">
                <div className="space-y-3">
                  <div className="p-3 bg-[#dc3545]/10 border-l-4 border-l-[#dc3545] rounded-r-lg h-52">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-[#dc3545] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-medium text-xs text-[#dc3545]">Team Knowledge Gaps</p>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handlePrevKnowledgeGap}
                              disabled={knowledgeGapIndex === 0}
                              className="p-1 h-auto disabled:opacity-50"
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </Button>
                            <span className="text-xs text-gray-500 mx-1">{knowledgeGapIndex + 1} / {knowledgeGapEntries.length}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleNextKnowledgeGap}
                              disabled={knowledgeGapIndex === knowledgeGapEntries.length - 1}
                              className="p-1 h-auto disabled:opacity-50"
                            >
                              <ChevronRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {knowledgeGapEntries[knowledgeGapIndex] && (
                          <div className="p-3 bg-white rounded border border-[#dc3545]/20 h-36">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{knowledgeGapEntries[knowledgeGapIndex][0]}</span>
                              <Badge 
                                className={`text-xs px-2 py-0.5 flex-shrink-0 ${
                                  knowledgeGapEntries[knowledgeGapIndex][1].includes('No') ? 'bg-[#dc3545]/20 text-[#dc3545] border-[#dc3545]/30' :
                                  knowledgeGapEntries[knowledgeGapIndex][1].includes('Limited') ? 'bg-[#ffc107]/20 text-[#ffc107] border-[#ffc107]/30' :
                                  'bg-[#17a2b8]/20 text-[#17a2b8] border-[#17a2b8]/30'
                                }`}
                              >
                                {knowledgeGapEntries[knowledgeGapIndex][1]}
                              </Badge>
                            </div>
                            <div className="space-y-2 h-20 overflow-y-auto">
                              <p className="text-xs text-gray-600 leading-tight">
                                <span className="font-medium">Impact:</span>
                                {knowledgeGapEntries[knowledgeGapIndex][1].includes('No') ? ' High - Critical knowledge gap requiring immediate attention' :
                                 knowledgeGapEntries[knowledgeGapIndex][1].includes('Limited') ? ' Medium - May impact project delivery' :
                                 ' Low - Support needed for complex tasks'}
                              </p>
                              <p className="text-xs text-[#aa0000] leading-tight">
                                <span className="font-medium">Action:</span>
                                {knowledgeGapEntries[knowledgeGapIndex][1].includes('No') ? ' Hire specialist or implement intensive training program' :
                                 knowledgeGapEntries[knowledgeGapIndex][1].includes('Limited') ? ' Upskill existing team members through targeted training' :
                                 ' Partner with external experts for complex projects'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2 bg-[#17a2b8]/10 rounded border border-[#17a2b8]/20">
                    <p className="text-xs text-[#17a2b8] font-medium mb-1">Summary</p>
                    <p className="text-xs text-gray-700 leading-tight">
                      Strong foundation skills but needs investment in emerging technologies. 
                      Priority: cloud architecture and data science capabilities.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Development Recommendations (Separate Card with Tabs) */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#f6b60b]" />
              Development Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={recommendationTab} onValueChange={setRecommendationTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="high">High</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="low">Low</TabsTrigger>
              </TabsList>
              
              <TabsContent value="high" className="space-y-3">
                {teamGrowthInsights.recommendations.filter(r => r.priority === 'high').map((rec, index) => (
                   <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority.toUpperCase()}</Badge>
                            <span className="font-medium text-sm">{rec.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                        </div>
                      </div>
                      <div className="text-xs"><p className="text-gray-600 mb-1">Suggested Actions:</p><ul className="space-y-1">{rec.actions.map((action, actionIndex) => (<li key={actionIndex} className="text-gray-700">• {action}</li>))}</ul></div>
                    </div>
                ))}
              </TabsContent>
              <TabsContent value="medium" className="space-y-3">
                 {teamGrowthInsights.recommendations.filter(r => r.priority === 'medium').map((rec, index) => (
                   <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority.toUpperCase()}</Badge>
                            <span className="font-medium text-sm">{rec.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                        </div>
                      </div>
                      <div className="text-xs"><p className="text-gray-600 mb-1">Suggested Actions:</p><ul className="space-y-1">{rec.actions.map((action, actionIndex) => (<li key={actionIndex} className="text-gray-700">• {action}</li>))}</ul></div>
                    </div>
                ))}
              </TabsContent>
              <TabsContent value="low" className="space-y-3">
                 {teamGrowthInsights.recommendations.filter(r => r.priority === 'low').map((rec, index) => (
                   <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>{rec.priority.toUpperCase()}</Badge>
                            <span className="font-medium text-sm">{rec.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{rec.description}</p>
                        </div>
                      </div>
                      <div className="text-xs"><p className="text-gray-600 mb-1">Suggested Actions:</p><ul className="space-y-1">{rec.actions.map((action, actionIndex) => (<li key={actionIndex} className="text-gray-700">• {action}</li>))}</ul></div>
                    </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* AI Coach Analytics - Scrollable with max 4 items */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#f6b60b]" />
                Most Frequent AI Coach Concerns
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleScrollUp}
                  disabled={!canScrollUp}
                  className="p-1 h-auto"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleScrollDown}
                  disabled={!canScrollDown}
                  className="p-1 h-auto"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {visibleQuestions.map((item, index) => (
                <div key={item.question} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#f6b60b]/10 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-[#f6b60b]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.question}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-600">{item.frequency} times asked</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll indicator */}
            {frequentAIQuestions.length > maxVisibleQuestions && (
              <div className="text-center mt-3">
                <span className="text-xs text-gray-500">
                  Showing {aiQuestionsStartIndex + 1}-{Math.min(aiQuestionsStartIndex + maxVisibleQuestions, frequentAIQuestions.length)} of {frequentAIQuestions.length}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Skill Matrix Heatmap with Labels - Complete skill names and friendly scrolling */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#17a2b8]" />
              Team Skill Matrix
            </CardTitle>
            <p className="text-sm text-gray-600">Focus areas for team development</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-4">
              <div className="min-w-[500px]">
                {/* Header */}
                <div className="grid grid-cols-5 gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                  <div className="px-2 py-1 text-xs font-semibold text-gray-700">Skills</div>
                  <div className="px-2 py-1 text-xs font-semibold text-center text-gray-700">Alex</div>
                  <div className="px-2 py-1 text-xs font-semibold text-center text-gray-700">Sarah</div>
                  <div className="px-2 py-1 text-xs font-semibold text-center text-gray-700">Mike</div>
                  <div className="px-2 py-1 text-xs font-semibold text-center text-gray-700">Emily</div>
                </div>
                
                {/* Skills Matrix with Complete Names and Labels */}
                <div className="space-y-1">
                  {skillMatrix.map((row, index) => (
                    <div key={index} className="grid grid-cols-5 gap-2 p-1 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="px-2 py-1 text-xs font-medium text-gray-800 min-w-0 break-words flex items-center">{row.skill}</div>
                      <div 
                        className="px-2 py-1 text-xs text-center rounded font-medium flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${getSkillLevel(row.alex).color}15`,
                          color: getSkillLevel(row.alex).color,
                          border: `1px solid ${getSkillLevel(row.alex).color}20`
                        }}
                      >
                        {getSkillLevel(row.alex).label}
                      </div>
                      <div 
                        className="px-2 py-1 text-xs text-center rounded font-medium flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${getSkillLevel(row.sarah).color}15`,
                          color: getSkillLevel(row.sarah).color,
                          border: `1px solid ${getSkillLevel(row.sarah).color}20`
                        }}
                      >
                        {getSkillLevel(row.sarah).label}
                      </div>
                      <div 
                        className="px-2 py-1 text-xs text-center rounded font-medium flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${getSkillLevel(row.mike).color}15`,
                          color: getSkillLevel(row.mike).color,
                          border: `1px solid ${getSkillLevel(row.mike).color}20`
                        }}
                      >
                        {getSkillLevel(row.mike).label}
                      </div>
                      <div 
                        className="px-2 py-1 text-xs text-center rounded font-medium flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${getSkillLevel(row.emily).color}15`,
                          color: getSkillLevel(row.emily).color,
                          border: `1px solid ${getSkillLevel(row.emily).color}20`
                        }}
                      >
                        {getSkillLevel(row.emily).label}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Legend with better spacing and visual cues */}
                <div className="flex items-center justify-center flex-wrap gap-3 mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border" style={{ backgroundColor: `#28a74515`, borderColor: `#28a74520` }}></div>
                    <span className="text-xs font-medium text-gray-700">Expert</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border" style={{ backgroundColor: `#17a2b815`, borderColor: `#17a2b820` }}></div>
                    <span className="text-xs font-medium text-gray-700">Proficient</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border" style={{ backgroundColor: `#FFA72615`, borderColor: `#FFA72620` }}></div>
                    <span className="text-xs font-medium text-gray-700">Developing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded border" style={{ backgroundColor: `#ffc10715`, borderColor: `#ffc10720` }}></div>
                    <span className="text-xs font-medium text-gray-700">Needs Focus</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scroll hint */}
            <div className="text-center mt-2">
              <p className="text-xs text-gray-500">← Swipe horizontally to view all skills →</p>
            </div>
          </CardContent>
        </Card>

        {/* Team Wellness Trend */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#28a745]" />
                Team Wellness Trend
              </CardTitle>
              <Badge className="bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20">
                Positive
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-20 bg-gray-50 rounded-lg p-4">
                <svg 
                  width="100%" 
                  height="60" 
                  viewBox="0 0 280 60"
                  className="overflow-visible"
                >
                  <defs>
                    <linearGradient id="wellnessGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#28a745" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#28a745" stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                  
                  {[0, 1, 2, 3].map(i => (
                    <line 
                      key={i}
                      x1="0" 
                      y1={i * 15} 
                      x2="280" 
                      y2={i * 15}
                      stroke="#e9ecef" 
                      strokeWidth="1"
                    />
                  ))}
                  
                  <path
                    d={`${createLinePath(teamWellnessHistory)} L 280 60 L 0 60 Z`}
                    fill="url(#wellnessGradient)"
                  />
                  
                  <path
                    d={createLinePath(teamWellnessHistory)}
                    stroke="#28a745"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {teamWellnessHistory.map((point, index) => {
                    const x = index * (280 / (teamWellnessHistory.length - 1));
                    const maxValue = Math.max(...teamWellnessHistory.map(d => d.value));
                    const minValue = Math.min(...teamWellnessHistory.map(d => d.value));
                    const range = maxValue - minValue || 1;
                    const y = 60 - ((point.value - minValue) / range) * 60;
                    
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#28a745"
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600 px-2">
                {teamWellnessHistory.map((point, index) => (
                  <span key={index}>{point.date.split(' ')[1]}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Current</p>
                  <p className="font-medium text-[#28a745]">7.6/10</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">7-Day Avg</p>
                  <p className="font-medium">7.3/10</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trend</p>
                  <p className="font-medium text-[#28a745] flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +4%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Engagement Trend - New Addition */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#17a2b8]" />
                Team Engagement Trend
              </CardTitle>
              <Badge className="bg-[#17a2b8]/10 text-[#17a2b8] border-[#17a2b8]/20">
                Strong
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-20 bg-gray-50 rounded-lg p-4">
                <svg 
                  width="100%" 
                  height="60" 
                  viewBox="0 0 280 60"
                  className="overflow-visible"
                >
                  <defs>
                    <linearGradient id="engagementGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#17a2b8" stopOpacity="0.3"/>
                      <stop offset="100%" stopColor="#17a2b8" stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                  
                  {[0, 1, 2, 3].map(i => (
                    <line 
                      key={i}
                      x1="0" 
                      y1={i * 15} 
                      x2="280" 
                      y2={i * 15}
                      stroke="#e9ecef" 
                      strokeWidth="1"
                    />
                  ))}
                  
                  <path
                    d={`${createLinePath(teamEngagementHistory)} L 280 60 L 0 60 Z`}
                    fill="url(#engagementGradient)"
                  />
                  
                  <path
                    d={createLinePath(teamEngagementHistory)}
                    stroke="#17a2b8"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {teamEngagementHistory.map((point, index) => {
                    const x = index * (280 / (teamEngagementHistory.length - 1));
                    const maxValue = Math.max(...teamEngagementHistory.map(d => d.value));
                    const minValue = Math.min(...teamEngagementHistory.map(d => d.value));
                    const range = maxValue - minValue || 1;
                    const y = 60 - ((point.value - minValue) / range) * 60;
                    
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="3"
                        fill="#17a2b8"
                        stroke="white"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600 px-2">
                {teamEngagementHistory.map((point, index) => (
                  <span key={index}>{point.date.split(' ')[1]}</span>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Current</p>
                  <p className="font-medium text-[#17a2b8]">87%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">7-Day Avg</p>
                  <p className="font-medium">79%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trend</p>
                  <p className="font-medium text-[#28a745] flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +10%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}