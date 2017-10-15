import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl,InputGroup, Glyphicon} from 'react-bootstrap'; 
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search(){
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        var accessToken = 'BQD-BMsY6lRmANAhuy_d3kA5K0RWKfq0FT7lhdAHJ8asepURy9iG99d_3wj9iKg7PQ-A5WqqFX-P8uV93mgK9KkiMyt4NAZHWoZC203batu1ziDSkLPpAD5LLWCtg6hRhC9jluuzuaznePETDiNnOSS1i6w&'
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        var accesTokenLista = 'BQA2H0Pz8UHA17_gIWogswtZjq5-jrLHrNjZHLD8nuoW7zHx8cvrOboOhNU_LdbNzaK8sr7zDrbRe1Ec_WrtsB8I4hac_yPqX0Q_jLHg1Qe60tmBzCWZ6LgJUDi0PcGXxhlhMvfOCzXrWW38YDaAJ88cF74'

        var myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            mode: 'cors',
            cache: 'default'
        };
        var myOptionsLista = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accesTokenLista
            },
            mode: 'cors',
            cache: 'default'
        };
        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            this.setState({artist})

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=ES&`
            fetch(FETCH_URL, myOptionsLista)
            .then(response => response.json())
            
            .then(json => {
                const {tracks} = json;
                this.setState({tracks});
            })
        });
    }
    render(){
        return(
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                        type="text"
                        placeholder="Search for an Artist"
                        value={this.state.query}
                        onChange={event => {this.setState({query: event.target.value})}}
                        onKeyPress = {event => {
                            if (event.key === 'Enter'){
                                this.search();
                            }
                        }}
                        />
                        <InputGroup.Addon 
                        onClick={() => this.search()}>
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null
                    ?
                        <div>
                            <Profile 
                            artist = {this.state.artist}
                            />
                            <Gallery
                            tracks={this.state.tracks}/>
                        </div> 
                    : <div></div>
                }
            </div>
        )  
    }
}

export default App;