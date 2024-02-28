import axios from "axios";

const handleConvo = async (fen) => {

  const options = {
      method: 'GET',
      url: 'http://localhost:5000/api/convo',
      headers: {
        'Content-Type': 'application/json'
      },

      params: {
       fen: fen,
      }

    };

    try{
    const response = await axios.request(options);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }


}

export default handleConvo;