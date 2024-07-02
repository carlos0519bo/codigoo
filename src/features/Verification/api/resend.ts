import { useMutation } from '@tanstack/react-query';
import { codigooApi, MutationConfig } from '@/lib';

const url = '/email/resend';

function resendVerification(user_id: string) {
  return codigooApi.get(url + `/${user_id}`);
}

type MutationFn = typeof resendVerification;

type ResendParams = {
  config?: MutationConfig<MutationFn>;
};

export const useResendVerification = ({ config = {} }: ResendParams = {}) => {
  return useMutation({
    mutationFn: resendVerification,
    ...config,
  });
};
