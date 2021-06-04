import React from "react";
import * as constant from "../Constant";

class Tile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            x: props.x,
            y: props.y,
            width: constant.SCALE,
            height: constant.SCALE
        }
        this.on = false;
        this.ctx = props.ctx;
    }

    draw(){
        if (this.ctx !== null){
            if (this.on){
                this.ctx.fillStyle = "yellow";
            }else{
                this.ctx.fillStyle = "black";
            }
            this.ctx.fillRect(this.state.x*constant.SCALE, this.state.y*constant.SCALE, this.state.width, this.state.height)
        }
    }

    render(){
        return(
            <div>
            
            </div> 
        )
    }
}

export default (Tile);