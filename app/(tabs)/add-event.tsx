import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, Switch } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
import { addEvent } from '@/utils/storage';
import { Event } from '@/utils/types';

export default function AddEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isAllDay, setIsAllDay] = useState(false);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const [reminder, setReminder] = useState<number | undefined>(undefined);

  const handleCreateEvent = async () => {
    // Generate a unique ID
    const id = Date.now().toString();
    
    // Create the event object
    const newEvent: Event = {
      id,
      title,
      description,
      location,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isAllDay,
      categoryId,
      reminder,
    };
    
    // Save the event
    await addEvent(newEvent);
    
    // Navigate back to the events screen
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.title}>Add Event</ThemedText>
        
        <ThemedText style={styles.label}>Title</ThemedText>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Event title"
        />
        
        <ThemedText style={styles.label}>Description</ThemedText>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Event description"
          multiline
          numberOfLines={4}
        />
        
        <ThemedText style={styles.label}>Location</ThemedText>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Location"
        />
        
        <ThemedText style={styles.label}>All Day</ThemedText>
        <Switch
          value={isAllDay}
          onValueChange={setIsAllDay}
        />
        
        {/* Date and time pickers would go here */}
        
        <Button 
          title="Create Event"
          onPress={handleCreateEvent}
          variant="primary"
          size="lg"
          style={{ marginTop: 24, marginBottom: 40 }}
          fullWidth
        />
      </ScrollView>
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
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  }
});