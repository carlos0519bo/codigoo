import { useEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { FileUpload } from './components';
import { FaCamera } from 'react-icons/fa';
import { GrGallery } from 'react-icons/gr';
import { RiVideoAddFill } from 'react-icons/ri';
import { MdAddAPhoto, MdOutlineUploadFile } from 'react-icons/md';
import { Drawer, Input, Loader, Modal } from '@/components';
import { formUploadSchema } from './utils';
import { UploadData } from './types';
import { useUpload } from './api';
import { useUser } from '../Auth';

const intialValues: UploadData = {
  autor: '',
  ano: '',
  titulo: '',
  formato: '',
  ficha: null,
  image: null,
};

export const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [aditionalDoc, setAditionalDoc] = useState<File | null>(null);
  const [aditionalDocUri, setAditionalDocUri] = useState<string | null>(null);
  const { data: user } = useUser();
  const { mutate: upload, isPending: uploadPending } = useUpload();

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fileInputVideoRef = useRef<HTMLInputElement>(null);
  const fileInputPhotoRef = useRef<HTMLInputElement>(null);
  const fileInputAccessGallerryRef = useRef<HTMLInputElement>(null);
  const additionalDocumentRef = useRef<HTMLInputElement>(null);

  const handleVideoIconClick = () => {
    fileInputVideoRef.current?.click();
    closeDrawer();
  };

  const handlePhotoIconClick = () => {
    fileInputPhotoRef.current?.click();
    closeDrawer();
  };

  const handleAccessGalleryIconClick = () => {
    fileInputAccessGallerryRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log('Archivo seleccionado:', selectedFile.name);
      const fileURL = URL.createObjectURL(selectedFile);
      setImageUri(fileURL);
    }
  };

  const handleAdditionalDocument = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setAditionalDoc(file);
      const fileURL = URL.createObjectURL(file);
      setAditionalDocUri(fileURL);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUri) {
        URL.revokeObjectURL(imageUri);
      }
    };
  }, [imageUri]);

  const onFileSelect = (file: File) => {
    setFile(file);
  };

  const handleSubmit = (values: UploadData) => {
    const { titulo, autor, ano, formato } = values;

    upload(
      {
        autor,
        ano,
        titulo,
        formato,
        image: file as File,
        ficha: aditionalDoc as File,
      },
      {
        onSuccess: () => {
          setFile(null);
          setImageUri(null);
          setAditionalDoc(null);
          setAditionalDocUri(null);
          openModal();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  if (uploadPending) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-grow grid grid-cols-1 md:grid-cols-12">
        <div className="bg-gray-900 md:col-span-4 lg:col-span-3 p-10 text-white flex flex-col justify-between">
          <div>
            <h1 className="mt-4 text-[2rem]  md:text-[3rem] leading-7 font-extralight">
              ¡hola
            </h1>
            <p className="mt-4 leading-7 text-gray-200 font-bold text-[2rem]  md:text-[3rem] lg:text-[4rem] capitalize">
              {user?.name}!
            </p>
          </div>
          <h3 className="text-2xl hidden md:flex lg:text-4xl leading-normal font-extrabold tracking-tight text-gray-200">
            codigoo
          </h3>
        </div>

        <div className="md:col-span-8 lg:col-span-9 p-10 flex flex-col">
          {!file && (
            <h1 className="text-3xl font-extrabold text-gray-600">
              Sube una foto o video
            </h1>
          )}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-12 mt-5 w-full lg:gap-10">
            <div className="w-full md:col-span-12 lg:col-span-4 text-white">
              <div className="hidden lg:block">
                {!file && <FileUpload onFileSelect={onFileSelect} />}
              </div>

              {!file ? (
                <div className="grid grid-cols-2 grid-rows-1 gap-4 h-28 lg:hidden">
                  <button
                    className="text-black bg-slate-300 gap-2 flex flex-col justify-center items-center rounded-xl"
                    onClick={openDrawer}
                  >
                    <FaCamera size={28} />
                    <p>Abrir cámara</p>
                  </button>
                  <button
                    className="text-black bg-slate-300 gap-2 flex flex-col justify-center items-center rounded-xl"
                    onClick={handleAccessGalleryIconClick}
                  >
                    <GrGallery size={28} />
                    <p>Abrir galería</p>
                  </button>
                </div>
              ) : (
                <div className="w-full">
                  <button
                    className="bg-black text-white px-4 py-2 w-full rounded-2xl"
                    onClick={() => {
                      setFile(null);
                      setAditionalDoc(null);
                    }}
                  >
                    Empezar de nuevo
                  </button>

                  <div className="hidden lg:block w-full">
                    {imageUri && (
                      <div className="mt-4 w-full">
                        <h4 className="text-md font-semibold text-black">
                          Previsualización:
                        </h4>
                        {file.type.startsWith('image/') ? (
                          <img
                            src={imageUri}
                            alt="Preview"
                            className="mt-2 max-w-full h-auto border border-black"
                          />
                        ) : file.type.startsWith('video/') ? (
                          <video
                            src={imageUri}
                            controls
                            className="mt-2 max-w-full h-auto border border-black"
                          >
                            Tu navegador no soporta la etiqueta de video.
                          </video>
                        ) : (
                          <p>No se puede previsualizar este tipo de archivo.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-12 lg:col-span-8 flex flex-col">
              <div className="">
                {file && (
                  <div className="mt-4 lg:mt-0 p-4 bg-gray-100 rounded-md">
                    <h3 className="text-lg font-semibold">Detalles:</h3>
                    <p>Tipo: {file.type}</p>
                    <p>Tamaño: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <div className="lg:hidden">
                      {imageUri && (
                        <div className="mt-4">
                          <h4 className="text-md font-semibold">
                            Previsualización:
                          </h4>
                          {file.type.startsWith('image/') ? (
                            <img
                              src={imageUri}
                              alt="Preview"
                              className="mt-2 max-w-full h-auto lg:max-h-96"
                            />
                          ) : file.type.startsWith('video/') ? (
                            <video
                              src={imageUri}
                              controls
                              className="mt-2 max-w-full h-auto lg:max-h-96"
                            >
                              Tu navegador no soporta la etiqueta de video.
                            </video>
                          ) : (
                            <p>
                              No se puede previsualizar este tipo de archivo.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {file && (
                <div className="mt-4">
                  <Formik
                    initialValues={intialValues}
                    validationSchema={formUploadSchema}
                    onSubmit={(values) => {
                      handleSubmit(values);
                    }}
                  >
                    <Form className="space-y-6">
                      <Input label="Título" name="titulo" />
                      <Input label="Autor" name="autor" />
                      <Input
                        label="Año"
                        name="ano"
                        type="number"
                        maxLength={4}
                      />
                      <Input label="Formato" name="formato" />
                      <div className="">
                        <button
                          type="button"
                          onClick={() => additionalDocumentRef.current?.click()}
                          className="bg-gray-200 text-gray-700 p-2 rounded flex justify-center items-center space-x-2 w-full"
                        >
                          <MdOutlineUploadFile size={20} />
                          <span>
                            {aditionalDoc
                              ? aditionalDoc.name
                              : ' Adjuntar documento adicional'}
                          </span>
                        </button>
                        <input
                          type="file"
                          ref={additionalDocumentRef}
                          onChange={handleAdditionalDocument}
                          accept=".pdf,.jpg,.png,.mp4"
                          className="hidden"
                        />
                      </div>
                      <button
                        className="bg-black text-white px-4 py-2 w-full rounded-xl"
                        type="submit"
                      >
                        Enviar
                      </button>
                    </Form>
                  </Formik>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        <h2 className="text-2xl font-bold mb-4 text-center">
          Seleccione una opción
        </h2>
        <div className="grid grid-cols-2 grid-rows-1 gap-4 h-full items-center md:px-10">
          <button
            className="flex flex-col justify-center items-center bg-slate-300 gap-2 h-1/2 rounded-2xl"
            onClick={handlePhotoIconClick}
          >
            <MdAddAPhoto size={36} />
            <p>Tomar foto</p>
          </button>
          <button
            className="flex flex-col justify-center items-center bg-slate-300 gap-2 h-1/2 rounded-2xl"
            onClick={handleVideoIconClick}
          >
            <RiVideoAddFill size={36} />
            <p>Grabar video</p>
          </button>
        </div>
      </Drawer>
      <input
        type="file"
        accept="video/*"
        capture
        ref={fileInputVideoRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        capture
        ref={fileInputPhotoRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg,video/*"
        ref={fileInputAccessGallerryRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full max-w-lg">
          <div className="my-8 text-center">
            <IoCheckmarkCircleOutline
              size={64}
              fill="green"
              className="inline text-green-500 shrink-0 animate-zoom-in"
            />
            <h4 className="text-xl text-gray-800 font-semibold mt-4">
              Operación exitosa
            </h4>
            <p className="text-sm text-gray-500 leading-relaxed mt-4">
              En breve recibiras un correo de confirmación
            </p>
          </div>

          <button
            type="button"
            className="px-5 py-2.5 w-full rounded-lg text-white text-sm border-none outline-none bg-black hover:bg-gray-700"
            onClick={closeModal}
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </main>
  );
};
