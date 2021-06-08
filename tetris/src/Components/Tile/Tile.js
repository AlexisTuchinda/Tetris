import React from "react";
import * as constant from "../Constant";

class Tile{
    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.width = constant.SCALE;
        this.height = constant.SCALE;
        this.ctx = ctx;
    }

    draw(){
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(this.x*constant.SCALE, this.y*constant.SCALE, this.width, this.height);
    }

}

export default (Tile);