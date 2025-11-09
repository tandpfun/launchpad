import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex gap-4 max-w-4xl w-full">
        <video className="w-1/2 rounded-xl bg-black border-zinc-200 border shadow-sm aspect-9/16 max-w-sm" />
        <div className="border-zinc-200 border rounded-xl p-4 shadow-sm grow flex gap-2 relative">
          <div className="absolute bottom-2 right-3">
            <div className="text-sm text-zinc-500">SORANALYSIS v1.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
