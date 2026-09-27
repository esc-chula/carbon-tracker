import { formatApiErrorBody } from "@/lib/error-mapping";
import { HTTPError } from "ky";

export async function messageFromSubmitError(
  error: unknown,
  fallback: string,
): Promise<string> {
  if (!(error instanceof HTTPError)) {
    return fallback;
  }

  try {
    const body: unknown = await error.response.json();
    return formatApiErrorBody(body, fallback);
  } catch {
    return fallback;
  }
}
