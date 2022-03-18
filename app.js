const express = require('express')
const app = express()
const router = express.Router()
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '136ba59e8a9d45f0857d9827c496f2de',
    clientSecret: '7f1dc12627924ceeb419c8bbabe19a3b',
    redirectUri: 'http://localhost:9000/callback'
});

router.get('/', (req, res, next) => {
  res.send('hello');
})
// const token = "BQC6YQNs_BMiQbZHhYWs4lBstEwolWzs29e0eCimGpD3IWJEIkBxqpubPb68rU621I6yXjNEHILYCrF1J3j4aCa-i3nPGeNaTmtb413DTOZ-YdsZ1vU5PeQ4Jj2_8IBEAumMm01rANV256BKuK6ShRayh9O-HuD9y9p9JfF5WJb8-hsayq8hjjvUsKp2DtWArN84rzfR0Ipj_fZ_aYE2yuOzpQ-E5kHui8g4UeCA7FKO8Zs-3Ey4AqiiDT3ZsNHjTEM4bbkUmRS9cPeZCjf7-oPkXNjcHM6zXXWlNIY2w_-u36R94AID"

// router.get('/', (req, res, next) => {
//     res.redirect(spotifyApi.createAuthorizeURL([
//         "ugc-image-upload",
//         "user-read-recently-played",
//         "user-read-playback-state",
//         "user-top-read",
//         "app-remote-control",
//         "playlist-modify-public",
//         "user-modify-playback-state",
//         "playlist-modify-private",
//         "user-follow-modify",
//         "user-read-currently-playing",
//         "user-follow-read",
//         "user-library-modify",
//         "user-read-playback-position",
//         "playlist-read-private",
//         "user-read-email",
//         "user-read-private",
//         "user-library-read",
//         "playlist-read-collaborative",
//         "streaming"
//     ]))
// })

/*router.get('/callback', (req, res, next) => {
    console.log('reqquery', req.query)
    const code = req.query.code
    spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
        res.send(JSON.stringify(response))
        spotifyApi.setAccessToken(token)
    })
})*/

// spotifyApi.setAccessToken(token)

// const getMe = () => {
//     spotifyApi.getMe()
//         .then(function (data) {
//             console.log('Some information about the authenticated user', data.body);
//         }, function (err) {
//             console.log('Something went wrong!', err);
//         });
// }
//getMe()

/*const getPlayList = async () => {
    const data = await spotifyApi.getUserPlaylists("31xaayn2mdexfbslkcuecg6qeeym")
    for (let index = 0; index < data.body.items.length; index++) {
        console.log('data', data.body.items[index])
    }
}
getPlayList()*/
// const searchArtist = async () => {
//     const artists = await spotifyApi.searchArtists("Dua")
//     console.log('artist', artists)
//     console.log(`bilgiler`, artists.body.artists.items[0])
// }
// searchArtist()
app.use('/', router)
app.listen(9000, () => {
    console.log('runnig')
})