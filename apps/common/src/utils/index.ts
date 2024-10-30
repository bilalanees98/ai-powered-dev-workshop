export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function getCurrentUnixTimeInSeconds() {
  return Math.floor(Date.now() / 1000);
}
