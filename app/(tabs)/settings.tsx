import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/ui/Button';
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
          <Button
            title="Light"
            onPress={() => handleThemeChange('light')}
            variant={settings.theme === 'light' ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
          <Button
            title="Dark"
            onPress={() => handleThemeChange('dark')}
            variant={settings.theme === 'dark' ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
          <Button
            title="System"
            onPress={() => handleThemeChange('system')}
            variant={settings.theme === 'system' ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
        </ThemedView>
      </ThemedView>
      
      <ThemedText style={styles.sectionTitle}>Calendar</ThemedText>
      <ThemedView style={styles.settingItem}>
        <ThemedText>Default View</ThemedText>
        <ThemedView style={styles.radioGroup}>
          <Button
            title="Month"
            onPress={() => handleDefaultViewChange('month')}
            variant={settings.defaultView === 'month' ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
          <Button
            title="Week"
            onPress={() => handleDefaultViewChange('week')}
            variant={settings.defaultView === 'week' ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
          <Button
            title="Day"
            onPress={() => handleDefaultViewChange('day')}
            variant={settings.defaultView === 'day' ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
        </ThemedView>
      </ThemedView>
      
      <ThemedView style={styles.settingItem}>
        <ThemedText>Start Week on</ThemedText>
        <ThemedView style={styles.radioGroup}>
          <Button
            title="Sunday"
            onPress={() => handleStartDayChange(0)}
            variant={settings.startDayOfWeek === 0 ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
          <Button
            title="Monday"
            onPress={() => handleStartDayChange(1)}
            variant={settings.startDayOfWeek === 1 ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
        </ThemedView>
      </ThemedView>
      
      <ThemedText style={styles.sectionTitle}>Reminders</ThemedText>
      <ThemedView style={styles.settingItem}>
        <ThemedText>Default Reminder Time</ThemedText>
        <ThemedView style={styles.radioGroup}>
          <Button
            title="5 min"
            onPress={() => handleReminderTimeChange(5)}
            variant={settings.defaultReminderTime === 5 ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
          <Button
            title="15 min"
            onPress={() => handleReminderTimeChange(15)}
            variant={settings.defaultReminderTime === 15 ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
          <Button
            title="30 min"
            onPress={() => handleReminderTimeChange(30)}
            variant={settings.defaultReminderTime === 30 ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
          <Button
            title="1 hour"
            onPress={() => handleReminderTimeChange(60)}
            variant={settings.defaultReminderTime === 60 ? "primary" : "outline"}
            size="sm"
            style={styles.radioButton}
          />
        </ThemedView>
      </ThemedView>
      
      <ThemedText style={styles.sectionTitle}>Data</ThemedText>
      <Button
        title="Reset All Data"
        onPress={handleResetData}
        variant="secondary"
        size="md"
        style={{ backgroundColor: 'red', marginTop: 8 }}
        textStyle={{ color: 'white' }}
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
    marginRight: 8,
    marginBottom: 8,
  }
});