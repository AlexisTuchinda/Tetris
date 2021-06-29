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
        this.parts = [];
        this.ctx = ctx;
        this.falling = true;
    }

    make(){
        for (let y = 0; y < this.type.length; y++){
            for (let x = 0; x < this.type[y].length; x++){
                if (this.type[y][x] !=0){
                    this.parts.push(new Tile(8+x, y, this.ctx)); //here is where the piece always gets reset to 0...
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
            
            let prevY = this.parts[0].y;
            this.parts =[];
            for (let y = 0; y < this.type.length; y++){
                for (let x = 0; x < this.type[y].length; x++){
                    if (this.type[y][x] !=0){
                        this.parts.push(new Tile(x, prevY+y, this.ctx)); //here is where the piece always gets reset to 0...
                    }
                }
            }
        }
    }

    move(){
        if (constant.keys.right in constant.keysDown && this.falling && this.parts.every((tile) =>{return tile.x < constant.ROWSIZE-1})){
            this.parts.map((tile)=>{
                tile.x+=1;
            })
        }
        else if(constant.keys.left in constant.keysDown && this.falling && this.parts.every((tile) =>{return tile.x >0})){
            this.parts.map((tile)=>{
                tile.x-=1;
            })
        }
    }

    render(){
        this.rotate();   
        this.move();   

        this.parts.map((tile)=>{
            tile.draw(this.falling);
        })
    }

}

export default (Piece);