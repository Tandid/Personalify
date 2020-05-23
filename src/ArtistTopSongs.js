import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
const spotifyApi = new SpotifyWebApi();

class ArtistTopSongs extends Component {
  constructor() {
    super();
    this.state = {
      artistTopSongs: [],
    };
  }

  componentDidMount() {
    this.artistTopSongs();
  }

  async artistTopSongs() {
    const { id } = this.props;
    await spotifyApi.getArtistTopTracks(id, "US").then((response) => {
      console.log({ ArtistTopSongs: response });
      this.setState({
        artistTopSongs: response.tracks,
      });
    });
  }

  render() {
    let { artistTopSongs } = this.state;
    artistTopSongs = artistTopSongs.slice(0, 5);
    return (
      <ul className="top-five">
        <h3> Top 5 Songs </h3>
        {artistTopSongs.map((topSongs) => {
          return (
            <li key={topSongs.id}>
              <div className="row">
                <img
                  className="song-image"
                  src={topSongs.album.images[1].url}
                  alt="album-cover"
                />
                <p>{topSongs.name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ArtistTopSongs;