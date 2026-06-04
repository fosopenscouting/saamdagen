import { useChannel } from "@/utils/useChannel";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL! ??
  'https://fosopenscouting.github.io/Saamdagen-App-inhoud';

export const getContentIndex = async (): Promise<string[]> => {
  const channel = await useChannel();
  const text = await (
    await fetch(`${API_URL}/content.txt`, { cache: 'no-store' })
  ).text();
  let array = text.split('\n');

  array = array
    .filter((x) => x !== 'README.md')
    .filter((x) => x !== '')
    .filter((x) => x.startsWith(channel));
  return array.map((x) => x.split(`${channel}/`)[1]);
};

export const getMarkdown = async (path: string): Promise<string> => {
  const channel = await useChannel();
  const text = await fetch(`${API_URL}/${channel}/${path}`, {
    cache: 'no-store',
  });
  return await text.text();
};
