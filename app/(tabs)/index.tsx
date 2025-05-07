import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getEventsByMonth, getSettings } from '@/utils/storage';
import { Event, MonthData, CalendarDay } from '@/utils/types';

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDay, setStartDay] = useState<0 | 1>(0); // 0 = Sunday, 1 = Monday

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (startDay !== undefined) {
      loadCalendarData();
    }
  }, [currentDate, startDay]);

  const loadSettings = async () => {
    const settings = await getSettings();
    setStartDay(settings.startDayOfWeek as 0 | 1);
  };

  const loadCalendarData = async () => {
    setLoading(true);
    
    // Get events for the current month
    const eventsData = await getEventsByMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    setEvents(eventsData);
    
    // Generate calendar days for the month view
    const monthDays = generateMonthDays(currentDate, eventsData, startDay);
    setMonthData({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      days: monthDays,
    });
    
    setLoading(false);
  };

  const generateMonthDays = (date: Date, events: Event[], startDay: 0 | 1): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    if (startDay === 1) {
      // Adjust for Monday as start of week
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    }
    
    const today = new Date();
    const days: CalendarDay[] = [];
    
    // Add days from previous month to fill the first row
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDayOfWeek; i++) {
      const day = prevMonthLastDay - firstDayOfWeek + i + 1;
      const date = new Date(year, month - 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: [],
      });
    }
    
    // Add days for current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      const isToday = (
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year
      );
      
      // Find events for this day
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.startDate);
        return (
          eventDate.getDate() === day &&
          eventDate.getMonth() === month &&
          eventDate.getFullYear() === year
        );
      });
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        events: dayEvents,
      });
    }
    
    // Add days from next month to complete the grid (6 rows x 7 days = 42 cells)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: [],
      });
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDayPress = (day: CalendarDay) => {
    // Navigate to day view or show events for this day
    console.log('Day pressed:', day);
  };

  const renderCalendarHeader = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return (
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <ThemedText style={styles.headerButton}>{'<'}</ThemedText>
        </TouchableOpacity>
        
        <ThemedText style={styles.headerTitle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </ThemedText>
        
        <TouchableOpacity onPress={handleNextMonth}>
          <ThemedText style={styles.headerButton}>{'>'}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  };

  const renderWeekDays = () => {
    // Get day names based on start day of week
    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (startDay === 1) {
      // Start with Monday
      dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
    
    return (
      <ThemedView style={styles.weekDays}>
        {dayNames.map((day, index) => (
          <ThemedText key={index} style={styles.weekDay}>
            {day}
          </ThemedText>
        ))}
      </ThemedView>
    );
  };

  const renderCalendarGrid = () => {
    if (!monthData) return null;
    
    // Split days into rows (7 days per row)
    const rows = [];
    const days = [...monthData.days];
    
    while (days.length) {
      rows.push(days.splice(0, 7));
    }
    
    return (
      <ThemedView style={styles.calendarGrid}>
        {rows.map((row, rowIndex) => (
          <ThemedView key={rowIndex} style={styles.calendarRow}>
            {row.map((day, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={[
                  styles.calendarDay,
                  !day.isCurrentMonth && styles.outsideMonth,
                  day.isToday && styles.today,
                ]}
                onPress={() => handleDayPress(day)}
              >
                <ThemedText
                  style={[
                    styles.calendarDayText,
                    day.isToday && styles.todayText,
                  ]}
                >
                  {day.date.getDate()}
                </ThemedText>
                
                {day.events.length > 0 && (
                  <ThemedView style={styles.eventIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </ThemedView>
        ))}
      </ThemedView>
    );
  };

  if (loading && !monthData) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading calendar...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {renderCalendarHeader()}
      {renderWeekDays()}
      {renderCalendarGrid()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButton: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 8,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDay: {
    width: 36,
    textAlign: 'center',
    fontWeight: '600',
  },
  calendarGrid: {
    flex: 1,
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '16.6%',
  },
  calendarDay: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginVertical: 4,
  },
  calendarDayText: {
    textAlign: 'center',
    fontSize: 14,
  },
  outsideMonth: {
    opacity: 0.3,
  },
  today: {
    backgroundColor: '#007AFF',
  },
  todayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF9500',
    marginTop: 2,
  },
});