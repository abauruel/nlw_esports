import axios from "axios";
const url = process.env.OAUTH2_URL || "";

async function getToken() {
  try {
    const response = await axios.post(url, {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: process.env.GRANT_TYPE,
    });
    return response.data;
  } catch (error: any) {
    console.error(error.message);
  }
}

export { getToken };
