
[![Netlify Status](https://api.netlify.com/api/v1/badges/310a8201-6453-448c-8651-e237d3c3b8f3/deploy-status)](https://app.netlify.com/sites/chessxplain/deploys)

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)




# chessXplain

![logo](./chessxplain/public/chess-rook.svg)

Chessxplain is open source platform that allows users to generate AI models like chat GPT 3.5 and Bard palm's text based evaluations for give chess position FEN and Lichess game based on trustful Stockfish's valid chess evals.

[Join Discord](https://discord.gg/PRQTXZXc8Z)



## Acknowledgements

 - [React Chessboard](https://github.com/Clariity/react-chessboard)
 - [Chess.js](https://unpkg.com/browse/chess.js@0.12.0/)
 - [Stockfish API](https://stockfish.online/)
 - [Stockfish](https://stockfishchess.org/)
 - [Lichess API](https://lichess.org/api)
 - [Lichess Opening Explorer](https://lichess.org/api#tag/Opening-Explorer)
 - [Lichess Games Database](https://lichess.org/api#tag/Games/operation/gamePgn)


## Features

- Light/dark mode toggle
- Custom board colors
- Chess position analysis with Stockfish
- Live analysis board, automous AI evaluations for updated chess board
- Lichess game text based evaluation by chatGPT 3.5
- Chess position FEN evaluation by Bard, chatGPT 3.5, chatGPT convo trained model


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`REACT_APP_GPT_TOKEN`


## Run Locally

Clone the project

```bash
  git clone https://github.com/jalpp/chessxplain.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Screenshots

![screenshot1](../chessxplain/chessxplain/public/screenshot1.png)

![screenshot2](../chessxplain/chessxplain/public/screenshot2.png)


## Roadmap

- Lichess puzzle eval by AI

- Lichess study eval by AI

- PGN support





