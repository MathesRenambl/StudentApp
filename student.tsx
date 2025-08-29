import React, { useState } from 'react';
import { View,Text,ScrollView,TouchableOpacity,StyleSheet,SafeAreaView,Dimensions,StatusBar} from 'react-native';
import { Bell,Home,BarChart3,FileText,Calendar,Trophy,BookOpen,Target,TrendingUp,TrendingDown,ArrowRight,Clock,CheckCircle,Star,Smartphone,HelpCircle} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import colors from './color';
const { width } = Dimensions.get('window');


// Type definitions
interface Grade {
  id: number;
  subject: string;
  grade: string;
  score: number;
  date: string;
  type: string;
}

interface Test {
  id: number;
  subject: string;
  date: string;
  time: string;
  type: string;
}

interface Assignment {
  id: number;
  subject: string;
  title: string;
  due: string;
  status: 'pending' | 'completed';
}

interface SubjectStat {
  subject: string;
  average: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
}

interface StudySession {
  id: number;
  subject: string;
  duration: number;
  date: string;
}

type TabType = 'home' | 'grades' | 'assignments' | 'schedule' | 'achievements';

interface TabButtonProps {
  label: string;
  tabKey: TabType;
  isActive: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}

const StudentApp: React.FC = () => {
  const navigation = useNavigation<Navigator>();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const handleExam = () =>{
    navigation.navigate("ExamApp");
  }
  // Sample json
  const recentGrades: Grade[] = [
    { id: 1, subject: 'Mathematics', grade: 'A+', score: 96, date: '2024-08-25', type: 'Quiz' },
    { id: 2, subject: 'Science', grade: 'A', score: 92, date: '2024-08-23', type: 'Test' },
    { id: 3, subject: 'English', grade: 'A-', score: 89, date: '2024-08-20', type: 'Essay' },
    { id: 4, subject: 'History', grade: 'B+', score: 87, date: '2024-08-18', type: 'Project' },
    { id: 5, subject: 'Art', grade: 'A+', score: 98, date: '2024-08-16', type: 'Portfolio' },
    { id: 6, subject: 'Physical Ed', grade: 'A', score: 94, date: '2024-08-14', type: 'Assessment' },
  ];

  const upcomingTests: Test[] = [
    { id: 1, subject: 'Biology', date: '2024-08-30', time: '10:00 AM', type: 'Midterm Exam' },
    { id: 2, subject: 'Chemistry', date: '2024-09-02', time: '2:00 PM', type: 'Lab Test' },
    { id: 3, subject: 'Physics', date: '2024-09-05', time: '11:00 AM', type: 'Quiz' },
    { id: 4, subject: 'Literature', date: '2024-09-08', time: '9:00 AM', type: 'Book Review' },
  ];

  const assignments: Assignment[] = [
    { id: 1, subject: 'Mathematics', title: 'Calculus Problem Set #5', due: '2024-08-29', status: 'pending' },
    { id: 2, subject: 'English', title: 'Shakespeare Essay', due: '2024-08-31', status: 'completed' },
    { id: 3, subject: 'Science', title: 'Lab Report - Photosynthesis', due: '2024-09-03', status: 'pending' },
    { id: 4, subject: 'History', title: 'World War II Timeline', due: '2024-09-05', status: 'pending' },
    { id: 5, subject: 'Art', title: 'Watercolor Landscape', due: '2024-09-07', status: 'completed' },
  ];

  const achievements: Achievement[] = [
    { id: 1, title: 'Perfect Score', description: 'Got 100% on a test', icon: <Target size={28} color="#333" />, earned: true },
    { id: 2, title: 'Study Streak', description: '7 days in a row', icon: <Star size={28} color="#333" />, earned: true },
    { id: 3, title: 'Math Master', description: 'A+ in Mathematics', icon: <BarChart3 size={28} color="#333" />, earned: true },
    { id: 4, title: 'Creative Writer', description: 'Outstanding essay', icon: <FileText size={28} color="#333" />, earned: false },
    { id: 5, title: 'Science Explorer', description: 'Perfect lab reports', icon: <BookOpen size={28} color="#333" />, earned: false },
    { id: 6, title: 'Time Manager', description: 'All assignments on time', icon: <Clock size={28} color="#333" />, earned: true },
  ];

  const studySessions: StudySession[] = [
    { id: 1, subject: 'Mathematics', duration: 45, date: '2024-08-26' },
    { id: 2, subject: 'Science', duration: 30, date: '2024-08-26' },
    { id: 3, subject: 'English', duration: 60, date: '2024-08-25' },
    { id: 4, subject: 'History', duration: 40, date: '2024-08-25' },
  ];

  const subjectStats: SubjectStat[] = [
    { subject: 'Mathematics', average: 94, trend: 'up', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { subject: 'Science', average: 91, trend: 'up', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { subject: 'English', average: 89, trend: 'stable', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { subject: 'History', average: 86, trend: 'up', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  ];

  const getGradientBySubject = (subject: string): string[] => {
    const gradients: { [key: string]: string[] } = {
      'Mathematics': ['#667eea', '#764ba2'],
      'Science': ['#f093fb', '#f5576c'],
      'English': ['#4facfe', '#00f2fe'],
      'History': ['#43e97b', '#38f9d7'],
      'Art': ['#fa709a', '#fee140'],
      'Physical Ed': ['#a8edea', '#fed6e3'],
      'Biology': ['#d299c2', '#fef9d7'],
      'Chemistry': ['#89f7fe', '#66a6ff'],
      'Physics': ['#fdbb2d', '#22c1c3'],
      'Literature': ['#e14fad', '#f9d423'],
    };
    return gradients[subject] || ['#667eea', '#764ba2'];
  };

  const GradeCard = ({ grade }: { grade: Grade }) => (
    <View style={[styles.gradeCard, { backgroundColor: getGradientBySubject(grade.subject)[0] }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.gradeSubject}>{grade.subject}</Text>
        <View style={styles.gradeBadge}>
          <Text style={styles.gradeText}>{grade.grade}</Text>
        </View>
      </View>
      <Text style={styles.scoreText}>{grade.score}%</Text>
      <Text style={styles.gradeType}>{grade.type}</Text>
      <Text style={styles.gradeDate}>{grade.date}</Text>
    </View>
  );

  const StatCard = ({ stat }: { stat: SubjectStat }) => (
    <View style={[styles.statCard, { backgroundColor: getGradientBySubject(stat.subject)[0] }]}>
      <Text style={styles.statSubject}>{stat.subject}</Text>
      <View style={styles.statContent}>
        <Text style={styles.statAverage}>{stat.average}%</Text>
        {stat.trend === 'up' && <TrendingUp size={16} color="#ffffff" />}
        {stat.trend === 'down' && <TrendingDown size={16} color="#ffffff" />}
        {stat.trend === 'stable' && <ArrowRight size={16} color="#ffffff" />}
      </View>
    </View>
  );

  const TestCard = ({ test }: { test: Test }) => (
    <View style={styles.testCard}>
      <View style={styles.testHeader}>
        <View style={[styles.testIconContainer, { backgroundColor: getGradientBySubject(test.subject)[0] + '20' }]}>
          <BookOpen size={20} color={getGradientBySubject(test.subject)[0]} />
        </View>
        <View style={styles.testInfo}>
          <Text style={styles.testSubject}>{test.subject}</Text>
          <Text style={styles.testType}>{test.type}</Text>
        </View>
        <View style={styles.testDateBadge}>
          <Text style={styles.testDay}>{new Date(test.date).getDate()}</Text>
          <Text style={styles.testMonth}>
            {new Date(test.date).toLocaleDateString('en', { month: 'short' })}
          </Text>
        </View>
      </View>
      <View style={styles.testTimeContainer}>
        <Clock size={14} color="#666" />
        <Text style={styles.testTime}>{test.time}</Text>
      </View>
    </View>
  );

  const AssignmentCard = ({ assignment }: { assignment: Assignment }) => (
    <View style={[styles.assignmentCard, {
      backgroundColor: assignment.status === 'completed' ? '#e8f5e8' : '#fff3e0'
    }]}>
      <View style={styles.assignmentHeader}>
        {assignment.status === 'completed' ? 
          <CheckCircle size={20} color="#4caf50" /> : 
          <FileText size={20} color="#ff9800" />
        }
        <View style={[styles.statusBadge, {
          backgroundColor: assignment.status === 'completed' ? '#4caf50' : '#ff9800'
        }]}>
          <Text style={styles.statusText}>
            {assignment.status === 'completed' ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>
      <Text style={styles.assignmentTitle}>{assignment.title}</Text>
      <Text style={[styles.assignmentSubject, { color: getGradientBySubject(assignment.subject)[0] }]}>
        {assignment.subject}
      </Text>
      <Text style={styles.assignmentDue}>Due: {assignment.due}</Text>
    </View>
  );


  const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
    <View style={[styles.achievementCard, { opacity: achievement.earned ? 1 : 0.6 }]}>
      <View style={styles.achievementIcon}>{achievement.icon}</View>
      <Text style={styles.achievementTitle}>{achievement.title}</Text>
      <Text style={styles.achievementDescription}>{achievement.description}</Text>
      {achievement.earned && <View style={styles.earnedBadge} />}
    </View>
  );

  const TabButton = ({ label, tabKey, isActive, onPress, icon }: TabButtonProps) => (
    <TouchableOpacity 
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <View style={styles.tabIcon}>{icon}</View>
      <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{label}</Text>
    </TouchableOpacity>
  );


  const completedCount=assignments.reduce((count,a)=>a.status === 'completed' ? count + 1 : count, 0);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.studentName}>Sonu</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={20} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileEmoji}>S</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContainer}>
          <TabButton label="Home" tabKey="home" isActive={activeTab === 'home'} onPress={() => setActiveTab('home')} icon={<Home size={18} color={activeTab === 'home' ? '#667eea' : '#666'} />} />
          <TabButton label="Grades" tabKey="grades" isActive={activeTab === 'grades'} onPress={() => setActiveTab('grades')} icon={<BarChart3 size={18} color={activeTab === 'grades' ? '#667eea' : '#666'} />} />
          <TabButton label="Tasks" tabKey="assignments" isActive={activeTab === 'assignments'} onPress={() => setActiveTab('assignments')} icon={<FileText size={18} color={activeTab === 'assignments' ? '#667eea' : '#666'} />} />
          {/* <TabButton label="Schedule" tabKey="schedule" isActive={activeTab === 'schedule'} onPress={() => setActiveTab('schedule')} icon={<Calendar size={18} color={activeTab === 'schedule' ? '#667eea' : '#666'} />} /> */}
          <TabButton label="Awards" tabKey="achievements" isActive={activeTab === 'achievements'} onPress={() => setActiveTab('achievements')} icon={<Trophy size={18} color={activeTab === 'achievements' ? '#667eea' : '#666'} />} />
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'home' && (
          <>
            {/* Quick Stats */}
            <View style={styles.section}>
              <View style={styles.statsRow}>
                <View style={[styles.quickStatCard, styles.statCardLeft]}>
                  <Text style={styles.statLabel}>Upcoming Assessments</Text>
                  <Text style={styles.statValue}>{upcomingTests.length}</Text>
                </View>
                <View style={[styles.quickStatCard, styles.statCardRight]}>
                  <Text style={styles.statLabel}>Completed Assessment</Text>
                  <Text style={styles.statValue}>{completedCount}</Text>
                </View>
              </View>
            </View>

            {/* Feature Cards */}
            <View style={styles.section}>
              <View style={styles.featureGrid}>
                {/* <TouchableOpacity style={[styles.featureCard, { backgroundColor: '#e3f2fd' }]}>
                  <BarChart3 size={32} color="#1976d2" />
                  <Text style={styles.featureTitle}>Ability Level Test</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={[styles.featureCard, { backgroundColor: '#e8f5e8' }]}>
                  <Smartphone size={32} color="#388e3c" />
                  <Text style={styles.featureTitle}>Offline Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.featureCard, { backgroundColor: '#fff3e0' }]}>
                  <TrendingUp size={32} color="#f57c00" />
                  <Text style={styles.featureTitle}>Progress Report</Text>
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={[styles.featureCard, { backgroundColor: '#fce4ec' }]}>
                  <HelpCircle size={32} color="#c2185b" />
                  <Text style={styles.featureTitle}>Help Center</Text>
                </TouchableOpacity> */}
              </View>
            </View>

            {/* Recent Activity */}

            <View style={styles.section}>
            
            <Text style={styles.sectionTitle}>Upcoming Assessment</Text>
            {upcomingTests.map(test => (
                <TouchableOpacity
                        // style={styles.createAssessmentButton}
                        onPress={handleExam}
                        activeOpacity={0.8}
                    >
              <TestCard key={test.id} test={test} />
              </TouchableOpacity>
            ))}
            
          </View>


            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <View style={styles.activityCard}>
                <Text style={styles.activityText}>Completed Mathematics Quiz - Score: 96%</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <View style={styles.activityCard}>
                <Text style={styles.activityText}> Submitted English Essay</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
          </>
        )}

        {activeTab === 'grades' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Grades</Text>
            <View style={styles.gradesGrid}>
              {recentGrades.map(grade => (
                <GradeCard key={grade.id} grade={grade} />
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Subject Performance</Text>
            <View style={styles.statsGrid}>
              {subjectStats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </View>
          </View>
        )}

        {activeTab === 'assignments' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Assignments</Text>
            {assignments.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </View>
        )}

        {/* {activeTab === 'schedule' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Tests</Text>
            {upcomingTests.map(test => (
              <TestCard key={test.id} test={test} />
            ))}
          </View>
        )} */}

        {activeTab === 'achievements' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Achievements</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Study Sessions This Week</Text>
            <View style={styles.studySessionsCard}>
              {studySessions.map(session => (
                <View key={session.id} style={styles.sessionItem}>
                  <Text style={styles.sessionSubject}>{session.subject}</Text>
                  <Text style={styles.sessionDuration}>{session.duration} min</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#667eea',
    
  },
  greeting: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.8,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIcon: {
    fontSize: 20,
  },
  profileAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: 24,
  },
  tabNavigation: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
  },
  tabScrollContainer: {
    width : "100%",
    display : "flex",
    justifyContent : "space-between",
    paddingHorizontal:5,

  },
  tabButton: {
    alignItems: 'center',
    paddingHorizontal:15,
    paddingVertical: 8,
    borderRadius: 20,
    // marginRight: 14,
  },
  activeTab: {
    backgroundColor: '#e8f0fe',
  },
  tabIcon: {
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeTabLabel: {
    color: '#667eea',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection:'row',
    gap: 12,
  },
  quickStatCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    flex: 1,
  },
  statCardLeft: {
    backgroundColor: '#9c88ff',
  },
  statCardRight: {
    backgroundColor: '#ff8a65',
  },
  statLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: 24,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 12,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  gradesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  gradeCard: {
    width: (width - 44) / 2,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  gradeSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  gradeBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  gradeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  gradeType: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
    marginBottom: 2,
  },
  gradeDate: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.7,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (width - 44) / 2,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  statSubject: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statAverage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  trendIcon: {
    fontSize: 16,
  },
  testCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  testHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  testIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  testIcon: {
    fontSize: 20,
  },
  testInfo: {
    flex: 1,
  },
  testSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  testType: {
    fontSize: 14,
    color: '#667eea',
    marginTop: 2,
  },
  testDateBadge: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  testDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  testMonth: {
    fontSize: 10,
    color: '#ffffff',
    opacity: 0.8,
  },
  testTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  testTime: {
    fontSize: 14,
    color: '#666',
  },
  assignmentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  assignmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  assignmentIcon: {
    fontSize: 20,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  assignmentSubject: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 12,
    color: '#666',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  achievementCard: {
    width: (width - 44) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  achievementIcon: {
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  earnedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4caf50',
  },
  studySessionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sessionSubject: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  sessionDuration: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
});

export default StudentApp;