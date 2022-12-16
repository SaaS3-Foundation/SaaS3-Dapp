export function checkHttpUrl(string) {
  let givenURL;
  try {
    givenURL = new URL(string);
  } catch (error) {
    return false;
  }
  return givenURL.protocol === 'http:' || givenURL.protocol === 'https:';
}
