"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Sign out
    </Button>
  );
}
