
import fetchEvaluation from "../fish/Stockfish";



const  promptAiBasedOnSF = async (fen) => {

    const evaluationValue = await fetchEvaluation('eval', '13', fen);
    const topLine = await fetchEvaluation('lines', '13', fen)
    const bestmove = await fetchEvaluation('bestmove', '13', fen)

    let whoisWinning = '';

    if(evaluationValue.data.includes('-')){
      whoisWinning = 'black has advantage and possibly be winning';
    }else{
      whoisWinning = 'white has advantage and possibly be winning';
    }



    const ask = 'here is the chess game FEN: ' + fen + ' according to Stockfish the eval is ' + evaluationValue.data + ' ' + whoisWinning + ', the topline is ' + topLine.data + ' and the best move is ' + bestmove.data + ' What do you think about it, can you explain me current position and Stockfishs topline, how would the game change?, provide plans for both side';


   return ask;

}


export default promptAiBasedOnSF;