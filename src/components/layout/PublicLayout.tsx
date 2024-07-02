import { routerManager } from '@/router';
import { useAuth } from '@/store';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export const PublicLayout = ({ children }: PropsWithChildren) => {
  const { access_token } = useAuth();

  if (access_token) {
    return <Navigate to={routerManager.getUrl({ name: 'Home' })} replace />;
  }

  return <>{children}</>;
};
