import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event, Settings } from './types';

// Keys
const EVENTS_KEY = '@CuteCalendar:events';
const SETTINGS_KEY = '@CuteCalendar:settings';

// Default settings
const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  defaultView: 'month',
  defaultReminderTime: 30, // 30 minutes before
  startDayOfWeek: 0, // Sunday
};

// Events
export async function getEvents(): Promise<Event[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(EVENTS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error reading events from storage', e);
    return [];
  }
}

export async function saveEvents(events: Event[]): Promise<void> {
  try {
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Error saving events to storage', e);
  }
}

export async function addEvent(event: Event): Promise<void> {
  const events = await getEvents();
  events.push(event);
  await saveEvents(events);
}

export async function updateEvent(updatedEvent: Event): Promise<void> {
  const events = await getEvents();
  const index = events.findIndex(event => event.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    await saveEvents(events);
  }
}

export async function deleteEvent(eventId: string): Promise<void> {
  const events = await getEvents();
  const filteredEvents = events.filter(event => event.id !== eventId);
  await saveEvents(filteredEvents);
}

export async function getEventsByDate(date: string): Promise<Event[]> {
  const events = await getEvents();
  return events.filter(event => {
    const eventDate = new Date(event.startDate);
    const targetDate = new Date(date);
    return (
      eventDate.getFullYear() === targetDate.getFullYear() &&
      eventDate.getMonth() === targetDate.getMonth() &&
      eventDate.getDate() === targetDate.getDate()
    );
  });
}

export async function getEventsByMonth(year: number, month: number): Promise<Event[]> {
  const events = await getEvents();
  return events.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}

// Settings
export async function getSettings(): Promise<Settings> {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : DEFAULT_SETTINGS;
  } catch (e) {
    console.error('Error reading settings from storage', e);
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to storage', e);
  }
}

export async function updateSetting<K extends keyof Settings>(
  key: K, 
  value: Settings[K]
): Promise<void> {
  const settings = await getSettings();
  settings[key] = value;
  await saveSettings(settings);
}

// Clear all data (for testing/reset)
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([EVENTS_KEY, SETTINGS_KEY]);
  } catch (e) {
    console.error('Error clearing data', e);
  }
}

// Initialize with default data if storage is empty
export async function initializeDataIfNeeded(): Promise<void> {
  const events = await getEvents();
  const settings = await getSettings();
  
  if (events.length === 0 && !settings) {
    // Initialize with default settings
    await saveSettings(DEFAULT_SETTINGS);
  }
}