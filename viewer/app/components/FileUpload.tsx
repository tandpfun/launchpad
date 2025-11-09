"use client";

import { CheckCircle2, Video, X } from "lucide-react";

interface FileUploadProps {
  uploadedFile: File | null;
  onFileChange: (file: File | null) => void;
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

const truncateFileName = (fileName: string, maxLength: number = 30) => {
  if (fileName.length <= maxLength) return fileName;
  
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex === -1) {
    // No extension, just truncate
    return fileName.substring(0, maxLength - 3) + '...';
  }
  
  const extension = fileName.substring(lastDotIndex);
  const nameWithoutExt = fileName.substring(0, lastDotIndex);
  const availableLength = maxLength - extension.length - 3; // 3 for "..."
  
  if (availableLength <= 0) {
    return fileName.substring(0, maxLength - 3) + '...';
  }
  
  return nameWithoutExt.substring(0, availableLength) + '...' + extension;
};

export default function FileUpload({ uploadedFile, onFileChange }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null);
    // Reset the input value so the same file can be selected again
    const input = document.getElementById("video-upload") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  return (
    <form className="w-full">
      <label
        htmlFor="video-upload"
        className={`flex items-center justify-between w-full ${uploadedFile
          ? "h-20 bg-zinc-100 border border-zinc-200 rounded-md px-3 py-2 shadow-inner cursor-pointer transition-colors hover:bg-zinc-200"
          : "h-24 bg-zinc-100 hover:bg-zinc-200 border-2 border-dashed border-zinc-300 rounded-lg cursor-pointer transition-colors flex-col items-center justify-center"
          }`}
      >
        {uploadedFile ? (
          <>
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-lg bg-zinc-200 flex items-center justify-center">
                  <Video className="h-5 w-5 text-zinc-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <span className="text-sm font-semibold text-zinc-900">Video selected</span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="text-sm text-zinc-700 font-medium truncate min-w-0"
                    title={uploadedFile.name}
                  >
                    {truncateFileName(uploadedFile.name)}
                  </span>
                  <span className="text-xs text-zinc-500 shrink-0">
                    ({formatFileSize(uploadedFile.size)})
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="shrink-0 ml-2 p-1.5 rounded-md hover:bg-zinc-200 transition-colors text-zinc-600 hover:text-zinc-900"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <span className="text-zinc-700 font-medium">Click to select video</span>
            <span className="text-xs text-zinc-400 mt-1">or drag and drop</span>
          </>
        )}
        <input
          id="video-upload"
          name="video-upload"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </form>
  );
}

