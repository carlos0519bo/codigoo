export * from './RouteName';
export * from './routePaths';
import { BaseRouterManager } from './RouterManager';
import { routePaths } from './routePaths';

export const routerManager = new BaseRouterManager(routePaths);
