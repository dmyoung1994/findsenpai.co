import React  from 'react'

let rewardStyle = {
  backgroundImage: "url('/public/img/reward.jpg')",
  position: "absolute",
  bottom: 0,
  right: 0,
  height: "20%",
  width: "20%",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  display: "none"
};

let Reward = React.createClass({
  render() {
    return (
        <div id="reward" style={rewardStyle}></div>
    )
  }
});

export { Reward };
