let accessToken = '';

const clientId = '79a20e7a270f475aa119f62741f6107c';
const redirectURI = 'https://symphony-react.herokuapp.com/'
const scope = 'playlist-modify-public'

let endpoint = 'https://accounts.spotify.com/authorize';
endpoint += '?response_type=token';
endpoint += '&client_id=' + clientId;
endpoint += '&scope=' + scope;
endpoint += '&redirect_uri=' + redirectURI;


const Spotify = {
    authorizationURL: endpoint,
    getAccessToken() {
        const url = window.location.href;
        if (accessToken || !url.includes('#access_token')) return;
        [accessToken] = url.match(/(?<==).*?(?=&|$)/g);
    },
    async searchLibrary(query) {
        if (!accessToken) return;
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, options);
        const data = await response.json()
        return data;
    },
    async savePlaylist(nameOfPlaylist, uriArray) {
        if (!accessToken || !nameOfPlaylist || !uriArray) return;
        let userId;
        let options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        }
        // GET request to get the user's ID
        let response = await fetch('https://api.spotify.com/v1/me', options)
        let data = await response.json();
        userId = data.id;
        // POST request to create a new playlist
        options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: nameOfPlaylist})
        }
        response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, options);
        data = await response.json();
        const playlistId = data.id;
        // POST request to add tracks to newly created playlist
        options = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({uris: uriArray})
        }
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, options);
    }
}

export default Spotify;