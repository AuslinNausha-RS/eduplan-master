import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Users, School, Calendar, Clock, User, MapPin } from 'lucide-react';
import schoolHeroImage from '@/assets/school-hero.jpg';
import studentsImage from '@/assets/students-bg.jpg';
import teachersImage from '@/assets/teachers-bg.jpg';
import curriculumImage from '@/assets/curriculum-bg.jpg';

type Section = 'curriculum' | 'teacherTimetable' | 'class' | null;

interface Subject {
  name: string;
  lessons: { title: string; deadline: string }[];
}

interface TeacherData {
  [key: string]: string;
}

const subjects: Subject[] = [
  {
    name: 'Mathematics',
    lessons: [
      { title: 'Algebra Fundamentals', deadline: 'Oct 1' },
      { title: 'Geometry & Shapes', deadline: 'Oct 15' }
    ]
  },
  {
    name: 'Science',
    lessons: [
      { title: 'Properties of Light', deadline: 'Sept 30' },
      { title: 'Ecosystem Balance', deadline: 'Oct 10' }
    ]
  },
  {
    name: 'English Literature',
    lessons: [
      { title: 'Grammar Essentials', deadline: 'Sept 28' },
      { title: 'Poetry Analysis', deadline: 'Oct 5' }
    ]
  },
  {
    name: 'Social Studies',
    lessons: [
      { title: 'World Geography', deadline: 'Oct 3' },
      { title: 'Ancient Civilizations', deadline: 'Oct 12' }
    ]
  }
];

const teacherData: TeacherData = {
  "Mathematics": "Mr. Arjun Kumar",
  "Science": "Ms. Kavya Sharma",
  "English Literature": "Mr. Daniel Wilson",
  "Tamil": "Ms. Revathi Nair",
  "Social Studies": "Mr. Yusuf Ahmed",
  "Computer Science": "Ms. Swathi Reddy",
  "Hindi": "Mr. Ajay Gupta",
  "Environmental Studies": "Ms. Priya Patel"
};

const generateTeacherSchedule = () => {
  const subjects = ['Math', 'Science', 'English', 'Social Studies', 'Hindi'];
  const classes = ['5A', '6B', '7C', '8D', '9A', '10B'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  return days.map(day => ({
    day,
    class: classes[Math.floor(Math.random() * classes.length)],
    subject: subjects[Math.floor(Math.random() * subjects.length)]
  }));
};

export default function TimetableScheduler() {
  const [activeSection, setActiveSection] = useState<Section>(null);
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const menuItems = [
    {
      id: 'curriculum' as Section,
      title: 'Curriculum',
      icon: BookOpen,
      description: 'View curriculum details and lesson plans',
      bgImage: curriculumImage
    },
    {
      id: 'teacherTimetable' as Section,
      title: "Teacher's Timetable",
      icon: Users,
      description: 'View schedules for all 60 teachers',
      bgImage: teachersImage
    },
    {
      id: 'class' as Section,
      title: 'Class Management',
      icon: School,
      description: 'Manage class information and assignments',
      bgImage: studentsImage
    }
  ];

  const standards = [
    'LKG', 'UKG', ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)
  ];

  const sections = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${schoolHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/70"></div>
        <div className="relative z-10 text-center text-white px-6">
          <div className="flex items-center justify-center mb-6">
            <School className="h-16 w-16 mr-4" />
            <h1 className="text-5xl md:text-6xl font-bold">Smart Timetable</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Intelligent Scheduling for Modern Education
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="educational"
                  size="lg"
                  onClick={() => setActiveSection(item.id)}
                  className="text-lg px-8 py-6 h-auto flex-col gap-2"
                >
                  <IconComponent className="h-8 w-8" />
                  {item.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-12">
        {!activeSection && (
          <div className="text-center py-20">
            <Calendar className="h-24 w-24 mx-auto mb-6 text-primary opacity-50" />
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Select a section above to get started
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose from Curriculum, Teacher's Timetable, or Class Management
            </p>
          </div>
        )}

        {/* Curriculum Section */}
        {activeSection === 'curriculum' && (
          <div 
            className="relative rounded-2xl p-8 min-h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${curriculumImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/85 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <BookOpen className="h-10 w-10 text-primary mr-4" />
                <div>
                  <h2 className="text-4xl font-bold text-foreground">Curriculum Overview</h2>
                  <p className="text-muted-foreground text-lg">Comprehensive lesson plans and deadlines</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {subjects.map((subject, index) => (
                  <Card key={index} className="bg-gradient-card shadow-medium border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-primary">{subject.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {subject.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{lesson.title}</span>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {lesson.deadline}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Teacher Timetable Section */}
        {activeSection === 'teacherTimetable' && (
          <div 
            className="relative rounded-2xl p-8 min-h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${teachersImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/85 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <Users className="h-10 w-10 text-secondary mr-4" />
                <div>
                  <h2 className="text-4xl font-bold text-foreground">Teacher Schedules</h2>
                  <p className="text-muted-foreground text-lg">Complete timetables for all 60 teachers</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto pr-2">
                {Array.from({ length: 60 }, (_, i) => i + 1).map((teacherNum) => (
                  <Card key={teacherNum} className="bg-gradient-card shadow-medium border-l-4 border-l-secondary">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-lg text-secondary">
                        <User className="h-5 w-5 mr-2" />
                        Teacher {teacherNum}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {generateTeacherSchedule().map((schedule, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="font-medium text-foreground">{schedule.day}:</span>
                            <span className="text-muted-foreground">
                              {schedule.class} - {schedule.subject}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Class Section */}
        {activeSection === 'class' && (
          <div 
            className="relative rounded-2xl p-8 min-h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${studentsImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/85 rounded-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <School className="h-10 w-10 text-accent mr-4" />
                <div>
                  <h2 className="text-4xl font-bold text-foreground">Class Management</h2>
                  <p className="text-muted-foreground text-lg">Select and manage class information</p>
                </div>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <Card className="bg-gradient-card shadow-medium">
                  <CardHeader>
                    <CardTitle className="text-xl">Select Standard</CardTitle>
                    <CardDescription>Choose the class standard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedStandard} onValueChange={(value) => {
                      setSelectedStandard(value);
                      setSelectedSection(''); // Reset section when standard changes
                    }}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Select Standard --" />
                      </SelectTrigger>
                      <SelectContent>
                        {standards.map((standard) => (
                          <SelectItem key={standard} value={standard}>
                            {standard}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {selectedStandard && (
                  <Card className="bg-gradient-card shadow-medium">
                    <CardHeader>
                      <CardTitle className="text-xl">Select Section</CardTitle>
                      <CardDescription>Choose the class section</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Select value={selectedSection} onValueChange={setSelectedSection}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-- Select Section --" />
                        </SelectTrigger>
                        <SelectContent>
                          {sections.map((section) => (
                            <SelectItem key={section} value={section}>
                              Section {section}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>
                )}

                {selectedStandard && selectedSection && (
                  <Card className="bg-gradient-card shadow-medium border-l-4 border-l-accent">
                    <CardHeader>
                      <CardTitle className="flex items-center text-xl text-accent">
                        <MapPin className="h-5 w-5 mr-2" />
                        Subject-Teacher Allocation
                      </CardTitle>
                      <CardDescription>
                        {selectedStandard} - Section {selectedSection}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(teacherData).map(([subject, teacher]) => (
                          <div key={subject} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <span className="font-medium text-foreground">{subject}</span>
                            <span className="text-muted-foreground">→ {teacher}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection && (
          <div className="text-center mt-8">
            <Button 
              variant="ghost" 
              onClick={() => setActiveSection(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Main Menu
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}