"use client";

import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  const handleClick = async () => {
    if (session) {
      await signOut();
    } else {
      await signIn("google");
    }
  };

  return (
    <Button
      type="button"
      variant="contained"
      fullWidth
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        gap: 1,
        backgroundColor: "#006B45",
        "&:hover": { backgroundColor: "#005337" },
      }}
      onClick={handleClick}
    >
      {session ? (
        "ออกจากระบบ"
      ) : (
        <>
          <GoogleIcon /> เข้าสู่ระบบ
        </>
      )}
    </Button>
  );
}
