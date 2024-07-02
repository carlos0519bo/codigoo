import { useMutation } from '@tanstack/react-query';
import { codigooApi, MutationConfig } from '@/lib';
import { UploadData } from '../types';


const url = '/upload';

function upload({ autor, ano, titulo, formato, image, ficha }: UploadData) {
  return codigooApi.post(url, {
    autor,
    ano,
    titulo,
    formato,
    image,
    ficha,
  });
}

type MutationFn = typeof upload;

type UploadParams = {
  config?: MutationConfig<MutationFn>;
};

export const useUpload = ({ config = {} }: UploadParams = {}) => {
  return useMutation({
    mutationFn: upload,
    ...config,
  });
};
