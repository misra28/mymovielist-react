const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const formatDate = (date: string) => {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);

  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

export const dateStringDifference = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);

  dateA.setHours(0, 0, 0, 0);
  dateB.setHours(0, 0, 0, 0);
  
  if (dateA < dateB) {
    return -1;
  } else return 1;
}

export default formatDate;