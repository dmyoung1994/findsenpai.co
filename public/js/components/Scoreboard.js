import React  from 'react'

let cellStyle = {
  float: "right"
};

let ScoreboardCell = React.createClass({
  render() {
    return (
      <div>
        {this.props.pos}. {this.props.name}
        <span style={cellStyle}>{this.props.score}</span>

        </div>
    );
  }
});

let Scoreboard = React.createClass({
  render() {
    var users = this.props.users;
    console.log(this.props.users);
    if (users === 'undefined') {
      users = [{name: "loading...", score: "..."}];
    }
    return(
      <div>
        {users.map(function(user, idx) {
          return <ScoreboardCell pos={idx+1}
            name={user.name}
            score={user.score}
            key={idx} />
        })}
      </div>
    );
  }
});

export { Scoreboard };
