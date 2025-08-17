import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Brain, BookOpen, Target, Star, Clock, Users, CheckCircle, Play, ChevronRight, Filter, Search, Zap, MessageCircle, BarChart3, Lightbulb, Award, Shuffle, ExternalLink, HelpCircle } from 'lucide-react';

interface LearningPathScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onStartCourse: (courseTitle: string) => void;
}

// Available assessments data
const availableAssessments = [
  {
    id: 1,
    title: 'Advanced Communication Skills',
    description: 'Master interpersonal communication and presentation skills',
    category: 'Soft Skills',
    difficulty: 'Intermediate',
    estimatedTime: '15-20 min',
    questions: 12,
    skills: ['Active Listening', 'Public Speaking', 'Written Communication'],
    isRecommended: true,
    isNew: false,
    confidenceLevel: 0,
    icon: MessageCircle,
    color: '#28a745'
  },
  {
    id: 2,
    title: 'JavaScript Advanced Concepts',
    description: 'Deep dive into closures, async/await, and modern ES6+ features',
    category: 'Technical Skills',
    difficulty: 'Advanced',
    estimatedTime: '20-25 min',
    questions: 15,
    skills: ['Closures', 'Promises', 'ES6+ Features'],
    isRecommended: true,
    isNew: true,
    confidenceLevel: 65,
    icon: Zap,
    color: '#aa0000'
  },
  {
    id: 3,
    title: 'Leadership Fundamentals',
    description: 'Essential leadership skills for new and aspiring managers',
    category: 'Leadership',
    difficulty: 'Beginner',
    estimatedTime: '10-15 min',
    questions: 8,
    skills: ['Team Management', 'Decision Making', 'Motivation'],
    isRecommended: false,
    isNew: false,
    confidenceLevel: 0,
    icon: Users,
    color: '#f6b60b'
  },
  {
    id: 4,
    title: 'Data Analysis & Visualization',
    description: 'Learn to analyze data and create compelling visualizations',
    category: 'Technical Skills',
    difficulty: 'Intermediate',
    estimatedTime: '18-22 min',
    questions: 10,
    skills: ['SQL', 'Data Visualization', 'Statistical Analysis'],
    isRecommended: true,
    isNew: true,
    confidenceLevel: 0,
    icon: BarChart3,
    color: '#17a2b8'
  },
  {
    id: 5,
    title: 'Creative Problem Solving',
    description: 'Innovative approaches to complex business challenges',
    category: 'Soft Skills',
    difficulty: 'Intermediate',
    estimatedTime: '12-18 min',
    questions: 9,
    skills: ['Design Thinking', 'Innovation', 'Critical Thinking'],
    isRecommended: false,
    isNew: false,
    confidenceLevel: 0,
    icon: Lightbulb,
    color: '#ffc107'
  },
  {
    id: 6,
    title: 'Project Management Essentials',
    description: 'Agile methodologies and project delivery best practices',
    category: 'Leadership',
    difficulty: 'Intermediate',
    estimatedTime: '16-20 min',
    questions: 11,
    skills: ['Agile', 'Scrum', 'Risk Management'],
    isRecommended: false,
    isNew: false,
    confidenceLevel: 0,
    icon: Target,
    color: '#6f42c1'
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Assessments', count: availableAssessments.length },
  { id: 'recommended', name: 'Recommended', count: availableAssessments.filter(c => c.isRecommended).length },
  { id: 'soft-skills', name: 'Soft Skills', count: availableAssessments.filter(c => c.category === 'Soft Skills').length },
  { id: 'technical', name: 'Technical', count: availableAssessments.filter(c => c.category === 'Technical Skills').length },
  { id: 'leadership', name: 'Leadership', count: availableAssessments.filter(c => c.category === 'Leadership').length },
  { id: 'in-progress', name: 'In Progress', count: availableAssessments.filter(c => c.confidenceLevel > 0).length },
];

// Recent learning activity
const recentActivity = [
  {
    id: 1,
    title: 'Communication Skills Assessment',
    type: 'Completed',
    date: '2024-12-20',
    confidenceLevel: 91,
    category: 'Soft Skills'
  },
  {
    id: 2,
    title: 'JavaScript Advanced Concepts',
    type: 'In Progress',
    date: '2024-12-19',
    confidenceLevel: 65,
    category: 'Technical Skills'
  },
  {
    id: 3,
    title: 'Leadership Basics',
    type: 'Completed',
    date: '2024-12-15',
    confidenceLevel: 87,
    category: 'Leadership'
  }
];

export function LearningPathScreen({ onNavigate, onStartCourse }: LearningPathScreenProps) {
  const [activeTab, setActiveTab] = useState('explore');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#28a745';
      case 'Intermediate': return '#f6b60b';
      case 'Advanced': return '#aa0000';
      default: return '#6c757d';
    }
  };

  const getConfidenceLevelColor = (level: number) => {
    if (level >= 80) return '#28a745';
    if (level >= 60) return '#f6b60b';
    if (level >= 40) return '#17a2b8';
    if (level > 0) return '#ffc107';
    return '#6c757d';
  };

  const getFilteredAssessments = () => {
    let filtered = availableAssessments;

    if (selectedCategory === 'recommended') {
      filtered = filtered.filter(assessment => assessment.isRecommended);
    } else if (selectedCategory === 'soft-skills') {
      filtered = filtered.filter(assessment => assessment.category === 'Soft Skills');
    } else if (selectedCategory === 'technical') {
      filtered = filtered.filter(assessment => assessment.category === 'Technical Skills');
    } else if (selectedCategory === 'leadership') {
      filtered = filtered.filter(assessment => assessment.category === 'Leadership');
    } else if (selectedCategory === 'in-progress') {
      filtered = filtered.filter(assessment => assessment.confidenceLevel > 0);
    }

    if (searchQuery) {
      filtered = filtered.filter(assessment =>
        assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getRandomAssessment = () => {
    const randomIndex = Math.floor(Math.random() * availableAssessments.length);
    const randomAssessment = availableAssessments[randomIndex];
    onStartCourse(randomAssessment.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-medium">Learning & Assessment</h1>
            <p className="text-white/80 text-sm">Develop your skills with AI-powered assessments</p>
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

        {/* Learning Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">15</p>
            <p className="text-xs text-white/80">Completed</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">3</p>
            <p className="text-xs text-white/80">In Progress</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">87%</p>
            <p className="text-xs text-white/80">Avg Confidence</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="recommended">For You</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-6">
            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search assessments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#aa0000]/20 focus:border-[#aa0000]"
                />
              </div>

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
            </div>

            {/* Assessment Grid */}
            <div className="space-y-4">
              {getFilteredAssessments().map((assessment) => {
                const IconComponent = assessment.icon;
                return (
                  <Card key={assessment.id} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${assessment.color}15` }}
                        >
                          <IconComponent className="w-6 h-6" style={{ color: assessment.color }} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-sm">{assessment.title}</h3>
                                {assessment.isNew && (
                                  <Badge className="bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20 text-xs">
                                    New
                                  </Badge>
                                )}
                                {assessment.isRecommended && (
                                  <Badge className="bg-[#f6b60b]/10 text-[#f6b60b] border-[#f6b60b]/20 text-xs">
                                    Recommended
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mb-2">{assessment.description}</p>
                            </div>
                          </div>

                          {assessment.confidenceLevel > 0 && (
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                <span>Confidence Level</span>
                                <span 
                                  className="font-medium"
                                  style={{ color: getConfidenceLevelColor(assessment.confidenceLevel) }}
                                >
                                  {assessment.confidenceLevel}%
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{assessment.estimatedTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <HelpCircle className="w-3 h-3" />
                              <span>{assessment.questions} questions</span>
                            </div>
                            <Badge 
                              style={{ 
                                backgroundColor: `${getDifficultyColor(assessment.difficulty)}20`,
                                color: getDifficultyColor(assessment.difficulty),
                                borderColor: `${getDifficultyColor(assessment.difficulty)}30`
                              }}
                              className="text-xs"
                            >
                              {assessment.difficulty}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-3">
                            {assessment.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => onStartCourse(assessment.title)}
                              className="flex-1 bg-[#28a745] hover:bg-[#1e7e34] text-white"
                              size="sm"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              {assessment.confidenceLevel > 0 ? 'Retake Assessment' : 'Start Assessment'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open('https://bpi-university.com', '_blank')}
                              className="border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Recommended Tab */}
          <TabsContent value="recommended" className="space-y-6">
            {/* Random Assessment Button */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-[#f6b60b]/10 to-[#f6b60b]/5 border-l-4 border-l-[#f6b60b]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#f6b60b]/20 rounded-xl flex items-center justify-center">
                    <Shuffle className="w-6 h-6 text-[#f6b60b]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#f6b60b] mb-1">Don't know where to start?</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Get a random assessment tailored to your learning journey
                    </p>
                    <Button
                      onClick={getRandomAssessment}
                      className="bg-[#f6b60b] hover:bg-[#e6a50a] text-[#333333]"
                      size="sm"
                    >
                      <Shuffle className="w-4 h-4 mr-2" />
                      Surprise Me!
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-r from-[#17a2b8]/10 to-[#17a2b8]/5 border-l-4 border-l-[#17a2b8]">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Brain className="w-6 h-6 text-[#17a2b8] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-[#17a2b8] mb-1">AI Recommendations</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Based on your skill profile and recent assessments, here are personalized learning paths.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Focus on Advanced JavaScript concepts to build on your strong foundation</li>
                      <li>• Communication skills assessment shows excellent confidence</li>
                      <li>• Data analysis skills could complement your technical expertise</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {availableAssessments.filter(assessment => assessment.isRecommended).map((assessment) => {
                const IconComponent = assessment.icon;
                return (
                  <Card key={assessment.id} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${assessment.color}15` }}
                        >
                          <IconComponent className="w-6 h-6" style={{ color: assessment.color }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-sm">{assessment.title}</h3>
                            <Badge className="bg-[#f6b60b]/10 text-[#f6b60b] border-[#f6b60b]/20 text-xs">
                              AI Recommended
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{assessment.description}</p>
                          
                          <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                            <span>{assessment.estimatedTime}</span>
                            <span>{assessment.questions} questions</span>
                            <span>{assessment.difficulty}</span>
                          </div>

                          <Button
                            onClick={() => onStartCourse(assessment.title)}
                            className="w-full bg-[#28a745] hover:bg-[#1e7e34] text-white"
                            size="sm"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Assessment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-base">Recent Learning Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-[#17a2b8]/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#17a2b8]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        <Badge 
                          className={
                            activity.type === 'Completed'
                              ? 'bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20'
                              : 'bg-[#f6b60b]/10 text-[#f6b60b] border-[#f6b60b]/20'
                          }
                        >
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{activity.category}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{activity.date}</span>
                        <span 
                          className="font-medium"
                          style={{ color: getConfidenceLevelColor(activity.confidenceLevel) }}
                        >
                          Confidence: {activity.confidenceLevel}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button
              variant="outline"
              onClick={() => onNavigate('learning-history')}
              className="w-full border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5"
            >
              View Learning History
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}