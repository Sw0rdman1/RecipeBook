export function generateImageNumber(): string {
  const alphanumeric =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const imageNumber = generateRandomString(alphanumeric, 6);

  const startDate = new Date("2023-01-01").getTime();
  const endDate = new Date("2023-12-31").getTime();
  const randomTimestamp = Math.random() * (endDate - startDate) + startDate;
  const randomDate = new Date(randomTimestamp)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");

  const name = generateRandomString(alphanumeric, 11);

  const imageInfo = `${randomDate}_${name}_${imageNumber}`;

  return imageInfo;
}

function generateRandomString(characters: string, length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
