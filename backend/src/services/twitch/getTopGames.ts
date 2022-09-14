import axios from "axios";
async function getTopGames(access_token: string) {
  console.log(process.env.TOP_GAMES);
  try {
    const response = await axios.get(process.env.TOP_GAMES || "", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Client-ID": `${process.env.CLIENT_ID}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export { getTopGames };
