"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/sections/login/context/auth-provider";

const PUBLIC_PATHS = ["/login", "/dashboard"];

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  useEffect(() => {
    if (!loading && user && pathname.startsWith("/login")) {
      void router.replace("/");
    }
  }, [loading, user, pathname, router]);

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      void router.replace("/dashboard");
    }
  }, [loading, user, isPublic, pathname, router]);

  if (loading) return null;
  if (!user && !isPublic) return null;

  return <>{children}</>;
}
