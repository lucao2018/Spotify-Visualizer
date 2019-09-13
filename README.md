# Spotify Visualizer

A real time Spotify visualizer built with React, the Spotify API audio analysis, and p5.js. The web app syncs with a user's Spotify account and visualizes the pitches and amplitudes from the currently playing song in real time. Due to rate limits and limitations of the Spotify API, sync may not be exact depending on the song but it's pretty close. Prior to this project, I had practically no experience with building web apps so this was a nice way to try out React and other web development tools. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### To do

- [ ] Add/clean up comments, code, and documentation
- [ ] Improve visualizer graphics

## Getting Started

1.) Create a new Spotify app in your Spotify Developer Dashboard

2.) Add http://localhost:3000 to your app's redirect URIs

3.) Add your client_id and and redirect_uri to config.js

Install dependencies and start

```
npm install
npm start
```

## Built With

* [Spotify API](https://developer.spotify.com/documentation/web-api/)
* [Spotify API JS Wrapper](https://github.com/JMPerez/spotify-web-api-js)
* [p5.js React Wrapper](https://www.npmjs.com/package/react-p5-wrapper)
* [React](https://github.com/facebook/create-react-app)


## License

This project is licensed under the MIT License

