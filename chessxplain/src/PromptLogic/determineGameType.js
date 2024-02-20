






const determinegamemode = (fen) => {

   let gametype = '';


   if((fen.split('k').length - 1) < 1 || (fen.split('k').length - 1) > 1 || (fen.split('K').length - 1) < 1 || (fen.split('K').length - 1) > 1){
    return null; // invalid FEN
   }else if(fen.includes('q') && fen.includes('b') && fen.includes('n') && fen.includes('r') ){

   }
   





}


export default determinegamemode;