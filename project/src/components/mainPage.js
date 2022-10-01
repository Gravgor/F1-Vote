import React from "react";
import './css/mainPage.css'

export class MainPage extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                raceName: "",
                date: new Date().getFullYear(),
                loading: false,
        }
    }

    requestOption = {
        method: "GET",
        redirect: 'follow'
    };

    componentDidMount(){
        const date = new Date();
        const year = date.getFullYear();
        let newDate = date.toISOString().slice(0,10)
        this.fetchOption(year,newDate)
    }

    fetchOption(data, date1){
        fetch(`http://ergast.com/api/f1/${data}.json`, this.requestOption)
        .then(response => response.json())
        .then(result => {
            const data_races = [result]
            data_races.forEach(element => {
                const races = [element.MRData.RaceTable.Races]
                console.log(races)
                for (let i = 0; i < races.length; i++){
                    for(let j = 0; j < races[i].length; j++){
                        if(races[i][j].date === date1){
                            const data = races[i][j]
                            this.displayData(data)
                        }else if(races[i][j].Qualifying.date === date1){
                            const data = races[i][j]
                            this.displayData(data)
                        }else if(races[i][j].FirstPractice.date === date1){
                            const data = races[i][j]
                            this.displayData(data)
                        }else if(races[i][j].SecondPractice.date === date1){
                            const data = races[i][j]
                            this.displayData(data)
                        }else{
                            console.log('No data_races')
                        }
                    }
            }
            });
        })
        .catch(error => console.error(error))

        
    
    }

    displayData(data){
        this.setState({
            raceName: data.raceName,
        })
    }

    render(){
        return(
             <>
               <div className="header">
                <h1 className="page-title">F1 Vote for Winner -</h1>
                <p className="actual-grandprix">{this.state.date} {this.state.raceName}</p>
               </div>
               
               <div className='content-container'>  
                 <div className='first-vote-container'>

                    
                    </div> 
               </div>
               
             </>
        )
}
}