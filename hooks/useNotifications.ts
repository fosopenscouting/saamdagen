import React from 'react';
import * as Notifications from 'expo-notifications';
import { not } from 'react-native-reanimated';
import { YearlyTriggerInput } from 'expo-notifications';

const notifications = [
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 35,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 38,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 39,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 40,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 43,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 45,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 47,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 49,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 51,
  },
  {
    title: 'Nieuwe sidequest!',
    body: 'Er is een nieuwe sidequest gestart, ga naar het centraal punt om te weten welke',
    hour: 9,
    minute: 53,
  },
];

const useNotifications = () => {
  React.useEffect(() => {
   /* Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });*/
    const cancelCurrentAndScheduleNew = async () => {
      await Notifications.cancelAllScheduledNotificationsAsync();

      notifications.forEach(async (notif) => {
        const trigger: YearlyTriggerInput = {
          day: 7,
          month: 9,
          hour: notif.hour,
          minute: notif.minute,
          repeats: true,
        };
        Notifications.scheduleNotificationAsync({
          content: {
            title: notif.title,
            body: notif.body,
          },
          trigger,
        });
      });
    };

    cancelCurrentAndScheduleNew();
  }, []);
};

export default useNotifications;
