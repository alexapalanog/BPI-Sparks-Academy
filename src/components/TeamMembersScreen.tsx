import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ArrowLeft, Users, ChevronRight } from 'lucide-react';

interface TeamMembersScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

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
    energyLevel: 'energized'
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
    energyLevel: 'balanced'
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
    energyLevel: 'tired'
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
    energyLevel: 'energized'
  }
];

export function TeamMembersScreen({ onNavigate, onBack }: TeamMembersScreenProps) {
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
            <h1 className="text-xl font-medium">Team Members</h1>
            <p className="text-white/80 text-sm">View and manage your team</p>
          </div>
        </div>

        {/* Team Overview Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{teamMembers.length}</p>
            <p className="text-xs text-white/80">Total Members</p>
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

      <div className="px-6 py-6 space-y-4 pb-24">
        {/* Team Members List */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-[#aa0000]" />
              All Team Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member) => (
              <Button
                key={member.id}
                variant="ghost"
                onClick={() => onNavigate('employee-detail', { employee: member })}
                className="w-full p-4 h-auto justify-start hover:bg-gray-50 border border-gray-100 rounded-lg"
              >
                <div className="flex items-center gap-3 w-full">
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarFallback className="bg-[#aa0000]/10 text-[#aa0000]">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm truncate flex-1 mr-2">{member.name}</h4>
                      <Badge 
                        className={`text-xs ${getWellnessColor(member.wellness)}`}
                      >
                        {getWellnessIcon(member.wellness)} {member.wellness.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1 truncate">{member.role} • {member.lastActive}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 truncate">{member.recentActivity}</span>
                      <span className="text-xs text-[#28a745] flex-shrink-0">{member.skillsGrowth}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {member.strengths.slice(0, 2).map((strength, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                      {member.strengths.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.strengths.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-2">Wellness Distribution</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Thriving</span>
                  <span className="text-xs font-medium">50%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Balanced</span>
                  <span className="text-xs font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Needs Support</span>
                  <span className="text-xs font-medium">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-2">Recent Activity</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Active Today</span>
                  <span className="text-xs font-medium">3 members</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Learning Progress</span>
                  <span className="text-xs font-medium text-[#28a745]">+10 skills</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Assessments</span>
                  <span className="text-xs font-medium">4 completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}