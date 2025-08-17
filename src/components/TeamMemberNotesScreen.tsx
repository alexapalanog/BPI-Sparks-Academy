import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { ArrowLeft, Plus, Edit, Trash2, Calendar, User, Search, StickyNote } from 'lucide-react';
import { Input } from './ui/input';

interface TeamMemberNotesScreenProps {
  onNavigate: (screen: string, data?: any) => void;
  onBack: () => void;
}

// Mock team members data
const teamMembers = [
  { id: 1, name: 'Alex Johnson', initials: 'AJ', role: 'Developer' },
  { id: 2, name: 'Sarah Chen', initials: 'SC', role: 'Designer' },
  { id: 3, name: 'Mike Rodriguez', initials: 'MR', role: 'Analyst' },
  { id: 4, name: 'Emily Davis', initials: 'ED', role: 'Project Manager' }
];

// Mock notes data
const memberNotes = [
  {
    id: 1,
    memberId: 1,
    memberName: 'Alex Johnson',
    memberInitials: 'AJ',
    title: 'Excellent Problem Solving',
    content: 'Observed Alex effectively debugging a complex integration issue today. Took initiative to document the solution for the team. Shows strong analytical thinking and knowledge sharing mindset.',
    category: 'Performance',
    date: '2024-12-11',
    lastEdited: '2024-12-11 14:30'
  },
  {
    id: 2,
    memberId: 1,
    memberName: 'Alex Johnson', 
    memberInitials: 'AJ',
    title: 'Leadership in Code Review',
    content: 'Led code review session with junior developer. Provided constructive feedback and mentored on best practices. Demonstrates natural teaching ability.',
    category: 'Leadership',
    date: '2024-12-10',
    lastEdited: '2024-12-10 16:45'
  },
  {
    id: 3,
    memberId: 2,
    memberName: 'Sarah Chen',
    memberInitials: 'SC',
    title: 'Creative Design Solution',
    content: 'Presented innovative UI solution for mobile responsiveness issue. Her design thinking approach impressed stakeholders and improved user experience significantly.',
    category: 'Creativity',
    date: '2024-12-09',
    lastEdited: '2024-12-09 11:20'
  },
  {
    id: 4,
    memberId: 3,
    memberName: 'Mike Rodriguez',
    memberInitials: 'MR',
    title: 'Needs Communication Support',
    content: 'During team meeting, Mike seemed hesitant to share his analysis insights. Consider providing more encouragement and one-on-one time to build confidence in presentations.',
    category: 'Development',
    date: '2024-12-08',
    lastEdited: '2024-12-08 15:15'
  },
  {
    id: 5,
    memberId: 4,
    memberName: 'Emily Davis',
    memberInitials: 'ED',
    title: 'Project Management Excellence',
    content: 'Successfully coordinated cross-functional team meeting. Her organization and follow-up skills kept everyone aligned. Great stakeholder communication.',
    category: 'Management',
    date: '2024-12-07',
    lastEdited: '2024-12-07 17:30'
  }
];

export function TeamMemberNotesScreen({ onNavigate, onBack }: TeamMemberNotesScreenProps) {
  const [activeTab, setActiveTab] = useState('recent');
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState('Performance');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [editNoteTitle, setEditNoteTitle] = useState('');
  const [editNoteContent, setEditNoteContent] = useState('');
  const [editNoteCategory, setEditNoteCategory] = useState('');
  const [deletedNotes, setDeletedNotes] = useState<typeof memberNotes>([]);

  const categories = ['Performance', 'Leadership', 'Creativity', 'Development', 'Management', 'Collaboration'];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Performance': 'bg-[#28a745]/10 text-[#28a745] border-[#28a745]/20',
      'Leadership': 'bg-[#aa0000]/10 text-[#aa0000] border-[#aa0000]/20',
      'Creativity': 'bg-[#f6b60b]/10 text-[#f6b60b] border-[#f6b60b]/20',
      'Development': 'bg-[#17a2b8]/10 text-[#17a2b8] border-[#17a2b8]/20',
      'Management': 'bg-[#6f42c1]/10 text-[#6f42c1] border-[#6f42c1]/20',
      'Collaboration': 'bg-[#fd7e14]/10 text-[#fd7e14] border-[#fd7e14]/20'
    };
    return colors[category] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const filteredNotes = memberNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMember = selectedMember ? note.memberId === selectedMember : true;
    return matchesSearch && matchesMember;
  });

  const recentNotes = filteredNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim() || !selectedMember) return;
    
    // Here you would typically save to backend
    console.log('Adding new note:', {
      memberId: selectedMember,
      title: newNoteTitle,
      content: newNoteContent,
      category: newNoteCategory
    });
    
    setIsAddingNote(false);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteCategory('Performance');
  };

  const handleEditNote = (note: any) => {
    setEditingNote(note.id);
    setEditNoteTitle(note.title);
    setEditNoteContent(note.content);
    setEditNoteCategory(note.category);
  };

  const handleSaveEdit = () => {
    if (!editNoteTitle.trim() || !editNoteContent.trim()) return;
    
    // Here you would typically save to backend
    console.log('Editing note:', {
      id: editingNote,
      title: editNoteTitle,
      content: editNoteContent,
      category: editNoteCategory
    });
    
    setEditingNote(null);
    setEditNoteTitle('');
    setEditNoteContent('');
    setEditNoteCategory('');
  };

  const handleDeleteNote = (note: any) => {
    // Move to deleted notes
    setDeletedNotes(prev => [...prev, { ...note, deletedAt: new Date().toISOString() }]);
    
    // Here you would typically delete from backend
    console.log('Deleting note:', note.id);
  };

  const handleRestoreNote = (note: any) => {
    // Remove from deleted notes
    setDeletedNotes(prev => prev.filter(n => n.id !== note.id));
    
    // Here you would typically restore in backend
    console.log('Restoring note:', note.id);
  };

  const handlePermanentDelete = (noteId: number) => {
    setDeletedNotes(prev => prev.filter(n => n.id !== noteId));
    console.log('Permanently deleting note:', noteId);
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
            <h1 className="text-xl font-medium">Team Member Notes</h1>
            <p className="text-white/80 text-sm">Track contributions, observations and development notes</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6 pb-24">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <StickyNote className="w-5 h-5 text-[#aa0000]" />
                <span className="text-lg font-medium">{memberNotes.length}</span>
              </div>
              <p className="text-xs text-gray-600">Total Notes</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="w-5 h-5 text-[#f6b60b]" />
                <span className="text-lg font-medium">{teamMembers.length}</span>
              </div>
              <p className="text-xs text-gray-600">Team Members</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#28a745]" />
                <span className="text-lg font-medium">5</span>
              </div>
              <p className="text-xs text-gray-600">This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <Button
                onClick={() => setIsAddingNote(true)}
                className="bg-[#aa0000] hover:bg-[#880000]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
            
            {/* Member Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedMember === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMember(null)}
                className={selectedMember === null ? "bg-[#aa0000] text-white" : ""}
              >
                All Members
              </Button>
              {teamMembers.map((member) => (
                <Button
                  key={member.id}
                  variant={selectedMember === member.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedMember(member.id)}
                  className={selectedMember === member.id ? "bg-[#aa0000] text-white flex-shrink-0" : "flex-shrink-0"}
                >
                  {member.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Note Form */}
        {isAddingNote && (
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Add New Note</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Team Member</label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={selectedMember || ''}
                    onChange={(e) => setSelectedMember(Number(e.target.value))}
                  >
                    <option value="">Select member...</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={newNoteCategory}
                    onChange={(e) => setNewNoteCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Brief title for this note..."
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Note Content</label>
                <Textarea
                  placeholder="Describe the contribution, observation, or development note..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleAddNote}
                  className="bg-[#aa0000] hover:bg-[#880000]"
                >
                  Save Note
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsAddingNote(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notes List */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">Recent Notes</TabsTrigger>
            <TabsTrigger value="all">All Notes</TabsTrigger>
            <TabsTrigger value="deleted">Deleted ({deletedNotes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-4 pr-2">
              {recentNotes.map((note) => (
                <Card key={note.id} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#aa0000]/10 text-[#aa0000] text-sm">
                            {note.memberInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-sm">{note.title}</h3>
                          <p className="text-xs text-gray-600">{note.memberName}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getCategoryColor(note.category)}`}>
                        {note.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingNote === note.id ? (
                      <div className="space-y-3">
                        <Input
                          value={editNoteTitle}
                          onChange={(e) => setEditNoteTitle(e.target.value)}
                          placeholder="Note title..."
                        />
                        <Textarea
                          value={editNoteContent}
                          onChange={(e) => setEditNoteContent(e.target.value)}
                          placeholder="Note content..."
                          rows={3}
                        />
                        <select 
                          className="w-full p-2 border rounded-lg text-sm"
                          value={editNoteCategory}
                          onChange={(e) => setEditNoteCategory(e.target.value)}
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSaveEdit} className="bg-[#28a745] hover:bg-[#1e7e34] text-white">
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingNote(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{note.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {note.date} • Last edited {note.lastEdited}
                          </span>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="p-1 h-auto"
                              onClick={() => handleEditNote(note)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="p-1 h-auto text-[#dc3545]"
                              onClick={() => handleDeleteNote(note)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-4">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#aa0000]/10 text-[#aa0000] text-sm">
                            {note.memberInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-sm">{note.title}</h3>
                          <p className="text-xs text-gray-600">{note.memberName}</p>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getCategoryColor(note.category)}`}>
                        {note.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingNote === note.id ? (
                      <div className="space-y-3">
                        <Input
                          value={editNoteTitle}
                          onChange={(e) => setEditNoteTitle(e.target.value)}
                          placeholder="Note title..."
                        />
                        <Textarea
                          value={editNoteContent}
                          onChange={(e) => setEditNoteContent(e.target.value)}
                          placeholder="Note content..."
                          rows={3}
                        />
                        <select 
                          className="w-full p-2 border rounded-lg text-sm"
                          value={editNoteCategory}
                          onChange={(e) => setEditNoteCategory(e.target.value)}
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSaveEdit} className="bg-[#28a745] hover:bg-[#1e7e34] text-white">
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingNote(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">{note.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {note.date} • Last edited {note.lastEdited}
                          </span>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="p-1 h-auto"
                              onClick={() => handleEditNote(note)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="p-1 h-auto text-[#dc3545]"
                              onClick={() => handleDeleteNote(note)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deleted" className="space-y-4">
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 space-y-4 pr-2">
              {deletedNotes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No deleted notes</p>
                </div>
              ) : (
                deletedNotes.map((note) => (
                  <Card key={note.id} className="border-0 shadow-md bg-red-50">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 opacity-50">
                            <AvatarFallback className="bg-[#aa0000]/10 text-[#aa0000] text-sm">
                              {note.memberInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-sm text-gray-600">{note.title}</h3>
                            <p className="text-xs text-gray-500">{note.memberName}</p>
                          </div>
                        </div>
                        <Badge className="bg-red-100 text-red-600 border-red-200 text-xs">
                          Deleted
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed opacity-75">{note.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Deleted: {note.deletedAt ? new Date(note.deletedAt).toLocaleDateString() : 'Unknown'}
                        </span>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs text-[#28a745] border-[#28a745]/30 hover:bg-[#28a745]/5"
                            onClick={() => handleRestoreNote(note)}
                          >
                            Restore
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs text-[#dc3545] border-[#dc3545]/30 hover:bg-[#dc3545]/5"
                            onClick={() => handlePermanentDelete(note.id)}
                          >
                            Delete Forever
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}