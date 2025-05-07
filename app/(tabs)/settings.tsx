import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { getSettings, updateSetting, clearAllData } from '@/utils/storage';
import { Settings } from '@/utils/types';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const settingsData = await getSettings();
    setSettings(settingsData);
    setLoading(false);
  };

  const handleThemeChange = async (value: 'light' | 'dark' | 'system') => {
    if (!settings) return;
    await updateSetting('theme', value);
    setSettings({ ...settings, theme: value });
  };

  const handleDefaultViewChange = async (value: 'month' | 'week' | 'day') => {
    if (!settings) return;
    await updateSetting('defaultView', value);
    setSettings({ ...settings, defaultView: value });
  };

  const handleStartDayChange = async (value: 0 | 1) => {
    if (!settings) return;
    await updateSetting('startDayOfWeek', value);
    setSettings({ ...settings, startDayOfWeek: value });
  };

  const handleReminderTimeChange = async (value: number) => {
    if (!settings) return;
    await updateSetting('defaultReminderTime', value);
    setSettings({ ...settings, defaultReminderTime: value });
  };

  const handleResetData = async () => {
    await clearAllData();
    loadSettings();
  };

  if (loading || !settings) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading settings...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Settings</ThemedText>
      
      <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
      <ThemedView style={styles.settingItem}>
        <ThemedText>Theme</ThemedText>
        <ThemedView style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, settings.theme === 'light' && styles.radioButtonSelected]}
            onPress={() => handleThemeChange('light')}
          >
            <ThemedText>Light</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, settings.theme === 'dark' && styles.radioButtonSelected]}
            onPress={() => handleThemeChange('dark')}
          >
            <ThemedText>Dark</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, settings.theme === 'system' && styles.radioButtonSelected]}
            onPress={() => handleThemeChange('system')}
          >
            <ThemedText>System</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      <ThemedText style={styles.sectionTitle}>Calendar</ThemedText>
      <ThemedView style={styles.settingItem}>
        <ThemedText>Default View</ThemedText>
        <ThemedView style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, settings.defaultView === 'month' && styles.radioButtonSelected]}
            onPress={() => handleDefaultViewChange('month')}
          >
            <ThemedText>Month</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, settings.defaultView === 'week' && styles.radioButtonSelected]}
            onPress={() => handleDefaultViewChange('week')}
          >
            <ThemedText>Week</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, settings.defaultView === 'day' && styles.radioButtonSelected]}
            onPress={() => handleDefaultViewChange('day')}
          >
            <ThemedText>Day</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.settingItem}>
        <ThemedText>Start Week on</ThemedText>
        <ThemedView style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, settings.startDayOfWeek === 0 && styles.radioButtonSelected]}
            onPress={() => handleStartDayChange(0)}
          >
            <ThemedText>Sunday</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, settings.startDayOfWeek === 1 && styles.radioButtonSelected]}
            onPress={() => handleStartDayChange(1)}
          >
            <ThemedText>Monday</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      <ThemedText style={styles.sectionTitle}>Reminders</ThemedText>
      <ThemedView style={styles.settingItem}>
        <ThemedText>Default Reminder Time</ThemedText>
        <ThemedView style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioButton, settings.defaultReminderTime === 5 && styles.radioButtonSelected]}
            onPress={() => handleReminderTimeChange(5)}
          >
            <ThemedText>5 min</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, settings.defaultReminderTime === 15 && styles.radioButtonSelected]}
            onPress={() => handleReminderTimeChange(15)}
          >
            <ThemedText>15 min</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, settings.defaultReminderTime === 30 && styles.radioButtonSelected]}
            onPress={() => handleReminderTimeChange(30)}
          >
            <ThemedText>30 min</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, settings.defaultReminderTime === 60 && styles.radioButtonSelected]}
            onPress={() => handleReminderTimeChange(60)}
          >
            <ThemedText>1 hour</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      <ThemedText style={styles.sectionTitle}>Data</ThemedText>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={handleResetData}
      >
        <ThemedText style={styles.resetButtonText}>Reset All Data</ThemedText>
      </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  settingItem: {
    marginBottom: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#007AFF',
  },
  resetButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});