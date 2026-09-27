const errorMapping: Record<string, string> = {
  UNAUTHORIZED: "โปรดเข้าสู่ระบบ",
  READ_CSV_FAILED: "อ่านไฟล์ข้อมูลการเดินทาง (CSV) ไม่สำเร็จ",
  READ_CSV_FAILED_EMPTY_CONTENT: "ไม่พบข้อมูลในไฟล์การเดินทาง (CSV)",
  CUSTOM_ID_ALREADY_EXISTS: "รหัสโครงการนี้ถูกใช้ไปแล้ว",
  INTERNAL_ERROR: "ระบบเกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง",
};

const GENERIC_TITLES = new Set([
  "Bad Request",
  "Unprocessable Entity",
  "Unauthorized",
  "Forbidden",
  "Not Found",
  "Internal Server Error",
]);

export interface ApiErrorResponse {
  title: string;
  detail?: string;
  errors?: ApiErrorDetail[] | null;
  status?: number;
}

export interface ApiErrorDetail {
  message?: string;
  location?: string;
}

const MAX_VALIDATION_LINES = 5;

function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "title" in error &&
    typeof (error as ApiErrorResponse).title === "string"
  );
}

export function formatApiErrorBody(
  error: unknown,
  fallback = "ส่งแบบฟอร์มไม่สำเร็จ",
): string {
  if (!isApiErrorResponse(error)) {
    return fallback;
  }

  const mappedCode = errorMapping[error.title];
  if (mappedCode) {
    return mappedCode;
  }

  const validationMessage =
    error.errors && error.errors.length > 0
      ? formatValidationErrors(error.errors)
      : undefined;
  if (validationMessage) {
    return validationMessage;
  }

  const detail = error.detail?.trim();
  if (detail) {
    return detail;
  }

  if (!GENERIC_TITLES.has(error.title)) {
    return error.title;
  }

  return fallback;
}

function formatValidationErrors(errors: ApiErrorDetail[]): string | undefined {
  const lines = errors
    .map((entry) => {
      const location = entry.location?.trim();
      const message = entry.message?.trim();
      if (location && message) return `${location}: ${message}`;
      return message ?? location;
    })
    .filter((line): line is string => Boolean(line));

  if (lines.length === 0) return undefined;

  const shown = lines.slice(0, MAX_VALIDATION_LINES);
  if (lines.length > MAX_VALIDATION_LINES) {
    shown.push(`… และอีก ${lines.length - MAX_VALIDATION_LINES} รายการ`);
  }
  return shown.join("\n");
}
