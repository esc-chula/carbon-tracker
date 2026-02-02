const errorMapping: Record<string, string> = {
  UNAUTHORIZED: "โปรดเข้าสู่ระบบ",
  READ_CSV_FAILED: "อ่านไฟล์ข้อมูลการเดินทาง (CSV) ไม่สำเร็จ",
  READ_CSV_FAILED_EMPTY_CONTENT: "ไม่พบข้อมูลในไฟล์การเดินทาง (CSV)",
  CUSTOM_ID_ALREADY_EXISTS: "รหัสโครงการนี้ถูกใช้ไปแล้ว",
  INTERNAL_ERROR: "ระบบเกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง",
};

export interface ApiErrorResponse {
  title: string;
}

function isApiErrorResponse(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "title" in error &&
    typeof error.title === "string"
  );
}

export function mapApiErrorToMessage(error: unknown, fallback: string): string;
export function mapApiErrorToMessage(error: unknown): string | undefined;

export function mapApiErrorToMessage(error: unknown, fallback?: string) {
  if (!isApiErrorResponse(error)) {
    return fallback;
  }

  const code = error.title;

  return errorMapping[code] ?? fallback;
}
