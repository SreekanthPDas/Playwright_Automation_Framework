
//Utility function to get current timestamp in HHMM format
export function getTimeStamp() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
}