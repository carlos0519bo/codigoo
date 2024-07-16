import { useCallback, useRef, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdAutorenew } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import Webcam from 'react-webcam';
import { PhotoCamera } from './PhotoCamera';
import { Button, Modal } from '@/components';

interface CameraModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  setOpenCamera: (value: boolean) => void;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const CameraModal = ({
  isModalOpen,
  onClose,
  setFile,
  setOpenCamera,
  setImageUrl,
}: CameraModalProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleCameraError = useCallback((error: string | DOMException) => {
    console.error('Error accessing camera:', error);
    if (error === 'Permission denied') {
      setCameraError('No se ha concedido permiso para acceder a la cámara.');
    } else if (error === 'Requested device not found') {
      setCameraError(
        'No se ha detectado ninguna cámara. Por favor, conecta una cámara y vuelve a intentarlo.'
      );
    } else {
      setCameraError(
        'Ha ocurrido un error al intentar acceder a la cámara. Por favor, inténtalo de nuevo.'
      );
    }
  }, []);

  const capturePhoto = () => {
    const capturedPhoto = webcamRef.current?.getScreenshot();
    if (capturedPhoto) {
      setPhoto(capturedPhoto);
      setCameraError(null);
    } else {
      setCameraError(
        'No se pudo capturar la foto. Por favor, inténtalo de nuevo.'
      );
    }
  };

  const retakePhoto = () => {
    setPhoto(null);
    setCameraError(null);
  };

  const closeCamera = () => {
    setOpenCamera(false);
    setPhoto(null);
    setCameraError(null);
  };

  const usePhoto = () => {
    if (photo) {
      setImageUrl(photo);

      const byteString = atob(photo.split(',')[1]);
      const mimeString = photo.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], 'captured_photo.jpg', {
        type: 'image/jpeg',
      });

      if (setFile) {
        setFile(file);
      }
    }
    closeCamera();
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose} className="relative">
      <div className="flex flex-col gap-4">
        {cameraError ? (
          <div className="text-red-500 text-center p-4">{cameraError}</div>
        ) : (
          <PhotoCamera
            photo={photo}
            webcamRef={webcamRef}
            onError={handleCameraError}
          />
        )}
        <div className="flex items-center gap-4 justify-center">
          {!photo && !cameraError && (
            <Button onClick={capturePhoto} className="gap-2">
              <FaCamera /> Capturar
            </Button>
          )}
          {photo && (
            <Button onClick={retakePhoto} className="gap-2">
              <MdAutorenew /> Capturar otra
            </Button>
          )}
          {photo && (
            <Button onClick={usePhoto} className="gap-2">
              <FiCheck /> Usar foto
            </Button>
          )}
        </div>
      </div>

      <IoIosCloseCircle
        size={24}
        className="absolute top-2 right-6 cursor-pointer"
        onClick={closeCamera}
      />
    </Modal>
  );
};
