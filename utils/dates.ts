const DAYS = {
  Vrijdag: new Date(2024, 8, 27).setHours(0, 0, 0, 0),
  Zaterdag: new Date(2024, 8, 28).setHours(0, 0, 0, 0),
  Zondag: new Date(2024, 8, 29).setHours(0, 0, 0, 0),
};
const DAYS_ENG = {
  Vrijdag: 'friday',
  Zaterdag: 'saturday',
  Zondag: 'sunday',
};
const TODAY = new Date().setHours(0, 0, 0, 0);

export const checkDay = (day: 'Vrijdag' | 'Zaterdag' | 'Zondag') => {
  const date = DAYS[day];

  return date == TODAY;
};

export const returnDay = (eng = false) => {
  let output;

  if (eng) {
    const day = Object.keys(DAYS).find((key) => {
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
