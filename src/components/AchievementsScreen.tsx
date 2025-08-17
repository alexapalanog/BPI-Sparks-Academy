import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Award, Star, Trophy, Medal, Target, Zap, MessageCircle, Users, BookOpen, Brain, Calendar, Filter } from 'lucide-react';

interface AchievementsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

// Mock achievements data
const achievements = [
  {
    id: 1,
    title: 'Communication Expert',
    description: 'Scored 91% in Communication Skills Assessment',
    date: '2024-12-20',
    category: 'Soft Skills',
    icon: MessageCircle,
    color: '#28a745',
    type: 'recent',
    points: 50
  },
  {
    id: 2,
    title: 'JavaScript Master',
    description: 'Achieved mastery level in JavaScript/TypeScript',
    date: '2024-12-18',
    category: 'Technical Skills',
    icon: Zap,
    color: '#aa0000',
    type: 'recent',
    points: 75
  },
  {
    id: 3,
    title: 'Project Leader',
    description: 'Completed Project Leadership assessment with excellence',
    date: '2024-12-15',
    category: 'Leadership',
    icon: Users,
    color: '#f6b60b',
    type: 'recent',
    points: 60
  },
  {
    id: 4,
    title: 'First Assessment',
    description: 'Completed your first skill assessment',
    date: '2024-11-28',
    category: 'Milestone',
    icon: Target,
    color: '#17a2b8',
    type: 'milestone',
    points: 25
  },
  {
    id: 5,
    title: 'Learning Streak',
    description: '7 days consecutive learning activity',
    date: '2024-12-10',
    category: 'Engagement',
    icon: Calendar,
    color: '#6f42c1',
    type: 'milestone',
    points: 40
  },
  {
    id: 6,
    title: 'Team Player',
    description: 'Excellent collaboration in team assessments',
    date: '2024-12-05',
    category: 'Soft Skills',
    icon: Users,
    color: '#28a745',
    type: 'skill',
    points: 45
  },
  {
    id: 7,
    title: 'Quick Learner',
    description: 'Completed 5 assessments in one week',
    date: '2024-11-30',
    category: 'Achievement',
    icon: Brain,
    color: '#ffc107',
    type: 'milestone',
    points: 65
  },
  {
    id: 8,
    title: 'Database Designer',
    description: 'Mastered database design concepts',
    date: '2024-11-25',
    category: 'Technical Skills',
    icon: BookOpen,
    color: '#aa0000',
    type: 'skill',
    points: 55
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Achievements', count: achievements.length },
  { id: 'recent', name: 'Recent', count: achievements.filter(a => a.type === 'recent').length },
  { id: 'technical', name: 'Technical', count: achievements.filter(a => a.category === 'Technical Skills').length },
  { id: 'soft-skills', name: 'Soft Skills', count: achievements.filter(a => a.category === 'Soft Skills').length },
  { id: 'leadership', name: 'Leadership', count: achievements.filter(a => a.category === 'Leadership').length },
  { id: 'milestones', name: 'Milestones', count: achievements.filter(a => a.type === 'milestone').length }
];

export function AchievementsScreen({ onNavigate, onBack }: AchievementsScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getFilteredAchievements = () => {
    if (selectedCategory === 'all') return achievements;
    if (selectedCategory === 'recent') return achievements.filter(a => a.type === 'recent');
    if (selectedCategory === 'technical') return achievements.filter(a => a.category === 'Technical Skills');
    if (selectedCategory === 'soft-skills') return achievements.filter(a => a.category === 'Soft Skills');
    if (selectedCategory === 'leadership') return achievements.filter(a => a.category === 'Leadership');
    if (selectedCategory === 'milestones') return achievements.filter(a => a.type === 'milestone');
    return achievements;
  };

  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);

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
            <h1 className="text-xl font-medium">Your Achievements</h1>
            <p className="text-white/80 text-sm">Celebrate your learning milestones</p>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{achievements.length}</p>
            <p className="text-xs text-white/80">Total Earned</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{totalPoints}</p>
            <p className="text-xs text-white/80">Points Earned</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{achievements.filter(a => a.type === 'recent').length}</p>
            <p className="text-xs text-white/80">This Week</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-[#aa0000] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Recent Highlights */}
        {selectedCategory === 'all' && (
          <Card className="border-0 shadow-md bg-gradient-to-r from-[#f6b60b]/10 to-[#f6b60b]/5 border-l-4 border-l-[#f6b60b]">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Trophy className="w-6 h-6 text-[#f6b60b] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#f6b60b] mb-1">Recent Highlights</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Amazing progress this week! You've earned 185 points and unlocked 3 new achievements.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Communication Expert achievement earned</li>
                    <li>• JavaScript mastery level reached</li>
                    <li>• Project leadership skills demonstrated</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 gap-4">
          {getFilteredAchievements().map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={achievement.id} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                      style={{ backgroundColor: `${achievement.color}15` }}
                    >
                      <IconComponent className="w-8 h-8" style={{ color: achievement.color }} />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm mb-1">{achievement.title}</h3>
                      <p className="text-xs text-gray-600 mb-2 leading-relaxed">{achievement.description}</p>
                      
                      <div className="space-y-2">
                        <Badge 
                          style={{ 
                            backgroundColor: `${achievement.color}20`,
                            color: achievement.color,
                            borderColor: `${achievement.color}30`
                          }}
                          className="text-xs"
                        >
                          {achievement.category}
                        </Badge>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(achievement.date).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current text-[#f6b60b]" />
                            {achievement.points}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievement Insights */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#28a745]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#28a745] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-[#28a745] mb-1">Achievement Insights</p>
                <p className="text-sm text-gray-700 mb-2">
                  You're making excellent progress across all skill areas. Your consistent learning approach is paying off!
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Strong performance in technical assessments</li>
                  <li>• Leadership skills are developing well</li>
                  <li>• Keep up the consistent learning streak</li>
                </ul>
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