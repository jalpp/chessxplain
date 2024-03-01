
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import promptAiBasedOnSF  from './PromptLogic/promptcompute.js'
import promptAiBasedOnGeneralGame from './PromptLogic/promptAiBasedOnGeneralGame.js'
import  promptAiBasedOnGame from './PromptLogic/promptAiBasedOnGame.js'
const app = express();
const PORT = process.env.PORT || 5019;
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/gpt', async (req, res) => {

    const fenq = req.query.fen
    const ask = await promptAiBasedOnSF(fenq);

    console.log(ask);

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
    temperature: 0.9,
    top_k: 5,
    top_p: 0.9,
    max_tokens: 256
  }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data.result);
} catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
}

});


app.get('/api/bard', async (req, res) => {
    const fenq = req.query.fen
    const ask = await promptAiBasedOnSF(fenq);

    console.log(ask);

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
    console.log(response.data);
    res.json(response.data.BOT);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/convo', async (req, res) => {


    const fenq = req.query.fen
    const ask = await promptAiBasedOnSF(fenq);

    console.log(ask);

  const options = {
     method: 'POST',
     url: 'https://open-ai21.p.rapidapi.com/conversationmpt',
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
     console.log(response.data)
     res.json(response.data.result);
   } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
   }

});


app.get('/api/gamereview', async (req, res) => {

    const validInput = req.query.gameurl
    let ask = await promptAiBasedOnGame(validInput);

    if(ask === null){
      ask = await promptAiBasedOnGeneralGame(validInput);
    }


    console.log(ask);


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
     console.log(response.data)
    res.json(response.data.result);
  } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' });

  }

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


