/* eslint-disable @typescript-eslint/no-explicit-any */
import { FrontMatterResult } from 'front-matter';
import { FaqItem } from '../models/FaqItem';
import { HomeScreenSection } from '../models/HomeScreenSection';
import { ScheduleData } from '../models/ScheduleData';
import { MapMarker } from '../models/MapMarker';

export const mapHomeItems = (
  objects: FrontMatterResult<any>[],
): HomeScreenSection[] => {
  return objects.map((item) => {
    return {
      title: item.attributes.titel,
      order: item.attributes.volgorde,
      content: item.body,
    };
  });
};

export const mapProgram = (
  objects: FrontMatterResult<any>[],
): ScheduleData[] => {
  return objects.map((item) => {
    return {
      name: item.attributes.titel,
      order: item.attributes.volgorde,
      location: item.attributes.locatie,
      time: item.attributes.uren,
      description: item.body,
      day: item.attributes.dag,
      type: item.attributes.type,
    };
  });
};

export const mapFaq = (objects: FrontMatterResult<any>[]): FaqItem[] => {
  return objects.map((item) => {
    return {
      title: item.attributes.titel,
      order: item.attributes.volgorde,
      icon: item.attributes.icoon,
      content: item.body,
    };
  });
};

export const mapMap = (objects: FrontMatterResult<any>[]) => {
  return objects.map((item) => {
    return {
      id: item.attributes.id,
      layer: item.attributes.layer,
      title: item.attributes.title,
      description: item.body,
      latLng: {
        latitude: item.attributes.latitude,
        longitude: item.attributes.longitude,
      },
      icon: item.attributes.icon,
    } as MapMarker;
  });
};
