
import axios from "axios";


const promptAiBasedOnGeneralGame = async (url) => {


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
            ${res.data.winner} winning the game, the games moves were ${res.data.moves}, the time control for the game was ${res.data.speed}, the ${res.data.opening.name} opening was played, what are your thoughts about the game and the opening?`  
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
            ${res.data.winner} winning the game, the games moves were ${res.data.moves}, the time control for the game was ${res.data.speed}, the ${res.data.opening.name} opening was played, what are your thoughts about the game and the opening?`  
          }catch(error){
         
            return null;
       
          }
      } 


}


export default promptAiBasedOnGeneralGame;