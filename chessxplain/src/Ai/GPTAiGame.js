
import axios from "axios";
import promptAiBasedOnGame from "../PromptLogic/promptAiBasedOnGame";
import promptAiBasedOnGeneralGame from "../PromptLogic/promptAiBasedOnGeneralGame";

const handleGPTGame = async (game) => {


    const validInput = game.trim();
    if(validInput.length < 1 || !validInput.includes("https://lichess.org/")){
      return "Invalid Lichess game! Please enter proper Lichess game URL!";
    }


  
    let ask = await promptAiBasedOnGame(validInput);

    if(ask === null){
      ask = await promptAiBasedOnGeneralGame(validInput);
    }

   
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
    return response.data.result;
  } catch (error) {
    console.error(error);
  
  }
}

export default handleGPTGame;