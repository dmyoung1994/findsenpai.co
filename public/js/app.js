import $  from 'jquery'
import React  from 'react'
import { Game } from './components/Game'
import { Reward } from './components/Reward'
import { Scoreboard } from './components/Scoreboard'
import { SenpaiPreview } from './components/SenpaiPreview'

let backgroundStyle = {
  display: "inline-block",
  width: "80%",
  position: "relative"
};

let boardStyle = {
  display: "inline-block",
  width: "20%",
  verticalAlign: "top"
};


let App = React.createClass({
  getInitialState() {
    return {name: "", users: [{name: "loading...", score: "..."}]};
  },
  componentDidMount() {
    this.getUsers();
  },
  getUsers() {
    let self = this;
    $.ajax({
      url: "users",
      type: "GET",
      dataType: "json",
      success: function(res) {
        var name;
        if (self.state.name === "") {
          name = prompt("Enter a name:", "Kohai");
          if (name === null) {
            name = "Loser";
          }
          res.push({"name": name, "score": 0});
        }
        self.setState({users: res, name: name});
      }
    });
  },
  gameEnd(winner) {
    $("#reward").slideToggle();
    setTimeout(function(){
      $("#reward").slideToggle();
    }, 1500);
    let state = this.state;
    var self = this;
    state.users.map(function(user, idx) {
      if (winner === user.name) {
        ++user.score;
        if (user.id === undefined) user.id = '';
        let url = "save?" + "name=" + user.name +
          "&score=" + user.score +
          "&id=" + user.id;
        $.ajax({
          url: url,
          dataType: "json",
          type: "GET",
          success: function(res) {
            self.setState({users: res});
          }
        });
      }
    });
  },
  render() {
    let locsSmall = [0, -32, -65, -97, -129, -161, -193, -225,
       -257, -289, -321, -353, -385, -417, -449, -481, -513, -545, -577, -609];
    let locsLarge = [[0,0], [-62,0], [-126,0], [-190,0], [-254,0],
     [-318, 0], [-382,0], [-446, 0], [-511,0], [-574,0], [2, -130], [-62, -130],
     [-126, -130], [-190, -130], [-254, -130], [-318, -130], [-382, -130],
     [-446, -130], [-511, -130], [-574, -130]];

     let senpaiPos = Math.floor(Math.random() * locsSmall.length);
     let senpaiLocSmall = locsSmall.splice(senpaiPos, 1)[0];
     let senpaiLocLarge = locsLarge.splice(senpaiPos, 1)[0];
     let users = this.state.users;
    return (
      <div>
        <div style={backgroundStyle}>
          <Game onClick={this.gameEnd} locs={locsSmall} senpaiLoc={senpaiLocSmall}
            player={this.state.name}/>
        </div>
        <div style={boardStyle}>
          <Scoreboard users={users} />
          <SenpaiPreview senpaiLoc={senpaiLocLarge}/>
          <Reward />
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById("app"));
