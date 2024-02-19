import eco from '../openingsDB/eco.json'

import intr from '../openingsDB/eco_interpolated.json'




const searchOpenings = (fen) => {

    const complete_openings = {...eco, ...intr};

    for (let i = 0; i < complete_openings.length; i++) {
        // Check if the current object's "fen" property matches the given FEN
        if (complete_openings[i].fen === fen) {
          // If found, return the name of the opening
          return complete_openings[i].name;
        }
    }

    return null;

}


export default searchOpenings