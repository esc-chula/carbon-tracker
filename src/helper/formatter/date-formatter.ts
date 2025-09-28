import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra);

function transFormDateToThai(date: string | null) {
  if (!date) {
    return "-";
  }

  return dayjs(date).format("DD/MM/BBBB HH:mmน.");
}

function transFormDate(date: string | null) {
  if (!date) {
    return "-";
  }

  return dayjs(date).format("DD/MM/BBBB");
}

export { transFormDateToThai, transFormDate };
