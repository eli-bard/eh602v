"use client";

import { FileWarning, Calculator, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/p/dashboard",
    icon: Home,
  },
  {
    name: "Emergências",
    href: "/p/emergencias",
    icon: FileWarning,
  },
  {
    name: "Calculadoras",
    href: "/p/calculadoras",
    icon: Calculator,
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden dark:bg-black/70"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 w-64",
          "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "overflow-y-auto"
        )}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 px-2">
            EliHelp
          </h2>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg",
                  "text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                )}
                onClick={onClose}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
