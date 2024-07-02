import * as Yup from 'yup';

export const formUploadSchema = Yup.object().shape({
  autor: Yup.string().required('El autor es requerido'),
  ano: Yup.string().required('El año es requerido').min(4, 'Formato no válido').max(4, 'Formato no válido'),
  titulo: Yup.string().required('El titulo es requerido'),
  formato: Yup.string().required('El formato es requerido'),
});
