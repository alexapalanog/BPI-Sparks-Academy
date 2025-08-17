import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { ArrowLeft, Bell, Send, Users, Calendar, AlertTriangle, Info, Star, Megaphone, Clock, Eye, CheckCircle } from 'lucide-react';

interface TeamNoticeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function TeamNoticeScreen({ onNavigate, onBack }: TeamNoticeScreenProps) {
  const [noticeType, setNoticeType] = useState('general');
  const [priority, setPriority] = useState('normal');
  const [requireAcknowledgment, setRequireAcknowledgment] = useState(false);

  const noticeTypes = [
    { id: 'general', label: 'General Announcement', icon: Bell, color: '#17a2b8' },
    { id: 'urgent', label: 'Urgent Notice', icon: AlertTriangle, color: '#dc3545' },
    { id: 'celebration', label: 'Team Achievement', icon: Star, color: '#f6b60b' },
    { id: 'training', label: 'Training Opportunity', icon: Users, color: '#28a745' },
    { id: 'reminder', label: 'Reminder', icon: Clock, color: '#6c757d' }
  ];

  const teamMembers = [
    { id: 1, name: 'Alex Johnson', role: 'Developer', selected: true },
    { id: 2, name: 'Sarah Chen', role: 'Designer', selected: true },
    { id: 3, name: 'Mike Rodriguez', role: 'Analyst', selected: false },
    { id: 4, name: 'Emily Davis', role: 'Project Manager', selected: true }
  ];

  const [selectedMembers, setSelectedMembers] = useState(teamMembers);

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { ...member, selected: !member.selected }
          : member
      )
    );
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
            <h1 className="text-xl font-medium">Team Notice</h1>
            <p className="text-white/80 text-sm">Share important updates with your team</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Notice Type Selection */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#aa0000]" />
              Notice Type
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {noticeTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Button
                  key={type.id}
                  variant={noticeType === type.id ? "default" : "outline"}
                  onClick={() => setNoticeType(type.id)}
                  className={`w-full justify-start h-auto p-4 ${
                    noticeType === type.id 
                      ? `bg-[${type.color}] hover:bg-[${type.color}]/80 text-white`
                      : `border-[${type.color}]/20 text-[${type.color}] hover:bg-[${type.color}]/5`
                  }`}
                  style={noticeType === type.id ? 
                    { backgroundColor: type.color } : 
                    { borderColor: `${type.color}30`, color: type.color }
                  }
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-5 h-5" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{type.label}</p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Notice Content */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Notice Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input 
                placeholder="Enter notice subject..."
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea 
                placeholder="Write your message to the team..."
                className="min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Priority Level</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="low">Low Priority</option>
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Delivery Method</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>App Notification</option>
                  <option>Email + App</option>
                  <option>App + SMS</option>
                  <option>All Channels</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recipients */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-[#f6b60b]" />
                Recipients
              </CardTitle>
              <Badge variant="outline" className="text-[#f6b60b] border-[#f6b60b]/30">
                {selectedMembers.filter(m => m.selected).length} selected
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2 mb-4">
              <Button 
                size="sm" 
                onClick={() => setSelectedMembers(prev => prev.map(m => ({ ...m, selected: true })))}
                className="bg-[#28a745] hover:bg-[#1e7e34] text-white"
              >
                Select All
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSelectedMembers(prev => prev.map(m => ({ ...m, selected: false })))}
                className="border-[#dc3545]/20 text-[#dc3545]"
              >
                Clear All
              </Button>
            </div>
            
            {selectedMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-gray-600">{member.role}</p>
                </div>
                <Switch
                  checked={member.selected}
                  onCheckedChange={() => toggleMemberSelection(member.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Delivery Options */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#aa0000]" />
              Delivery Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Send Immediately</p>
                <p className="text-xs text-gray-600">Deliver notice right away</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Require Acknowledgment</p>
                <p className="text-xs text-gray-600">Team members must confirm they've read it</p>
              </div>
              <Switch 
                checked={requireAcknowledgment}
                onCheckedChange={setRequireAcknowledgment}
              />
            </div>

            {!requireAcknowledgment && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Schedule Delivery</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" />
                  <Input type="time" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#f6b60b]/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#f6b60b]" />
              Notice Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-[#aa0000]" />
                <Badge 
                  className={`${
                    priority === 'urgent' ? 'bg-[#dc3545]/10 text-[#dc3545] border-[#dc3545]/20' :
                    priority === 'high' ? 'bg-[#ffc107]/10 text-[#ffc107] border-[#ffc107]/20' :
                    'bg-[#17a2b8]/10 text-[#17a2b8] border-[#17a2b8]/20'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </Badge>
              </div>
              <h4 className="font-medium text-sm mb-2">Sample Notice Subject</h4>
              <p className="text-sm text-gray-700 mb-3">
                This is how your notice will appear to team members...
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>From: You</span>
                <span>Just now</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Send Options */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                className="border-[#17a2b8]/20 text-[#17a2b8] hover:bg-[#17a2b8]/5"
              >
                Save as Draft
              </Button>
              <Button 
                className="bg-[#aa0000] hover:bg-[#880000] text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Notice
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#28a745]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#28a745]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-[#28a745]" />
              </div>
              <div>
                <p className="font-medium text-sm mb-2">Communication Tips</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Keep messages clear and actionable</li>
                  <li>• Use appropriate priority levels</li>
                  <li>• Consider timing for better engagement</li>
                  <li>• Follow up on urgent notices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}