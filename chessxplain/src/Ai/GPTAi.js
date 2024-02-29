import axios from "axios";


const handleGPT = async (fen) => {

    const options = {
      method: 'GET',
      url: 'https://chessxplain.thexhosting.com/api/gpt',
      headers: {
        'Content-Type': 'application/json'
      },

      params: {
       fen: fen,
      }

    };

    try{
    const response = await axios.request(options);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default handleGPT;