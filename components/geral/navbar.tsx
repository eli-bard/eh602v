"use client";

import Link from "next/link";
import { Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { LogoutButton } from "../auth/logout-button";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  onMenuClick: () => void;
}

const supabase = await createClient();
const { data } = await supabase.auth.getClaims();
const user = data?.claims;

export default function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const isDashboard = pathname === "/p/dashboard";

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Botão Menu (mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo/Botão Voltar */}
          {isDashboard ? (
            <Link href="/" className="flex items-center">
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                EliHelp
              </span>
            </Link>
          ) : (
            <Link href="/p/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Voltar ao Dashboard
              </span>
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Botões de Ação (exemplo) */}
          <div className="flex items-center gap-4">
            Olá, {user!.email}!
            <LogoutButton />
          </div>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="dark:border-gray-600 dark:text-gray-200"
          >
            <Link href="/p/perfil">Perfil</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
