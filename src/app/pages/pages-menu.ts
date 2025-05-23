import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FOOTBALL',
    group: true,
  },
  {
    title: 'Players',
    icon: 'person-outline',
    link: '/pages/players',
  },
  {
    title: 'Clubs',
    icon: 'shield-outline',
    link: '/pages/clubs',
  },
  {
    title: 'Coaches',
    icon: 'briefcase-outline',
    link: '/pages/coaches',
  },
  {
    title: 'Agents',
    icon: 'people-outline',
    link: '/pages/agents',
  },
  {
    title: 'Sponsors',
    icon: 'award-outline',
    link: '/pages/sponsors',
  },
];
