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
  // MAP_ITEMS,
} from '@/constants/Strings';
import { createMetadata } from '@/models/ContentMetadata';
import { mapFaq, mapHomeItems, mapProgram } from './contentMapping';
import { Image } from 'expo-image';

const programPrefix = 'Programma';
const homePrefix = 'Homepage';
const faqPrefix = 'Faq';
// const mapPrefix = 'Kaart';
const IMAGE_PATTERN = new RegExp(/!\[.*\]\(.*\)/gim); // Images in markdown are ![alt](link)

// Load all content from the API, parse it to the format we want and then save it as one huge array in local storage.
export const saveContent = async (paths: string[]): Promise<void> => {
  // Filter out paths per screen, each needs a different mapping logic
  const homePaths = paths.filter((x) => x.startsWith(homePrefix));
  const programPaths = paths.filter((x) => x.startsWith(programPrefix));
  const faqPaths = paths.filter((x) => x.startsWith(faqPrefix));
  // const mapPaths = paths.filter((x) => x.startsWith(mapPrefix));

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

  const allData = [homeContent, ...parsedProgram, faqContent];

  let prefetchedImages = await AsyncStorageLib.getItem('IMAGES');
  prefetchedImages = prefetchedImages ? JSON.parse(prefetchedImages) : [];

  const images = await listAllImages(paths);
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

const listAllImages = async (paths: string[]) => {
  const everything = await loadContent(paths);
  const imageList: string[] = [];

  everything.forEach((item) => {
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
