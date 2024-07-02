import './loader.css';

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex justify-center items-center">
        <div className="loader"></div>
      </div>
    </div>
  );
};
