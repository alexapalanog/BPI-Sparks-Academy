import { User, Bell, Shield, BookOpen, Zap, Target, Clock, Users, Headphones, Video, FileText, PenTool } from 'lucide-react';

// Mock user data
export const userData = {
  name: 'Alex Johnson',
  email: 'alex.johnson@company.com',
  role: 'Senior Developer',
  department: 'Technology',
  initials: 'AJ',
  joinDate: '2022-03-15',
  lastLogin: '2024-12-20 09:30 AM'
};

// Settings categories and options
export const settingsCategories = [
  {
    title: 'Account',
    icon: User,
    color: '#aa0000',
    items: [
      { id: 'profile', label: 'Edit Profile', description: 'Update your personal information', hasArrow: true },
      { id: 'password', label: 'Change Password', description: 'Update your login credentials', hasArrow: true },
      { id: 'email', label: 'Email Preferences', description: 'Manage email notifications', hasArrow: true }
    ]
  },
  {
    title: 'Notifications',
    icon: Bell,
    color: '#f6b60b',
    items: [
      { id: 'push', label: 'Push Notifications', description: 'Receive instant updates', isToggle: true, enabled: true },
      { id: 'email-notif', label: 'Email Notifications', description: 'Get updates via email', isToggle: true, enabled: false },
      { id: 'assessment-reminders', label: 'Assessment Reminders', description: 'Reminder for pending assessments', isToggle: true, enabled: true },
      { id: 'team-updates', label: 'Team Updates', description: 'Updates from your team members', isToggle: true, enabled: true }
    ]
  },
  {
    title: 'Learning Preferences',
    icon: BookOpen,
    color: '#28a745',
    items: [
      { id: 'learning-style', label: 'Preferred Learning Style', description: 'How you learn best', hasArrow: true, value: 'Visual & Interactive' },
      { id: 'assessment-format', label: 'Assessment Format', description: 'Your preferred question types', hasArrow: true, value: 'Mixed Format' },
      { id: 'session-length', label: 'Session Length', description: 'Ideal learning session duration', hasArrow: true, value: '15-20 minutes' },
      { id: 'daily-goal', label: 'Daily Learning Goal', description: 'Time you want to spend learning', hasArrow: true, value: '30 minutes' },
      { id: 'difficulty-preference', label: 'Challenge Level', description: 'Preferred difficulty progression', hasArrow: true, value: 'Gradual increase' },
      { id: 'feedback-style', label: 'Feedback Style', description: 'How you like to receive feedback', hasArrow: true, value: 'Detailed explanations' }
    ]
  },
  {
    title: 'App Experience',
    icon: Zap,
    color: '#17a2b8',
    items: [
      { id: 'estimated-usage', label: 'Daily App Usage', description: 'How long do you plan to use the app daily?', hasArrow: true, value: '45 minutes' },
      { id: 'peak-hours', label: 'Peak Learning Hours', description: 'When are you most active?', hasArrow: true, value: '9:00 AM - 11:00 AM' },
      { id: 'focus-mode', label: 'Focus Mode', description: 'Minimize distractions during assessments', isToggle: true, enabled: true },
      { id: 'progress-sharing', label: 'Share Progress', description: 'Allow team to see your learning progress', isToggle: true, enabled: false },
      { id: 'ai-coaching', label: 'AI Coaching Tips', description: 'Get personalized learning suggestions', isToggle: true, enabled: true }
    ]
  },
  {
    title: 'Privacy & Security',
    icon: Shield,
    color: '#6f42c1',
    items: [
      { id: 'privacy', label: 'Privacy Settings', description: 'Control your data sharing', hasArrow: true },
      { id: 'two-factor', label: 'Two-Factor Authentication', description: 'Secure your account', hasArrow: true },
      { id: 'data-export', label: 'Export Data', description: 'Download your learning data', hasArrow: true }
    ]
  }
];

// Learning statistics - Fixed text to fit in one line
export const learningStats = [
  { label: 'Assessments', value: 15, icon: Target, color: '#28a745' },
  { label: 'Skills Unlocked', value: 8, icon: BookOpen, color: '#f6b60b' },
  { label: 'Learning Hours', value: 24, icon: Clock, color: '#17a2b8' },
  { label: 'Achievements', value: 12, icon: Users, color: '#aa0000' }
];

// Learning style options
export const learningStyleOptions = [
  { id: 'visual', label: 'Visual & Interactive', icon: Video, description: 'Charts, diagrams, and interactive content' },
  { id: 'auditory', label: 'Audio-Based', icon: Headphones, description: 'Explanations and verbal instructions' },
  { id: 'reading', label: 'Reading & Writing', icon: FileText, description: 'Text-based content and written exercises' },
  { id: 'kinesthetic', label: 'Hands-on Practice', icon: PenTool, description: 'Practical exercises and simulations' }
];