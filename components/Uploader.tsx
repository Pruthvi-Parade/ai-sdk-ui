"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

export function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  const handleUpload = () => {
    files.forEach(file => console.log(file));
  };

  return (
    <div className="text-center">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input
          type="file"
          onChange={handleFileInput}
          className="hidden"
          id="fileInput"
          multiple
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop some files here, or click to select files
          </p>
        </label>
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
