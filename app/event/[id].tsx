import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import { getEvents, deleteEvent, getCategoryById } from '@/utils/storage';
import { Event, Category } from '@/utils/types';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
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
        
        // Load category if exists
        if (foundEvent.categoryId) {
          const foundCategory = await getCategoryById(foundEvent.categoryId);
          if (foundCategory) {
            setCategory(foundCategory);
          }
        }
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
      <Stack.Screen options={{ title: event.title }} />
      
      <ThemedView style={styles.eventHeader}>
        <ThemedText style={styles.title}>{event.title}</ThemedText>
        {category && (
          <ThemedView 
            style={[styles.categoryBadge, { backgroundColor: category.color }]}
          >
            <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
      
      <ThemedView style={styles.detailSection}>
        <ThemedText style={styles.sectionTitle}>Time</ThemedText>
        <ThemedText>
          {event.isAllDay 
            ? 'All day' 
            : `${new Date(event.startDate).toLocaleString()} - ${new Date(event.endDate || event.startDate).toLocaleString()}`
          }
        </ThemedText>
      </ThemedView>
      
      {event.location && (
        <ThemedView style={styles.detailSection}>
          <ThemedText style={styles.sectionTitle}>Location</ThemedText>
          <ThemedText>{event.location}</ThemedText>
        </ThemedView>
      )}
      
      {event.description && (
        <ThemedView style={styles.detailSection}>
          <ThemedText style={styles.sectionTitle}>Description</ThemedText>
          <ThemedText>{event.description}</ThemedText>
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
          style={{ flex: 1, marginLeft: 8, backgroundColor: 'red' }}
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