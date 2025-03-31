/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import fm, { FrontMatterResult } from 'front-matter';
import { getMarkdown } from '@/api/api';
import {
  FRIDAY_ITEMS,
  HOME_ITEMS,
  SATURDAY_ITEMS,
  SUNDAY_ITEMS,
  FAQ_ITEMS,
  VOLUNTEER_ITEMS,
  NOTIFICATIONS_ITEMS,
  // MAP_ITEMS,
} from '@/constants/Strings';
import { ContentMetadata, createMetadata } from '@/models/ContentMetadata';
import {
  mapFaq,
  mapHomeItems,
  mapNotfication,
  mapProgram,
  mapVolunteer,
} from './contentMapping';
import { Image } from 'expo-image';
import * as Notifications from 'expo-notifications';
import { Notification } from '@/models/Notification';
import { getSettings } from './settingsService';

const programPrefix = 'Programma';
const homePrefix = 'Homepage';
const faqPrefix = 'Faq';
// const mapPrefix = 'Kaart';
const volunteerPrefix = 'Volunteer';
const notificationPrefix = 'Notifications';
const IMAGE_PATTERN = new RegExp(/!\[.*\]\(.*\)/gim); // Images in markdown are ![alt](link)

// Load all content from the API, parse it to the format we want and then save it as one huge array in local storage.
export const saveContent = async (paths: string[]): Promise<void> => {
  // Filter out paths per screen, each needs a different mapping logic
  const homePaths = paths.filter((x) => x.startsWith(homePrefix));
  const programPaths = paths.filter((x) => x.startsWith(programPrefix));
  const faqPaths = paths.filter((x) => x.startsWith(faqPrefix));
  // const mapPaths = paths.filter((x) => x.startsWith(mapPrefix));
  const volunteerPaths = paths.filter((x) => x.startsWith(volunteerPrefix));
  const notificationPaths = paths.filter((x) =>
    x.startsWith(notificationPrefix),
  );

  // HOME - Load and wrap in metadata
  const homeMarkdown = await loadContent(homePaths);
  const homeContent = createMetadata(mapHomeItems(homeMarkdown), HOME_ITEMS);

  // PROGRAM - Load and wrap in metadata
  const programMarkdown = await loadContent(programPaths);
  const parsedProgram = await parseProgramContent(programMarkdown);

  // FAQ - Load and wrap in metadata
  const faqMarkdown = await loadContent(faqPaths);
  const faqContent = createMetadata(mapFaq(faqMarkdown), FAQ_ITEMS);

  // MAP - Currently not needed because we use a static image for map
  // const mapMarkdown = await loadContent(mapPaths);
  // const mapContent = createMetadata(mapMap(mapMarkdown), MAP_ITEMS);

  // VOLUNTEER - Load and wrap in metadata
  const volunteerMarkdown = await loadContent(volunteerPaths);
  const volunteerContent = createMetadata(
    mapVolunteer(volunteerMarkdown),
    VOLUNTEER_ITEMS,
  );

  // Notifications
  const notificationsMarkdown = await loadContent(notificationPaths);
  const notificationsContent = createMetadata(
    mapNotfication(notificationsMarkdown),
    NOTIFICATIONS_ITEMS,
  );

  scheduleNotifications(notificationsContent);

  const allData = [
    homeContent,
    ...parsedProgram,
    faqContent,
    volunteerContent,
    notificationsContent,
  ];

  let prefetchedImages = await AsyncStorageLib.getItem('IMAGES');
  prefetchedImages = prefetchedImages ? JSON.parse(prefetchedImages) : [];

  const images = await listAllImages([
    ...homeMarkdown,
    ...programMarkdown,
    ...faqMarkdown,
    ...volunteerMarkdown,
  ]);
  const filteredImages = images.filter(
    (img) => !prefetchedImages?.includes(img),
  );

  if (filteredImages.length > 0) {
    await Image.prefetch(filteredImages);
  }

  await AsyncStorageLib.setItem('DATA', JSON.stringify(allData));
  await AsyncStorageLib.setItem('IMAGES', JSON.stringify(images));
};

// Load all provided paths into async storage
export const loadContent = async (
  paths: string[],
): Promise<FrontMatterResult<unknown>[]> => {
  const result = paths.map(async (x) => {
    const content = await getMarkdown(x);
    const parsed = fm(content);
    return parsed;
  });
  return await Promise.all(result);
};

const parseProgramContent = async (objects: FrontMatterResult<any>[]) => {
  const mapped = mapProgram(objects);

  const friday = mapped.filter((x) => x.day === 'Vrijdag');
  const saturday = mapped.filter((x) => x.day === 'Zaterdag');
  const sunday = mapped.filter((x) => x.day === 'Zondag');

  const fridayParsed = createMetadata(friday, FRIDAY_ITEMS);
  const saturDayParsed = createMetadata(saturday, SATURDAY_ITEMS);
  const sundayParsed = createMetadata(sunday, SUNDAY_ITEMS);

  return [fridayParsed, saturDayParsed, sundayParsed];
};

const listAllImages = async (content: FrontMatterResult<any>[]) => {
  const imageList: string[] = [];

  content.forEach((item) => {
    if (IMAGE_PATTERN.test(item.body)) {
      const bodySplit = item.body.split(/\r?\n/);

      bodySplit.forEach((line) => {
        if (IMAGE_PATTERN.test(line)) {
          const url = line.split('](')[1].split(')')[0];
          imageList.push(url);
        }
      });
    }
  });

  return imageList.filter((u) => !u.startsWith('@'));
};

const scheduleNotifications = async (
  notifs: ContentMetadata<Notification[]>,
) => {
  const settings = await getSettings()
  if(settings.MESSAGING) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    for (const notification of notifs.content) {
      const date = new Date()
      const dateParsed = notification.time.date.split('/')
  
      date.setDate(parseInt(dateParsed[0]))
      date.setMonth(parseInt(dateParsed[1]) - 1)
      date.setFullYear(parseInt(dateParsed[2]))
  
      date.setHours(parseInt(notification.time.hour.split(':')[0]))
      date.setMinutes(parseInt(notification.time.hour.split(':')[1]))
  
      if(date < new Date()) continue;

      Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          subtitle: notification.subtitle,
          body: notification.content,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date
        },
      });
    }
  }
};
