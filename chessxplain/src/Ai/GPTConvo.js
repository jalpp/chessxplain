import axios from "axios";

const handleConvo = async (fen) => {

  const options = {
      method: 'GET',
      url: 'https://chessxplain.thexhosting.com/api/convo',
      headers: {
        'Content-Type': 'application/json'
      },

      params: {
       fen: fen,
      }

    };

    try{
    const response = await axios.request(options);
    return response.data.reply;
  } catch (error) {
    console.error(error);
  }


}

export default handleConvo;