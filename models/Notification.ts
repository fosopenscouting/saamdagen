export interface Notification {
  title: string;
  subtitle: string | null;
  content: string;
  time: {
    date: string;
    hour: string;
  };
}
