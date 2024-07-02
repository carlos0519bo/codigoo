import type { ReverseParams } from 'named-urls';
import { reverse } from 'named-urls';
import { router } from '../routes';
import { RouteKey, RouteName } from './RouteName';

export interface RouteParams {
  name?: RouteKey;
  path?: string;
  params?: ReverseParams;
  extra?: string;
  state?: object;
  replace?: boolean;
}

export class BaseRouterManager {
  constructor(private routes: Record<RouteName, string>) {}

  #getPath({ name, params, extra = '', path }: RouteParams) {
    if (path) return path;
    if (!name) throw new Error('name or path is required');
    const pattern = this.routes[name] + extra;
    return reverse(pattern, params);
  }

  to(
    args: RouteParams | RouteKey,
    options?: Omit<RouteParams, 'name' | 'path'>
  ) {
    if (typeof args === 'string') {
      const { state = {}, replace = false, ...params } = options || {};
      const pathname = this.#getPath({ name: args, ...params });
      return router.navigate(pathname, { state, replace });
    }

    const { state, replace, ...params } = args;
    const pathname = this.#getPath(params);
    return router.navigate({ pathname }, { state, replace });
  }

  getUrl(params: RouteParams) {
    const path = this.#getPath(params);
    return reverse(path);
  }

  goBack() {
    return router.navigate(-1);
  }
}
