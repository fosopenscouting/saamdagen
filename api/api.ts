export const getContentIndex = async (): Promise<string[]> => {
  const text = await (
    await fetch(
      'https://fosopenscouting.github.io/Saamdagen-App-inhoud/content.txt',
    )
  ).text();
  let array = text.split('\n');
  array = array.filter((x) => x !== 'README.md').filter((x) => x !== '');
  return array;
};

export const getContent = async (path: string): Promise<string> => {
  const text = await (
    await fetch(
      `https://fosopenscouting.github.io/Saamdagen-App-inhoud/${path}`,
    )
  ).text();

  return text;
};
