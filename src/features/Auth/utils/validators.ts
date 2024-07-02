import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  name: Yup.string().required('El nombre y apellidos es requerido'),
  email: Yup.string()
    .email('El correo no es valido')
    .required('El correo es requerido'),
  nationality: Yup.string().required('La nacionalidad es requerida'),
  phone: Yup.string().required('El telefono es requerido'),
  phone_prefix: Yup.string().required('El prefijo es requerido'),
  terms: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
});
