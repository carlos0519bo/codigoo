import React, { useState, useCallback } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";


interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

  return (
    <div
      className={`w-full mx-auto p-6 border-2 border-dashed rounded-lg text-center ${
        isDragging ? 'border-black bg-blue-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <MdOutlineFileUpload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Arrastra y suelta un archivo aquí, o
      </p>
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*,video/*"
      />
      <label
        htmlFor="file-upload"
        className="mt-2 cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      >
        Seleccionar archivo
      </label>
      <p className="mt-2 text-xs text-gray-500">
        PNG, JPG, MP4 hasta 10MB
      </p>
    </div>
  );
};