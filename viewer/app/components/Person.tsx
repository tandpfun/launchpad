'use client';

import { X, Upload, PersonStandingIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

export interface PersonData {
  id: string;
  name: string;
  picture: File | string | null; // File for uploaded, string for URL, null for default
  segments?: [number, number][]; // Array of [start, end] time segments in seconds
  color?: string; // Color for the segments
}

interface PersonProps {
  person: PersonData;
  videoDuration: number | null; // Video duration in seconds
  onRemove: (id: string) => void;
  onPictureChange: (id: string, file: File | null) => void;
}

export default function Person({
  person,
  videoDuration,
  onRemove,
  onPictureChange,
}: PersonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Compute initial picture source
  const getInitialPictureSrc = () => {
    if (person.picture instanceof File) {
      return '/images/person.png'; // Will be updated by effect
    }
    if (typeof person.picture === 'string') {
      return person.picture;
    }
    return '/images/person.png';
  };

  const [pictureSrc, setPictureSrc] = useState<string>(getInitialPictureSrc);

  // Manage blob URLs for File objects
  useEffect(() => {
    // Clean up previous blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    // Update picture source based on person.picture
    // Note: Setting state in effect is necessary here to create blob URLs from File objects
    if (person.picture instanceof File) {
      const newBlobUrl = URL.createObjectURL(person.picture);
      blobUrlRef.current = newBlobUrl;
      setPictureSrc(newBlobUrl);
    } else if (typeof person.picture === 'string') {
      setPictureSrc(person.picture);
    } else {
      setPictureSrc('/images/person.png');
    }

    // Cleanup on unmount
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [person.picture]);

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      onPictureChange(person.id, file);
    }
  };

  const isBlobUrl =
    person.picture instanceof File ||
    (typeof person.picture === 'string' && person.picture.startsWith('blob:'));

  return (
    <div className="flex shadow-inner bg-zinc-100 rounded-md p-2 gap-2 relative group">
      <div className="relative">
        <div
          className="relative cursor-pointer hover:opacity-80 transition-opacity w-12 h-12"
          onClick={handlePictureClick}
        >
          {isBlobUrl ? (
            <Image
              src={pictureSrc}
              alt=""
              width={48}
              height={48}
              className="rounded-md object-cover overflow-hidden aspect-square"
              unoptimized={isBlobUrl}
            />
          ) : (
            <div className="w-12 h-12 bg-zinc-200 rounded-md flex items-center justify-center">
              <PersonStandingIcon className="h-4 w-4 text-zinc-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-100 rounded-md transition-all flex items-center justify-center">
            <Upload className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-900">{person.name}</div>
          <button
            onClick={() => onRemove(person.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-200 rounded text-zinc-600 hover:text-zinc-900"
            aria-label="Remove person"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden relative">
          {videoDuration &&
            videoDuration > 0 &&
            person.segments &&
            person.segments.length > 0 &&
            // Render segments on top of gray background
            person.segments.map(([start, end], index) => {
              const startPercent = (start / videoDuration) * 100;
              const endPercent = (end / videoDuration) * 100;
              const width = endPercent - startPercent;
              return (
                <div
                  key={index}
                  className="absolute h-full"
                  style={{
                    left: `${startPercent}%`,
                    width: `${width}%`,
                    backgroundColor: person.color || '#3b82f6',
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
