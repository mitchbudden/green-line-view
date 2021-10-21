import React from 'react';
import './App.css';
import NFLData from '../data/2021.json';
import TeamList from '../data/team-list.json';

class App extends React.Component {
  public lines: any;

  constructor(props: any) {
    super(props);
    this.lines = this.getStatsByTeam(TeamList, NFLData);
  }

  getStatsByTeam(teamList: any, data: any) {
    let gameList: any = [];

    teamList.forEach((team: string) => {
      let teamTotal = { team, total: 0 }

      data.forEach((game: any) => {
        let diff = (game["Greenline Line"] - game["Market Line"]);

        if ((game["Home Team"] === team || game["Away Team"] === team)
            && game["Bet Type"] === "Total") 
            {
              teamTotal.total += diff;
            }
      });

      gameList.push(teamTotal)
    });

    gameList.sort((a: any, b: any) => {
      return  b.total - a.total;
    });

    return gameList;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            PFF Greenline
          </h1>
          <h2>Too High or too Low?</h2>
        </header>
        <div>
          {this.lines.map((line: any) => {
              return (
                <div className="data-container">
                  <h2 className="data-row">{line.team}:</h2>
                  <h2 className="data-row">{line.total.toFixed(1)}</h2>
                </div>
              )
            })}
        </div>
      </div>
    );
  }
}

export default App;
