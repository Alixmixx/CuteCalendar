import { PropsWithChildren, useState } from 'react';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Button from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { AppTheme } from '@/constants/Theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ThemedView>
      <Button
        title={title}
        onPress={() => setIsOpen((value) => !value)}
        variant="ghost"
        size="md"
        style={styles.heading}
        leftIcon={
          <IconSymbol
            name="chevron.right"
            size={18}
            weight="medium"
            color={AppTheme.colors.icon}
            style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
          />
        }
        textStyle={{ fontWeight: '600' }}
      />
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignSelf: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 4
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
