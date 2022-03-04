export const SITE_URL = 'https://dzienftims.samorzad.p.lodz.pl/';
export const SITE_ORIGIN = process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const BRAND_NAME = 'WRS FTIMS';
export const SITE_NAME_MULTILINE = ['WRS', 'FTIMS'];
export const SITE_NAME = 'WRS FTIMS';
export const META_DESCRIPTION =
  'Strona przygotowana do obsługi hybrydowego dnia Wydziału Fizyki Technicznej, Informatyki i Matematyki Stosowanej.';
export const SITE_DESCRIPTION =
  'Dzień Wydziału FTIMS! Dołącz już teraz na wydarzenie live!';
export const DATE = '07.04.2022';
export const SHORT_DATE = 'kwi 27 - 9:00am CET';
export const COOKIE = 'user-id';

export const CODE_OF_CONDUCT =
  'https://www.notion.so/vercel/Code-of-Conduct-Example-7ddd8d0e9c354bb597a0faed87310a78';
export const NAVIGATION = [
  {
    name: 'Transmisja',
    route: '/stage/a'
  },
  {
    name: 'Harmonogram',
    route: '/schedule'
  },
  {
    name: 'Prelegenci',
    route: '/speakers'
  },
  {
    name: 'Partnerzy',
    route: '/expo'
  },
  {
    name: 'Oferty pracy',
    route: '/jobs'
  }
];
