interface VideoPlayerProps {
  file: File | null;
}

export default function VideoPlayer({ file }: VideoPlayerProps) {
  return (
    <video
      className="w-1/2 rounded-xl bg-black border-zinc-200 border shadow-sm aspect-9/16 max-w-sm"
      src={file ? URL.createObjectURL(file) : undefined}
      controls
    />
  );
}

