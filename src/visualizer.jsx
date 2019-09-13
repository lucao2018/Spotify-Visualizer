import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./sketches/sketch";
import "./App.css";


class App extends Component {

  render() {
    return (
      <div>
        <P5Wrapper
          sketch={sketch}
          amplitude={this.props.amplitude}
          pitches={this.props.pitches}
          duration={this.props.duration}
          progress_ms={this.props.progress_ms}
        />
      </div>
    );
  }
}

export default App;
