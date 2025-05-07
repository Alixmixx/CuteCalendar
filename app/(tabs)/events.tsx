import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getEvents } from '@/utils/storage';
import { Event } from '@/utils/types';

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    const eventsData = await getEvents();
    // Sort events by start date
    const sortedEvents = [...eventsData].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    setEvents(sortedEvents);
    setLoading(false);
  };

  const renderEventItem = ({ item }: { item: Event }) => {
    return (
      <ThemedView style={styles.eventItem}>
        <ThemedText style={styles.eventTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.eventDate}>
          {new Date(item.startDate).toLocaleString()}
        </ThemedText>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Upcoming Events</ThemedText>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        onRefresh={loadEvents}
        refreshing={loading}
        ListEmptyComponent={
          !loading ? (
            <ThemedText style={styles.emptyText}>
              No events found. Tap + to add a new event.
            </ThemedText>
          ) : null
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  eventDate: {
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});