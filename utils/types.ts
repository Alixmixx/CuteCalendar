// Event type definition
export interface Event {
  id: string;              // Unique identifier
  contact: Contact;
  startDate: string;       // ISO date string
  reminder?: number;       // Minutes before event to trigger reminder
}

// Contact
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  notes: string
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