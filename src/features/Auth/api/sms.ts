import { useMutation } from '@tanstack/react-query';
import { codigooApi, MutationConfig } from '@/lib';
import { SendSMSData } from '../types';

const url = '/sms/send';

function sendSms(data: SendSMSData) {
  return codigooApi.post(url, data);
}

type MutationFn = typeof sendSms;

type SendSMSParams = {
  config?: MutationConfig<MutationFn>;
}

export const useSendSMS = ({ config = {} }: SendSMSParams = {}) => {
  return useMutation({
    mutationFn: sendSms,
    ...config,
  });
}