
import axios from "axios";


const promptAiBasedOnGeneralGame = async (url) => {


    const firstcheck = url.split("/")[3];


    if(url.includes("black") || url.includes("white") || firstcheck.length === 8){
    
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
            ${res.data.winner} winning the game, the games moves were ${res.data.moves}, the time control for the game was ${res.data.speed}, the ${res.data.opening.name} opening was played, provide ways how would the game go, which plans both players can have, provide summary of what I told you`  
          }catch(error){
        
            return null;
       
          }
    
      }else if(firstcheck.length === 12){
        
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
            ${res.data.winner} winning the game, the games moves were ${res.data.moves}, the time control for the game was ${res.data.speed}, the ${res.data.opening.name} opening was played, provide ways how would the game go, which plans both players can have, provide summary of what I told you`  
          }catch(error){
         
            return null;
       
          }
      } 


}


export default promptAiBasedOnGeneralGame;