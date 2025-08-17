import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ArrowLeft, BookOpen, Star, Clock, Target, TrendingUp, Award, PlayCircle, Users } from 'lucide-react';

interface CourseRecommendationScreenProps {
  skillName: string;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

const recommendedCourses = [
  {
    id: 1,
    title: 'Advanced Communication Strategies',
    description: 'Master cross-cultural communication and difficult conversations',
    duration: '6 weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    enrolled: 234,
    tags: ['Communication', 'Leadership'],
    skills: ['Active Listening', 'Conflict Resolution', 'Presentation Skills'],
    completionRate: 92,
    outcomes: 'Improve team communication by 40% on average'
  },
  {
    id: 2,
    title: 'Executive Presence & Influence',
    description: 'Develop commanding presence and persuasive communication',
    duration: '4 weeks',
    difficulty: 'Advanced',
    rating: 4.9,
    enrolled: 156,
    tags: ['Leadership', 'Influence'],
    skills: ['Executive Communication', 'Public Speaking', 'Persuasion'],
    completionRate: 89,
    outcomes: 'Enhanced leadership effectiveness and team trust'
  },
  {
    id: 3,
    title: 'Emotional Intelligence in Communication',
    description: 'Use emotional intelligence to enhance interpersonal skills',
    duration: '5 weeks',
    difficulty: 'Intermediate',
    rating: 4.7,
    enrolled: 189,
    tags: ['Soft Skills', 'Communication'],
    skills: ['Empathy', 'Emotional Awareness', 'Relationship Building'],
    completionRate: 94,
    outcomes: 'Stronger workplace relationships and team cohesion'
  }
];

export function CourseRecommendationScreen({ skillName, onNavigate, onBack }: CourseRecommendationScreenProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-[#28a745] border-[#28a745]/30';
      case 'Intermediate': return 'text-[#f6b60b] border-[#f6b60b]/30';
      case 'Advanced': return 'text-[#aa0000] border-[#aa0000]/30';
      default: return 'text-gray-600 border-gray-300';
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
          <div>
            <h1 className="text-xl font-medium">Recommended Courses</h1>
            <p className="text-white/80 text-sm">Personalized for {skillName} development</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* AI Recommendation Summary */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#f6b60b]/10 to-[#f6b60b]/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#f6b60b] rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-2">AI-Powered Recommendations</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Based on your current {skillName} level and learning goals, these courses are specifically 
                  curated to accelerate your growth. Each recommendation considers your learning style, 
                  available time, and career objectives.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20">
                    95% Match
                  </Badge>
                  <span className="text-xs text-gray-600">• Updated based on your recent activity</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Recommendations */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Top Recommendations</h2>
          
          {recommendedCourses.map((course, index) => (
            <Card key={course.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Course Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{course.title}</h3>
                        {index === 0 && (
                          <Badge className="bg-[#f6b60b]/20 text-[#f6b60b] border-[#f6b60b]/30">
                            Best Match
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{course.enrolled} enrolled</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-[#f6b60b]" />
                        <span>{course.rating} rating</span>
                      </div>
                      <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>

                  {/* Skills Developed */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Skills you'll develop:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex}
                          variant="outline" 
                          className="text-xs border-[#aa0000]/20 text-[#aa0000]"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Success Metrics */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span className="font-medium">{course.completionRate}%</span>
                    </div>
                    <Progress value={course.completionRate} className="h-2" />
                    <p className="text-xs text-gray-600 italic">"{course.outcomes}"</p>
                  </div>

                  {/* Course Preview */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Course Preview Available</p>
                        <p className="text-xs text-gray-600">Get a taste of the learning experience</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5"
                      >
                        Preview
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-[#aa0000] hover:bg-[#880000] text-white"
                      onClick={() => onNavigate('assessment', { courseTitle: course.title })}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5"
                    >
                      Save for Later
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Path */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#28a745]" />
              Suggested Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {recommendedCourses.slice(0, 3).map((course, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#28a745] text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{course.title}</p>
                    <p className="text-xs text-gray-600">{course.duration} • {course.difficulty}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {index === 0 ? 'Start Here' : index === 1 ? 'Next' : 'Advanced'}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="p-3 bg-[#28a745]/5 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Estimated Timeline:</span> Complete this learning path in 15-20 weeks 
                with 2-3 hours per week of dedicated study time.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Expert Insight */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#aa0000]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#aa0000]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-[#aa0000]" />
              </div>
              <div>
                <p className="font-medium text-sm mb-2">Expert Insight</p>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "These courses align perfectly with current industry demands for {skillName} skills. 
                  Learners who complete this path typically see significant improvement in team collaboration 
                  and leadership effectiveness within 3-6 months."
                </p>
                <p className="text-xs text-gray-600 mt-2">- BPI Learning & Development Team</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Button */}
      <div className="px-6 pb-8">
        <Button 
          onClick={() => onNavigate('assessment', { courseTitle: recommendedCourses[0].title })}
          className="w-full bg-[#f6b60b] hover:bg-[#e6a50a] text-[#333333] rounded-xl py-4 h-auto"
        >
          <div className="flex items-center justify-center gap-2">
            <PlayCircle className="w-5 h-5" />
            <span>Start with Top Recommendation</span>
          </div>
        </Button>
      </div>
    </div>
  );
}