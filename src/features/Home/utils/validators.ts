import * as Yup from 'yup';

export const formUploadSchema = Yup.object().shape({
  autor: Yup.string().required('tu nombre es requerido'),
  ano: Yup.string().required('El año es requerido').min(4, 'Formato no válido').max(4, 'Formato no válido'),
  titulo: Yup.string().required('El token es requerido'),
  formato: Yup.string().required('El número es requerido'),
});
