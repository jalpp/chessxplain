/*  This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>. 
*/

import { Chess } from "chess.js";

/**
 * get the fen from an Array of moves.
 */
export function fenFromMoves(moves: Array<string>): string {
  const tmp_chess = new Chess();

  console.log("fenFromMoves(moves): next comes moves made");
  // go through all of the moves, and make them on a chess instance
  for (let x = 0; x < moves.length; x++) {
    const move = moves[x];
    console.log(move);
    tmp_chess.move(move);
  }

  console.log("fen found: ", tmp_chess.fen());
  return tmp_chess.fen();
}

/**
 * test fenFromMoves(...)
 */
function testFenFromMoves(): void {
  let t_move_array = ["e4", "e5"];

  console.log(t_move_array);
  const tmp_chess = new Chess();
  tmp_chess.move("e4");
  let fen = fenFromMoves(t_move_array);
}

testFenFromMoves();
