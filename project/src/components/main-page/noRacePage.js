import React from 'react';
import { BiUser } from "react-icons/bi"


export class NoRace extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: 'No race',
        }
    }

    
    navigateAdmin(){
        window.location.replace('/admin')
        console.log('sex')
    }

    render(){
        return(
            <div>
                <div className="header" style={{position: 'relative', top: '250px'}}>
                <h1 className="page-title" style={{fontFamily: 'F1-Regular'}}>F1 Vote -</h1>
                <p className="actual-grandprix" style={{fontFamily: 'F1-Regular'}}>Next Grand Prix in next Week!</p>
                <button className="sign-in-admin" style={{fontFamily: 'F1-Button'}}><BiUser style={{position: 'relative', top: '2px'}} onClick={this.navigateAdmin}/> Sign In</button>
               </div>


            </div>
        )
    }
}