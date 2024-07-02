import { queryClient } from '@/lib';
import { ProviderProps } from '@/types';
import { QueryClientProvider } from '@tanstack/react-query';
import { Bounce, ToastContainer } from 'react-toastify';

export const RootProvider = ({ children }: ProviderProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
          transition={Bounce}
        />
      </QueryClientProvider>
    </>
  );
};
