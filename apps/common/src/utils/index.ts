import fetch from 'node-fetch';
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function getCurrentUnixTimeInSeconds() {
  return Math.floor(Date.now() / 1000);
}

export async function fetchConfigFromS3() {
  const S3_JSON_URL = 'https://ai-dev-workshop-isb.s3.us-east-1.amazonaws.com/config.json';
  try {
    const response = await fetch(S3_JSON_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching config from S3:', error.message);
    return null;
  }
}
