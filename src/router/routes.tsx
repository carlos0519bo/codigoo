import { createHashRouter, Navigate, RouteObject } from 'react-router-dom';

import { routePaths } from './routerManager';
import { PrivateLayout, PublicLayout } from '@/components';
import { Home, AuthPage } from '@/features';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={routePaths.Auth} replace />,
  },
  {
    path: routePaths.Home,
    element: (
      <PrivateLayout>
        <Home />
      </PrivateLayout>
    ),
  },
  {
    path: routePaths.Auth,
    element: (
      <PublicLayout>
        <AuthPage />
      </PublicLayout>
    ),
  },
  {
    path: '*',
    element: <>error: 404</>,
  },
];

export const router = createHashRouter(routes);
