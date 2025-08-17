import { useState } from 'react';
import { MobileContainer } from './components/MobileContainer';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StrengthProfileScreen } from './components/StrengthProfileScreen';
import { ManagerDashboardScreen } from './components/ManagerDashboardScreen';
import { LearningPathScreen } from './components/LearningPathScreen';
import { CourseAssessmentScreen } from './components/CourseAssessmentScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SkillDetailScreen } from './components/SkillDetailScreen';
import { LearningHistoryScreen } from './components/LearningHistoryScreen';
import { EmployeeDetailScreen } from './components/EmployeeDetailScreen';
import { TeamCelebrationScreen } from './components/TeamCelebrationScreen';
import { AIChatbotScreen } from './components/AIChatbotScreen';
import { CourseRecommendationScreen } from './components/CourseRecommendationScreen';
import { TeamNoticeScreen } from './components/TeamNoticeScreen';
import { ScheduleAppointmentScreen } from './components/ScheduleAppointmentScreen';
import { AllModulesScreen } from './components/AllModulesScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { TeamNotificationsTrackingScreen } from './components/TeamNotificationsTrackingScreen';
import { TeamMemberNotesScreen } from './components/TeamMemberNotesScreen';
import { TeamMembersScreen } from './components/TeamMembersScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { Button } from './components/ui/button';
import { Home, Target, Users, BookOpen, Settings } from 'lucide-react';

type Screen = 
  | 'home' 
  | 'strength' 
  | 'manager' 
  | 'learning' 
  | 'settings'
  | 'assessment' 
  | 'skill-detail' 
  | 'learning-history'
  | 'employee-detail'
  | 'wellness-checkin'
  | 'team-celebration'
  | 'ai-chatbot'
  | 'course-recommendation'
  | 'team-notice'
  | 'schedule-appointment'
  | 'all-modules'
  | 'achievements'
  | 'team-notifications-tracking'
  | 'team-member-notes'
  | 'team-members'
  | 'notifications';

interface AppState {
  currentScreen: Screen;
  selectedCourse: string | null;
  selectedSkill: string | null;
  selectedEmployee: any | null;
  previousScreen: Screen | null;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'home',
    selectedCourse: null,
    selectedSkill: null,
    selectedEmployee: null,
    previousScreen: null
  });

  const navigateToScreen = (screen: Screen, data?: any) => {
    setAppState(prev => ({
      ...prev,
      currentScreen: screen,
      previousScreen: prev.currentScreen,
      selectedCourse: data?.courseTitle || prev.selectedCourse,
      selectedSkill: data?.skillName || prev.selectedSkill,
      selectedEmployee: data?.employee || prev.selectedEmployee,
    }));
  };

  const goBack = () => {
    if (appState.previousScreen) {
      setAppState(prev => ({
        ...prev,
        currentScreen: prev.previousScreen!,
        previousScreen: null,
      }));
    }
  };

  const handleCourseComplete = () => {
    console.log('Course completed:', appState.selectedCourse);
  };

  const renderScreen = () => {
    switch (appState.currentScreen) {
      case 'home':
        return <WelcomeScreen onNavigate={navigateToScreen} />;
      case 'strength':
        return <StrengthProfileScreen onNavigate={navigateToScreen} />;
      case 'manager':
        return <ManagerDashboardScreen onNavigate={navigateToScreen} />;
      case 'learning':
        return (
          <LearningPathScreen 
            onNavigate={navigateToScreen}
            onStartCourse={(courseTitle) => navigateToScreen('assessment', { courseTitle })}
          />
        );
      case 'settings':
        return <SettingsScreen onNavigate={navigateToScreen} />;
      case 'assessment':
        return (
          <CourseAssessmentScreen
            courseTitle={appState.selectedCourse || 'Learning Module'}
            onNavigate={navigateToScreen}
            onComplete={handleCourseComplete}
          />
        );
      case 'skill-detail':
        return (
          <SkillDetailScreen
            skillName={appState.selectedSkill || 'Communication'}
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'learning-history':
        return (
          <LearningHistoryScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'employee-detail':
        return (
          <EmployeeDetailScreen
            employee={appState.selectedEmployee}
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'team-celebration':
        return (
          <TeamCelebrationScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'ai-chatbot':
        return (
          <AIChatbotScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'course-recommendation':
        return (
          <CourseRecommendationScreen
            skillName={appState.selectedSkill || 'Communication'}
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'team-notice':
        return (
          <TeamNoticeScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'schedule-appointment':
        return (
          <ScheduleAppointmentScreen
            employee={appState.selectedEmployee}
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'all-modules':
        return (
          <AllModulesScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
            onStartCourse={(courseTitle) => navigateToScreen('assessment', { courseTitle })}
          />
        );
      case 'achievements':
        return (
          <AchievementsScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'team-notifications-tracking':
        return (
          <TeamNotificationsTrackingScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'team-member-notes':
        return (
          <TeamMemberNotesScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'team-members':
        return (
          <TeamMembersScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      case 'notifications':
        return (
          <NotificationsScreen
            onNavigate={navigateToScreen}
            onBack={goBack}
          />
        );
      default:
        return <WelcomeScreen onNavigate={navigateToScreen} />;
    }
  };

  const isBottomNavVisible = !['assessment', 'skill-detail', 'learning-history', 'employee-detail', 'wellness-checkin', 'team-celebration', 'ai-chatbot', 'course-recommendation', 'team-notice', 'schedule-appointment', 'all-modules', 'achievements', 'team-notifications-tracking', 'team-member-notes', 'team-members', 'notifications'].includes(appState.currentScreen);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <MobileContainer>
        <div className="relative h-full">
          {renderScreen()}
          
          {/* Bottom Navigation */}
          {isBottomNavVisible && (
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-white border-t border-gray-200 px-6 py-3">
              <div className="flex items-center justify-around">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToScreen('home')}
                  className={`flex flex-col items-center gap-1 p-2 h-auto ${
                    appState.currentScreen === 'home' ? 'text-[#aa0000]' : 'text-gray-600'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-xs">Home</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToScreen('strength')}
                  className={`flex flex-col items-center gap-1 p-2 h-auto ${
                    appState.currentScreen === 'strength' ? 'text-[#aa0000]' : 'text-gray-600'
                  }`}
                >
                  <Target className="w-5 h-5" />
                  <span className="text-xs">Skills</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToScreen('manager')}
                  className={`flex flex-col items-center gap-1 p-2 h-auto ${
                    appState.currentScreen === 'manager' ? 'text-[#aa0000]' : 'text-gray-600'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Team</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToScreen('learning')}
                  className={`flex flex-col items-center gap-1 p-2 h-auto ${
                    appState.currentScreen === 'learning' ? 'text-[#aa0000]' : 'text-gray-600'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs">Learn</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToScreen('settings')}
                  className={`flex flex-col items-center gap-1 p-2 h-auto ${
                    appState.currentScreen === 'settings' ? 'text-[#aa0000]' : 'text-gray-600'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </MobileContainer>
    </div>
  );
}