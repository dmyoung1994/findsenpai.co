import React  from 'react'

let Character = React.createClass({
  getInitialState() {
    return {isSenpai: false};
  },
  componentDidMount() {
    this.state.isSenpai = this.props.senpai;
  },
  selectCharacter() {
    if (this.state.isSenpai) {
      this.props.onClick();
    }
  },
  render() {
    return (
      <div onClick={this.selectCharacter} style={this.props.imgStyle}>
      </div>
    )
  }
});

export { Character };
