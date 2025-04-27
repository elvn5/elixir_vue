import dayjs from "dayjs";

export const formatDate = (value: string) => {
  const cleaned = value.replace(/\.\d{3}\d*/, match => match.slice(0, 4));
  return dayjs(cleaned).format('DD.MM.YYYY HH:mm')

}
