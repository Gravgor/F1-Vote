import React from "react";
import { BiUser } from "react-icons/bi";
import {FaFlagCheckered} from "react-icons/fa";
import {GiCardRandom} from "react-icons/gi";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import { NoRace } from "./noRacePage";
import * as Scroll from 'react-scroll';


export class MainPage extends React.Component{
    constructor(props){
        super(props);
            this.state = {
                raceName: "",
                date: new Date().getFullYear(),
                userVoted: 'false',
                firstDriverVotes: 0,
                secondDriverVotes: 0,
                allVotes: 0,
                firstVoteDriver: '',
                firstDriverNumber: 0,
                firstDriverDateOfBirth: '',
                firstVoteSecondDriver: '',
                firstVoteSecondDriverDateOfBirth: '',
                firstVoteSecondDriverNumber: 0,
                raceRound: 0,
                standings: [],
                actualRaceResults: false,
                actualRaceStandings: [],
                noActualRaceResults: true,
                sesssionEnded: false,
                noRaceDay: false,
        }
        this.submitVote = this.submitVote.bind(this);
        this.votesStateSet = this.votesStateSet.bind(this);
        this.votesDriverASet = this.votesDriverASet.bind(this);
        this.votesDriverBset = this.votesDriverBset.bind(this);
        this.fetchOption = this.fetchOption.bind(this);
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
        //let newDate = '2022-09-11'
        //const dayName = 'niedziela'
        this.fetchOption(year,newDate, dayName)
        axios.get('https://6339bfb9383946bc7ff8296d.mockapi.io/voting').then(
                    (res) => {
                        const results = res.data
                        const results_length = results.length
                        const totalVotesA = results.map(item => item.driverA).reduce((prev,curr) => prev + curr, 0);
                        const totalVotesB = results.map(item => item.driverB).reduce((prev,curr) => prev + curr, 0);
                        this.votesStateSet(results_length)
                        this.votesDriverASet(totalVotesA)
                        this.votesDriverBset(totalVotesB)
                    },
                    (err) => {
                        console.log(err)
                    }
                    )
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
        fetch(`https://ergast.com/api/f1/current.json`, this.requestOption)
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
                        this.setState({
                            noRaceDay: false
                        })
                    }
            }
        }
        })
        })
        .catch(error => console.error(error))
    }


    votesStateSet(state){
        if(state > 0){
            this.setState({
                allVotes: state,
            })
        }else if(state === 'true'){
            this.setState({
                userVoted: state,
            })
        }
    }

    votesDriverASet(number){
        this.setState({
            firstDriverVotes: number,
        })

    }

    votesDriverBset(number){
        this.setState({
            secondDriverVotes: number,
        })

    }




    submitVote(driver){
      if(driver === this.state.firstVoteDriver){
        axios
        .post("https://6339bfb9383946bc7ff8296d.mockapi.io/voting",{
            driverA: true
        })
      }else if(driver === this.state.firstVoteSecondDriver){
        axios
          .post("https://6339bfb9383946bc7ff8296d.mockapi.io/voting",{
            driverB: true
        })
    }
    this.votesStateSet('true')
    window.sessionStorage.setItem('voted',true)
}


    displayData(data){
        this.setState({
            raceName: data.raceName,
            firstVoteDriver: 'Max Verstappen',
            firstDriverNumber: '1',
            firstDriverDateOfBirth: '30/09/1997',
            firstVoteSecondDriver: 'Charles Lecrlec',
            firstVoteSecondDriverNumber: '16',
            firstVoteSecondDriverDateOfBirth: '16/10/1997',
            raceRound: data.round,
        })
        this.fetchStanding(data.round)
    }


    fetchStanding(round){
        const date = new Date();
        const year = date.getFullYear();
        fetch(`https://ergast.com/api/f1/${year}/driverStandings.json`)
        .then((res) => res.json())
        .then(result => {
            const result1 = result.MRData.StandingsTable.StandingsLists[0].DriverStandings 
            this.setState({
                standings: result1,
            })
        })
        fetch(`https://ergast.com/api/f1/${year}/${round}/results.json`)
        .then((res) => res.json())
        .then(result => {
            const result2 = result.MRData.RaceTable.Races[0].Results
            if(result2.length > 0){
                this.setState({
                    actualRaceResults: true,
                    actualRaceStandings: result2,
                    sesssionEnded: true,
                })
            }else{
                return;
            }
        })
    }



      renderSecondVote(){
        const sessionEnded = this.state.sesssionEnded
        const firstDriverVotes = this.state.firstDriverVotes
        const secondDriverVotes = this.state.secondDriverVotes
        const allVotes = this.state.allVotes
        return (
            <>
             {sessionEnded === false &&
             <div className="first-vote-container" style={{marginTop: '50px'}}>
                <h1 className="container-title" style={{fontFamily: 'F1-Regular', textAlign: 'center'}}>Will Max Verstappen win title on {this.state.date} {this.state.raceName}?</h1>
                <div className="first-driver-container">
                <img className="image-driver" src="https://www.formula1.com/content/fom-website/en/drivers/max-verstappen/jcr:content/image.img.1920.medium.jpg/1646819045507.jpg" alt={this.state.firstVoteDriver} onClick={() => this.submitVote(this.state.firstVoteDriver)}/>

                </div>
             </div>
             }{sessionEnded === true &&
                <div className="first-vote-container" style={{marginTop: '50px'}}>
                <h1 className="container-title" style={{fontFamily: 'F1-Regular', textAlign: 'center'}}>Results of votes for {this.state.date} {this.state.raceName}</h1>
            </div>}
            </>
        )

      }

      renderResults(){
              const firstDriverVotes = this.state.firstDriverVotes
              const secondDriverVotes = this.state.secondDriverVotes
              const allVotes = this.state.allVotes
                    return(
                        <>
                        <div className="first-vote-container">
                            <h1 className="container-title" style={{fontFamily: 'F1-Regular', textAlign: 'center'}}>Actual results of poll {this.state.date} {this.state.raceName}</h1>
                        <div className="results-container">
                            <div className="results-first-driver">
                                 <img className="image-driver-results" src="https://www.formula1.com/content/fom-website/en/drivers/max-verstappen/jcr:content/image.img.1920.medium.jpg/1646819045507.jpg" alt={this.state.firstVoteDriver}/>
                                 <h3 className="first-driver-name" style={{fontFamily: 'F1-Regular', marginTop: '60px', marginLeft:'10px'}}>Driver name: {this.state.firstVoteDriver}</h3>
                            <ProgressBar 
                               className="progress-bar-first"
                               completed={firstDriverVotes}
                               height="30px"
                               width="300px"
                               bgColor="#E10600"
                               fontFamily='F1-Regular'
                               labelAlignment="outside"
                               labelColor="#000"
                               maxCompleted={allVotes}
                               customLabel={`${firstDriverVotes} votes for this driver / ${allVotes} all votes `}
                               />
                            </div>
                            <div className="results-second-driver">
                                 <img className="image-driver-results" src="https://www.formula1.com/content/fom-website/en/drivers/charles-leclerc/jcr:content/image.img.1920.medium.jpg/1646818893219.jpg" alt={this.state.firstVoteSecondDriver}/>
                                 <h3 className="second-driver-name" style={{fontFamily: 'F1-Regular', marginTop: '-140px', marginLeft:'220px'}}>Driver name: {this.state.firstVoteSecondDriver}</h3>
                            <ProgressBar 
                               className="progress-bar-second"
                               completed={secondDriverVotes}
                               height="30px"
                               width="300px"
                               bgColor="#E10600"
                               fontFamily='F1-Regular'
                               labelAlignment="outside"
                               labelColor="#000"
                               maxCompleted={allVotes}
                               customLabel={`${secondDriverVotes} votes for this driver / ${allVotes} all votes `}
                               />
                            </div>
                        </div>
                        </div>
                        </>
                    )
        }
    render(){
        const standingsLists = this.state.standings
        const voted = this.state.userVoted
        const sessionEnded = this.state.sesssionEnded
        const noRace = this.state.noRaceDay
        console.log(standingsLists)
        const renderRaceResults = () => {
            const acutalRaceStand = this.state.actualRaceStandings
            return (
                <div className="first-vote-container" id='first-vote'>
                    <h1 className="container-title" style={{fontFamily: 'F1-Regular', textAlign: 'center'}}>Results of {this.state.date} {this.state.raceName}</h1>
                    <div className="results-container">
                    <ul className="standings-list">
                    {acutalRaceStand.map(item => (
                                <li key={item.position} style={{fontFamily: 'F1-Regular'}}>Finishing position: {item.position}, Driver: {item.Driver.givenName} {item.Driver.familyName}, Laps: {item.laps}, Points: {item.points}, Status: {item.status}</li>
                            ))}
                    </ul>
                    </div>
                </div>

            )
        }
        return(
             <>
             {noRace === false &&
             <div>
               <div className="header">
                <h1 className="page-title" style={{fontFamily: 'F1-Regular'}}>F1 Vote -</h1>
                <p className="actual-grandprix" style={{fontFamily: 'F1-Regular'}}>{this.state.date} {this.state.raceName}</p>
                <div className="link-to-votes">
                    <div className="link-to-votes-container">
                        <Scroll.Link className="scroll-1" activeClass="active" to="first-vote" spy={true} smooth={true} offset={50} isDynamic={true}>{sessionEnded === false && <p className="scroll-text" style={{fontFamily: 'F1-Regular'}}><FaFlagCheckered id="icon-header"></FaFlagCheckered>Winner Vote</p>}{sessionEnded === true && <p className="scroll-text" style={{fontFamily: 'F1-Regular', top: '-12px'}}><FaFlagCheckered id="icon-header"></FaFlagCheckered>Race standings</p>}</Scroll.Link>
                        <Scroll.Link className="scroll-1" activeClass="active" to="first-vote" spy={true} smooth={true} offset={50} isDynamic={true}><p className="scroll-text" style={{fontFamily: 'F1-Regular'}}><GiCardRandom id="icon-header"></GiCardRandom>Random vote</p></Scroll.Link>
                    </div>
                </div>
                <button className="sign-in-admin" style={{fontFamily: 'F1-Button'}}><BiUser style={{position: 'relative', top: '2px'}}/> Sign In</button>
               </div>
               <div className='content-container'>
                <div className="container-standing">
                    <h1 className="standings" style={{fontFamily: 'F1-Regular', textAlign: 'center'}}>Standings after round {this.state.raceRound}/22</h1>
                    <div className='standings-content'>
                        <ul className="standings-list">
                        <table className="table01">
                            <tr>
                                <th style={{fontFamily: 'F1-Button'}}>POS</th>
                                <th style={{fontFamily: 'F1-Button'}}>DRIVER</th>
                                <th style={{fontFamily: 'F1-Button'}}>NATIONALITY</th>
                                <th style={{fontFamily: 'F1-Button'}}>CAR</th>
                                <th style={{fontFamily: 'F1-Button'}}>PTS</th>
                            </tr>
                            {standingsLists.map(item => (
                                <tr>
                                    <td style={{fontFamily: 'F1-Button',textTransform: 'uppercase'}}>{item.position}</td>
                                    <td style={{fontFamily: 'F1-Button',color: 'rgb(74, 74, 74)', fontWeight: 'bold'}}>{item.Driver.givenName} {item.Driver.familyName}</td>
                                    <td style={{fontFamily: 'F1-Button', color: 'rgb(74, 74, 74)', fontWeight: 'bold'}}>{item.Driver.nationality}</td>
                                    <td style={{fontFamily: 'F1-Button',color: 'rgb(128, 128, 128)', fontWeight: 'bold', textTransform: 'uppercase'}}>{item.Constructors[0].name}</td>
                                    <td style={{fontFamily: 'F1-Button' , color: 'rgb(74, 74, 74)', fontWeight: 'bold'}}>{item.points}</td>
                                </tr>
                            ))}
                        </table>
                        </ul>
                    </div>
                </div>
               {voted === 'false' && sessionEnded === false &&
                 <div className='first-vote-container'>
                    <h1 className="container-title" style={{fontFamily: 'F1-Regular', textAlign: 'center'}}>Who will win {this.state.date} {this.state.raceName}?</h1>
                    <div className="first-driver-container" id='first-vote'>
                          <img className="image-driver" src="https://www.formula1.com/content/fom-website/en/drivers/max-verstappen/jcr:content/image.img.1920.medium.jpg/1646819045507.jpg" alt={this.state.firstVoteDriver} onClick={() => this.submitVote(this.state.firstVoteDriver)}/>
                       <div className="first-driver-info-content">
                          <h3 className="first-driver-name" style={{fontFamily: 'F1-Regular', marginLeft: '20px' }}>Driver name: {this.state.firstVoteDriver}</h3>
                          <h3 className="first-driver-number" style={{fontFamily: 'F1-Regular', marginLeft: '20px' }}>Driver number: {this.state.firstDriverNumber}</h3>
                          <h3 className="first-driver-birth" style={{fontFamily: 'F1-Regular', marginLeft: '20px' }}>Driver date of birth: {this.state.firstDriverDateOfBirth}</h3>
                       </div>
                    </div> 
                    <div className="second-driver-container">
                        <img className="image-driver" src="https://www.formula1.com/content/fom-website/en/drivers/charles-leclerc/jcr:content/image.img.1920.medium.jpg/1646818893219.jpg" alt={this.state.firstVoteSecondDriver} onClick={() => this.submitVote(this.state.firstVoteSecondDriver)}/>            
                    <div className="second-driver-info-content">
                        <h3 className="second-driver-name" style={{fontFamily: 'F1-Regular', marginLeft: '20px' }}>Driver name: {this.state.firstVoteSecondDriver}</h3>   
                        <h3 className="second-driver-name" style={{fontFamily: 'F1-Regular', marginLeft: '20px' }}>Driver number: {this.state.firstVoteSecondDriverNumber}</h3>   
                        <h3 className="second-driver-name" style={{fontFamily: 'F1-Regular', marginLeft: '20px' }}>Driver date of birth: {this.state.firstVoteSecondDriverDateOfBirth}</h3>   
                        </div>   
                      </div>  
                    </div> 
                  }{voted === 'true' &&
                    this.renderResults()
                  }{sessionEnded === true &&
                    renderRaceResults()
                  }{this.renderSecondVote()}
                      </div>
                  </div>
             }{noRace === true &&
                <NoRace />          
             } 
             </>
        )
    }
}