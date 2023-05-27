const board = [
    ['A1','B1','C1','D1','E1','F1','G1','H1'],
    ['A2','B2','C2','D2','E2','F2','G2','H2'],
    ['A3','B3','C3','D3','E3','F3','G3','H3'],
    ['A4','B4','C4','D4','E4','F4','G4','H4'],
    ['A5','B5','C5','D5','E5','F5','G5','H5'],
    ['A6','B6','C6','D6','E6','F6','G6','H6'],
    ['A7','B7','C7','D7','E7','F7','G7','H7'],
    ['A8','B8','C8','D8','E8','F8','G8','H8'],
]

const returnMoves = {
    'W_PAWN':[[1,1],[1,-1],[1,0],[2,0]],
    'B_PAWN':[[-1,-1],[-1,1],[-1,0],[-2,0]],
    'W_KNIGHT':[[2,-1],[2,1],[1,2],[-1,2],[1,-2],[-1,-2],[-2,-1],[-2,1],[-2,1]],
    'B_KNIGHT':[[-2,1],[-2,-1],[-1,-2],[1,-2],[-1,2],[1,2],[2,1],[2,-1],[2,-1]],
    'W_BISHOP':[],
    'B_BISHOP':[],
    'B_QUEEN':[],
    'W_QUEEN':[],
    'B_KING':[],
    'W_KING':[],
    'B_ROOK':[],
    'W_ROOK':[]
}

function validMoves(piece,from,config){
    let x = parseInt(from.charCodeAt(0)-65)
    let y = parseInt(from.charAt(1))-1
    let moves = returnMoves[piece]
    const final = []
    let flag = 1;
    if((piece==='B_PAWN' && from[1]==7) || (piece==='W_PAWN' && from[1]==2)){
        flag=0
    }
    if(piece==='B_PAWN' || piece==='W_PAWN'){
    for(let i=0;i<moves.length-flag;i++){
        let move = moves[i]
        if(!(x+move[1]<0 || x+move[1]>7 || y+move[0]<0 || y+move[0]>7)){
            if(config[board[y+move[0]][x+move[1]]][0]===piece[0])continue;
            if((i==0 || i==1) && config[board[y+move[0]][x+move[1]]]==='')continue;
            if(board[y+move[0]][x+move[1]][0]===board[y][x][0] && config[board[y+move[0]][x+move[1]]])break;
            final.push(board[y+move[0]][x+move[1]])
        }
    }
    }
    if(piece==='B_BISHOP' || piece==='W_BISHOP'){
        const dir = [[1,1],[-1,-1],[1,-1],[-1,1]]
        for(let i=0;i<4;i++){
            let d = dir[i]
            let cur = [y,x]
            while(!(cur[0]+d[0]<0 || cur[0]+d[0]>7 || cur[1]+d[1]<0 || cur[1]+d[1]>7)){
                if(config[board[cur[0]+d[0]][cur[1]+d[1]]][0]===piece[0])break;
                if(config[board[cur[0]+d[0]][cur[1]+d[1]]]!=='' && config[board[cur[0]+d[0]][cur[1]+d[1]]][0]!==piece[0]){
                    final.push(board[cur[0]+d[0]][cur[1]+d[1]])
                    break;
                }
                final.push(board[cur[0]+d[0]][cur[1]+d[1]])
                cur = [cur[0]+d[0],cur[1]+d[1]]
            }
        }
    }
    if(piece==='B_KNIGHT' || piece==='W_KNIGHT'){
        for(let i=0;i<moves.length;i++){
            let move = moves[i]
            if(!(x+move[1]<0 || x+move[1]>7 || y+move[0]<0 || y+move[0]>7)){
                if(config[board[y+move[0]][x+move[1]]][0]===piece[0])continue;
                final.push(board[y+move[0]][x+move[1]])
            }
        }
    }
    if(piece==='B_ROOK' || piece==='W_ROOK'){
        const dir = [[1,0],[0,1],[-1,0],[0,-1]]
        for(let i=0;i<4;i++){
            let d = dir[i]
            let cur = [y,x]
            while(!(cur[0]+d[0]<0 || cur[0]+d[0]>7 || cur[1]+d[1]<0 || cur[1]+d[1]>7)){
                if(config[board[cur[0]+d[0]][cur[1]+d[1]]][0]===piece[0])break;
                if(config[board[cur[0]+d[0]][cur[1]+d[1]]]!=='' && config[board[cur[0]+d[0]][cur[1]+d[1]]][0]!==piece[0]){
                    final.push(board[cur[0]+d[0]][cur[1]+d[1]])
                    break;
                }
                final.push(board[cur[0]+d[0]][cur[1]+d[1]])
                cur = [cur[0]+d[0],cur[1]+d[1]]
            }
        }
    }
    if(piece==='B_QUEEN' || piece==='W_QUEEN'){
        let dir = [[1,1],[-1,-1],[1,-1],[-1,1]]
        for(let i=0;i<4;i++){
            let d = dir[i]
            let cur = [y,x]
            while(!(cur[0]+d[0]<0 || cur[0]+d[0]>7 || cur[1]+d[1]<0 || cur[1]+d[1]>7)){
                if(config[board[cur[0]+d[0]][cur[1]+d[1]]][0]===piece[0])break;
                if(config[board[cur[0]+d[0]][cur[1]+d[1]]]!=='' && config[board[cur[0]+d[0]][cur[1]+d[1]]][0]!==piece[0]){
                    final.push(board[cur[0]+d[0]][cur[1]+d[1]])
                    break;
                }
                final.push(board[cur[0]+d[0]][cur[1]+d[1]])
                cur = [cur[0]+d[0],cur[1]+d[1]]
            }
        }
        dir = [[1,0],[0,1],[-1,0],[0,-1]]
        for(let i=0;i<4;i++){
            let d = dir[i]
            let cur = [y,x]
            while(!(cur[0]+d[0]<0 || cur[0]+d[0]>7 || cur[1]+d[1]<0 || cur[1]+d[1]>7)){
                if(config[board[cur[0]+d[0]][cur[1]+d[1]]][0]===piece[0])break;
                if(config[board[cur[0]+d[0]][cur[1]+d[1]]]!=='' && config[board[cur[0]+d[0]][cur[1]+d[1]]][0]!==piece[0]){
                    final.push(board[cur[0]+d[0]][cur[1]+d[1]])
                    break;
                }
                final.push(board[cur[0]+d[0]][cur[1]+d[1]])
                cur = [cur[0]+d[0],cur[1]+d[1]]
            }
        }
    }
    if(piece==='W_KING' || piece==='B_KING'){
        const dir = [[1,0],[0,1],[1,1],[-1,-1],[-1,0],[0,-1],[1,-1],[-1,1]]
        for(let i=0;i<8;i++){
            let d = dir[i]
            if(!(y+d[0]<0 || y+d[0]>7 || x+d[1]<0 || x+d[1]>7)){
                if(config[board[y+d[0]][x+d[1]]][0]===piece[0])continue;
                final.push(board[y+d[0]][x+d[1]])
            }
        }
    }
    return final
}

export default function checkMove(piece,pos,config){
    let finalMoves = validMoves(piece,pos,config)
    return finalMoves
}