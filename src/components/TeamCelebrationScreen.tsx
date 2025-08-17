import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Award, Star, Calendar, Users, Send, PartyPopper, Trophy, Heart, Sparkles } from 'lucide-react';

interface TeamCelebrationScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function TeamCelebrationScreen({ onNavigate, onBack }: TeamCelebrationScreenProps) {
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
            <h1 className="text-xl font-medium">Celebrate Team Wins</h1>
            <p className="text-white/80 text-sm">Recognize achievements & milestones</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Celebration Type */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PartyPopper className="w-5 h-5 text-[#f6b60b]" />
              Celebration Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto p-4 border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-medium">Individual Achievement</p>
                    <p className="text-sm text-gray-600">Recognize personal milestones</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto p-4 border-[#28a745]/20 text-[#28a745] hover:bg-[#28a745]/5"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-medium">Team Accomplishment</p>
                    <p className="text-sm text-gray-600">Celebrate collective success</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto p-4 border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-medium">Learning Milestone</p>
                    <p className="text-sm text-gray-600">Skill development achievements</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Details */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-[#aa0000]" />
              Achievement Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Achievement Title</label>
              <Input 
                placeholder="e.g., Completed Leadership Certification"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea 
                placeholder="Describe what was accomplished and why it's worth celebrating..."
                className="min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Impact</label>
              <Textarea 
                placeholder="How has this achievement benefited the team or organization?"
                className="min-h-[60px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recognition Recipients */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-[#f6b60b]" />
              Recognition Recipients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#f6b60b]/10 to-transparent rounded-lg border-l-4 border-l-[#f6b60b]">
                <div>
                  <p className="font-medium text-sm">Alex Johnson</p>
                  <p className="text-xs text-gray-600">Developer • Leadership Excellence</p>
                </div>
                <Badge className="bg-[#f6b60b]/20 text-[#f6b60b] border-[#f6b60b]/30">
                  Honoree
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Sarah Chen</p>
                  <p className="text-xs text-gray-600">Designer</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs border-[#28a745]/20 text-[#28a745]">
                  Add
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Entire Development Team</p>
                  <p className="text-xs text-gray-600">6 members</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs border-[#aa0000]/20 text-[#aa0000]">
                  Select Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Celebration Event */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#aa0000]" />
              Celebration Event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Input type="time" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Event Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>Team Meeting Recognition</option>
                <option>Virtual Celebration</option>
                <option>Company-wide Announcement</option>
                <option>Small Gathering</option>
                <option>Email Recognition</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location/Platform</label>
              <Input placeholder="e.g., Conference Room A, Zoom, Teams" />
            </div>
          </CardContent>
        </Card>

        {/* Recognition Message */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Recognition Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Write a heartfelt message to recognize their achievement..."
              className="min-h-[100px]"
            />
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs border-[#f6b60b]/20 text-[#f6b60b]">
                🎉 Exceptional Work
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-[#28a745]/20 text-[#28a745]">
                🌟 Team Player
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-[#aa0000]/20 text-[#aa0000]">
                🚀 Innovation
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-[#17a2b8]/20 text-[#17a2b8]">
                💡 Problem Solver
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Celebration Ideas */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#f6b60b]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#f6b60b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-[#f6b60b]" />
              </div>
              <div>
                <p className="font-medium text-sm mb-2">Celebration Ideas</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Share achievement in company newsletter</li>
                  <li>• Create a digital certificate or badge</li>
                  <li>• Organize a small team lunch</li>
                  <li>• Post on internal social channels</li>
                  <li>• Give public recognition in all-hands meeting</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <Button className="w-full bg-[#f6b60b] hover:bg-[#e6a50a] text-[#333333] rounded-xl py-4 h-auto">
          <div className="flex items-center justify-center gap-2">
            <PartyPopper className="w-5 h-5" />
            <span>Create Celebration Event</span>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-[#28a745]/20 text-[#28a745] hover:bg-[#28a745]/5 rounded-xl py-4 h-auto"
        >
          <div className="flex items-center justify-center gap-2">
            <Send className="w-5 h-5" />
            <span>Send Recognition Now</span>
          </div>
        </Button>
      </div>
    </div>
  );
}