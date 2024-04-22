"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fenFromMoves = void 0;
var chess_js_1 = require("chess.js");
function fenFromMoves(moves) {
    var tmp_chess = new chess_js_1.Chess();
    console.log("fenFromMoves(moves): next comes moves made");
    for (var x = 0; x < moves.length; x++) {
        var move = moves[x];
        console.log(move);
        tmp_chess.move(move);
    }
    console.log("fen found: ", tmp_chess.fen());
    return tmp_chess.fen();
}
exports.fenFromMoves = fenFromMoves;
function testFenFromMoves() {
    var t_move_array = ["e4", "e5"];
    console.log(t_move_array);
    var tmp_chess = new chess_js_1.Chess();
    tmp_chess.move("e4");
    var fen = fenFromMoves(t_move_array);
}
testFenFromMoves();
//# sourceMappingURL=fenFromMoves.js.map