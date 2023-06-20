import AsyncStorageLib from '@react-native-async-storage/async-storage';
import fm, { FrontMatterResult } from 'front-matter';
import { getMarkdown } from '../api/api';
import {
  FRIDAY_ITEMS,
  HOME_ITEMS,
  SATURDAY_ITEMS,
  SUNDAY_ITEMS,
  FAQ_ITEMS,
  // MAP_ITEMS,
  NORMALLAYER_ITEMS,
  BIGGAMELAYER_ITEMS,
  ACTIVITIESLAYER_ITEMS,
  MAP_ITEMS,
  VOLUNTEER_ITEMS,
} from '../constants/Strings';
import { createMetadata } from '../models/ContentMetadata';
import { mapFaq, mapHomeItems, mapProgram } from './contentMapping';

const programPrefix = 'Programma';
const homePrefix = 'Homepage';
const faqPrefix = 'Faq';
// const mapPrefix = 'Kaart';
  const volunteerPrefix = 'helpendeHand';

// Load all content from the API, parse it to the format we want and then save it as one huge array in local storage.
export const saveContent = async (paths: string[]): Promise<void> => {
  // Filter out paths per screen, each needs a different mapping logic
  const homePaths = paths.filter((x) => x.startsWith(homePrefix));
  const programPaths = paths.filter((x) => x.startsWith(programPrefix));
  const faqPaths = paths.filter((x) => x.startsWith(faqPrefix));
  // const mapPaths = paths.filter((x) => x.startsWith(mapPrefix));
  const volunteerPaths = paths.filter((x)=> x.startsWith(volunteerPrefix))

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

  const allData = parsedProgram.concat(homeContent, faqContent);

  await AsyncStorageLib.setItem('DATA', JSON.stringify(allData));
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
