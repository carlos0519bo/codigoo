import { useUser } from '@/features';
import { routerManager } from '@/router';
import { useAuth } from '@/store';
import { Navigate } from 'react-router-dom';

export const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const { access_token } = useAuth();
  const { data: user } = useUser();
  const { email_verified_at } = user || {};
  console.log({ email_verified_at });

  console.log('Renderizando PrivateLayout');

  if (!access_token) {
    console.log('No hay access_token, redirigiendo a Auth');
    return (
      <Navigate
        to={routerManager.getUrl({
          name: 'Auth',
        })}
        replace
      />
    );
  }

  // if (!email_verified_at) {
  //   console.log('No hay email_verified_at, redirigiendo a EmailVerificationPage');
  //   return <EmailVerificationPage />;
  // }

  console.log('Hay access_token, renderizando contenido privado');

  return <>{children}</>;
};
