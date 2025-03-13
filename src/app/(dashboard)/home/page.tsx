"use client"

import { useEffect, useState } from 'react';
import { ContributionCalendar } from 'react-contribution-calendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from 'next-auth/react';
import PacmanLoader from 'react-spinners/PacmanLoader';

interface StudySession {
  duration: number;
  startTime: string;
  endTime: string;
  mode: string;
}

interface DailySession {
  count: number;
  totalDuration: number;
  sessions: StudySession[];
}

interface StudyStats {
  currentStreak: number;
  bestStreak: number;
  totalDays: number;
  studySessions: {
    [key: string]: DailySession;
  };
}

interface CalendarDataPoint {
  level: number;
  data: {
    count: number;
    duration: number;
    details: string;
  };
}

interface SessionData {
  studySessions: {
    [key: string]: DailySession;
  };
  totalStudyHours: number;
  currentStreak: number;
  bestStreak: number;
  lastStudyDate: string;
}

// Custom theme for the calendar using the specified color scheme
const customTheme = {
  level0: '#222831', // No activity
  level1: '#393E46', // Low activity
  level2: '#00ADB5', // Medium activity
  level3: '#00ADB5', // High activity
  level4: '#00ADB5', // Max activity
};

export default function DashboardHome() {
  const { data: session } = useSession();
  const [studyData, setStudyData] = useState<Array<Record<string, CalendarDataPoint>>>([{}]);
  const [stats, setStats] = useState<StudyStats>({
    currentStreak: 0,
    bestStreak: 0,
    totalDays: 0,
    studySessions: {}
  });
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchStudyData = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch('/api/users/stats');
        if (!response.ok) throw new Error('Failed to fetch study data');

        const data: SessionData = await response.json();

        // Transform data for calendar
        const calendarData: Record<string, CalendarDataPoint> = {};

        Object.entries(data.studySessions || {}).forEach(([date, sessionData]) => {
          if (sessionData) {
            calendarData[date] = {
              level: Math.min(Math.floor((sessionData.count || 0) / 2), 4),
              data: {
                count: sessionData.count,
                duration: sessionData.totalDuration,
                details: `${sessionData.count} study session(s) (${Math.round(sessionData.totalDuration / 60)} min)`
              }
            };
          }
        });

        setStudyData([calendarData]);
        setStats({
          currentStreak: data.currentStreak || 0,
          bestStreak: data.bestStreak || 0,
          totalDays: Object.keys(data.studySessions || {}).length,
          studySessions: data.studySessions || {}
        });
      } catch (error) {
        console.error('Error fetching study data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudyData();

    const handleSessionComplete = () => {
      setTimeout(fetchStudyData, 1000);
    };

    window.addEventListener('study-session-completed', handleSessionComplete);
    return () => window.removeEventListener('study-session-completed', handleSessionComplete);
  }, [session?.user?.id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <PacmanLoader color="#00ADB5" />
      </div>
    );
  }

  return (
    <div className="space-y-4 px-2 py-4 sm:p-4 md:space-y-8 md:p-6 lg:p-8 bg-background text-foreground">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-lg sm:text-xl font-bold md:text-2xl lg:text-3xl">
          {session?.user?.name ? `${session.user.name}'s ` : ''}Study Activity
        </h1>
        <span className="text-xs text-muted-foreground sm:text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      <Card className="bg-card border-border shadow-md">
        <CardHeader className="p-3 sm:p-4 md:p-6 border-b border-border">
          <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground">
            Your Study Contributions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[280px] p-1 sm:p-2 md:min-w-full md:p-4 relative">
              <ContributionCalendar
                data={studyData}
                dateOptions={{
                  start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                  end: new Date().toISOString().split('T')[0],
                  daysOfTheWeek: isMobile ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : isTablet ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                  startsOnSunday: true,
                  includeBoundary: true,
                }}
                styleOptions={{
                  theme: customTheme,
                  cx: isMobile ? 8 : isTablet ? 12 : 18,
                  cy: isMobile ? 10 : isTablet ? 14 : 20,
                  cr: isMobile ? 2.5 : isTablet ? 3.5 : 4,
                  textColor: '#EEEEEE',
                  backgroundColor: '#222831',
                }}
                visibilityOptions={{
                  hideDescription: isMobile || isTablet,
                  hideMonthLabels: isMobile,
                  hideDayLabels: isMobile,
                }}
                onCellClick={(e) => {
                  const cellData = JSON.parse(e.currentTarget.getAttribute('data-cell') || '{}');
                  if (cellData?.data?.count) {
                    console.log(`${cellData.data.details}`);
                  }
                }}
                scroll={false}
              />
              {/* Custom overlay for white lines */}
              <style>
                {`
                  .contribution-calendar-grid rect {
                    stroke: #EEEEEE;
                    stroke-width: 0.5;
                  }
                  .contribution-calendar-grid g {
                    stroke: #EEEEEE;
                    stroke-width: 0.5;
                  }
                `}
              </style>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card border-border shadow-md">
          <CardHeader className="p-3 sm:p-4 md:p-6">
            <CardTitle className="text-xs sm:text-sm md:text-base lg:text-lg text-primary">Current Streak</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-4 sm:pt-0 md:p-6 md:pt-0">
            <p className="text-lg sm:text-xl font-bold md:text-2xl lg:text-3xl text-foreground">{stats.currentStreak} days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-md">
          <CardHeader className="p-3 sm:p-4 md:p-6">
            <CardTitle className="text-xs sm:text-sm md:text-base lg:text-lg text-primary">Total Study Days</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-4 sm:pt-0 md:p-6 md:pt-0">
            <p className="text-lg sm:text-xl font-bold md:text-2xl lg:text-3xl text-foreground">{stats.totalDays} days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-md sm:col-span-2 lg:col-span-1">
          <CardHeader className="p-3 sm:p-4 md:p-6">
            <CardTitle className="text-xs sm:text-sm md:text-base lg:text-lg text-primary">Best Streak</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 sm:p-4 sm:pt-0 md:p-6 md:pt-0">
            <p className="text-lg sm:text-xl font-bold md:text-2xl lg:text-3xl text-foreground">{stats.bestStreak} days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}