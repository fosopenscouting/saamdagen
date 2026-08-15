import React from 'react';
import { HeaderText, View } from '@/components/Themed/Themed';
import { StyleSheet } from 'react-native';
import { Text } from '@/components/Themed/Text';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import useColorScheme from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';
import { DatabaseNotification } from '@/models/Notification';

export default function NotificationsItem({
  title,
  message,
  sentAt,
}: DatabaseNotification & {
  key?: string;
}) {
  const df = new Intl.DateTimeFormat('nl-BE', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  const sentAtDate = new Date(sentAt);

  const colorScheme = useColorScheme();

  return (
    <View style={styles.card}>
      <View style={styles.titleBar}>
        <HeaderText variant="titleMedium">{title}</HeaderText>
        <View style={styles.sentAt}>
          <MaterialDesignIcons
            name="send-clock-outline"
            size={16}
            color={Colors[colorScheme].muted}
          />
          <Text
            variant="bodySmall"
            style={{
              color: Colors[colorScheme].muted,
            }}
          >
            {df.format(sentAtDate)}
          </Text>
        </View>
      </View>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    alignItems: 'stretch',
    paddingVertical: 16,
    paddingHorizontal: 16,
    display: 'flex',
    flex: 1,
    backgroundColor: 'transparent',
    maxWidth: '100%',
    gap: 8,
  },
  titleBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sentAt: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
