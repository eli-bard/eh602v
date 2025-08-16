"use client";

import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/geral/navbar";
import Sidebar from "@/components/geral/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!isMounted) {
    return (
      <div className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* Renderização estática inicial */}
        <div className="flex h-screen overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="h-16 bg-white"></div>
            <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
    >
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onMenuClick={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
