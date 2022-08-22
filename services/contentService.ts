import AsyncStorageLib from '@react-native-async-storage/async-storage';
import fm, { FrontMatterResult } from 'front-matter';
import { getContent } from '../api/api';
import {
  FRIDAY_ITEMS,
  HOME_ITEMS,
  SATURDAY_ITEMS,
  SUNDAY_ITEMS,
  FAQ_ITEMS,
} from '../constants/Strings';
import { ContentMetadata } from '../models/ContentMetadata';

export const saveContent = async (paths: string[]): Promise<void> => {
  const programPrefix = 'Programma';
  const homePrefix = 'Homepage';
  const faqPrefix = 'Faq';

  const homePaths = paths.filter((x) => x.startsWith(homePrefix));
  const programPaths = paths.filter((x) => x.startsWith(programPrefix));
  const faqPaths = paths.filter((x) => x.startsWith(faqPrefix));

  const homeContent = await loadContent(homePaths);
  saveHomeContent(homeContent);
  const programContent = await loadContent(programPaths);
  saveProgramContent(programContent);
  const faqContent = await loadContent(faqPaths);
  saveFaqContent(faqContent);
};

export const loadContent = async (
  paths: string[],
): Promise<FrontMatterResult<unknown>[]> => {
  const result = paths.map(async (x) => await load(x));
  return await Promise.all(result);
};

const load = async (path: string) => {
  const content = await getContent(path);
  const parsed = fm(content);
  return parsed;
};

const saveHomeContent = async (objects: FrontMatterResult<any>[]) => {
  const mapped = objects.map((item) => {
    return {
      title: item.attributes.titel,
      order: item.attributes.volgorde,
      content: item.body,
    };
  });

  const meta = wrapContentInMetadata(mapped);
  const json = JSON.stringify(meta);
  await AsyncStorageLib.setItem(HOME_ITEMS, json);
};

const saveProgramContent = async (objects: FrontMatterResult<any>[]) => {
  const mapped = objects.map((item) => {
    return {
      name: item.attributes.titel,
      order: item.attributes.volgorde,
      location: item.attributes.locatie,
      time: item.attributes.uren,
      description: item.body,
      day: item.attributes.dag,
      type: item.attributes.type,
    };
  });

  const friday = mapped.filter((x) => x.day === 'Vrijdag');
  const saturday = mapped.filter((x) => x.day === 'Zaterdag');
  const sunday = mapped.filter((x) => x.day === 'Zondag');
  saveDayItems(friday, FRIDAY_ITEMS);
  saveDayItems(saturday, SATURDAY_ITEMS);
  saveDayItems(sunday, SUNDAY_ITEMS);
};

const saveDayItems = async (items: any[], key: string) => {
  const fridayMeta = wrapContentInMetadata(items);
  const json = JSON.stringify(fridayMeta);
  await AsyncStorageLib.setItem(key, json);
};

const saveFaqContent = async (objects: FrontMatterResult<any>[]) => {
  const mapped = objects.map((item) => {
    return {
      title: item.attributes.titel,
      order: item.attributes.volgorde,
      icon: item.attributes.icoon,
      content: item.body,
    };
  });

  const meta = wrapContentInMetadata(mapped);
  const json = JSON.stringify(meta);
  await AsyncStorageLib.setItem(FAQ_ITEMS, json);
};

const wrapContentInMetadata = (content: any): ContentMetadata => {
  return {
    lastUpdated: new Date(),
    content: content,
  };
};
