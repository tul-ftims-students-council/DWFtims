export async function register(indexNumber: string, talks: string[]) {
  return await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ indexNumber, talks })
  });
}
