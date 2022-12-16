var canv = document.getElementById("GameScreen");
var ctx = canv.getContext("2d");
var board = [
    ["0","0","0"],
    ["0","0","0"],
    ["0","0","0"]
];
const LENGTH = canv.clientWidth;

class Game{
    constructor(LENGTH, board){
        this.length = LENGTH;
        this.board = board;
        this.currentPlayer = "X";
        this.playerWon = false;
    }
    input(y,x,ctx){
        if(this.board[y][x] !== "0" || this.playerWon) return;
        else{
            this.board[y][x] = this.currentPlayer;
            this.currentPlayer = (this.currentPlayer === "X" ? "O" : "X");
            document.getElementById("turn").innerHTML = this.currentPlayer + "'s turn";

            // check if a player wins
            // horizontal
            if(this.board[2][2] === "X" && this.board[2][1] === "X" && this.board[2][0] === "X") this.Win("X",0 /* xstart */, 2 /* xend */, 2 /* ystart */, 2 /* yend */, ctx);
            if(this.board[1][2] === "X" && this.board[1][1] === "X" && this.board[1][0] === "X") this.Win("X",0 /* xstart */, 2 /* xend */, 1 /* ystart */, 1 /* yend */, ctx);
            if(this.board[0][2] === "X" && this.board[0][1] === "X" && this.board[0][0] === "X") this.Win("X",0 /* xstart */, 2 /* xend */, 0 /* ystart */, 0 /* yend */, ctx);
            // vertical
            if(this.board[0][0] === "X" && this.board[1][0] === "X" && this.board[2][0] === "X") this.Win("X",0 /* xstart */, 0 /* xend */, 0 /* ystart */, 2 /* yend */, ctx);
            if(this.board[0][1] === "X" && this.board[1][1] === "X" && this.board[2][1] === "X") this.Win("X",1 /* xstart */, 1 /* xend */, 0 /* ystart */, 2 /* yend */, ctx);
            if(this.board[0][2] === "X" && this.board[1][2] === "X" && this.board[2][2] === "X") this.Win("X",2 /* xstart */, 2 /* xend */, 0 /* ystart */, 2 /* yend */, ctx);
            // diagonal
            if(this.board[0][0] === "X" && this.board[1][1] === "X" && this.board[2][2] === "X") this.Win("X",0 /* xstart */, 2 /* xend */, 0 /* ystart */, 2 /* yend */, ctx);
            if(this.board[0][2] === "X" && this.board[1][1] === "X" && this.board[2][0] === "X") this.Win("X",2 /* xstart */, 0 /* xend */, 0 /* ystart */, 2 /* yend */, ctx);

            
            
            
        }

    }
        
    Win(winner,xstart,xend,ystart,yend,ctx){
        // change text and say that someane has won
        document.getElementById("turn").innerHTML = winner + " won!!!";
        this.playerWon = true;

        // draw black bg
        ctx.strokeStyle = "black";
        ctx.fillRect(0,0,LENGTH,LENGTH);

        // draw line
        ctx.lineWidth = 20;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(xstart*200 + 100, ystart * 200 + 100);
        ctx.lineTo(xend*200 + 100, yend * 200 + 100);
        ctx.stroke();

    }


    draw_lines(ctx){
        for(let i = 1;i<3;i++){
            ctx.lineWidth = 5;
            ctx.strokeStyle = "dimgray";
            ctx.beginPath();
            ctx.moveTo(i*this.length/3,-1);
            ctx.lineTo(i*this.length/3, this.length);
            ctx.stroke();
        }
        for(let i = 1;i<3;i++){
            ctx.lineWidth = 5;
            ctx.strokeStyle = "dimgray";
            ctx.beginPath();
            ctx.moveTo(0, i*this.length/3);
            ctx.lineTo(this.length, i*this.length/3);
            ctx.stroke();
        }

    }

    draw(ctx){
        this.draw_lines(ctx);
        this.draw_board(ctx);
    }
    draw_board(ctx){
        for(let x = 0;x<3;x++){
            for(let y = 0;y<3;y++){
                ctx.drawImage(document.getElementById(this.board[y][x]),x*200+10,y*200+10,175,175);
            }
        }
        
    }
}
var game = new Game(LENGTH,board);

document.getElementById("turn").innerHTML = game.currentPlayer + "' turn";


function loop(timestamp) {
    game.draw(ctx);

    lastRender = timestamp
    window.requestAnimationFrame(loop)
  }
var lastRender = 0
window.requestAnimationFrame(loop)


document.addEventListener("keydown", event => {
    switch(event.keyCode){
        case 49:
            game.input(2,0,ctx);
            break; 
        case 50:
            game.input(2,1,ctx);
            break;
        case 51:
            game.input(2,2,ctx);
            break;
        case 52:
            game.input(1,0,ctx);
            break; 
        case 53:
            game.input(1,1,ctx);
            break; 
        case 54:
            game.input(1,2,ctx);
            break;
        case 55:
            game.input(0,0,ctx);
            break;
        case 56:
            game.input(0,1,ctx);
            break;
        case 57:
            game.input(0,2,ctx);
            break;

    }

})