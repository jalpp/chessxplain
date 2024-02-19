
import axios from 'axios'



const fetchEvaluation = async (mode, depth, fen) => {
    try {
      const response = await axios.get(
        `https://stockfish.online/api/stockfish.php?fen=${encodeURIComponent(
          fen
        )}&depth=${depth}&mode=${mode}`
      );
       return response.data;
    } catch (error) {
      console.error('Error fetching evaluation:', error);
    }
  };


  export default fetchEvaluation