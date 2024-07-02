/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity,
  },
};

export const queryClient = new QueryClient({ defaultOptions });

export type ExtractFnReturnType<T extends (...args: any[]) => any> = Awaited<
  ReturnType<T>
>;

export type QueryConfig<QueryFnType extends (...args: any[]) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any[]) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >;