import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Bell, Calendar, Check, X, Eye, Edit, Trash2, Plus, Clock, Users } from 'lucide-react';

interface TeamNotificationsTrackingScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

// Mock data for team notices and their status
const teamNotices = [
  {
    id: 1,
    title: "Q4 Performance Review Schedule",
    content: "Performance reviews will be conducted from Dec 15-30. Please prepare your self-assessments.",
    createdDate: "2024-12-10",
    type: "notice",
    status: "sent",
    seenBy: [
      { name: "Alex Johnson", initials: "AJ", seenAt: "2024-12-10 14:30", status: "seen" },
      { name: "Sarah Chen", initials: "SC", seenAt: "2024-12-10 15:45", status: "seen" },
      { name: "Mike Rodriguez", initials: "MR", seenAt: null, status: "pending" },
      { name: "Emily Davis", initials: "ED", seenAt: "2024-12-11 09:15", status: "seen" }
    ]
  },
  {
    id: 2,
    title: "New Project Kickoff",
    content: "We're starting the new client portal project. All hands meeting scheduled.",
    createdDate: "2024-12-08",
    type: "notice",
    status: "sent",
    seenBy: [
      { name: "Alex Johnson", initials: "AJ", seenAt: "2024-12-08 16:20", status: "seen" },
      { name: "Sarah Chen", initials: "SC", seenAt: "2024-12-08 16:35", status: "seen" },
      { name: "Mike Rodriguez", initials: "MR", seenAt: "2024-12-09 10:00", status: "seen" },
      { name: "Emily Davis", initials: "ED", seenAt: "2024-12-08 17:00", status: "seen" }
    ]
  }
];

const scheduleMeetings = [
  {
    id: 1,
    title: "Team Planning Session",
    date: "2024-12-15",
    time: "14:00",
    duration: "2 hours",
    createdDate: "2024-12-10",
    type: "meeting",
    status: "sent",
    confirmations: [
      { name: "Alex Johnson", initials: "AJ", confirmedAt: "2024-12-10 15:00", status: "confirmed" },
      { name: "Sarah Chen", initials: "SC", confirmedAt: "2024-12-10 16:30", status: "confirmed" },
      { name: "Mike Rodriguez", initials: "MR", confirmedAt: null, status: "pending" },
      { name: "Emily Davis", initials: "ED", confirmedAt: "2024-12-11 08:00", status: "confirmed" }
    ]
  },
  {
    id: 2,
    title: "1-on-1 Sessions",
    date: "2024-12-18",
    time: "09:00",
    duration: "30 min each",
    createdDate: "2024-12-09",
    type: "meeting",
    status: "sent",
    confirmations: [
      { name: "Alex Johnson", initials: "AJ", confirmedAt: "2024-12-09 14:20", status: "confirmed" },
      { name: "Sarah Chen", initials: "SC", confirmedAt: null, status: "pending" },
      { name: "Mike Rodriguez", initials: "MR", confirmedAt: "2024-12-10 11:30", status: "confirmed" },
      { name: "Emily Davis", initials: "ED", confirmedAt: "2024-12-09 15:45", status: "confirmed" }
    ]
  }
];

const draftNotices = [
  {
    id: 1,
    title: "Holiday Schedule Update",
    content: "Updated holiday schedule for December and January...",
    createdDate: "2024-12-11",
    type: "notice",
    status: "draft"
  },
  {
    id: 2,
    title: "Team Building Event",
    content: "Planning a team building event for Q1 2025...",
    createdDate: "2024-12-09",
    type: "notice", 
    status: "draft"
  }
];

const draftMeetings = [
  {
    id: 1,
    title: "Monthly Review Meeting",
    date: "2024-12-20",
    time: "15:00",
    duration: "1 hour",
    createdDate: "2024-12-11",
    type: "meeting",
    status: "draft"
  }
];

export function TeamNotificationsTrackingScreen({ onNavigate, onBack }: TeamNotificationsTrackingScreenProps) {
  const [activeTab, setActiveTab] = useState('notices');
  const [hiddenMembers, setHiddenMembers] = useState<{[key: string]: string[]}>({});
  const [collapsedNotices, setCollapsedNotices] = useState<{[key: number]: boolean}>({});
  const [collapsedMeetings, setCollapsedMeetings] = useState<{[key: number]: boolean}>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'seen':
      case 'confirmed':
        return 'bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20';
      case 'pending':
        return 'bg-[#ffc107]/10 text-[#ffc107] border-[#ffc107]/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'seen':
      case 'confirmed':
        return <Check className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      default:
        return <X className="w-3 h-3" />;
    }
  };

  const toggleMemberVisibility = (noticeId: number, memberName: string) => {
    setHiddenMembers(prev => {
      const noticeKey = `notice-${noticeId}`;
      const currentHidden = prev[noticeKey] || [];
      
      if (currentHidden.includes(memberName)) {
        // Show member
        return {
          ...prev,
          [noticeKey]: currentHidden.filter(name => name !== memberName)
        };
      } else {
        // Hide member
        return {
          ...prev,
          [noticeKey]: [...currentHidden, memberName]
        };
      }
    });
  };

  const toggleMeetingMemberVisibility = (meetingId: number, memberName: string) => {
    setHiddenMembers(prev => {
      const meetingKey = `meeting-${meetingId}`;
      const currentHidden = prev[meetingKey] || [];
      
      if (currentHidden.includes(memberName)) {
        // Show member
        return {
          ...prev,
          [meetingKey]: currentHidden.filter(name => name !== memberName)
        };
      } else {
        // Hide member
        return {
          ...prev,
          [meetingKey]: [...currentHidden, memberName]
        };
      }
    });
  };

  const toggleNoticeCollapse = (noticeId: number) => {
    setCollapsedNotices(prev => ({
      ...prev,
      [noticeId]: !prev[noticeId]
    }));
  };

  const toggleMeetingCollapse = (meetingId: number) => {
    setCollapsedMeetings(prev => ({
      ...prev,
      [meetingId]: !prev[meetingId]
    }));
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
          <div className="flex-1">
            <h1 className="text-xl font-medium">Notifications & Confirmations</h1>
            <p className="text-white/80 text-sm">Track team notice views and meeting confirmations</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Bell className="w-5 h-5 text-[#aa0000]" />
                <span className="text-lg font-medium">6</span>
              </div>
              <p className="text-xs text-gray-600">Total Notices</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#f6b60b]" />
                <span className="text-lg font-medium">3</span>
              </div>
              <p className="text-xs text-gray-600">Meeting Requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notices">Team Notices</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>

          {/* Team Notices Tab */}
          <TabsContent value="notices" className="space-y-4">
            {teamNotices.map((notice) => (
              <Card key={notice.id} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{notice.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{notice.content}</p>
                      <p className="text-xs text-gray-500 mt-2">Sent: {notice.createdDate}</p>
                    </div>
                    <Badge className="bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20">
                      Sent
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      onClick={() => toggleNoticeCollapse(notice.id)}
                      className="font-medium text-sm flex items-center gap-2 p-0 h-auto hover:bg-transparent"
                    >
                      <Eye className="w-4 h-4" />
                      View Status
                      <span className="text-xs text-gray-500">
                        ({collapsedNotices[notice.id] ? 'Show' : 'Hide'} All)
                      </span>
                    </Button>
                    {!collapsedNotices[notice.id] && (
                      <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                        <div className="grid grid-cols-1 gap-2">
                          {notice.seenBy.map((member, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-[#aa0000]/10 text-[#aa0000] text-xs">
                                    {member.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{member.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                                  {getStatusIcon(member.status)}
                                  <span className="ml-1">{member.status}</span>
                                </Badge>
                                {member.seenAt && (
                                  <span className="text-xs text-gray-500">{member.seenAt}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-4">
            {scheduleMeetings.map((meeting) => (
              <Card key={meeting.id} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">{meeting.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {meeting.date} at {meeting.time} ({meeting.duration})
                      </p>
                      <p className="text-xs text-gray-500 mt-2">Sent: {meeting.createdDate}</p>
                    </div>
                    <Badge className="bg-[#17a2b8]/10 text-[#17a2b8] border-[#17a2b8]/20">
                      Sent
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="ghost"
                      onClick={() => toggleMeetingCollapse(meeting.id)}
                      className="font-medium text-sm flex items-center gap-2 p-0 h-auto hover:bg-transparent"
                    >
                      <Users className="w-4 h-4" />
                      Confirmation Status
                      <span className="text-xs text-gray-500">
                        ({collapsedMeetings[meeting.id] ? 'Show' : 'Hide'} All)
                      </span>
                    </Button>
                    {!collapsedMeetings[meeting.id] && (
                      <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                        <div className="grid grid-cols-1 gap-2">
                          {meeting.confirmations.map((member, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-[#aa0000]/10 text-[#aa0000] text-xs">
                                    {member.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{member.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-xs ${getStatusColor(member.status)}`}>
                                  {getStatusIcon(member.status)}
                                  <span className="ml-1">{member.status}</span>
                                </Badge>
                                {member.confirmedAt && (
                                  <span className="text-xs text-gray-500">{member.confirmedAt}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Drafts Tab */}
          <TabsContent value="drafts" className="space-y-4">
            <div className="space-y-4">
              {/* Draft Notices */}
              {draftNotices.map((draft) => (
                <Card key={draft.id} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base">{draft.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{draft.content}</p>
                        <p className="text-xs text-gray-500 mt-2">Created: {draft.createdDate}</p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                        Draft
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1 text-[#dc3545] border-[#dc3545]/30">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                      <Button size="sm" className="bg-[#aa0000] hover:bg-[#880000]">
                        Send Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Draft Meetings */}
              {draftMeetings.map((draft) => (
                <Card key={draft.id} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base">{draft.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {draft.date} at {draft.time} ({draft.duration})
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Created: {draft.createdDate}</p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-600 border-gray-200">
                        Draft
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1 text-[#dc3545] border-[#dc3545]/30">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                      <Button size="sm" className="bg-[#aa0000] hover:bg-[#880000]">
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => onNavigate('team-notice')}
                className="h-auto p-4 flex-col items-center gap-2 bg-[#aa0000] hover:bg-[#880000] text-white"
              >
                <Bell className="w-5 h-5" />
                <span className="text-sm">New Notice</span>
              </Button>
              <Button 
                onClick={() => onNavigate('schedule-appointment')}
                variant="outline"
                className="h-auto p-4 flex-col items-center gap-2 border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Schedule Meeting</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}