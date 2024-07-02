export enum RouteName {
  Home = 'Home',
  About = 'About',
  Contact = 'Contact',
  Auth = 'Auth',
}

export type RouteKey = keyof typeof RouteName;
