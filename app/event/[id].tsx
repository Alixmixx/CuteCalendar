import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import { getEvents, deleteEvent } from '@/utils/storage';
import { Event } from '@/utils/types';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEventDetails();
  }, [id]);

  const loadEventDetails = async () => {
    if (!id) return;
    
    setLoading(true);
    
    try {
      const events = await getEvents();
      const foundEvent = events.find(e => e.id === id);
      
      if (foundEvent) {
        setEvent(foundEvent);
      }
    } catch (error) {
      console.error('Error loading event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    if (!event) return;
    
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await deleteEvent(event.id);
            router.back();
          }
        }
      ]
    );
  };

  const handleEditEvent = () => {
    if (!event) return;
    // Navigate to edit screen with event id
    // router.push(`/edit-event/${event.id}`);
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: 'Loading...' }} />
        <ThemedText>Loading event details...</ThemedText>
      </ThemedView>
    );
  }

  if (!event) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <ThemedText>Event not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: event.contact.name }} />
      
      <ThemedView style={styles.eventHeader}>
        <ThemedText style={styles.title}>{event.contact.name}</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.detailSection}>
        <ThemedText style={styles.sectionTitle}>Time</ThemedText>
        <ThemedText>
          {new Date(event.startDate).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </ThemedText>
        <ThemedText>
          {new Date(event.startDate).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })}
        </ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.detailSection}>
        <ThemedText style={styles.sectionTitle}>Contact Details</ThemedText>
        <ThemedText>Phone: {event.contact.phone}</ThemedText>
        <ThemedText>Email: {event.contact.email}</ThemedText>
      </ThemedView>
      
      {event.contact.notes && (
        <ThemedView style={styles.detailSection}>
          <ThemedText style={styles.sectionTitle}>Notes</ThemedText>
          <ThemedText>{event.contact.notes}</ThemedText>
        </ThemedView>
      )}
      
      {event.reminder !== undefined && (
        <ThemedView style={styles.detailSection}>
          <ThemedText style={styles.sectionTitle}>Reminder</ThemedText>
          <ThemedText>{event.reminder} minutes before</ThemedText>
        </ThemedView>
      )}
      
      <ThemedView style={styles.actions}>
        <Button 
          title="Edit"
          onPress={handleEditEvent}
          variant="primary"
          size="md"
          style={{ flex: 1, marginRight: 8 }}
        />
        
        <Button 
          title="Delete"
          onPress={handleDeleteEvent}
          variant="secondary"
          size="md"
          style={{ flex: 1, marginLeft: 8, backgroundColor: '#E53E3E' }}
          textStyle={{ color: 'white' }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  eventHeader: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
  },
  detailSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  }
});