"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";
import { fetchValidateOwner } from "@/services/user/query/user-query";
import { showError } from "@/components/toast/toast";
import { useRouter } from "next/navigation";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signUpEmail: (email: string, password: string) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  signOutAll: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getFirebaseAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, [auth]);

  const api = useMemo<AuthCtx>(
    () => ({
      user,
      loading,
      signUpEmail: async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
      },
      signInEmail: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      signInGoogle: async () => {
        await signInWithPopup(auth, googleProvider);
        try {
          await fetchValidateOwner();
        } catch (error) {
          showError("กรุณาเข้าสู่ระบบด้วยอีเมลจุฬา");
          await signOut(auth);
          router.push("/login");
        }
      },
      signOutAll: async () => {
        await signOut(auth);
      },
    }),
    [auth, user, loading],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
