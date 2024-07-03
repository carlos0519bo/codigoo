import { useMutation } from '@tanstack/react-query';
import { codigooApi, MutationConfig } from '@/lib';

const url = '/upload';

interface UploadData {
  autor: string;
  ano: string;
  titulo: string;
  formato: string;
  image: File;
  ficha: File;
}

function upload({ autor, ano, titulo, formato, image, ficha }: UploadData) {
  const formData = new FormData();
  formData.append('autor', autor);
  formData.append('ano', ano);
  formData.append('titulo', titulo);
  formData.append('formato', formato);
  formData.append('image', image);
  formData.append('ficha', ficha);

  return codigooApi.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
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