import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'STAKEHOLDERS',
    group: true,
  },
  {
    title: 'Joueurs',
    icon: 'people-outline',
    link: '/pages/players',
  },
  {
    title: 'Clubs',
    icon: 'shield-outline',
    link: '/pages/clubs',
  },
  {
    title: 'Agents',
    icon: 'briefcase-outline',
    link: '/pages/agents',
  },
  {
    title: 'Sponsors',
    icon: 'award-outline',
    link: '/pages/sponsors',
  },
  {
    title: 'Statistiques',
    icon: 'pie-chart-outline',
    link: '/pages/statistics',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Paramètres',
    icon: 'settings-outline',
    link: '/pages/settings',
  },
  {
    title: 'Chat',
    icon: 'message-circle-outline',
    link: '/pages/extra-components/chat',
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
