import { IOrderable } from './IOrderable';

export interface VolunteerItem extends IOrderable {
  title: string;
  content: string;
  icon: string;
}
