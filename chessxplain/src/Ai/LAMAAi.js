import axios from "axios";

const handleLama = async (fen) => {

  const options = {
      method: 'GET',
      url: 'http://23.137.104.197:5019/api/bard',
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

export default handleLama;
