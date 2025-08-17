"use client";

import { Box, Button } from "@mui/material";
import { useAuth } from "../login/context/auth-provider";

export default function LoginButton() {
  const { user, signOutAll, signInGoogle } = useAuth();

  const handleClick = async () => {
    if (user) {
      await signOutAll();
    } else {
      await signInGoogle();
    }
  };

  return (
    <Button
      type="button"
      variant="outlined"
      fullWidth
      sx={{
        height: 44,
        display: "flex",
        justifyContent: "center",
        gap: 1,
      }}
      onClick={handleClick}
    >
      {user ? (
        "ออกจากระบบ"
      ) : (
        <>
          <Box component="img" src="/assets/icons/ic-google.svg" />
          เข้าสู่ระบบด้วย Google
        </>
      )}
    </Button>
  );
}
