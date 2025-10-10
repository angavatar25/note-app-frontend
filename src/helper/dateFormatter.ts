import moment from "moment";

export const dateFormatter = (dateString: string): string => {
  const formatted = moment.utc(dateString).format("DD MMM YYYY, HH:mm")

  return formatted
}