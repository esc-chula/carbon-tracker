// services/ky.ts
"use client";

import ky from "ky";
import { getFirebaseAuth } from "@/lib/firebase";

const auth = getFirebaseAuth();

const kyWithAuth = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL ?? "",
  hooks: {
    beforeRequest: [
      async (request) => {
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();

        request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
  },
});

export { kyWithAuth as ky };
