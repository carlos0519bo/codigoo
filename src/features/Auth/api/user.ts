import { useQuery } from '@tanstack/react-query';
import { codigooApi, QueryConfig } from '@/lib';
import { UserResponse } from '../types';

const url = '/user';

function getUser(): Promise<UserResponse> {
  return codigooApi.get(url);
}

type MutationFn = typeof getUser;

type UserParams = {
  config?: QueryConfig<MutationFn>;
};

export const useUser = ({ config = {} }: UserParams = {}) => {
  return useQuery({
    ...config,
    queryKey: ['user'],
    queryFn: getUser,
  });
}