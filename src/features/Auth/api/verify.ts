import { useMutation } from '@tanstack/react-query';
import { codigooApi, MutationConfig } from '@/lib';
import { SendSMSData } from '../types';

const url = '/sms/verify';

function smsVerify(data: SendSMSData) {
  return codigooApi.post(url, data);
}

type MutationFn = typeof smsVerify;

type SMSVerifyParams = {
  config?: MutationConfig<MutationFn>;
}

export const useSMSVerify = ({ config = {} }: SMSVerifyParams = {}) => {
  return useMutation({
    mutationFn: smsVerify,
    ...config,
  });
}