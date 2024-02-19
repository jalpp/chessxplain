import axios from "axios";
import promptAiBasedOnSF from "../PromptLogic/promptcompute";



const handleLama = async (fen) => {

    
  const ask = await promptAiBasedOnSF(fen);
  //
  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationpalm2',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.REACT_APP_GPT_TOKEN,
      'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: ask
        }
      ],
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data.BOT);
    return response.data.BOT;
  } catch (error) {
    console.error(error);
  }
}

export default handleLama;
