import React, { useEffect, useState } from "react";
import { FlatList, ViewStyle, TextStyle } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AppTheme } from "@/constants/Theme";

// Import your actual types
import { Event, Contact } from "@/utils/types";

// --- Mock implementations (remove or replace with your actuals) ---
// Mock function to simulate fetching all events
const mockGetAllEvents = async (): Promise<Event[]> => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const mockContacts: Contact[] = [
    {
      id: "c1",
      name: "Alice Wonderland",
      phone: "123-456-7890",
      email: "alice@example.com",
      notes: "Met at conference",
    },
    {
      id: "c2",
      name: "Bob The Builder",
      phone: "234-567-8901",
      email: "bob@example.com",
      notes: "Project lead",
    },
    {
      id: "c3",
      name: "Charlie Brown",
      phone: "345-678-9012",
      email: "charlie@example.com",
      notes: "Client",
    },
    {
      id: "c4",
      name: "Diana Prince",
      phone: "456-789-0123",
      email: "diana@example.com",
      notes: "Lunch meeting",
    },
    {
      id: "c5",
      name: "National Holidays",
      phone: "N/A",
      email: "N/A",
      notes: "Public holidays",
    },
    {
      id: "c6",
      name: "Family Events",
      phone: "N/A",
      email: "N/A",
      notes: "Personal",
    },
  ];

  const mockEventsList: Event[] = [
    {
      id: "e1",
      contact: mockContacts[0],
      startDate: new Date(
        currentYear,
        currentMonth,
        currentDay,
        10,
        0
      ).toISOString(),
      reminder: 30,
    },
    {
      id: "e2",
      contact: mockContacts[1],
      startDate: new Date(
        currentYear,
        currentMonth,
        currentDay + 1,
        15,
        0
      ).toISOString(),
    },
    {
      id: "e3",
      contact: mockContacts[2],
      startDate: new Date(
        currentYear,
        currentMonth,
        currentDay + 2,
        12,
        30
      ).toISOString(),
      reminder: 60,
    },
    {
      id: "e4",
      contact: mockContacts[3],
      startDate: new Date(
        currentYear,
        currentMonth,
        currentDay - 1,
        16,
        0
      ).toISOString(),
    }, // Event in the past
    {
      id: "e5",
      contact: mockContacts[0],
      startDate: new Date(
        currentYear,
        currentMonth,
        currentDay,
        14,
        0
      ).toISOString(),
    },
    // Adding events from the image, mapping them to the new structure
    {
      id: "imgEv1",
      contact: { ...mockContacts[4], name: "Fête de la Victoire 1945" },
      startDate: new Date(2025, 4, 8, 9, 0).toISOString(),
    }, // May 8th
    {
      id: "imgEv2",
      contact: { ...mockContacts[5], name: "Fête des Mères" },
      startDate: new Date(2025, 4, 25, 12, 0).toISOString(),
    }, // May 25th
    {
      id: "imgEv3",
      contact: { ...mockContacts[4], name: "L'Ascension" },
      startDate: new Date(2025, 4, 29, 9, 0).toISOString(),
    }, // May 29th
    {
      id: "imgEv4",
      contact: { ...mockContacts[4], name: "Pentecôte" },
      startDate: new Date(2025, 5, 8, 9, 0).toISOString(),
    }, // June 8th
    {
      id: "imgEv5",
      contact: { ...mockContacts[4], name: "Le lundi de Pentecôte" },
      startDate: new Date(2025, 5, 9, 9, 0).toISOString(),
    }, // June 9th
  ];
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockEventsList), 100)
  );
};
// Assume getEvents is your actual data fetching function
// import { getAllEvents } from '@/utils/storage'; // Example if you have such a function
// --- End Mock implementations ---

export default function EventListScreen() {
  const [scheduledEvents, setScheduledEvents] = useState<FormattedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  interface FormattedEvent {
    id: string;
    // date: Date; // The specific date of the event - can be derived from originalStartDate
    originalStartDate: Date; // The precise start date and time
    contactName: string;
    contactDetails: Contact; // Keep full contact details if needed for item press etc.
    reminder?: number;
  }

  useEffect(() => {
    // Use your actual function to get all events
    const actualGetAllEvents = mockGetAllEvents;

    const loadEvents = async () => {
      setLoading(true);
      const eventsData = await actualGetAllEvents();

      const allEventsFormatted: FormattedEvent[] = eventsData
        .map((event) => ({
          id: event.id,
          originalStartDate: new Date(event.startDate),
          contactName: event.contact.name,
          contactDetails: event.contact,
          reminder: event.reminder,
        }))
        .sort(
          (a, b) =>
            a.originalStartDate.getTime() - b.originalStartDate.getTime()
        ); // Sort by date

      setScheduledEvents(allEventsFormatted);
      setLoading(false);
    };

    loadEvents();
  }, []); // Empty dependency array to run once on mount

  const themedStyles = {
    container: {
      flex: 1,
      backgroundColor: AppTheme.colors.background,
    } as ViewStyle,
    listContainer: {
      flex: 1,
      // paddingHorizontal: AppTheme.spacing.md, // Let items manage their padding if full-width separators
    } as ViewStyle,
    currentDateHeader: {
      fontSize: AppTheme.typography.fontSize.lg,
      fontFamily: AppTheme.typography.fontFamily.medium,
      color: AppTheme.colors.text,
      paddingVertical: AppTheme.spacing.md,
      paddingHorizontal: AppTheme.spacing.md, // Add horizontal padding for this header
      backgroundColor: AppTheme.colors.surface, // Give it a slightly different bg
      borderBottomWidth: 1,
      borderBottomColor: AppTheme.colors.border,
      marginBottom: AppTheme.spacing.sm,
    } as TextStyle,
    scheduleItem: {
      flexDirection: "row",
      paddingVertical: AppTheme.spacing.md,
      paddingHorizontal: AppTheme.spacing.md, // Padding inside each item
      borderBottomWidth: 1,
      borderBottomColor: AppTheme.colors.border,
      alignItems: "flex-start", // Changed to flex-start for better multi-line text handling
      backgroundColor: AppTheme.colors.surface,
    } as ViewStyle,
    dateContainer: {
      alignItems: "center",
      justifyContent: "flex-start", // Align to top
      marginRight: AppTheme.spacing.md,
      width: 55, // Kept width for consistency in date display
      paddingTop: AppTheme.spacing.xs, // Small padding to align with text
    } as ViewStyle,
    scheduleDateNumber: {
      fontSize: AppTheme.typography.fontSize.xl,
      fontFamily: AppTheme.typography.fontFamily.regular,
      color: AppTheme.colors.primary,
    } as TextStyle,
    scheduleDateDayName: {
      fontSize: AppTheme.typography.fontSize.xs,
      fontFamily: AppTheme.typography.fontFamily.medium,
      color: AppTheme.colors.textSecondary,
      letterSpacing: 0.5,
      marginTop: AppTheme.spacing.xs,
    } as TextStyle,
    eventDetails: {
      flex: 1,
      paddingTop: AppTheme.spacing.xs, // Small padding to align with date display
    } as ViewStyle,
    scheduleContactName: {
      // Was scheduleTitle
      fontSize: AppTheme.typography.fontSize.md,
      fontFamily: AppTheme.typography.fontFamily.bold,
      color: AppTheme.colors.text,
      marginBottom: AppTheme.spacing.xs,
    } as TextStyle,
    scheduleTime: {
      fontSize: AppTheme.typography.fontSize.sm,
      fontFamily: AppTheme.typography.fontFamily.regular,
      color: AppTheme.colors.textSecondary,
      marginBottom: AppTheme.spacing.xs,
    } as TextStyle,
    // Removed scheduleContact style as contact name is the primary identifier now
    // If you want to display more contact details like phone/email, you can add styles for them
    loadingText: {
      textAlign: "center",
      marginTop: AppTheme.spacing.lg,
      fontSize: AppTheme.typography.fontSize.md,
      color: AppTheme.colors.textSecondary,
    } as TextStyle,
    noEventsText: {
      textAlign: "center",
      marginTop: AppTheme.spacing.lg,
      fontSize: AppTheme.typography.fontSize.md,
      color: AppTheme.colors.textSecondary,
    } as TextStyle,
  };

  const renderScheduleItem = ({ item }: { item: FormattedEvent }) => {
    const eventDate = item.originalStartDate;
    const dayNumber = eventDate.toLocaleDateString(undefined, {
      day: "numeric",
    });
    const dayName = eventDate
      .toLocaleDateString(undefined, { weekday: "short" })
      .toUpperCase();
    const time = eventDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <ThemedView style={themedStyles.scheduleItem}>
        <ThemedView
          style={themedStyles.dateContainer}
        >
          <ThemedText style={themedStyles.scheduleDateNumber}>
            {dayNumber}
          </ThemedText>
          <ThemedText style={themedStyles.scheduleDateDayName}>
            {dayName}
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={themedStyles.eventDetails}
        >
          <ThemedText style={themedStyles.scheduleContactName}>
            {item.contactName}
          </ThemedText>
          <ThemedText style={themedStyles.scheduleTime}>{time}</ThemedText>
          {/* You could add more contact details here if needed, e.g.: */}
          {/* <ThemedText style={{...themedStyles.scheduleTime, color: AppTheme.colors.accent}}>{item.contactDetails.phone}</ThemedText> */}
        </ThemedView>
      </ThemedView>
    );
  };

  const renderEventList = () => {
    if (loading) {
      return (
        <ThemedText style={themedStyles.loadingText}>
          Loading events...
        </ThemedText>
      );
    }
    if (!scheduledEvents.length) {
      return (
        <ThemedText style={themedStyles.noEventsText}>
          No events scheduled.
        </ThemedText>
      );
    }

    const today = new Date();
    // Formatting the date to include the day of the week.
    // Example: "Today: Wednesday, May 7, 2025"
    const todayFormatted = `Today: ${today.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;

    return (
      <ThemedView style={themedStyles.listContainer}>
        <ThemedText style={themedStyles.currentDateHeader}>
          {todayFormatted}
        </ThemedText>
        <FlatList
          data={scheduledEvents}
          renderItem={renderScheduleItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ThemedView>
    );
  };

  return (
    <ThemedView style={themedStyles.container}>
      {/* Header with month navigation is removed */}
      {renderEventList()}
    </ThemedView>
  );
}
