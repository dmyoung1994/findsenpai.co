import React  from 'react'
import { Character } from './Character'

let characterCSS = {
  backgroundImage: "url('/public/img/students.png')",
  backgroundRepeat: "no-repeat",
  height: "50px",
  width: "25px",
  display: "inline-block",
  position: "absolute"
};

let senpaiStyle = {
  "zIndex": "2",
};

let nonSenpaiStyle = {
  "zIndex": "1"
}

// subtract 32px to get the next sprite, could probably not hard code this

let NonSenpai = React.createClass({
  render() {
    // Get random sprite and set position
    let locs = this.props.locs;
    let randomCharacter = Math.floor(Math.random() * locs.length);
    characterCSS["backgroundPositionX"] = locs[randomCharacter] + "px";
    characterCSS["backgroundColor"] = "none";

    // calculate random position on the screen
    let width = 0.7 * window.innerWidth;
    let height = 0.8 * window.innerHeight;

    let x = Math.random() * width;
    let y = Math.random() * height;

    characterCSS["left"] = x;
    characterCSS["top"] = y;
    return (
      <Character senpai={false} imgStyle={characterCSS} />
    );
  }
});

let Senpai = React.createClass({
  foundSenpai() {
    console.log(player);
    this.props.onFind(this.props.player);
  },
  render() {
    characterCSS["backgroundPositionX"] = this.props.loc + "px";
    characterCSS["zIndex"] = 2;

    // calculate random position on the screen
    let width = 0.7 * window.innerWidth;
    let height = 0.8 * window.innerHeight;

    let x = Math.random() * width;
    let y = Math.random() * height;

    characterCSS["left"] = x;
    characterCSS["top"] = y;

    return (
      <Character senpai={true} imgStyle={characterCSS} onClick={this.foundSenpai}/>
    );
  }
});

let Game = React.createClass({
  updateGame(winningUser) {
    this.props.onClick(winningUser);
  },
  render() {
    let locs = this.props.locs;
    let senpaiLoc = this.props.senpaiLoc;
    let player = this.props.player;
    let characterSize = 50 * 25;
    let numCharacters = (window.innerWidth * window.innerHeight) / (characterSize * 3)

    let numNonSenpais = numCharacters;
    let nonSenpaiArray = [];
    for (var i = 0; i <= numNonSenpais; ++i) {
      nonSenpaiArray.push(i);
    }
    return(
      <div>
        {nonSenpaiArray.map(function(chars, index) {
          return <NonSenpai key={index} locs={locs} style={nonSenpaiStyle}/>
        })}
        <Senpai onFind={this.updateGame} loc={senpaiLoc} style={senpaiStyle}
          player={player}/>
      </div>
    )
  }
});



export { Game };
