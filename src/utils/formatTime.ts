import type { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

export default function formatTime(timestamp: Timestamp) {
    const thisYear = dayjs().year();
    const yearOfTimestamp = dayjs(timestamp.toDate()).year();
    const formatString = thisYear === yearOfTimestamp ? "MM-DD HH:mm" : "YYYY-MM-DD"
    return dayjs(timestamp.toDate()).format(formatString);
}