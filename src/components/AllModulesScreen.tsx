import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowLeft, Search, Filter, Clock, Brain, Star, AlertTriangle, CheckCircle, Code, Database, Monitor, Shield, MessageCircle, Heart, Lightbulb, Target, Users, Calendar, TrendingUp, Zap } from 'lucide-react';

interface AllModulesScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
  onStartCourse: (courseTitle: string) => void;
}

const allModules = [
  {
    id: 1,
    name: 'Database Design Mastery',
    skillArea: 'Technical Skills',
    type: 'assessment',
    priority: 'high',
    estimatedTime: '15-20 min',
    description: 'Master database normalization, query optimization, and schema design patterns',
    icon: Database,
    color: '#dc3545',
    status: 'recommended',
    difficulty: 'Intermediate',
    tags: ['SQL', 'Database', 'Architecture']
  },
  {
    id: 2,
    name: 'System Architecture Fundamentals',
    skillArea: 'Technical Skills',
    type: 'assessment',
    priority: 'medium',
    estimatedTime: '12-15 min',
    description: 'Explore microservices, scalability patterns, and distributed systems',
    icon: Monitor,
    color: '#f6b60b',
    status: 'in-progress',
    difficulty: 'Advanced',
    tags: ['Architecture', 'Microservices', 'Scalability']
  },
  {
    id: 3,
    name: 'Advanced Communication',
    skillArea: 'Soft Skills',
    type: 'assessment',
    priority: 'low',
    estimatedTime: '10-12 min',
    description: 'Enhance cross-cultural communication and executive presence',
    icon: MessageCircle,
    color: '#28a745',
    status: 'available',
    difficulty: 'Intermediate',
    tags: ['Communication', 'Leadership', 'Executive Presence']
  },
  {
    id: 4,
    name: 'Security Best Practices',
    skillArea: 'Technical Skills',
    type: 'assessment',
    priority: 'high',
    estimatedTime: '18-22 min',
    description: 'Learn secure coding, authentication, and vulnerability management',
    icon: Shield,
    color: '#dc3545',
    status: 'at-risk',
    difficulty: 'Advanced',
    tags: ['Security', 'Authentication', 'Vulnerability']
  },
  {
    id: 5,
    name: 'Leadership Development',
    skillArea: 'Soft Skills',
    type: 'assessment',
    priority: 'low',
    estimatedTime: '8-10 min',
    description: 'Advanced leadership strategies and team inspiration techniques',
    icon: Star,
    color: '#28a745',
    status: 'doing-well',
    difficulty: 'Advanced',
    tags: ['Leadership', 'Team Management', 'Strategy']
  },
  {
    id: 6,
    name: 'Prompt Engineering Fundamentals',
    skillArea: 'Technical Skills',
    type: 'assessment',
    priority: 'medium',
    estimatedTime: '12-15 min',
    description: 'Master AI prompt engineering for enhanced productivity',
    icon: Brain,
    color: '#6f42c1',
    status: 'recommended',
    difficulty: 'Beginner',
    tags: ['AI', 'Prompt Engineering', 'Productivity']
  },
  {
    id: 7,
    name: 'Emotional Intelligence',
    skillArea: 'Soft Skills',
    type: 'assessment',
    priority: 'medium',
    estimatedTime: '14-16 min',
    description: 'Develop emotional awareness and interpersonal skills',
    icon: Heart,
    color: '#e91e63',
    status: 'available',
    difficulty: 'Intermediate',
    tags: ['Emotional Intelligence', 'Interpersonal', 'Self-Awareness']
  },
  {
    id: 8,
    name: 'Problem Solving Techniques',
    skillArea: 'Soft Skills',
    type: 'assessment',
    priority: 'medium',
    estimatedTime: '10-14 min',
    description: 'Advanced problem-solving frameworks and critical thinking',
    icon: Lightbulb,
    color: '#ff9800',
    status: 'available',
    difficulty: 'Intermediate',
    tags: ['Problem Solving', 'Critical Thinking', 'Analysis']
  },
  {
    id: 9,
    name: 'Team Collaboration',
    skillArea: 'Soft Skills',
    type: 'assessment',
    priority: 'low',
    estimatedTime: '8-12 min',
    description: 'Build effective teamwork and collaboration skills',
    icon: Users,
    color: '#009688',
    status: 'available',
    difficulty: 'Beginner',
    tags: ['Teamwork', 'Collaboration', 'Communication']
  },
  {
    id: 10,
    name: 'Performance Optimization',
    skillArea: 'Technical Skills',
    type: 'assessment',
    priority: 'medium',
    estimatedTime: '16-20 min',
    description: 'Optimize code performance and application efficiency',
    icon: Zap,
    color: '#ff5722',
    status: 'available',
    difficulty: 'Advanced',
    tags: ['Performance', 'Optimization', 'Efficiency']
  }
];

export function AllModulesScreen({ onNavigate, onBack, onStartCourse }: AllModulesScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkillArea, setFilterSkillArea] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#f6b60b';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'at-risk': return '#dc3545';
      case 'recommended': return '#f6b60b';
      case 'doing-well': return '#28a745';
      case 'in-progress': return '#17a2b8';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'at-risk': return AlertTriangle;
      case 'recommended': return Star;
      case 'doing-well': return CheckCircle;
      case 'in-progress': return Clock;
      default: return Target;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#28a745';
      case 'Intermediate': return '#f6b60b';
      case 'Advanced': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const filteredModules = allModules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkillArea = filterSkillArea === 'all' || module.skillArea === filterSkillArea;
    const matchesStatus = filterStatus === 'all' || module.status === filterStatus;
    const matchesDifficulty = filterDifficulty === 'all' || module.difficulty === filterDifficulty;
    
    return matchesSearch && matchesSkillArea && matchesStatus && matchesDifficulty;
  });

  const groupedModules = {
    'at-risk': filteredModules.filter(m => m.status === 'at-risk'),
    'recommended': filteredModules.filter(m => m.status === 'recommended'),
    'in-progress': filteredModules.filter(m => m.status === 'in-progress'),
    'available': filteredModules.filter(m => m.status === 'available' || m.status === 'doing-well')
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
            <h1 className="text-xl font-medium">All Learning Modules</h1>
            <p className="text-white/80 text-sm">Discover all available assessments</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{allModules.length}</p>
            <p className="text-xs text-white/80">Total Modules</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{allModules.filter(m => m.status === 'recommended').length}</p>
            <p className="text-xs text-white/80">Recommended</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm text-center">
            <p className="text-lg font-medium">{allModules.filter(m => m.status === 'at-risk').length}</p>
            <p className="text-xs text-white/80">Priority</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Search and Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search modules, skills, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-3">
              <select 
                value={filterSkillArea}
                onChange={(e) => setFilterSkillArea(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Skill Areas</option>
                <option value="Technical Skills">Technical Skills</option>
                <option value="Soft Skills">Soft Skills</option>
              </select>

              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="at-risk">At Risk</option>
                <option value="recommended">Recommended</option>
                <option value="in-progress">In Progress</option>
                <option value="available">Available</option>
              </select>
            </div>

            <select 
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </CardContent>
        </Card>

        {/* Priority Modules */}
        {groupedModules['at-risk'].length > 0 && (
          <Card className="border-0 shadow-md border-l-4 border-l-[#dc3545]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#dc3545]" />
                Priority Modules (At Risk)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {groupedModules['at-risk'].map((module) => {
                const IconComponent = module.icon;
                const StatusIcon = getStatusIcon(module.status);
                
                return (
                  <Card key={module.id} className="border border-[#dc3545]/20 bg-[#dc3545]/5">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${module.color}15` }}
                        >
                          <IconComponent className="w-5 h-5" style={{ color: module.color }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-sm">{module.name}</h4>
                              <p className="text-xs text-gray-600 mt-1">{module.description}</p>
                            </div>
                            <StatusIcon className="w-4 h-4 text-[#dc3545]" />
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            {module.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span>{module.skillArea}</span>
                              <span>{module.estimatedTime}</span>
                              <Badge 
                                style={{ 
                                  backgroundColor: `${getDifficultyColor(module.difficulty)}15`,
                                  color: getDifficultyColor(module.difficulty),
                                  borderColor: `${getDifficultyColor(module.difficulty)}30`
                                }}
                                className="text-xs"
                              >
                                {module.difficulty}
                              </Badge>
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => onStartCourse(module.name)}
                              className="bg-[#dc3545] hover:bg-[#c82333] text-white"
                            >
                              Start Assessment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Recommended Modules */}
        {groupedModules['recommended'].length > 0 && (
          <Card className="border-0 shadow-md border-l-4 border-l-[#f6b60b]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="w-5 h-5 text-[#f6b60b]" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {groupedModules['recommended'].map((module) => {
                const IconComponent = module.icon;
                
                return (
                  <Card key={module.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${module.color}15` }}
                        >
                          <IconComponent className="w-5 h-5" style={{ color: module.color }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-sm">{module.name}</h4>
                              <p className="text-xs text-gray-600 mt-1">{module.description}</p>
                            </div>
                            <Badge 
                              style={{ 
                                backgroundColor: `${getStatusColor(module.status)}15`,
                                color: getStatusColor(module.status),
                                borderColor: `${getStatusColor(module.status)}30`
                              }}
                              className="text-xs"
                            >
                              Recommended
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3">
                            {module.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-600">
                              <span>{module.skillArea}</span>
                              <span>{module.estimatedTime}</span>
                              <Badge 
                                style={{ 
                                  backgroundColor: `${getDifficultyColor(module.difficulty)}15`,
                                  color: getDifficultyColor(module.difficulty),
                                  borderColor: `${getDifficultyColor(module.difficulty)}30`
                                }}
                                className="text-xs"
                              >
                                {module.difficulty}
                              </Badge>
                            </div>
                            <Button 
                              size="sm"
                              onClick={() => onStartCourse(module.name)}
                              className="bg-[#f6b60b] hover:bg-[#e6a50a] text-[#333333]"
                            >
                              Start Assessment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* All Other Modules */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">All Modules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[...groupedModules['in-progress'], ...groupedModules['available']].map((module) => {
              const IconComponent = module.icon;
              const StatusIcon = getStatusIcon(module.status);
              
              return (
                <Card key={module.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${module.color}15` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: module.color }} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{module.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{module.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              style={{ 
                                backgroundColor: `${getStatusColor(module.status)}15`,
                                color: getStatusColor(module.status),
                                borderColor: `${getStatusColor(module.status)}30`
                              }}
                              className="text-xs"
                            >
                              {module.status.replace('-', ' ')}
                            </Badge>
                            <StatusIcon 
                              className="w-4 h-4" 
                              style={{ color: getStatusColor(module.status) }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          {module.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span>{module.skillArea}</span>
                            <span>{module.estimatedTime}</span>
                            <Badge 
                              style={{ 
                                backgroundColor: `${getDifficultyColor(module.difficulty)}15`,
                                color: getDifficultyColor(module.difficulty),
                                borderColor: `${getDifficultyColor(module.difficulty)}30`
                              }}
                              className="text-xs"
                            >
                              {module.difficulty}
                            </Badge>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => onStartCourse(module.name)}
                            variant="outline"
                            className="border-[#aa0000]/20 text-[#aa0000]"
                          >
                            Start Assessment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>

        {filteredModules.length === 0 && (
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium mb-2">No modules found</h3>
              <p className="text-sm text-gray-600">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}