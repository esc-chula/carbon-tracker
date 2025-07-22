import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <h1 className="text-4xl font-bold">
        Welcome to Carbon Tracker Website from ESC
      </h1>

      <Stack spacing={2} direction="row">
        <Button variant="contained">Contained</Button>
        <Button disabled variant="contained">
          Contained
        </Button>
        <Button variant="outlined">Outlined</Button>
        <Button disabled variant="outlined">
          Outlined
        </Button>
        <Button variant="text">Text</Button>
        <Button disabled variant="text">
          Text
        </Button>
        <Button loading variant="contained" loadingPosition="start">
          Submit
        </Button>
      </Stack>
    </main>
  );
}
