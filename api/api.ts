/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const getContentIndex = async (): Promise<string[]> => {
  console.log(process.env.EXPO_PUBLIC_CONTENT_ROOT!);
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
    .filter((x) => x.startsWith(process.env.EXPO_PUBLIC_CONTENT_ROOT!));
  return array.map(
    (x) => x.split(`${process.env.EXPO_PUBLIC_CONTENT_ROOT!}/`)[1],
  );
};

export const getMarkdown = async (path: string): Promise<string> => {
  const text = await fetch(
    `https://fosopenscouting.github.io/Saamdagen-App-inhoud/${process.env
      .EXPO_PUBLIC_CONTENT_ROOT!}/${path}`,
    { cache: 'no-store' },
  );
  return await text.text();
};
