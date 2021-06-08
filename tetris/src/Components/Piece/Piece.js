import React from "react";
import Tile from "../Tile/Tile";

class Piece{
    constructor(type, ctx){
        this.type = type;
        this.isMoving = true;
        this.parts = [];
        this.ctx = ctx;
    }

    componentDidMount(){
        this.make();
    }

    make(){
        for (let y = 0; y < this.type.length; y++){
            for (let x = 0; x < this.type[y].length; x++){
                this.parts.push(new Tile(x, y, this.ctx));
                // console.log(this.parts);
            }
        }
        // console.log(this.parts, this.ctx);
    
    }

    render(){
        this.parts.map((tile)=>{tile.draw()})
    }

}

export default (Piece);