import React, { Component } from 'react';
import "./../../../style/Building.css"
import Floor from './Floor';
import BuildingContext from '../../../context/Building';

class Building extends Component {
    state = {
        floor: [
          { id: 1,  floorName: "طبقه اول",
        unit:[
            {id:111,unitName:"111"},
            {id:112,unitName:"112"},
            {id:113,unitName:"113"},
            {id:114,unitName:"114"},
            {id:115,unitName:"115"},
            {id:116,unitName:"116"}
        ]},
          { id: 2,  floorName: "طبقه دوم",
          unit:[
            {id:211,unitName:"211"},
            {id:212,unitName:"212"},
            {id:213,unitName:"213"},
            {id:214,unitName:"214"},
            {id:215,unitName:"215"},
            {id:216,unitName:"216"}
        ] },
          { id: 3,  floorName: "طبقه سوم",
          unit:[
            {id:311,unitName:"311"},
            {id:312,unitName:"312"},
            {id:313,unitName:"313"},
            {id:314,unitName:"314"},
            {id:315,unitName:"315"},
            {id:316,unitName:"316"}
        ]
        },
        ],
      };
    render() { 
        
        return (
            <>
                <BuildingContext.Provider
                    Name={this.state.floor.floorName}
                >
                    <div className="d-flex flex-wrap">
                        {this.state.floor.map(
                            (f) => 
                            (<Floor Name={f.floorName} Unit={f.unit} />)
                        )}
                    </div>
                </BuildingContext.Provider>
                
            </>
        );
    }
}
 
export default Building;