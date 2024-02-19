
import axios from "axios";
import promptAiBasedOnSF from "../PromptLogic/promptcompute";


const handleGPT = async (fen) => {

   
    const ask = await promptAiBasedOnSF(fen);
  //
  const options = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
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
      web_access: false,
    system_prompt: '',
    temperature: 1.0,
    top_k: 5,
    top_p: 0.9,
    max_tokens: 500
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

export default handleGPT;