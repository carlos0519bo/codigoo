import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { routePaths } from './routerManager';
import { PrivateLayout, PublicLayout } from '@/components';
import { Home, AuthPage } from '@/features';

export const routes: RouteObject[] = [
  {
    element: <PrivateLayout />,
    children: [
      {
        path: routePaths.Home,
        element: <Home />,
      },
      {
        path: routePaths.About,
        element: <>about</>,
      },
      {
        path: routePaths.Contact,
        element: <>Contact</>,
      },
    ],
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

export const router = createBrowserRouter(routes);
