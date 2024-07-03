import { routerManager } from '@/router';
import { useAuth } from '@/store';
import { PropsWithChildren, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const PublicLayout = ({ children }: PropsWithChildren) => {
  const { access_token } = useAuth();
  console.log('PublicLayout - access_token:', access_token);

  useEffect(() => {
    console.log('PublicLayout - Efecto ejecutado, access_token:', access_token);
  }, [access_token]);

  if (access_token) {
    console.log('PublicLayout - Token detectado, intentando navegar a Home');
    return <Navigate to={routerManager.getUrl({ name: 'Home' })} replace />;
  }

  console.log('PublicLayout - No hay token, renderizando children');

  return <>{children}</>;
};
