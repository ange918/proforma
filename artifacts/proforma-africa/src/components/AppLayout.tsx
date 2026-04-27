import { ReactNode } from "react";
import SideBar from "./SideBar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
        {children}
      </main>
    </div>
  );
}