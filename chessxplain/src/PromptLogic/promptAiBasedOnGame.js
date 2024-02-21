
import axios from "axios";


const promptAiBasedOnGame = async (url) => {


    if(url.includes("black") || url.includes("white")){
    
        const gameID = url.split("/")[3];
    
        try{
        
            const options = {
                method: 'GET',
                url: `https://lichess.org/game/export/${gameID}`,
                headers: {
                  'content-type': 'application/json'
                },
              };
              
            const res = await axios.request(options);
            return `The game between player ${res.data.players.white.user.name} playing white vs player ${res.data.players.black.user.name} playing black the game ends in 
            ${res.data.winner} winning the game, the games moves were ${res.data.moves}, the time control for the game was ${res.data.speed}, the ${res.data.opening.name} opening was played, Stockfish suggests player white had acp: ${res.data.players.white.analysis.acpl} inaccuracy: ${res.data.players.white.analysis.inaccuracy} blunder ${res.data.players.white.analysis.blunder} mistake ${res.data.players.white.analysis.mistake}, player black had acp: ${res.data.players.black.analysis.acpl} inaccuracy: ${res.data.players.black.analysis.inaccuracy} blunder ${res.data.players.black.analysis.blunder} mistake ${res.data.players.black.analysis.mistake}. Please provide your thoughts on this game, using Stockfish's reasoning, provide good summary from tactical and postional perspective` 
          }catch(error){
        
            return null;
       
          }
    
      }else{
        
        const gameIDz = url.slice(0,-4);
        const id = gameIDz.split("/")[3];
        console.log(id);
        try{
            const options = {
                method: 'GET',
                url: `https://lichess.org/game/export/${id}`,
                headers: {
                  'content-type': 'application/json'
                },
              };
              
            const res = await axios.request(options);
            return `The game between player ${res.data.players.white.user.name} playing white vs player ${res.data.players.black.user.name} playing black the game ends in 
            ${res.data.winner} winning the game, the games moves were ${res.data.moves}, the time control for the game was ${res.data.speed}, the ${res.data.opening.name} opening was played, Stockfish suggests player white had acp: ${res.data.players.white.analysis.acpl} inaccuracy: ${res.data.players.white.analysis.inaccuracy} blunder ${res.data.players.white.analysis.blunder} mistake ${res.data.players.white.analysis.mistake}, player black had acp: ${res.data.players.black.analysis.acpl} inaccuracy: ${res.data.players.black.analysis.inaccuracy} blunder ${res.data.players.black.analysis.blunder} mistake ${res.data.players.black.analysis.mistake}. Please provide your thoughts on this game, using Stockfish's reasoning, provide good summary from tactical and postional perspective`  
          }catch(error){
         
            return null;
       
          }
      } 


}


export default promptAiBasedOnGame;