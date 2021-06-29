import React from "react";
import Piece from "../Piece/Piece";
import * as constant from "../Constant";

const piece_types = [
    [ //line
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [ //left l
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1] 
    ],
    [ //lightning
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [ //T
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [ //cube
        [1, 1],
        [1, 1]
    ]
]


var requestInterval = function (fn, delay) {
    var requestAnimFrame = (function () {
      return window.requestAnimationFrame || function (callback, element) {
        window.setTimeout(callback,  constant.frameDelay);
      };
    })(),
        start = new Date().getTime(),
        handle = {};
    function loop() {
      handle.value = requestAnimFrame(loop);
      var current = new Date().getTime(),
          delta = current - start;
      if (delta >= delay) {
        fn.call();
        start = new Date().getTime();
      }
    }
    handle.value = requestAnimFrame(loop);
    return handle;  
};

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            screenWidth: constant.COLSIZE*constant.SCALE,
            screenHeight: constant.ROWSIZE*constant.SCALE,
        }
        //this.moving = null;
        this.currentObj = null;
        this.grid = null;
        //this.board = [];
        this.ctx = null;
        this.canvasRef = React.createRef();
        this.canvas = null;
        this.pieces = [];
        this.highestOccupied = constant.COLSIZE-1;
    }

    setUp(){
        this.setGrid();
    }

    setGrid(){
        let board = [];
        let row = new Array(this.state.screenWidth/constant.SCALE).fill(0);

        for (var i = 0; i < this.state.screenHeight/constant.SCALE; i++){
            //board.push(row);
            board.push(row);
        }
        this.grid = board;
    }

    findHighestOccupied(){
        for (let i = 0; i < this.grid.length; i++){
            if (!this.grid[this.grid.length-i].includes(1)){
                this.highestOccupied = i-1;
                return 
            }
        }
    }

    stop(piece){ 
        // stop is being called too much
        piece.falling = false;
        piece.parts.map((tile)=>{
            console.log(tile.x, tile.y)
            // console.log("HIIIIIII")
            this.grid[tile.y][tile.x] = 1;
            if (tile.y < this.highestOccupied){
                this.highestOccupied = tile.y;
            }
        })
        return this.createPiece();
    }

    collide(){
        if (this.currentObj != null){
            for (let i = 0; i < this.currentObj.parts.length-1; i++){
                //console.log(this.currentObj.parts[i]);
                if (this.currentObj.parts[i].y >= constant.COLSIZE-1 || (this.currentObj.parts[i].y+1 >= this.highestOccupied && this.grid[this.currentObj.parts[i].y+1][this.currentObj.parts[i].x] == 1)){
                    //console.log(i, this.currentObj.parts[i].x, this.currentObj.parts[i].y, this.grid[this.currentObj.parts[i].y+1][this.currentObj.parts[i].x], constant.COLSIZE-1)
                    this.currentObj = this.stop(this.currentObj);
                    return
                }
            }
        }
    }

    debugGrid(){
        this.grid.map((row)=>{
            console.log(row.join(" "));
        })
    }

    drawBoard(){
        for (let i = 0; i <this.grid.length; i++){
            for (let j = 0; j < this.grid[i].length; j++){
                this.ctx.strokeStyle = "white";
                this.ctx.strokeRect(j*constant.SCALE, i*constant.SCALE, constant.SCALE, constant.SCALE);
                if (this.grid[i][j] == 0){
                    this.ctx.fillStyle = "black";
                }else if (this.grid[i][j] == 1){
                    this.ctx.fillStyle = "green";
                }
                this.ctx.fillRect(j*constant.SCALE, i*constant.SCALE, constant.SCALE, constant.SCALE)
            }
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", function (e) {
            constant.keysDown[e.keyCode] = true;
          }, false);
        document.addEventListener("keyup", function (e) {
            delete constant.keysDown[e.keyCode];
          }, false);
       
          //this.canvas =  ReactDOM.findDOMNode(this).getBoundingClientRect();
          this.ctx = this.canvasRef.current.getContext('2d');
          this.setUp();   
        this.currentObj = this.createPiece();
        requestInterval(() => {this.update()}, constant.frameDelay );
    }

    createPiece(){
        let piece = new Piece(piece_types[Math.floor(Math.random()*5)], this.ctx)
        piece.make();
        this.pieces.push(piece);
        return piece;
    }

    update(){
        if (this.ctx){
            this.ctx.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
            this.drawBoard();
            for (let i = 0; i < this.pieces.length; i++){
                this.pieces[i].render()
;            }
            this.collide();
        }
    }

    render(){
        return(
            <div>
                <canvas id = {"Canvas"} ref = {this.canvasRef} className = {"Canvas"} width = {this.state.screenWidth} height = {this.state.screenHeight}/>
            </div>
        )
    }
}

export default (Board);