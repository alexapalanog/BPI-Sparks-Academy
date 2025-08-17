import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Zap, BarChart3, Brain, Heart, Bell, History, Quote, Target, Sun, Moon, Check, ArrowUpRight } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

// Mock user data
const userData = {
  name: 'Alex Johnson',
  initials: 'AJ'
};

// New vibe check data with updated moods, emojis, and colors
const vibeCheckData = [
  { mood: 'Energized', emoji: '😄', color: '#4CAF50', description: 'Full of energy and ready to tackle anything!' },
  { mood: 'Good', emoji: '🙂', color: '#42A5F5', description: 'Feeling positive and productive today' },
  { mood: 'Okay', emoji: '😐', color: '#90A4AE', description: 'Neutral mood, just getting through the day' },
  { mood: 'Tired', emoji: '😟', color: '#FFA726', description: 'Feeling a bit worn out, need some rest' },
  { mood: 'Drained', emoji: '😫', color: '#EF5350', description: 'Really exhausted, need to recharge' }
];

// Function to get dynamic weekly data based on current date
const getDynamicWeeklyData = () => {
  const today = new Date();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyData = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayName = days[date.getDay()];
    
    weeklyData.push({
      date: dayName,
      fullDate: date.toISOString().split('T')[0],
      isToday: i === 0
    });
  }
  
  return weeklyData;
};

// Generate dynamic engagement data
const getDynamicEngagementData = () => {
  const weekData = getDynamicWeeklyData();
  const engagementLevels = [85, 92, 68, 78, 88, 75, 82];
  
  return weekData.map((day, index) => ({
    ...day,
    level: engagementLevels[index % engagementLevels.length]
  }));
};

// Notifications
const notifications = [
  { id: 1, title: 'New assessment available', time: '2 hours ago', unread: true },
  { id: 2, title: 'Team meeting reminder', time: '4 hours ago', unread: true },
  { id: 3, title: 'Weekly report ready', time: '1 day ago', unread: false }
];

// Inspirational quotes
const inspirationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it."
];

export function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedVibeDay, setSelectedVibeDay] = useState<number | null>(null);
  const [selectedEngagementDay, setSelectedEngagementDay] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentQuote] = useState(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);
  const [moodSubmitted, setMoodSubmitted] = useState(false);
  const [weeklyVibeData, setWeeklyVibeData] = useState(() => {
    const dynamicData = getDynamicWeeklyData();
    const vibes = ['Good', 'Energized', 'Tired', 'Good', 'Energized', 'Okay'];
    const emojis = ['🙂', '😄', '😟', '🙂', '😄', '😐'];
    const colors = ['#42A5F5', '#4CAF50', '#FFA726', '#42A5F5', '#4CAF50', '#90A4AE'];
    
    return dynamicData.map((day, index) => ({
      ...day,
      // For today (index === dynamicData.length - 1), start with no energy data
      mood: day.isToday ? null : (index < vibes.length ? vibes[index] : 'Good'),
      emoji: day.isToday ? null : (index < emojis.length ? emojis[index] : '🙂'),
      color: day.isToday ? '#e9ecef' : (index < colors.length ? colors[index] : '#42A5F5')
    }));
  });

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const weeklyEngagementData = getDynamicEngagementData();

  const unreadCount = notifications.filter(n => n.unread).length;

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 18) return Sun;
    return Moon;
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleMoodSubmit = () => {
    if (selectedMood) {
      // Update today's mood in the weekly tracking
      const selectedVibeData = vibeCheckData.find(vibe => vibe.mood === selectedMood);
      if (selectedVibeData) {
        setWeeklyVibeData(prev => prev.map((day, index) => {
          if (day.isToday) {
            return {
              ...day,
              mood: selectedVibeData.mood,
              emoji: selectedVibeData.emoji,
              color: selectedVibeData.color
            };
          }
          return day;
        }));
      }
      
      setMoodSubmitted(true);
      console.log(`Submitted mood: ${selectedMood} for ${currentTime.toDateString()}`);
      
      setTimeout(() => {
        setMoodSubmitted(false);
        setSelectedMood(null);
      }, 2000);
    }
  };

  const getEngagementColor = (level: number) => {
    if (level >= 85) return '#28a745'; // High engagement - green
    if (level >= 70) return '#42A5F5'; // Medium engagement - blue
    return '#FFA726'; // Low engagement - orange
  };

  const TimeIcon = getTimeIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Enhanced Header */}
      <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-white/20 text-white">
                {userData.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-medium">{getGreeting()}, {userData.name.split(' ')[0]}!</h1>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <TimeIcon className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString('en-US', { 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })}</span>
                <span>•</span>
                <span>{currentTime.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification Icon */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('notifications')}
              className="text-white hover:bg-white/20 p-2 h-auto relative"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f6b60b] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            {/* AI Learning Coach Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('ai-chatbot')}
              className="text-white hover:bg-white/20 p-2 h-auto"
            >
              <Brain className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <div className="text-white/80 text-sm mb-4">
          Ready to grow today?
        </div>

        {/* BPI Spark Learning & Assessment Banner */}
        <Button
          onClick={() => onNavigate('learning')}
          className="w-full bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm p-4 h-auto rounded-xl"
          variant="outline"
        >
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <div className="text-white/80 text-sm mb-1">BPI Spark</div>
              <div className="text-white text-base font-medium mb-1">Learning & Assessment</div>
              <div className="text-white/70 text-sm">Tap to explore your strengths</div>
            </div>
            <div className="w-10 h-10 bg-[#f6b60b] rounded-lg flex items-center justify-center flex-shrink-0">
              <ArrowUpRight className="w-5 h-5 text-[#333333]" />
            </div>
          </div>
        </Button>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Weekly Engagement Tracking */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#42A5F5]" />
              Weekly Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {weeklyEngagementData.map((day, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => setSelectedEngagementDay(selectedEngagementDay === index ? null : index)}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium text-white transition-all duration-200 hover:scale-110 ${
                      day.isToday ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-100' : ''
                    }`}
                    style={{ 
                      backgroundColor: getEngagementColor(day.level)
                    }}
                  >
                    {day.level}%
                  </div>
                  <span className={`text-xs ${day.isToday ? 'text-[#aa0000] font-medium' : 'text-gray-600'}`}>
                    {day.date}
                  </span>
                  {selectedEngagementDay === index && (
                    <div className="absolute mt-16 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 text-center">
                      Engagement: {day.level}%<br/>
                      {day.fullDate}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Vibe Check Feature */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#4CAF50]" />
              How are you feeling?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Vibe Selection */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Select your current energy level:</p>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {vibeCheckData.map((vibe, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleMoodSelect(vibe.mood)}
                    disabled={moodSubmitted}
                    className={`flex flex-col items-center gap-2 p-4 h-auto transition-all duration-200 ${
                      selectedMood === vibe.mood 
                        ? 'ring-2 ring-offset-2' 
                        : 'hover:bg-gray-50'
                    }`}
                    style={{ 
                      borderColor: `${vibe.color}30`,
                      backgroundColor: selectedMood === vibe.mood ? `${vibe.color}20` : `${vibe.color}10`,
                      ringColor: selectedMood === vibe.mood ? vibe.color : 'transparent'
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${vibe.color}20` }}
                    >
                      {vibe.emoji}
                    </div>
                    <span 
                      className="text-xs font-medium"
                      style={{ color: vibe.color }}
                    >
                      {vibe.mood}
                    </span>
                  </Button>
                ))}
              </div>
              
              {/* Submit Button */}
              {selectedMood && !moodSubmitted && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleMoodSubmit}
                    className="bg-[#28a745] hover:bg-[#1e7e34] text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Submit
                  </Button>
                </div>
              )}
              
              {/* Success Message */}
              {moodSubmitted && (
                <div className="flex justify-center">
                  <div className="bg-[#28a745]/10 text-[#28a745] px-4 py-2 rounded-lg text-sm">
                    ✓ Mood logged for today!
                  </div>
                </div>
              )}
            </div>

            {/* Weekly Vibe Tracking */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Your energy levels this week:</p>
              <div className="flex justify-between items-center">
                {weeklyVibeData.map((day, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => setSelectedVibeDay(selectedVibeDay === index ? null : index)}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-200 hover:scale-110 ${
                        day.isToday ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-100' : ''
                      } ${!day.emoji ? 'border-dashed' : ''}`}
                      style={{ 
                        backgroundColor: day.emoji ? `${day.color}20` : '#f8f9fa',
                        border: day.emoji ? `2px solid ${day.color}` : `2px dashed ${day.color}`
                      }}
                    >
                      {day.emoji || '?'}
                    </div>
                    <span className={`text-xs ${day.isToday ? 'text-[#aa0000] font-medium' : 'text-gray-600'}`}>
                      {day.date}
                    </span>
                    {selectedVibeDay === index && (
                      <div className="absolute mt-16 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 max-w-20 text-center">
                        {day.mood || 'No data'}<br/>
                        {day.fullDate}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - 4 buttons */}
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
                <Zap className="w-5 h-5" />
                <span className="text-sm">Start Assessment</span>
              </Button>
              <Button 
                onClick={() => onNavigate('strength')}
                variant="outline" 
                className="h-auto p-4 flex-col items-center gap-2 border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm">View Skills</span>
              </Button>
              <Button 
                onClick={() => onNavigate('ai-chatbot')}
                variant="outline" 
                className="h-auto p-4 flex-col items-center gap-2 border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5"
              >
                <Brain className="w-5 h-5" />
                <span className="text-sm">AI Coach</span>
              </Button>
              <Button 
                onClick={() => onNavigate('learning-history')}
                variant="outline" 
                className="h-auto p-4 flex-col items-center gap-2 border-[#17a2b8]/20 text-[#17a2b8] hover:bg-[#17a2b8]/5"
              >
                <History className="w-5 h-5" />
                <span className="text-sm">History</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inspirational Quote */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#f6b60b]/10 to-[#f6b60b]/5 border-l-4 border-l-[#f6b60b]">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-[#f6b60b] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-[#f6b60b] mb-1">Daily Inspiration</p>
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  "{currentQuote}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}