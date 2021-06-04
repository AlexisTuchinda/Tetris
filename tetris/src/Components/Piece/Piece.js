import React from "react";
import Tile from "../Tile/Tile";

class Piece extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: props.type,
            isMoving: true
        }
        this.ctx = props.ctx;
        //make into map 
        this.grid = [[<Tile x = {0} y = {0} ctx = {this.ctx}/>, <Tile x = {1} y = {0} ctx = {this.ctx}/>, <Tile x = {2} y = {0} ctx = {this.ctx}/>, <Tile x = {3} y = {0} ctx = {this.ctx}/>], [<Tile x = {0} y = {1} ctx = {this.ctx}/>, <Tile x = {1} y = {1} ctx = {this.ctx}/>, <Tile x = {2} y = {1} ctx = {this.ctx}/>, <Tile x = {3} y = {1} ctx = {this.ctx}/>], [<Tile x = {0} y = {2} ctx = {this.ctx}/>, <Tile x = {1} y = {2} ctx = {this.ctx}/>, <Tile x = {2} y = {2} ctx = {this.ctx}/>, <Tile x = {3} y = {2} ctx = {this.ctx}/>]];
    }

    make(){
        for (let y = 0; y < this.state.type.length; y++){
            for (let x = 0; x < this.state.type[y].length; x++){
                if (this.state.type[y][x] === 1){
                    this.grid[y][x].on = true;
                }
            }
        }
    }

    render(){
        return(
            <div>
                {this.grid}
            </div>
        )
    }

}

export default (Piece);