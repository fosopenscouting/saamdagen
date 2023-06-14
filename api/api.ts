export const getContentIndex = async (): Promise<string[]> => {
  const text = await (
    await fetch(
      'https://fosopenscouting.github.io/Saamdagen-App-inhoud/contentTest.txt',
      { cache: 'no-store' },
    )
  ).text();
  let array = text.split('\n');
  array = array.filter((x) => x !== 'README.md').filter((x) => x !== '');
  return array;
};

export const getMarkdown = async (path: string): Promise<string> => {
  const text = await (
    await fetch(
      `https://fosopenscouting.github.io/Saamdagen-App-inhoud/${path}`,
      { cache: 'no-store' },
    )
  ).text();

  return text;
};
