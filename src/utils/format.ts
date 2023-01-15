import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export function formatDate(date: string) {
  return dayjs.utc(date).utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
}
