import { MdMarkEmailRead, MdMarkunread, MdRefresh } from 'react-icons/md';
import { FiRefreshCw } from 'react-icons/fi';
import { useResendVerification } from '../api';
import { useUser } from '@/features';
import { routerManager } from '@/router';
import { Loader } from '@/components';
import { useCallback } from 'react';
import { Bounce, toast } from 'react-toastify';

export const EmailVerificationPage = () => {
  const { data: user, refetch, isFetching } = useUser();
  const { mutate: resend } = useResendVerification();

  const handleResendVerification = (userId: string) => {
    if (!userId) {
      return;
    }
    resend(userId, {
      onSuccess: () => {
        notify('Hemos enviado un nuevo email de verificación');
      },
    });
  };

  const { email, id, email_verified_at } = user || {};

  if (email_verified_at) {
    routerManager.to({ name: 'Home' });
  }

  const notify = useCallback(
    (message: string) =>
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      }),
    []
  );

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center">
              <MdMarkEmailRead className="h-12 w-12 text-indigo-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verifica tu correo electrónico
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Hemos enviado un correo de verificación a
            </p>
            <p className="mt-1 text-center text-lg font-medium text-indigo-600">
              {email || ''}
            </p>
          </div>

          <div className="mt-8">
            <div className="rounded-md bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <MdMarkunread className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Verificación pendiente
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Por favor, verifica tu correo electrónico para activar tu
                      cuenta. Si no encuentras el correo, revisa tu carpeta de
                      spam.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => handleResendVerification(id?.toString() || '')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiRefreshCw className="mr-2 h-5 w-5" />
                Reenviar correo de verificación
              </button>
            </div>

            <div className="flex flex-col justify-center items-center mt-6">
              <p className="text-center text-sm text-gray-600">
                ¿Ya realizaste la verificación?
              </p>
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => refetch()}
              >
                <p className="text-center text-sm text-gray-600 underline">
                  haz click aquí
                </p>
                <MdRefresh className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
