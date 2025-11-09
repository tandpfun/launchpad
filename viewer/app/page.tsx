'use client';

import { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Sidebar from './components/Sidebar';
import FileUpload from './components/FileUpload';
import PeopleList from './components/PeopleList';
import { PersonData } from './components/Person';

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [people, setPeople] = useState<PersonData[]>([]);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  // Get video duration when file changes
  useEffect(() => {
    if (!uploadedFile) {
      setVideoDuration(null);
      return;
    }

    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = URL.createObjectURL(uploadedFile);

    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      URL.revokeObjectURL(video.src);
    };

    video.onerror = () => {
      setVideoDuration(null);
      URL.revokeObjectURL(video.src);
    };

    return () => {
      if (video.src) {
        URL.revokeObjectURL(video.src);
      }
    };
  }, [uploadedFile]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex gap-4 max-w-4xl w-full">
        <VideoPlayer file={uploadedFile} />
        <Sidebar>
          <FileUpload
            uploadedFile={uploadedFile}
            onFileChange={setUploadedFile}
          />
          <PeopleList
            people={people}
            videoDuration={videoDuration}
            onPeopleChange={setPeople}
          />
        </Sidebar>
      </div>
    </div>
  );
}
