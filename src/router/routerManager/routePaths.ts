import { RouteName } from './RouteName';

export type RoutePaths = { [key in RouteName]: string };

export const routePaths = {
  [RouteName.Home]: '/',
  [RouteName.About]: '/about',
  [RouteName.Contact]: '/contact',
  [RouteName.Auth]: '/auth',
};
