export interface Notification {
  title: string;
  subtitle: string | null;
  content: string;
  time: {
    date: string;
    hour: string;
  };
}

export interface DatabaseNotification {
  id: string;
  title: string;
  message: string;
  channel: 'Production' | 'Staging';
  sentBy: string;
  sentAt: Date;
}
