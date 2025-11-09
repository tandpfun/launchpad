"use client";

import { useState } from "react";
import { CheckCircle2, Video, X } from "lucide-react";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    // Reset the input value so the same file can be selected again
    const input = document.getElementById("video-upload") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex gap-4 max-w-4xl w-full">
        <video
          className="w-1/2 rounded-xl bg-black border-zinc-200 border shadow-sm aspect-9/16 max-w-sm"
          src={uploadedFile ? URL.createObjectURL(uploadedFile) : undefined}
          controls
        />
        <div className="border-zinc-200 border rounded-xl p-4 shadow-sm grow flex gap-2 relative">
          <div className="absolute bottom-2 right-3">
            <div className="text-sm text-zinc-500">SORANALYSIS v1.0</div>
          </div>
          <div className="flex gap-2 flex-col w-full">
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
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm text-zinc-700 font-medium truncate"
                            title={uploadedFile.name}
                          >
                            {uploadedFile.name}
                          </span>
                          <span className="text-xs text-zinc-500">
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
          </div>
        </div>
      </div>
    </div>
  );
}
