import type { PropsWithChildren } from 'react';
import { StyleSheet, ScrollView, type ScrollViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

import { ThemedView } from '@/components/ThemedView';

type ThemedScrollViewProps = ScrollViewProps &
  PropsWithChildren<{
    lightColor?: string;
    darkColor?: string;
  }>;

export default function ThemedScrollView({
  children,
  lightColor,
  darkColor,
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return (
    <ScrollView style={[{ backgroundColor }, styles.container]}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
