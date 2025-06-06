import dayjs from "dayjs";

export const formatDate = (value: string | undefined) => {
  if(!value) return "";

  const cleaned = value.replace(/\.\d{3}\d*/, match => match.slice(0, 4));
  return dayjs(cleaned).format('DD.MM.YYYY HH:mm')

}

export const formatBirthday = (date: Date | string | undefined): string => {
  if(!date) {
    return "";
  }
  return new Date(date).toLocaleDateString('ru-RU')
}
