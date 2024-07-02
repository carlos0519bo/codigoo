import { useMutation } from '@tanstack/react-query';
import { codigooApi, MutationConfig } from '@/lib';
import { FormRegisterData, RegisterResponse } from '../types';
import { authStore } from '@/store';

const url = '/user/register';

function register(data: FormRegisterData): Promise<RegisterResponse> {
  return codigooApi.post(url, data);
}

type MutationFn = typeof register;

type RegisterParams = {
  config?: MutationConfig<MutationFn>;
};

export const useRegister = ({ config = {} }: RegisterParams = {}) => {
  return useMutation({
    mutationFn: register,
    onSuccess: ({ name, access_token }) => {
      authStore.getState().login(name, access_token);
    },
    ...config,
  });
};
