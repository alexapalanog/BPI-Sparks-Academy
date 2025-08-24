import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Brain, Star, TrendingUp, BookOpen, Target, Award, ChevronRight, MessageCircle, Zap, Users, Code, Database, Lightbulb, Puzzle, Clock, Heart, Cpu, PenTool, ChevronLeft } from 'lucide-react';

interface StrengthProfileScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

// Mock user profile data
const userProfile = {
  name: 'Alex Johnson',
  role: 'Senior Developer',
  department: 'Technology',
  initials: 'AJ',
  overallScore: 87,
  completedAssessments: 15,
  skillsUnlocked: 8
};

// Skill level mapping with labels - updated colors for Proficient (yellow) and Developing (orange)
const skillLevels = {
  outstanding: { label: 'Outstanding', min: 90, color: '#28a745' },
  excellent: { label: 'Excellent', min: 80, color: '#17a2b8' },
  proficient: { label: 'Proficient', min: 70, color: '#f6b60b' }, // Yellow for Proficient
  developing: { label: 'Developing', min: 55, color: '#FFA726' }, // Orange for Developing
  beginner: { label: 'Beginner', min: 0, color: '#6c757d' }
};

// Function to get skill level
const getSkillLevel = (score: number) => {
  if (score >= 90) return skillLevels.outstanding;
  if (score >= 80) return skillLevels.excellent;
  if (score >= 70) return skillLevels.proficient;
  if (score >= 55) return skillLevels.developing;
  return skillLevels.beginner;
};

// Hexa stats data for technical skills
const technicalHexaStats = [
  { skill: 'Programming', level: 92 },
  { skill: 'Database', level: 76 },
  { skill: 'Architecture', level: 70 },
  { skill: 'DevOps', level: 65 },
  { skill: 'Testing', level: 80 },
  { skill: 'API Design', level: 84 }
];

// Hexa stats data for soft skills
const softSkillsHexaStats = [
  { skill: 'Communication', level: 91 },
  { skill: 'Leadership', level: 85 },
  { skill: 'Teamwork', level: 86 },
  { skill: 'Problem Solving', level: 89 },
  { skill: 'Adaptability', level: 78 },
  { skill: 'Time Management', level: 82 }
];

// Extended skills data for scrollable view
const technicalSkillsData = {
  strengths: [
    { name: 'JavaScript/TypeScript', level: 92, icon: Code },
    { name: 'React Development', level: 88, icon: Code },
    { name: 'API Development', level: 84, icon: Database },
    { name: 'Node.js Backend', level: 86, icon: Code },
    { name: 'Git Version Control', level: 90, icon: Code },
    { name: 'Testing Frameworks', level: 82, icon: Target }
  ],
  potential: [
    { name: 'System Architecture', level: 70, icon: Lightbulb },
    { name: 'Database Design', level: 76, icon: Database },
    { name: 'DevOps Practices', level: 65, icon: Target },
    { name: 'Microservices', level: 72, icon: Lightbulb },
    { name: 'Performance Optimization', level: 74, icon: Zap },
    { name: 'Code Review', level: 78, icon: Code }
  ],
  development: [
    { name: 'Mobile Development', level: 45, icon: Code },
    { name: 'Cloud Architecture', level: 50, icon: Lightbulb },
    { name: 'Security Testing', level: 55, icon: Target },
    { name: 'Machine Learning', level: 40, icon: Brain },
    { name: 'Blockchain Development', level: 35, icon: Code },
    { name: 'DevOps Automation', level: 58, icon: Target }
  ]
};

const softSkillsData = {
  strengths: [
    { name: 'Communication', level: 91, icon: MessageCircle },
    { name: 'Problem Solving', level: 89, icon: Puzzle },
    { name: 'Team Collaboration', level: 86, icon: Users },
    { name: 'Active Listening', level: 88, icon: MessageCircle },
    { name: 'Empathy', level: 85, icon: Heart },
    { name: 'Presentation Skills', level: 87, icon: MessageCircle }
  ],
  potential: [
    { name: 'Project Leadership', level: 85, icon: Users },
    { name: 'Time Management', level: 82, icon: Clock },
    { name: 'Adaptability', level: 78, icon: TrendingUp },
    { name: 'Strategic Thinking', level: 75, icon: Lightbulb },
    { name: 'Mentoring', level: 80, icon: Users },
    { name: 'Decision Making', level: 77, icon: Target }
  ],
  development: [
    { name: 'Public Speaking', level: 60, icon: MessageCircle },
    { name: 'Conflict Resolution', level: 68, icon: Heart },
    { name: 'Delegation', level: 55, icon: Users },
    { name: 'Negotiation', level: 58, icon: MessageCircle },
    { name: 'Cross-cultural Communication', level: 62, icon: Users },
    { name: 'Change Management', level: 65, icon: TrendingUp }
  ]
};

// Recent achievements (square format)
const recentAchievements = [
  {
    id: 1,
    title: 'Communication Expert',
    description: 'Outstanding level achieved',
    date: '2024-12-20',
    icon: MessageCircle,
    color: '#28a745'
  },
  {
    id: 2,
    title: 'JavaScript Master',
    description: 'Outstanding mastery',
    date: '2024-12-18',
    icon: Zap,
    color: '#aa0000'
  },
  {
    id: 3,
    title: 'Project Leader',
    description: 'Excellent leadership',
    date: '2024-12-15',
    icon: Users,
    color: '#f6b60b'
  },
  {
    id: 4,
    title: 'Team Player',
    description: 'Excellent collaboration',
    date: '2024-12-10',
    icon: Heart,
    color: '#17a2b8'
  }
];

export function StrengthProfileScreen({ onNavigate }: StrengthProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('technical');
  const [skillsBreakdownTab, setSkillsBreakdownTab] = useState('strengths');
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  const createHexagonPath = (centerX: number, centerY: number, size: number) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = centerX + size * Math.cos(angle);
      const y = centerY + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  const renderHexaChart = (statsData: any[], skillType: 'technical' | 'soft') => {
    const maxLevel = 100;
    const centerX = 150;
    const centerY = 120;
    const maxRadius = 80;

    // Create path for filled area (shaded)
    const dataPath = statsData.map((stat, index) => {
      const angle = (Math.PI / 3) * index - Math.PI / 2;
      const radius = (stat.level / maxLevel) * maxRadius;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return `${x},${y}`;
    }).join(' L ');

    return (
      <div className="w-full h-64 relative flex justify-center">
        <svg width="300" height="240" viewBox="0 0 300 240" className="mx-auto">
          {/* Background grid - removed number labels */}
          {[20, 40, 60, 80].map((radius) => (
            <path
              key={radius}
              d={createHexagonPath(centerX, centerY, radius)}
              fill="none"
              stroke="#e9ecef"
              strokeWidth="1"
            />
          ))}

          {/* Shaded data area */}
          <path
            d={`M ${dataPath} Z`}
            fill={skillType === 'technical' ? "rgba(170, 0, 0, 0.3)" : "rgba(40, 167, 69, 0.3)"}
            stroke={skillType === 'technical' ? "#aa0000" : "#28a745"}
            strokeWidth="2"
          />

          {/* Data points and labels */}
          {statsData.map((stat, index) => {
            const angle = (Math.PI / 3) * index - Math.PI / 2;
            const radius = (stat.level / maxLevel) * maxRadius;
            const labelRadius = maxRadius + 25;
            
            const dataX = centerX + radius * Math.cos(angle);
            const dataY = centerY + radius * Math.sin(angle);
            const labelX = centerX + labelRadius * Math.cos(angle);
            const labelY = centerY + labelRadius * Math.sin(angle);

            const skillLevel = getSkillLevel(stat.level);

            return (
              <g key={index}>
                {/* Data point as filled circle */}
                <circle
                  cx={dataX}
                  cy={dataY}
                  r="6"
                  fill={skillLevel.color}
                  stroke="white"
                  strokeWidth="2"
                />
                
                {/* Skill name label */}
                <text
                  x={labelX}
                  y={labelY - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-gray-700"
                >
                  {stat.skill}
                </text>
                
                {/* Level Label only */}
                <text
                  x={labelX}
                  y={labelY + 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs"
                  fill={skillLevel.color}
                >
                  {skillLevel.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  const getCurrentSkills = () => {
    const skillsData = activeTab === 'technical' ? technicalSkillsData : softSkillsData;
    return skillsData[skillsBreakdownTab as keyof typeof skillsData] || [];
  };

  const renderScrollableSkillsList = () => {
    const skills = getCurrentSkills();
    const totalSkills = skills.length;
    const visibleSkills = skills.slice(currentSkillIndex, currentSkillIndex + 3);
    
    return (
      <div className="space-y-4">
        {/* Modern Navigation Controls */}
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm text-gray-600">
            {currentSkillIndex + 1}-{Math.min(currentSkillIndex + 3, totalSkills)} of {totalSkills}
          </span>
        </div>

        {/* Scrollable Skills List */}
        <div 
          className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{
            scrollBehavior: 'smooth'
          }}
        >
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            const skillLevel = getSkillLevel(skill.level);
            return (
              <Button
                key={index}
                variant="ghost"
                onClick={() => onNavigate('skill-detail', { skillName: skill.name, skillLevel: skill.level })} // <-- PASSES NAME AND LEVEL
                className="w-full p-3 h-auto justify-start hover:bg-gray-50 border border-gray-100 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center gap-3 w-full min-w-0">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${skillLevel.color}15` }}
                  >
                    <IconComponent className="w-4 h-4" style={{ color: skillLevel.color }} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-medium text-sm truncate flex-1 mr-2">{skill.name}</h5>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge 
                          className="text-xs"
                          style={{ 
                            backgroundColor: `${skillLevel.color}20`,
                            color: skillLevel.color,
                            borderColor: `${skillLevel.color}30`
                          }}
                        >
                          {skillLevel.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  // Reset current skill index when changing tabs
  useEffect(() => {
    setCurrentSkillIndex(0);
  }, [skillsBreakdownTab, activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-xl font-medium">Skills Profile</h1>
            <p className="text-white/80 text-sm">Discover and develop your unique strengths</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('ai-chatbot')}
            className="text-white hover:bg-white/20 p-2 h-auto"
          >
            <Brain className="w-6 h-6" />
          </Button>
        </div>
        {/* User Profile Info */}
       

        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{userProfile.overallScore}</p>
            <p className="text-xs text-white/80">Overall Score</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{userProfile.completedAssessments}</p>
            <p className="text-xs text-white/80">Assessments</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{userProfile.skillsUnlocked}</p>
            <p className="text-xs text-white/80">Skills Unlocked</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Skill Level Legend - Updated colors */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Skill Level Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {Object.entries(skillLevels).map(([key, level]) => (
                <div key={key} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: level.color }}
                  ></div>
                  <span className="text-sm font-medium">{level.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills Analysis with Fixed Hexa Chart */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Skills Analysis</CardTitle>
            <p className="text-sm text-gray-600">Your skill levels across different competencies</p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger 
                  value="technical" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#aa0000] data-[state=active]:text-white"
                >
                  <Cpu className="w-4 h-4" />
                  Technical Skills
                </TabsTrigger>
                <TabsTrigger 
                  value="soft" 
                  className="flex items-center gap-2 data-[state=active]:bg-[#28a745] data-[state=active]:text-white"
                >
                  <PenTool className="w-4 h-4" />
                  Soft Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="technical" className="space-y-6">
                {/* Hexa Chart */}
                <div className="bg-gradient-to-br from-[#aa0000]/5 to-[#aa0000]/10 rounded-lg p-4 border border-[#aa0000]/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu className="w-5 h-5 text-[#aa0000]" />
                    <h3 className="font-medium text-[#aa0000]">Technical Skills Overview</h3>
                  </div>
                  {renderHexaChart(technicalHexaStats, 'technical')}
                </div>

                {/* Skills Breakdown with Scrollable View */}
                <Tabs value={skillsBreakdownTab} onValueChange={setSkillsBreakdownTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger 
                      value="strengths"
                      className="data-[state=active]:bg-[#28a745] data-[state=active]:text-white"
                    >
                      Strengths
                    </TabsTrigger>
                    <TabsTrigger 
                      value="potential"
                      className="data-[state=active]:bg-[#f6b60b] data-[state=active]:text-white"
                    >
                      Potential
                    </TabsTrigger>
                    <TabsTrigger 
                      value="development"
                      className="data-[state=active]:bg-[#17a2b8] data-[state=active]:text-white"
                    >
                      Development
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="strengths">
                    {renderScrollableSkillsList()}
                  </TabsContent>
                  
                  <TabsContent value="potential">
                    {renderScrollableSkillsList()}
                  </TabsContent>
                  
                  <TabsContent value="development">
                    {renderScrollableSkillsList()}
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="soft" className="space-y-6">
                {/* Hexa Chart */}
                <div className="bg-gradient-to-br from-[#28a745]/5 to-[#28a745]/10 rounded-lg p-4 border border-[#28a745]/20">
                  <div className="flex items-center gap-2 mb-4">
                    <PenTool className="w-5 h-5 text-[#28a745]" />
                    <h3 className="font-medium text-[#28a745]">Soft Skills Overview</h3>
                  </div>
                  {renderHexaChart(softSkillsHexaStats, 'soft')}
                </div>

                {/* Skills Breakdown with Scrollable View */}
                <Tabs value={skillsBreakdownTab} onValueChange={setSkillsBreakdownTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger 
                      value="strengths"
                      className="data-[state=active]:bg-[#28a745] data-[state=active]:text-white"
                    >
                      Strengths
                    </TabsTrigger>
                    <TabsTrigger 
                      value="potential"
                      className="data-[state=active]:bg-[#f6b60b] data-[state=active]:text-white"
                    >
                      Potential
                    </TabsTrigger>
                    <TabsTrigger 
                      value="development"
                      className="data-[state=active]:bg-[#17a2b8] data-[state=active]:text-white"
                    >
                      Development
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="strengths">
                    {renderScrollableSkillsList()}
                  </TabsContent>
                  
                  <TabsContent value="potential">
                    {renderScrollableSkillsList()}
                  </TabsContent>
                  
                  <TabsContent value="development">
                    {renderScrollableSkillsList()}
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Achievements - Square Format */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-[#f6b60b]" />
                Recent Achievements
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('achievements')}
                className="text-[#aa0000] hover:bg-[#aa0000]/5"
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {recentAchievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={achievement.id} className="p-3 bg-gray-50 rounded-lg text-center">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                      style={{ backgroundColor: `${achievement.color}15` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: achievement.color }} />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 mb-1">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => onNavigate('learning')}
                className="h-auto p-4 flex-col items-center gap-2 bg-[#28a745] hover:bg-[#1e7e34] text-white"
              >
                <Target className="w-5 h-5" />
                <span className="text-sm">Take Assessment</span>
              </Button>
              <Button 
                onClick={() => onNavigate('ai-chatbot')}
                variant="outline" 
                className="h-auto p-4 flex-col items-center gap-2 border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5"
              >
                <Brain className="w-5 h-5" />
                <span className="text-sm">AI Coach</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Skill Development Insights */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#17a2b8]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-[#17a2b8] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-[#17a2b8] mb-1">Growth Insights</p>
                <p className="text-sm text-gray-700 mb-2">
                  You're showing excellent progress in technical and communication skills. Your leadership abilities are developing well too.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Outstanding in JavaScript/TypeScript and Communication</li>
                  <li>• Leadership skills are trending upward</li>
                  <li>• Consider focusing on System Architecture next</li>
                </ul>
              </div>
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
      </div>
    </div>
  );
}