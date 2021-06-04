import React from "react";
import Piece from "../Piece/Piece";
import * as constant from "../Constant";

const piece_types = [
    [ //line
        [1, 1, 1, 1]
    ],
    [ //left l
        [1, 0],
        [1, 0],
        [1, 1]
    ],
    [ //lightning
        [1, 0],
        [1, 1],
        [0, 1]
    ],
    [ //T
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
            screenWidth: 512,
            screenHeight: 512,
            pieces: []
        }
        this.moving = null;
        this.movingObj = null;
        this.grid = null;
        this.board = null;
        this.ctx = null;
        this.canvasRef = React.createRef();
        this.canvas = null;
    }

    setUp(){
        this.setContext();
        this.setGrid();
    }

    setContext(){
        if (this.ctx){
            // any objects that need ctx, give this.ctx
        }
    }

    setGrid(){
        let board = [];
        let row = new Array(this.state.screenWidth/constant.SCALE).fill(0);

        for (var i = 0; i < this.state.screenHeight/constant.SCALE; i++){
            board.push(row);
        }
        this.grid = board;
        this.moving = board;
    }

    updateBoard(){
        
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
        requestInterval(() => {this.update()}, constant.frameDelay );
    }

    drawBoard(){
        
    }

    createPiece(){
        
    }

    update(){
        if (this.ctx){
            this.ctx.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight);
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.state.screenWidth, this.state.screenHeight)
            // this.ctx.fillStyle = "yellow";
            // this.ctx.fillRect(0, 0, constant.SCALE, constant.SCALE);
        }
    }

    render(){
        return(
            <div>
                <canvas id = {"Canvas"} ref = {this.canvasRef} className = {"Canvas"} width = {this.state.screenWidth} height = {this.state.screenHeight}/>
                <Piece type = {piece_types[0]} ctx = {this.ctx}/>
            </div>
        )
    }
}

export default (Board);