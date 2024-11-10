import { Cookies } from 'quasar';

export const api = async (
  method: string,
  url: string,
  payload = {},
) => {
  const token = Cookies.get('authToken');

  // Append payload as query parameters if it's a GET request
  let fullUrl = process.env.API_URL + url;
  if (method === 'GET' && Object.keys(payload).length) {
    const queryParams = new URLSearchParams(payload as Record<string, string>).toString();
    fullUrl += `?${queryParams}`;
  }
  return await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: method !== 'GET' ? JSON.stringify(payload) : null,
  });
};
