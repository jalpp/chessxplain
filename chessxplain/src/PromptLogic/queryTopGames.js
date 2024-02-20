

import axios from "axios"


const searchTopGame = async (fen) => {

   try{
     const res = await axios.get(
      `https://explorer.lichess.ovh/masters?fen=${fen}`
     )

     return res.data.topGames[0].white.name + ' vs ' + res.data.topGames[0].black.name + ' Side won is ' + res.data.topGames[0].winner + ' Lichess game URL: https://lichess.org/' + res.data.topGames[0].id
   }catch(error){

   }

}


export default searchTopGame