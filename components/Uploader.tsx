"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

export function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(setFiles, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = () => {
    files.forEach(file => console.log(file));
  };

  return (
    <div className="text-center">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive ? "Drop the files here ..." : "Drag and drop some files here, or click to select files"}
        </p>
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Uploaded files:</h4>
            <ul className="mt-2 text-sm text-gray-500">
              {files.map(file => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="w-full mt-4 bg-white text-gray-600 rounded px-4 py-2 hover:bg-transparent hover:text-white hover:border hover:border-white transition-colors"
      >
        Upload
      </button>
    </div>
  );
}
