export const api = async (
  method: string,
  url: string,
  payload = {},
  token?: string
) => {
  return await fetch(process.env.API_URL + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: method !== 'GET' ? JSON.stringify(payload) : null,
  });
};
