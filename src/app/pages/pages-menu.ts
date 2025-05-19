import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FONCTIONNALITÉS',
    group: true,
  },
  {
    title: 'Joueurs',
    icon: 'people-outline',
    link: '/pages/players',
  },
  {
    title: 'Clubs',
    icon: 'globe-2-outline',
    link: '/pages/clubs',
  },
  {
    title: 'Entraîneurs',
    icon: 'person-outline',
    link: '/pages/coaches',
  },
  {
    title: 'Agents',
    icon: 'briefcase-outline',
    link: '/pages/agents',
  },
  {
    title: 'Recruteurs',
    icon: 'search-outline',
    link: '/pages/scouts',
  },
  {
    title: 'Sponsors',
    icon: 'star-outline',
    link: '/pages/sponsors',
  },
  {
    title: 'Statistiques',
    icon: 'bar-chart-outline',
    link: '/pages/stats',
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
