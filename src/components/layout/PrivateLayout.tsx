import { EmailVerificationPage } from '@/features';
import { useUser } from '@/features';
import { routerManager } from '@/router';
import { useAuth } from '@/store';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateLayout = () => {
  const { access_token } = useAuth();
  const { data: user } = useUser();
  const { email_verified_at } = user || {};


  if (!access_token) {
    return (
      <Navigate
        to={routerManager.getUrl({
          name: 'Auth',
        })}
        replace
      />
    );
  }

  if (!email_verified_at) {
    return <EmailVerificationPage />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
