const CONTENT_ROOT = process.env.EXPO_PUBLIC_CONTENT_ROOT! ?? 'Production';
const API_URL = process.env.EXPO_PUBLIC_API_URL! ?? "https://fosopenscouting.github.io/Saamdagen-App-inhoud";

export const getContentIndex = async (): Promise<string[]> => {
  console.log(`CONTENT_DIR: ${CONTENT_ROOT}`);
  const text = await (
    await fetch(
      `${API_URL}/content.txt`,
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
  const text = await fetch(
    `${API_URL}/${CONTENT_ROOT}/${path}`,
    { cache: 'no-store' },
  );
  return await text.text();
};
