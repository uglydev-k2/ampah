"use client";

import { CommandPalette } from "@/components/admin/command-palette";
import { AdminToastStack } from "@/components/admin/admin-toast";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CommandPalette />
      <AdminToastStack />
    </>
  );
}
