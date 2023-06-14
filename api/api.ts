import { CONTENT_ROOT } from '@env';

export const getContentIndex = async (): Promise<string[]> => {
  const text = await (
    await fetch(
      'https://fosopenscouting.github.io/Saamdagen-App-inhoud/content.txt',
      { cache: 'no-store' },
    )
  ).text();
  let array = text.split('\n');
  array = array
    .filter((x) => x !== 'README.md')
    .filter((x) => x !== '')
    .filter((x) => x.startsWith(CONTENT_ROOT));
  return array.map((x) => x.split(`${CONTENT_ROOT}/`)[1]);
};

export const getMarkdown = async (path: string): Promise<string> => {
  const text = await (
    await fetch(
      `https://fosopenscouting.github.io/Saamdagen-App-inhoud/${CONTENT_ROOT}/${path}`,
      { cache: 'no-store' },
    )
  ).text();

  return text;
};
