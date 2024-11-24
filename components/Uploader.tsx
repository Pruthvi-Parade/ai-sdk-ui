"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload } from "lucide-react";

export function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
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
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          multiple
        />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragging ? "Drop the files here ..." : "Drag and drop some files here, or click to select files"}
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