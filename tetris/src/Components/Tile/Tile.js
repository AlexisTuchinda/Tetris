import React from "react";
import * as constant from "../Constant";

class Tile{
    constructor(x, y, ctx){
        this.x = x;
        this.y = y;
        this.width = constant.SCALE;
        this.height = constant.SCALE;
        this.ctx = ctx;
        this.tick = 0;
    }

    fall(){
        this.y+=1;
    }

    draw(falling){
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(this.x*constant.SCALE, this.y*constant.SCALE, this.width, this.height);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x*constant.SCALE, this.y*constant.SCALE, this.width, this.height);

        if (this.tick > 0 && falling){
            this.fall();
            this.tick=0;
        }else{
            this.tick+=1;
        }
    }

    move(){ 

    }

}

export default (Tile);