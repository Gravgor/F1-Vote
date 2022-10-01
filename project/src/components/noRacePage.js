import React from 'react';

export class NoRace extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'No race',
        }
    }

    render(){
        return(
            <div>no race</div>
        )
    }
}