import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { ArrowLeft, Calendar, Clock, User, MapPin, Video, Phone, Users, Bell, CheckCircle, MessageCircle, Target, Heart, BookOpen } from 'lucide-react';

interface ScheduleAppointmentScreenProps {
  employee?: any;
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

export function ScheduleAppointmentScreen({ employee, onNavigate, onBack }: ScheduleAppointmentScreenProps) {
  const [meetingType, setMeetingType] = useState('one-on-one');
  const [selectedEmployee, setSelectedEmployee] = useState(employee || null);
  const [meetingMode, setMeetingMode] = useState('video');

  const teamMembers = [
    { id: 1, name: 'Alex Johnson', role: 'Developer', initials: 'AJ', available: true, lastMeeting: '2 weeks ago' },
    { id: 2, name: 'Sarah Chen', role: 'Designer', initials: 'SC', available: true, lastMeeting: '1 week ago' },
    { id: 3, name: 'Mike Rodriguez', role: 'Analyst', initials: 'MR', available: false, lastMeeting: '3 weeks ago' },
    { id: 4, name: 'Emily Davis', role: 'Project Manager', initials: 'ED', available: true, lastMeeting: '4 days ago' }
  ];

  const meetingPurposes = [
    { id: 'check-in', label: 'Regular Check-in', icon: MessageCircle, color: '#17a2b8' },
    { id: 'performance', label: 'Performance Review', icon: Target, color: '#aa0000' },
    { id: 'wellness', label: 'Wellness Discussion', icon: Heart, color: '#28a745' },
    { id: 'development', label: 'Career Development', icon: BookOpen, color: '#f6b60b' },
    { id: 'feedback', label: 'Feedback Session', icon: MessageCircle, color: '#6c757d' }
  ];

  const [selectedPurpose, setSelectedPurpose] = useState('check-in');

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
  ];

  const [selectedTime, setSelectedTime] = useState('');

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
            <h1 className="text-xl font-medium">Schedule Appointment</h1>
            <p className="text-white/80 text-sm">Plan meaningful conversations with your team</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Meeting Type */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Meeting Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3">
              <Button
                variant={meetingType === 'one-on-one' ? "default" : "outline"}
                onClick={() => setMeetingType('one-on-one')}
                className={`w-full justify-start h-auto p-4 ${
                  meetingType === 'one-on-one' 
                    ? 'bg-[#aa0000] hover:bg-[#880000] text-white'
                    : 'border-[#aa0000]/20 text-[#aa0000] hover:bg-[#aa0000]/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium text-sm">1-on-1 Meeting</p>
                    <p className="text-xs opacity-80">Private conversation with team member</p>
                  </div>
                </div>
              </Button>
              
              <Button
                variant={meetingType === 'team' ? "default" : "outline"}
                onClick={() => setMeetingType('team')}
                className={`w-full justify-start h-auto p-4 ${
                  meetingType === 'team' 
                    ? 'bg-[#f6b60b] hover:bg-[#e6a50a] text-[#333333]'
                    : 'border-[#f6b60b]/20 text-[#f6b60b] hover:bg-[#f6b60b]/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium text-sm">Team Meeting</p>
                    <p className="text-xs opacity-80">Group discussion with multiple members</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Employee Selection */}
        {!employee && (
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-5 h-5 text-[#aa0000]" />
                Select Team Member
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamMembers.map((member) => (
                <Button
                  key={member.id}
                  variant={selectedEmployee?.id === member.id ? "default" : "outline"}
                  onClick={() => setSelectedEmployee(member)}
                  disabled={!member.available}
                  className={`w-full justify-start h-auto p-4 ${
                    selectedEmployee?.id === member.id 
                      ? 'bg-[#aa0000] text-white'
                      : member.available 
                        ? 'border-gray-200 hover:bg-gray-50' 
                        : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`${
                        selectedEmployee?.id === member.id ? 'bg-white text-[#aa0000]' : 'bg-[#aa0000] text-white'
                      }`}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{member.name}</p>
                        <Badge className={`${
                          member.available 
                            ? 'bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20'
                            : 'bg-[#dc3545]/10 text-[#dc3545] border-[#dc3545]/20'
                        }`}>
                          {member.available ? 'Available' : 'Busy'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs opacity-80 mt-1">
                        <span>{member.role}</span>
                        <span>Last meeting: {member.lastMeeting}</span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Selected Employee Info */}
        {(selectedEmployee || employee) && (
          <Card className="border-0 shadow-md bg-gradient-to-r from-[#f6b60b]/10 to-[#f6b60b]/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-[#aa0000] text-white">
                    {(selectedEmployee || employee).initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{(selectedEmployee || employee).name}</h3>
                  <p className="text-sm text-gray-600">{(selectedEmployee || employee).role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Meeting Purpose */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Meeting Purpose</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {meetingPurposes.map((purpose) => {
              const IconComponent = purpose.icon;
              return (
                <Button
                  key={purpose.id}
                  variant={selectedPurpose === purpose.id ? "default" : "outline"}
                  onClick={() => setSelectedPurpose(purpose.id)}
                  className={`w-full justify-start h-auto p-3 ${
                    selectedPurpose === purpose.id 
                      ? `text-white`
                      : `text-[${purpose.color}] hover:bg-[${purpose.color}]/5`
                  }`}
                  style={selectedPurpose === purpose.id ? 
                    { backgroundColor: purpose.color } : 
                    { borderColor: `${purpose.color}30`, color: purpose.color }
                  }
                >
                  <IconComponent className="w-4 h-4 mr-3" />
                  {purpose.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Date & Time Selection */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#aa0000]" />
              Date & Time
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Date</label>
              <Input type="date" className="w-full" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Available Time Slots</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className={`${
                      selectedTime === time 
                        ? 'bg-[#aa0000] text-white'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
                <option>90 minutes</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Meeting Details */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">Meeting Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meeting Mode</label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={meetingMode === 'video' ? "default" : "outline"}
                  onClick={() => setMeetingMode('video')}
                  className={`flex flex-col items-center gap-1 h-auto py-3 ${
                    meetingMode === 'video' 
                      ? 'bg-[#17a2b8] text-white'
                      : 'border-[#17a2b8]/20 text-[#17a2b8]'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span className="text-xs">Video Call</span>
                </Button>
                <Button
                  variant={meetingMode === 'phone' ? "default" : "outline"}
                  onClick={() => setMeetingMode('phone')}
                  className={`flex flex-col items-center gap-1 h-auto py-3 ${
                    meetingMode === 'phone' 
                      ? 'bg-[#28a745] text-white'
                      : 'border-[#28a745]/20 text-[#28a745]'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-xs">Phone Call</span>
                </Button>
                <Button
                  variant={meetingMode === 'in-person' ? "default" : "outline"}
                  onClick={() => setMeetingMode('in-person')}
                  className={`flex flex-col items-center gap-1 h-auto py-3 ${
                    meetingMode === 'in-person' 
                      ? 'bg-[#f6b60b] text-[#333333]'
                      : 'border-[#f6b60b]/20 text-[#f6b60b]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs">In Person</span>
                </Button>
              </div>
            </div>

            {meetingMode === 'in-person' && (
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input placeholder="e.g., Conference Room A, Your Office" />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Agenda/Notes</label>
              <Textarea 
                placeholder="What would you like to discuss during this meeting?"
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#f6b60b]" />
              Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Send Calendar Invite</p>
                <p className="text-xs text-gray-600">Automatically add to both calendars</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Email Reminder</p>
                <p className="text-xs text-gray-600">24 hours before meeting</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">App Notification</p>
                <p className="text-xs text-gray-600">30 minutes before meeting</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Preparation Suggestions */}
        <Card className="border-0 shadow-md bg-gradient-to-r from-[#28a745]/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#28a745]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-[#28a745]" />
              </div>
              <div>
                <p className="font-medium text-sm mb-2">Meeting Preparation Tips</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Review employee's recent performance and goals</li>
                  <li>• Prepare specific questions about their challenges</li>
                  <li>• Have development opportunities ready to discuss</li>
                  <li>• Create a safe space for open communication</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <Button className="w-full bg-[#aa0000] hover:bg-[#880000] text-white rounded-xl py-4 h-auto">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Schedule Meeting</span>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full border-[#17a2b8]/20 text-[#17a2b8] hover:bg-[#17a2b8]/5 rounded-xl py-4 h-auto"
        >
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Save as Draft</span>
          </div>
        </Button>
      </div>
    </div>
  );
}