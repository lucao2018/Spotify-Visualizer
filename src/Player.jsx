import React, { Component } from "react";
import "./Player.css";

class Player extends Component {
  render() {
    const backgroundStyles = {
      backgroundImage: `url(${this.props.item.album.images[0].url})`
    };

    const progressBarStyles = {
      width: (this.props.progress_ms * 100) / this.props.item.duration_ms + "%"
    };

    return (
      <div className="Player">
        <div className="main-wrapper" id="test">
          <div className="now-playing__img">
            <img src={this.props.item.album.images[0].url} />
          </div>
          <div className="now-playing__side">
            <div className="now-playing__name">{this.props.item.name}</div>
            <div className="now-playing__artist">
              {this.props.item.artists[0].name}
            </div>
            <div className="progress">
              <div className="progress__bar" style={progressBarStyles} />
            </div>
          </div>
          <div className="background" style={backgroundStyles} />{" "}
        </div>
      </div>
    );
  }
}

export default Player;
