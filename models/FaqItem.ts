import { IOrderable } from './IOrderable';

export interface FaqItem extends IOrderable {
  title: string;
  content: string;
  icon: string;
}
