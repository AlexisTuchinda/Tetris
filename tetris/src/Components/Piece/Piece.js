import React from "react";
import Tile from "../Tile/Tile";
import * as constant from "../Constant";

window.addEventListener("keydown", function (e) {
    constant.keysDown[e.keyCode] = true;
  }, false);
window. addEventListener("keyup", function (e) {
    delete constant.keysDown[e.keyCode];
  }, false);

class Piece{
    constructor(type, ctx){
        this.type = type;
        this.isMoving = true;
        this.parts = [];
        this.ctx = ctx;
        this.falling = true;
    }

    make(){
        this.parts =[];
        for (let y = 0; y < this.type.length; y++){
            for (let x = 0; x < this.type[y].length; x++){
                if (this.type[y][x] !=0){
                    this.parts.push(new Tile(8+x, y, this.ctx));
                }
            }
        }
    }

    rotate(){
        if (constant.keys.space in constant.keysDown && this.falling){
            for (let y = 0; y < this.type.length; y++) {
                for (let x = 0; x < y; x++) {
                     [this.type[x][y], this.type[y][x]] = 
                     [this.type[y][x], this.type[x][y]];
                   }
               }
            this.type.reverse();
            this.make();

            // let [distX, distY] = [0, 0];

            // this.parts.map((tile) =>{
            //     distX+=tile.x;
            //     distY+=tile.y;

            //     let x = -tile.x;
            //     tile.x = tile.y;
            //     tile.y = x; //however, doesn't stay in the relatively same place.
            // })

            // this.parts.map((tile)=>{
            //     console.log(tile.x);
            //     tile.x-=(Math.floor(distX/this.parts.length));
            //     console.log(tile.x);
            // });
        }
    }

    render(){
        this.rotate();        
        this.parts.map((tile)=>{
            if (tile.y > constant.COLSIZE-2){
                this.falling = false;
            }
        })
        this.parts.map((tile)=>{
            tile.draw(this.falling);
        })
    }

}

export default (Piece);