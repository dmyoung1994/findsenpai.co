import React  from 'react'

let previewStyle = {
  height: "83px",
  width: "50px",
  backgroundImage: "url('/img/students-large.png')",
  backgroundRepeat: "no-repeat",
  display: "inline-block",
  verticalAlign: "bottom"
}

let previewWrapperStyle = {
  textAlign: "center"
};

let SenpaiPreview = React.createClass({
  render() {
    let senpaiLoc = this.props.senpaiLoc;
    previewStyle["backgroundPositionX"] = senpaiLoc[0] + "px";
    previewStyle["backgroundPositionY"] = senpaiLoc[1] + "px";
    return(
      <div style={previewWrapperStyle}>
        <h2>Find Senpai</h2>
        <div style={previewStyle}></div>
      </div>

    );
  }
});

export { SenpaiPreview };
