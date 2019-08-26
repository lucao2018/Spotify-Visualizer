import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import Player from "./Player.jsx";
import "./App.css";
import SpotifyWebApi from "spotify-web-api-js";
import Visualizer from "./visualizer";
import hash from "./hashParams";

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
        id: ""
      },
      amplitude: 0.0,
      is_playing: "Paused",
      progress_ms: 0,
      pitches: [],
      loudness: [],
      durations: []

    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getAudioAnalysis = this.getAudioAnalysis.bind(this);
  }
  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      spotifyApi.setAccessToken(_token);
      this.myInterval = setInterval(() => {
        this.getCurrentlyPlaying();
      }, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.item.id !== this.state.item.id) {
      this.getAudioAnalysis(this.state.item.id);
    }
  }

  getCurrentlyPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      // console.log("test",response.item.id);
      this.setState({
        item: response.item,
        is_playing: response.is_playing,
        progress_ms: response.progress_ms,
        id: response.item.id
      });
    });
  }

  getAudioAnalysis(audioID) {
    spotifyApi.getAudioAnalysisForTrack(audioID).then(response => {
      var segments = response.segments;
      var localPitches = [];
      var localLoudness = [];
      var localDurations = [];
      for (let i = 0; i < segments.length; i++) {
        localPitches.push(segments[i].pitches);
        localLoudness.push(segments[i].loudness_max);
        localDurations.push(segments[i].start*1000)
      }

      this.setState({
        pitches: localPitches,
        loudness: localLoudness,
        durations: localDurations
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <React.Fragment>
              <Visualizer
                pitches={this.state.pitches}
                amplitude={this.state.loudness}
                test={this.state.item.id}
                duration={this.state.durations}
                progress_ms={this.state.progress_ms}
              />
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.state.progress_ms}
              />
            </React.Fragment>
          )}
        </header>
      </div>
    );
  }
}

export default App;
