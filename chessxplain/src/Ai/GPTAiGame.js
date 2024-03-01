
import axios from "axios";

const handleGPTGame = async (game) => {
    const validInput = game.trim();
    if(validInput.length < 1 || !validInput.includes("https://lichess.org")){
      return "Invalid Lichess game! Please enter proper Lichess game URL!";
    }

    const options = {
      method: 'GET',
      url: 'https://chessxplain.thexhosting.com/api/bard',
      headers: {
        'Content-Type': 'application/json'
      },

      params: {
       gameurl: validInput,
      }

    };

    try{
    const response = await axios.request(options);
    return response.data.reply;
  } catch (error) {
    console.error(error);
  }

}

export default handleGPTGame;