import Webcam from 'react-webcam';

interface Props {
  photo: string | null;
  webcamRef: React.RefObject<Webcam>;
  onError: (error: string | DOMException) => void;
}

export const PhotoCamera: React.FC<Props> = ({ photo, webcamRef, onError }) => {
  return (
    <div>
      {photo ? (
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <img src={photo} alt="Captured" />
        </div>
      ) : (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'user' }}
            onUserMediaError={onError}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      )}
    </div>
  );
};
