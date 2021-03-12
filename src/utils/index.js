export const chunkArray = (arr = [], chunkCount) => {
  const chunks = [];
  while (arr.length) {
    const chunkSize = Math.ceil(arr.length / chunkCount--);
    const chunk = arr.slice(0, chunkSize);
    chunks.push(chunk);
    arr = arr.slice(chunkSize);
  }
  return chunks;
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const socials = {
  facebook:
    "https://www.facebook.com/All-about-Wood-Service-KC-102386658266078",
};
