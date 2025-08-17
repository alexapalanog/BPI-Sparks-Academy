import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Bell, Calendar, FileText, Clock, MapPin, Users, CheckCircle, X, MessageSquare } from 'lucide-react';

interface NotificationsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

// Mock notification data
const notificationsData = {
  teamNotices: [
    {
      id: 1,
      title: 'Q4 Performance Review Updates',
      summary: 'Important changes to the performance review process',
      timestamp: '2 hours ago',
      priority: 'high',
      unread: true,
      content: {
        fullText: `Dear Team,

We are implementing several important updates to our Q4 performance review process to better support your professional development and career growth.

Key Changes:
• Extended review period: Now running through December 15th
• New competency framework focusing on BPI's core values
• Enhanced 360-degree feedback process
• Additional self-reflection components
• Optional peer nomination system

Timeline:
- Self-assessment due: December 1st
- Manager reviews due: December 8th  
- Final discussions: December 10-15th

These changes are designed to provide more comprehensive feedback and better align with your personal development goals. Your input during this process directly influences your learning path recommendations and career advancement opportunities.

For questions, please reach out to HR or your direct supervisor.

Best regards,
BPI People Development Team`,
        category: 'HR Update',
        attachments: ['Q4_Review_Guidelines.pdf', 'Competency_Framework.pdf']
      }
    },
    {
      id: 2,
      title: 'New Learning Platform Features',
      summary: 'Exciting updates to the BPI Spark learning system',
      timestamp: '1 day ago',
      priority: 'medium',
      unread: true,
      content: {
        fullText: `Hello BPI Spark Users,

We're excited to announce several new features that will enhance your learning experience on the platform.

New Features:
• AI-powered skill gap analysis
• Personalized learning recommendations
• Interactive progress tracking
• Team collaboration tools
• Mobile-optimized assessments
• Achievement badge system

Getting Started:
Log into your BPI Spark account to explore these new features. The AI coach will guide you through the updates during your next session.

These enhancements are based on your feedback and designed to make learning more engaging and effective.

Happy Learning!
BPI Learning & Development`,
        category: 'Platform Update',
        attachments: ['Feature_Guide.pdf']
      }
    },
    {
      id: 3,
      title: 'Holiday Schedule Reminder',
      summary: 'Important dates and office closure information',
      timestamp: '3 days ago',
      priority: 'medium',
      unread: false,
      content: {
        fullText: `Team,

Please note the following holiday schedule and office closures:

December 2024:
• December 24th - Office closes at 2:00 PM
• December 25th - Christmas Day (CLOSED)
• December 31st - Office closes at 3:00 PM  
• January 1st - New Year's Day (CLOSED)

Remote Work:
Flexible remote work options available during this period. Please coordinate with your manager for coverage.

Time Off Requests:
Submit any additional time off requests by December 15th through the HR portal.

Wishing everyone a wonderful holiday season!

BPI Operations Team`,
        category: 'Office Updates',
        attachments: []
      }
    }
  ],
  meetings: [
    {
      id: 1,
      title: 'Q4 Team Strategy Review',
      organizer: 'Sarah Chen - Team Lead',
      date: 'December 12, 2024',
      time: '2:00 PM - 3:30 PM',
      location: 'Conference Room B / Virtual',
      attendees: ['Alex Johnson', 'Mike Rodriguez', 'Emily Davis', 'Sarah Chen'],
      description: 'Quarterly review of team performance, goals alignment, and strategic planning for Q1 2025. We will discuss key achievements, challenges faced, and opportunities for improvement.',
      agenda: [
        'Q4 Performance Summary',
        'Goal Achievement Review', 
        'Team Development Highlights',
        'Q1 2025 Planning',
        'Resource Requirements',
        'Action Items & Next Steps'
      ],
      responseRequired: true,
      userResponse: null,
      priority: 'high',
      timestamp: '4 hours ago'
    },
    {
      id: 2,
      title: 'BPI Spark Training Session',
      organizer: 'Learning & Development',
      date: 'December 15, 2024',
      time: '10:00 AM - 11:00 AM',
      location: 'Training Room A',
      attendees: ['All Team Members'],
      description: 'Hands-on training session for the new BPI Spark features. Learn how to maximize your learning experience with the latest platform updates.',
      agenda: [
        'Platform Overview',
        'New Feature Walkthrough',
        'AI Coach Introduction',
        'Q&A Session'
      ],
      responseRequired: true,
      userResponse: null,
      priority: 'medium',
      timestamp: '1 day ago'
    }
  ]
};

export function NotificationsScreen({ onNavigate, onBack }: NotificationsScreenProps) {
  const [selectedNotice, setSelectedNotice] = useState<any>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [meetingResponses, setMeetingResponses] = useState<{[key: number]: { status: string; note: string }}>({});
  const [tempNote, setTempNote] = useState('');

  const handleNoticeClick = (notice: any) => {
    setSelectedNotice(notice);
  };

  const handleMeetingClick = (meeting: any) => {
    setSelectedMeeting(meeting);
    setTempNote(meetingResponses[meeting.id]?.note || '');
  };

  const handleMeetingResponse = (meetingId: number, status: string) => {
    setMeetingResponses(prev => ({
      ...prev,
      [meetingId]: {
        status,
        note: tempNote
      }
    }));
    setSelectedMeeting(null);
    setTempNote('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-[#dc3545]/10 text-[#dc3545] border-[#dc3545]/20';
      case 'medium': return 'bg-[#ffc107]/10 text-[#ffc107] border-[#ffc107]/20';
      case 'low': return 'bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getResponseStatus = (meetingId: number) => {
    const response = meetingResponses[meetingId];
    if (!response) return null;
    
    const statusColors = {
      'accepted': 'bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20',
      'declined': 'bg-[#dc3545]/10 text-[#dc3545] border-[#dc3545]/20',
      'tentative': 'bg-[#ffc107]/10 text-[#ffc107] border-[#ffc107]/20'
    };
    
    return {
      status: response.status,
      color: statusColors[response.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-600'
    };
  };

  // Notice Detail Modal
  if (selectedNotice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedNotice(null)}
              className="text-white hover:bg-white/20 p-2 h-auto"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-medium">Team Notice</h1>
              <p className="text-white/80 text-sm">Full details</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6 pb-24">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-base mb-2">{selectedNotice.title}</CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={`text-xs ${getPriorityColor(selectedNotice.priority)}`}>
                      {selectedNotice.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {selectedNotice.content.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{selectedNotice.timestamp}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
                  {selectedNotice.content.fullText}
                </div>
              </div>
              
              {selectedNotice.content.attachments.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Attachments:</h4>
                  <div className="space-y-2">
                    {selectedNotice.content.attachments.map((attachment: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                        <FileText className="w-4 h-4 text-[#aa0000]" />
                        <span className="text-sm text-gray-700">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Meeting Detail Modal
  if (selectedMeeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <div className="bg-[#aa0000] text-white px-6 pt-12 pb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedMeeting(null)}
              className="text-white hover:bg-white/20 p-2 h-auto"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-medium">Meeting Details</h1>
              <p className="text-white/80 text-sm">Review and respond</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6 pb-24">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">{selectedMeeting.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getPriorityColor(selectedMeeting.priority)}`}>
                  {selectedMeeting.priority.toUpperCase()}
                </Badge>
                <span className="text-xs text-gray-500">{selectedMeeting.timestamp}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#aa0000]" />
                  <span className="text-sm">{selectedMeeting.organizer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#aa0000]" />
                  <span className="text-sm">{selectedMeeting.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#aa0000]" />
                  <span className="text-sm">{selectedMeeting.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#aa0000]" />
                  <span className="text-sm">{selectedMeeting.location}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Description:</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedMeeting.description}</p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Agenda:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {selectedMeeting.agenda.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#aa0000] text-xs mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Attendees:</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedMeeting.attendees.map((attendee: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedMeeting.responseRequired && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-sm mb-3">Your Response:</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Add a note (optional):</label>
                      <Textarea
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder="Add any comments or questions about this meeting..."
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        onClick={() => handleMeetingResponse(selectedMeeting.id, 'accepted')}
                        className="bg-[#28a745] hover:bg-[#1e7e34] text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleMeetingResponse(selectedMeeting.id, 'tentative')}
                        variant="outline"
                        className="border-[#ffc107] text-[#ffc107] hover:bg-[#ffc107]/5"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Maybe
                      </Button>
                      <Button
                        onClick={() => handleMeetingResponse(selectedMeeting.id, 'declined')}
                        variant="outline"
                        className="border-[#dc3545] text-[#dc3545] hover:bg-[#dc3545]/5"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main Notifications List
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
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
            <h1 className="text-lg font-medium">Notifications</h1>
            <p className="text-white/80 text-sm">Stay updated with team announcements and meetings</p>
          </div>
          <Bell className="w-6 h-6 text-white/60" />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Team Notices Section */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#aa0000]" />
              Team Notices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notificationsData.teamNotices.map((notice) => (
              <div
                key={notice.id}
                onClick={() => handleNoticeClick(notice)}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                  notice.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm truncate">{notice.title}</h3>
                      {notice.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{notice.summary}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getPriorityColor(notice.priority)}`}>
                        {notice.priority.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">{notice.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Meetings Section */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#17a2b8]" />
              Meeting Invitations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notificationsData.meetings.map((meeting) => {
              const responseStatus = getResponseStatus(meeting.id);
              return (
                <div
                  key={meeting.id}
                  onClick={() => handleMeetingClick(meeting)}
                  className="p-3 rounded-lg border bg-white cursor-pointer transition-all hover:shadow-sm border-gray-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{meeting.title}</h3>
                        {meeting.responseRequired && !responseStatus && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 space-y-1 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{meeting.date} at {meeting.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{meeting.organizer}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`text-xs ${getPriorityColor(meeting.priority)}`}>
                          {meeting.priority.toUpperCase()}
                        </Badge>
                        {responseStatus && (
                          <Badge className={`text-xs ${responseStatus.color}`}>
                            {responseStatus.status.toUpperCase()}
                          </Badge>
                        )}
                        {meeting.responseRequired && !responseStatus && (
                          <Badge className="text-xs bg-orange-100 text-orange-600 border-orange-200">
                            RESPONSE REQUIRED
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">{meeting.timestamp}</span>
                      </div>
                      {responseStatus?.status && meetingResponses[meeting.id]?.note && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                          <div className="flex items-center gap-1 mb-1">
                            <MessageSquare className="w-3 h-3" />
                            <span className="font-medium">Your note:</span>
                          </div>
                          <p className="text-gray-600">{meetingResponses[meeting.id].note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}