import React from "react";
import './css/mainPage.css'
import './css/font.css'

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
        const dayName = date.toLocaleDateString('pl-PL', {weekday: 'long'});
        let newDate = date.toISOString().slice(0,10)
        //let newDate = '2022-06-23'
        //const dayName = 'niedziela'
        this.fetchOption(year,newDate, dayName)
    }

    fetchOption(data, date1, dayName){
        const activitesF1 = [
            {
              FirstPractice: 'piątek',
              SecondPractice: 'piątek',
              ThirdPractice: 'sobota',
              Qualifying: 'sobota',
              Race: 'niedziela'
            }
        ]
        fetch(`http://ergast.com/api/f1/${data}.json`, this.requestOption)
        .then(response => response.json())
        .then(result => {
            const data_races = [result]
            data_races.forEach(element => {
                const races = [element.MRData.RaceTable.Races]
                for (let i = 0; i < races.length; i++){
                    for(let j = 0; j < races[i].length; j++){
                        if(activitesF1[0].FirstPractice === dayName){
                            if(races[i][j].FirstPractice.date === date1){
                                const data = races[i][j]
                                this.displayData(data)
                            }
                        }else if(activitesF1[0].Qualifying === dayName){
                            if(races[i][j].Qualifying.date === date1){
                                const data = races[i][j]
                                this.displayData(data)
                                
                            }
                        }else if(activitesF1[0].Race === dayName){
                            if(races[i][j].date === date1){
                                const data = races[i][j]
                                this.displayData(data)
                        }
                    }else{
                        window.location.replace('/noraceday')
                    }
            }
        }
        })
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
                <h1 className="page-title" style={{fontFamily: 'F1-Regular'}}>F1 Vote for Winner -</h1>
                <p className="actual-grandprix" style={{fontFamily: 'F1-Regular'}}>{this.state.date} {this.state.raceName}</p>
               </div>
               
               <div className='content-container'>  
                 <div className='first-vote-container'>

                    
                    </div> 
               </div>
               
             </>
        )
}
}