interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="border-zinc-200 border rounded-xl p-4 shadow-sm grow flex gap-2 relative">
      <div className="absolute bottom-2 right-3">
        <div className="text-sm text-zinc-500">SORANALYSIS v1.0</div>
      </div>
      <div className="flex gap-4 flex-col w-full">{children}</div>
    </div>
  );
}
