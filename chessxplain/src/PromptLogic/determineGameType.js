






const determinegamemode = (fen) => {

   let gametype = 'opening game';


   if((fen.split('k').length - 1) < 1 || (fen.split('k').length - 1) > 1 || (fen.split('K').length - 1) < 1 || (fen.split('K').length - 1) > 1){
    return null; // invalid FEN
   }else if((fen.includes('q') && fen.includes('b') && fen.includes('n') && fen.includes('r')) && (fen.includes('Q') && fen.includes('B') && fen.includes('N') && fen.includes('R'))){
    gametype = 'middle game';
   }else if ((fen.includes('p') && fen.includes('k') ) && (fen.includes('P') && fen.includes('K'))){
      gametype = 'pawn endgame';
   }else if((fen.includes('q') && fen.includes('p') && fen.includes('k')) && (fen.includes('Q') && fen.includes('P') && fen.includes('K'))){
      gametype = 'queen endgame';
   }else if((fen.includes('b') && fen.includes('p') && fen.includes('k')) && (fen.includes('B') && fen.includes('P') && fen.includes('K'))){
      gametype = 'bishop endgame';
   }else if((fen.includes('n') && fen.includes('p') && fen.includes('k')) && (fen.includes('N') && fen.includes('P') && fen.includes('K'))){
      gametype = 'night endgame';
   }else if((fen.includes('r') && fen.includes('p') && fen.includes('k')) && (fen.includes('R') && fen.includes('P') && fen.includes('K'))){
      gametype = 'rook endgame';
   }

   

   return gametype;



}


export default determinegamemode;