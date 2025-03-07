import { TimeRange } from '@/models/ScheduleData';

type Day = 'Vrijdag' | 'Zaterdag' | 'Zondag';

//TODO: Maybe a better way to store the dates?
//WARNING: months are 0-indexed, so september = 8!
const DAYS: { [key: string]: number } = {
  Vrijdag: new Date(2025, 8, 26).setHours(0, 0, 0, 0),
  Zaterdag: new Date(2025, 8, 27).setHours(0, 0, 0, 0),
  Zondag: new Date(2025, 8, 28).setHours(0, 0, 0, 0),
};
const DAYS_ENG: { [key: string]: string } = {
  Vrijdag: 'friday',
  Zaterdag: 'saturday',
  Zondag: 'sunday',
};
const TODAY = new Date().setHours(0, 0, 0, 0);

export const checkDay = (day: Day) => {
  const date = DAYS[day];

  return date == TODAY;
};

export const returnDay = (eng = false) => {
  let output;

  if (eng) {
    const day = Object.keys(DAYS).find((key: string) => {
      DAYS[key] == TODAY;
    });
    output = day ? DAYS_ENG[day] : undefined;
  } else {
    output = Object.keys(DAYS).find((key) => {
      DAYS[key] == TODAY;
    });
  }

  return output;
};

const createDummyDate = (
  hour: number | string,
  minute: number | string,
  now: Date,
) => {
  if (typeof hour == 'string') hour = parseInt(hour);
  if (typeof minute == 'string') minute = parseInt(minute);

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
  );
};

export const parseTime = (time: string) => {
  
  if (typeof time !== 'string') return {};
  
  if (time.includes('t.e.m.')) {
    const split = time.split('t.e.m. ');
    console.log(split)

    return {
      start: split[0],
      end: split[1],
    };
  } else {
    return {
      start: time,
    };
  }
};

export const isNow = (timeString: TimeRange | string, day: Day) => {
  const todayIsDay = checkDay(day);
  const now = new Date();

  let hasEndTime = false;
  let startTime, endTime;

  if (!todayIsDay) return false;

  //Backwards compatibility
  if (typeof timeString == 'string') {
    if (timeString.includes('t.e.m.') && !timeString.includes('...')) {
      hasEndTime = true;
      const split = timeString.split('t.e.m. ');
      startTime = split[0].split(':');
      endTime = split[1].split(':');
    } else {
      return (
        parseInt(timeString.split(':')[0]) == now.getHours() &&
        parseInt(timeString.split(':')[1]) == now.getMinutes()
      );
    }
  } else {
    if (timeString.eind && timeString.eind !== '...') {
      hasEndTime = true;
      startTime = timeString.start.split(':');
      endTime = timeString.eind.split(':');
    } else {
      return (
        parseInt(timeString.start) == now.getHours() &&
        parseInt(timeString.start) == now.getMinutes()
      );
    }
  }

  if (hasEndTime && startTime && endTime) {
    //Create dummy dates
    const start = createDummyDate(startTime[0], startTime[1], now);
    const end = createDummyDate(endTime[0], endTime[1], now);

    return now >= start && now <= end;
  }

  return false;
};

export const isLater = (first: string, second: string) => {
  const now = new Date();
  //Create dummy dates
  const start = createDummyDate(first.split(':')[0], first.split(':')[1], now);
  const end = createDummyDate(second.split(':')[0], second.split(':')[1], now);

  return start >= end;
};
