

import axios from "axios"


const searchOpenings = async (fen) => {

   try{
     const res = await axios.get(
      `https://explorer.lichess.ovh/masters?fen=${fen}`
     )

     return res.data.opening.name
   }catch(error){

   }

}


export default searchOpenings