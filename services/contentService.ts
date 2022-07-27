import AsyncStorageLib from '@react-native-async-storage/async-storage';
import fm, { FrontMatterResult } from 'front-matter';
import { getContent } from '../api/api';

export const saveContent = async (paths: string[]) => {
  const programPrefix = 'Programma';
  const homePrefix = 'Homepage';

  const homePaths = paths.filter((x) => x.startsWith(homePrefix));
  const programPaths = paths.filter((x) => x.startsWith(programPrefix));

  const homeContent = await loadContent(homePaths);
  saveHomeContent(homeContent);
  const programContent = await loadContent(programPaths);
};

export const loadContent = async (paths: string[]) => {
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
    };
  });

  const json = JSON.stringify(mapped);
  await AsyncStorageLib.setItem('@home', json);
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
  await AsyncStorageLib.setItem('@home', json);
};
