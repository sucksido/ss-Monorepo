const clientId = '1';
const clientSecret = 'x0ocgPXB4OKlxVWsuCtzd5nBd3XrBAiknYJNAe1v';
const tokenEndpoint = 'http://127.0.0.1:8000/oauth/token';
let accessToken = null;

const getToken = async () => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'client_credentials');
  formData.append('client_id', clientId);
  formData.append('client_secret', clientSecret);

  try {
    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      accessToken = data.access_token;
      // Now you have the access token to make API requests with
    } else {
      // Handle error response
      console.error('Failed to get access token:', response.statusText);
    }
  } catch (error) {
    console.error('Error occurred while fetching access token:', error);
  }
};

export { getToken };