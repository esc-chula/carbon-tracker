"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/sections/login/context/auth-provider";

const PUBLIC_PATHS = ["/login"];

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isPublic = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );

  useEffect(() => {
    if (!loading && user && pathname.startsWith("/login")) {
      const next = searchParams.get("next") ?? "/";
      void router.replace(next);
    }
  }, [loading, user, pathname, searchParams, router]);

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      const current =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      void router.replace(`/login?next=${encodeURIComponent(current)}`);
    }
  }, [loading, user, isPublic, pathname, searchParams, router]);

  if (loading) return null;
  if (!user && !isPublic) return null;

  return <>{children}</>;
}
