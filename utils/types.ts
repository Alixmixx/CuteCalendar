// Event type definition
export interface Event {
  id: string;              // Unique identifier
  title: string;           // Event title
  description?: string;    // Optional description
  startDate: string;       // ISO date string
  endDate?: string;        // ISO date string (optional for all-day events)
  location?: string;       // Optional location
  categoryId?: string;     // Optional category reference
  isAllDay: boolean;       // Flag for all-day events
  reminder?: number;       // Minutes before event to trigger reminder
  recurring?: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;      // Recurrence interval
    endDate?: string;      // When recurrence ends (optional)
  };
  color?: string;          // Optional custom color override
}

// Category type definition
export interface Category {
  id: string;              // Unique identifier
  name: string;            // Category name
  color: string;           // Color for events in this category
}

// App Settings type definition
export interface Settings {
  theme: 'light' | 'dark' | 'system';
  defaultView: 'month' | 'week' | 'day';
  defaultReminderTime: number;  // Default minutes before event
  startDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;  // 0 = Sunday, 1 = Monday, etc.
}

// Calendar date cell data
export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: Event[];
}

// Month grid data
export interface MonthData {
  year: number;
  month: number;
  days: CalendarDay[];
}

// Week view data
export interface WeekData {
  startDate: Date;
  endDate: Date;
  days: CalendarDay[];
}

// Time slot for day/week views
export interface TimeSlot {
  hour: number;
  minute: number;
  events: Event[];
}

// Day view data
export interface DayData {
  date: Date;
  timeSlots: TimeSlot[];
}