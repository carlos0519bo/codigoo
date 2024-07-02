import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { Input, Modal, OTPInput, Select, Switch, Loader } from '@/components';
import Countries from '@/data/countries.json';
import { VideoScreen } from '../components';
import { formSchema } from '../utils';
import { FormValues } from '../types';
import { useRegister, useSendSMS, useSMSVerify } from '../api';
import { routerManager } from '@/router';

const initialValues: FormValues = {
  name: '',
  email: '',
  nationality: '',
  phone: '',
  adult: true,
  titular: true,
  terms: true,
  phone_prefix: '',
};

export const AuthPage = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [userInfo, setUserInfo] = useState({} as FormValues);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const { mutateAsync: sendSMS, isPending: sendSMSPending = false } =
    useSendSMS();
  const { mutate: register, isPending: registerPending } = useRegister();
  const { mutate: smsVerify, isPending: smsVerifyPending } = useSMSVerify();

  const countryOptions = useMemo(
    () =>
      Countries.map((country) => ({
        value: country.code,
        label: country.name,
        emoji: country.emoji,
        dialCode: country.dial_code,
      })),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setIsModalOpen(false);
  const otpCloseModal = () => setOtpModal(false);

  const notify = useCallback((message: string) => toast.error(message), []);

  const handleSendSMS = useCallback(
    (values: FormValues) => {
      const { phone, phone_prefix } = values;
      console.log({ phone, phone_prefix });
      setUserInfo(values);
      sendSMS(
        { phone, phone_prefix },
        {
          onSuccess: () => {
            setOtpModal(true);
          },
          onError: (error) => {
            notify(error.message);
          },
        }
      );
    },
    [sendSMS, setOtpModal, notify]
  );

  const handleSMSVerify = useCallback(
    (verification_code: string) => {
      if (!userInfo) {
        notify('Error: No se encontró información del usuario');
        return;
      }

      const { phone, phone_prefix, name, email, nationality, adult, titular } =
        userInfo;
      const phoneAndCode = phone_prefix + phone;

      smsVerify(
        {
          phone_prefix,
          phone,
          verification_code,
        },
        {
          onSuccess: () => {
            setOtpModal(false);
            register(
              {
                name,
                email,
                nationality,
                phone: phoneAndCode,
                adult,
                titular,
              },
              {
                onSuccess: () => {
                  routerManager.to({ name: 'Home' });
                },
                onError: (error) => {
                  notify(error.message);
                },
              }
            );
          },
          onError: (error) => {
            notify(error.message);
          },
        }
      );
    },
    [userInfo, smsVerify, register, notify]
  );

  if (showVideo) {
    return <VideoScreen />;
  }

  return (
    <>
      {(sendSMSPending || registerPending || smsVerifyPending) && <Loader />}
      <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 animate-blurred-fade-in animate-duration-slow">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <div className="mb-6">
            <p className="text-lg text-gray-500 font-black">codigoo</p>
            <div className="mt-5">
              <h1 className="text-3xl sm:text-3xl font-extralight">¡Hola,</h1>
              <h1 className="text-3xl sm:text-3xl font-bold">bienvenido!</h1>
            </div>
            <p className="mt-1 text-xs sm:text-sm">
              Ingrese sus datos para registrarse
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={(values) => {
              handleSendSMS(values);
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                <Input label="Nombre y apellidos" name="name" />
                <Input label="Correo electrónico" name="email" type="email" />
                <Select
                  label="Nacionalidad"
                  name="nationality"
                  options={countryOptions}
                  firstOption="- Seleccionar -"
                  getOptionLabel={(option) => `${option.emoji} ${option.label}`}
                />
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-1/4">
                    <Select
                      name="phone_prefix"
                      label="Prefijo"
                      options={countryOptions}
                      getOptionLabel={(option) =>
                        `${option.emoji} (${option.dialCode}) ${option.label}`
                      }
                      firstOption="- Seleccionar -"
                      optionValue={'dialCode'}
                    />
                  </div>
                  <div className="w-full sm:w-3/4">
                    <Input label="Número" name="phone" type="number" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <p className="text-sm">
                    ¿Eres titular de este número de teléfono?
                  </p>
                  <Switch name="titular" yesAndNoLabels />
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <p className="text-sm">¿Eres mayor de 18 años?</p>
                  <Switch
                    name="adult"
                    onChange={(e) => {
                      setFieldValue('adult', e.target.checked);
                      if (!e.target.checked) {
                        setIsModalOpen(true);
                      }
                    }}
                    yesAndNoLabels
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                  <p className="text-xs sm:text-sm max-w-[70%] sm:max-w-none">
                    He leído y acepto la <Link>politica de privacidad</Link> y
                    los <Link>términos</Link> y <Link>condiciones</Link>.
                  </p>
                  <Switch name="terms" yesAndNoLabels />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto text-white bg-[#050708] hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2 transition-colors duration-200"
                >
                  Registrarse
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Información importante"
          infoIcon
        >
          <p>
            El equipo de <b>Codigoo</b> se pondrá en contacto contigo por email
            para completar el registro.
          </p>
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="mt-4 bg-[#050708] hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Aceptar
            </button>
          </div>
        </Modal>
        <Modal isOpen={otpModal} onClose={otpCloseModal}>
          <p className="text-center text-2xl font-bold mb-3">
            Código de verificación
          </p>
          <p className="text-center text-sm mb-3 font-semibold">
            Ingrese el código que hemos enviado a tu número
          </p>
          <OTPInput length={6} onComplete={handleSMSVerify} />
          <div className="flex justify-center items-center">
            <button
              onClick={otpCloseModal}
              className="mt-4 bg-[#050708] hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-[224px]"
            >
              VERIFICAR
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

const Link = ({
  href = 'https://www.codigoo.app/',
  children,
}: {
  href?: string;
  children: ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline cursor-pointer"
    >
      {children}
    </a>
  );
};
