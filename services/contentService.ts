import AsyncStorageLib from '@react-native-async-storage/async-storage';
import fm, { FrontMatterResult } from 'front-matter';
import { getContent } from '../api/api';
import { HOME_ITEMS, PROGRAM_ITEMS } from '../constants/Strings';
import { ContentMetadata } from '../models/ContentMetadata';

export const saveContent = async (paths: string[]): Promise<void> => {
  const programPrefix = 'Programma';
  const homePrefix = 'Homepage';

  const homePaths = paths.filter((x) => x.startsWith(homePrefix));
  const programPaths = paths.filter((x) => x.startsWith(programPrefix));

  const homeContent = await loadContent(homePaths);
  saveHomeContent(homeContent);
  const programContent = await loadContent(programPaths);
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

// TODO: work this out further
const saveProgramContent = async (objects: FrontMatterResult<any>[]) => {
  const mapped = objects.map((item) => {
    return {
      title: item.attributes.titel,
      order: item.attributes.volgorde,
    };
  });

  const json = JSON.stringify(mapped);
  await AsyncStorageLib.setItem(PROGRAM_ITEMS, json);
};

const wrapContentInMetadata = (content: never): ContentMetadata => {
  return {
    lastUpdated: new Date(),
    content: content,
  };
};
