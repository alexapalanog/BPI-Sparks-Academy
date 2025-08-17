import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { ArrowLeft, User, Heart, TrendingUp, BookOpen, MessageCircle, Target, Star, Calendar, Award, Plus } from 'lucide-react';

interface EmployeeDetailScreenProps {
  employee: any;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function EmployeeDetailScreen({ employee, onNavigate, onBack }: EmployeeDetailScreenProps) {
  // Mock employee data if none provided
  const emp = employee || {
    id: 1,
    name: 'Alex Johnson',
    role: 'Developer',
    wellness: 'thriving',
    energy: 'energized',
    mood: 'focused',
    initials: 'AJ',
    skills: {
      communication: 88,
      leadership: 75,
      adaptability: 65,
      problemSolving: 70
    },
    recentActivity: [
      { date: '2024-12-18', activity: 'Completed Communication Assessment', score: 'Excellent' },
      { date: '2024-12-15', activity: 'Participated in Leadership Workshop', score: 'Good' }
    ]
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
            <h1 className="text-xl font-medium">{emp.name}</h1>
            <p className="text-white/80 text-sm">Employee Profile & Progress</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Employee Overview */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-[#aa0000] text-white text-lg">
                  {emp.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-medium">{emp.name}</h2>
                <p className="text-gray-600">{emp.role}</p>
                <Badge className={`mt-1 ${
                  emp.wellness === 'thriving' ? 'bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20' :
                  emp.wellness === 'balanced' ? 'bg-[#17a2b8]/10 text-[#17a2b8] border-[#17a2b8]/20' :
                  'bg-[#ffc107]/10 text-[#ffc107] border-[#ffc107]/20'
                }`}>
                  {emp.wellness === 'thriving' ? 'Thriving' :
                   emp.wellness === 'balanced' ? 'Balanced' : 'Needs Support'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Overview */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#aa0000]" />
              Skills Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(emp.skills).map(([skill, level]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-medium">{level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#aa0000] h-2 rounded-full transition-all"
                    style={{ width: `${level}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#f6b60b]" />
              Recent Learning Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {emp.recentActivity.map((activity: any, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-[#aa0000] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-600">{activity.date}</span>
                    <Badge variant="outline" className={`text-xs ${
                      activity.score === 'Excellent' ? 'text-[#28a745] border-[#28a745]/30' :
                      activity.score === 'Good' ? 'text-[#f6b60b] border-[#f6b60b]/30' :
                      'text-gray-600 border-gray-300'
                    }`}>
                      {activity.score}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Manager Notes */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#aa0000]" />
              Manager Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-[#28a745]/5 rounded-lg border-l-4 border-l-[#28a745]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Public Feedback</span>
                  <span className="text-xs text-gray-600">Dec 18, 2024</span>
                </div>
                <p className="text-sm text-gray-700">
                  Excellent progress on communication skills. Alex consistently demonstrates strong leadership potential and actively engages in team discussions.
                </p>
              </div>
              
              <div className="p-3 bg-[#f6b60b]/5 rounded-lg border-l-4 border-l-[#f6b60b]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Private Note</span>
                  <span className="text-xs text-gray-600">Dec 15, 2024</span>
                </div>
                <p className="text-sm text-gray-700 italic">
                  Consider for promotion track. Strong analytical skills but could benefit from more complex problem-solving scenarios.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium">Add New Note</label>
              <Textarea 
                placeholder="Add constructive feedback or observations..."
                className="min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#aa0000] hover:bg-[#880000] text-white">
                  Add Public Note
                </Button>
                <Button size="sm" variant="outline" className="border-[#aa0000]/20 text-[#aa0000]">
                  Add Private Note
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Modules */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#f6b60b]" />
              Recommended Modules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3">
              <Button 
                variant="outline" 
                className="justify-between border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5"
              >
                <span>Advanced Problem Solving</span>
                <Plus className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-between border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5"
              >
                <span>Leadership Development Track</span>
                <Plus className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                className="justify-between border-[#28a745]/20 text-[#28a745] hover:bg-[#28a745]/5"
              >
                <span>Team Collaboration Mastery</span>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <Button className="w-full bg-[#f6b60b] hover:bg-[#e6a50a] text-[#333333] rounded-xl py-4 h-auto">
          <div className="flex items-center justify-center gap-2">
            <BookOpen className="w-5 h-5" />
            <span>Assign Learning Module</span>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5 rounded-xl py-4 h-auto"
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Schedule 1-on-1 Meeting</span>
          </div>
        </Button>
      </div>
    </div>
  );
}