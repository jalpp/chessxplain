



const determinegamemode = (fen) => {

   let gametype = '';


   



   if((fen.includes('q') && fen.includes('b') && fen.includes('n') && fen.includes('r')) && (fen.includes('Q') && fen.includes('B') && fen.includes('N') && fen.includes('R'))){
    gametype = 'middle game';
   }else if ((fen.includes('p') && fen.includes('k') ) && (fen.includes('P') && fen.includes('K'))){
      gametype = 'pawn endgame means few pawns left on board along side minor or major pieces, the game is going to the end';
   }else if((fen.includes('q') && fen.includes('p') && fen.includes('k')) && (fen.includes('Q') && fen.includes('P') && fen.includes('K'))){
      gametype = 'queen endgame Queen endgame means few pawns left on board along side minor or major pieces plus a queen, the game is going to the end'
   }else if((fen.includes('b') && fen.includes('p') && fen.includes('k')) && (fen.includes('B') && fen.includes('P') && fen.includes('K'))){
      gametype = 'bishop endgame bishop endgame means few pawns left on board along side minor or major pieces, the game is going to the end';
   }else if((fen.includes('n') && fen.includes('p') && fen.includes('k')) && (fen.includes('N') && fen.includes('P') && fen.includes('K'))){
      gametype = 'night endgame night endgame means few pawns left on board along side minor or major pieces, the game is going to the end';
   }else if((fen.includes('r') && fen.includes('p') && fen.includes('k')) && (fen.includes('R') && fen.includes('P') && fen.includes('K'))){
      gametype = 'rook endgame means there are few pieces on the board along side the rook and the king';
   }

   

   return gametype;



}


export default determinegamemode;