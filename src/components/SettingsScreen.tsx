import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  userData,
  settingsCategories,
  learningStats,
  learningStyleOptions,
} from "./settings/settingsData";
import { SettingsCategory } from "./settings/SettingsCategory";
import { LearningStyleCard } from "./settings/LearningStyleCard";
import { SupportSection } from "./settings/SupportSection";
import {
  User,
  Bell,
  Shield,
  BookOpen,
  HelpCircle,
  LogOut,
  Clock,
  Brain,
  Target,
  Users,
  Download,
  Trash2,
  Settings as SettingsIcon,
} from "lucide-react";

interface SettingsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function SettingsScreen({
  onNavigate,
}: SettingsScreenProps) {
  // Interactive toggle states for notifications and app experience
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    assessmentReminders: true,
    teamUpdates: true,
    focusMode: true,
    progressSharing: false,
    aiCoaching: true,
  });

  // Dropdown preference states that persist when selected
  const [preferences, setPreferences] = useState({
    'learning-style': 'Visual & Interactive',
    'assessment-format': 'Mixed Format',
    'session-length': '15-20 minutes',
    'daily-goal': '30 minutes',
    'difficulty-preference': 'Gradual increase',
    'feedback-style': 'Detailed explanations',
    'estimated-usage': '45 minutes',
    'peak-hours': '9:00 AM - 11:00 AM'
  });

  const handleToggle = (settingId: string) => {
    console.log("Toggle clicked:", settingId); // Debug log
    setNotifications((prev) => {
      const newState = { ...prev };
      switch (settingId) {
        case "push":
          newState.push = !prev.push;
          break;
        case "email-notif":
          newState.email = !prev.email;
          break;
        case "assessment-reminders":
          newState.assessmentReminders = !prev.assessmentReminders;
          break;
        case "team-updates":
          newState.teamUpdates = !prev.teamUpdates;
          break;
        case "focus-mode":
          newState.focusMode = !prev.focusMode;
          break;
        case "progress-sharing":
          newState.progressSharing = !prev.progressSharing;
          break;
        case "ai-coaching":
          newState.aiCoaching = !prev.aiCoaching;
          break;
      }
      console.log("New state:", newState); // Debug log
      return newState;
    });
  };

  const handlePreferenceChange = (settingId: string, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [settingId]: value,
    }));
  };

  const handleSettingClick = (itemId: string) => {
    console.log("Setting clicked:", itemId);
  };

  const getToggleValue = (itemId: string) => {
    switch (itemId) {
      case "push":
        return notifications.push;
      case "email-notif":
        return notifications.email;
      case "assessment-reminders":
        return notifications.assessmentReminders;
      case "team-updates":
        return notifications.teamUpdates;
      case "focus-mode":
        return notifications.focusMode;
      case "progress-sharing":
        return notifications.progressSharing;
      case "ai-coaching":
        return notifications.aiCoaching;
      default:
        return false;
    }
  };

  const getPreferenceValue = (itemId: string) => {
    return preferences[itemId as keyof typeof preferences] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-16 h-16 flex-shrink-0">
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {userData.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-medium truncate">
              {userData.name}
            </h1>
            <p className="text-white/80 text-sm truncate">
              {userData.email}
            </p>
            <p className="text-white/60 text-xs truncate">
              {userData.role} • {userData.department}
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-xs text-white/80 mb-1">
              Member Since
            </p>
            <p className="text-sm font-medium truncate">
              {new Date(userData.joinDate).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-xs text-white/80 mb-1">
              Last Login
            </p>
            <p className="text-sm font-medium truncate">
              {userData.lastLogin}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Learning Statistics */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">
              Your Learning Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {learningStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${stat.color}15`,
                      }}
                    >
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-medium">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-600 leading-tight break-words">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Settings Categories */}
        {settingsCategories.map((category) => (
          <SettingsCategory
            key={category.title}
            category={category}
            getToggleValue={getToggleValue}
            getPreferenceValue={getPreferenceValue}
            onToggle={handleToggle}
            onPreferenceChange={handlePreferenceChange}
            onSettingClick={handleSettingClick}
          />
        ))}

        {/* Learning Style Preferences */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#28a745]/10 to-[#28a745]/5 border-l-4 border-l-[#28a745]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-5 h-5 text-[#28a745]" />
              Your Learning Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {learningStyleOptions.map((style) => (
                <LearningStyleCard
                  key={style.id}
                  style={style}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support & Help */}
        <SupportSection />

        {/* Data Management */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              onClick={() => console.log("Export Data clicked")}
              className="w-full justify-start border-[#17a2b8]/20 text-[#17a2b8] hover:bg-[#17a2b8]/5 h-auto p-4"
            >
              <Download className="w-4 h-4 mr-3 flex-shrink-0" />
              <div className="text-left flex-1 min-w-0">
                <p className="font-medium text-sm">
                  Export Learning Data
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Download your progress and assessments
                </p>
              </div>
            </Button>

            <Button
              variant="outline"
              onClick={() => console.log("Clear Cache clicked")}
              className="w-full justify-start border-[#dc3545]/20 text-[#dc3545] hover:bg-[#dc3545]/5 h-auto p-4"
            >
              <Trash2 className="w-4 h-4 mr-3 flex-shrink-0" />
              <div className="text-left flex-1 min-w-0">
                <p className="font-medium text-sm">
                  Clear Cache Data
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Free up storage space
                </p>
              </div>
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <Button
              variant="outline"
              onClick={() => console.log("Sign Out clicked")}
              className="w-full justify-center border-[#dc3545]/20 text-[#dc3545] hover:bg-[#dc3545]/5 h-auto p-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="font-medium">Sign Out</span>
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 space-y-2 px-4">
          <p>BPI Spark Learning Platform</p>
          <p>
            Version 2.1.0 • Built with ❤️ for continuous
            learning
          </p>
          <p className="text-xs">
            © 2024 BPI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}