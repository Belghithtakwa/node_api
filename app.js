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

// router.get('/', (req, res, next) => {
//   res.send('hello');
// })
const token = 'BQBToKeQHpYu-hnnZinOKJmmw-KGr2uTs3saDz-bihjmKdzA6VQncM8OjQHcHG2hbO88JfUETKQ8puM83XiUEZ-tg6N8JoHSSMwkkIX3jbfw0FXdZYHUhpJoRQhRF7i62zBzxIPvv2z4iJoW6S5dzseg9PlbpG2e9kA2UVSwmx-PdzcBmA-cP6B1fdoLkmP3-uI0egg5MoEp5O49tW7fgKeeo4WT1B5DqCNKEi24QVztO_c6sV5lz_Mj33jmindHnNzb0zPq9168XGXTqeUYs1dl2w9v8elonX3mGS6d2Z5VNtbI'

router.get('/', (req, res, next) => {
    res.redirect(spotifyApi.createAuthorizeURL([
        "ugc-image-upload",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "app-remote-control",
        "playlist-modify-public",
        "user-modify-playback-state",
        "playlist-modify-private",
        "user-follow-modify",
        "user-read-currently-playing",
        "user-follow-read",
        "user-library-modify",
        "user-read-playback-position",
        "playlist-read-private",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "playlist-read-collaborative",
        "streaming"
    ]))
})

// router.get('/callback', async (req, res, next) => {
//     console.log('reqquery', req.query)
//     const code = req.query.code
//     console.log('code', code);
//     res.send(JSON.stringify(req.query))
//      spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
//        console.log(response)
//        await  res.send(JSON.stringify(response))
//          spotifyApi.setAccessToken(token)
//      })
// })

spotifyApi.setAccessToken(token)

const getMe = () => {
    spotifyApi.getMe()
        .then(function (data) {
            console.log('Some information about the authenticated user', data.body);
        }, function (err) {
            console.log('Something went wrong!', err);
        });
}
getMe()

// const getPlayList = async () => {
//     const data = await spotifyApi.getUserPlaylists("nwlf1olgnfyds9p3mwuavthsx")
//     for (let index = 0; index < data.body.items.length; index++) {
//         console.log('data', data.body.items[index])
//     }
   
// }
// getPlayList()
const searchArtist = async () => {
    const artists = await spotifyApi.searchArtists("Dua")
    console.log('artist', artists)
    console.log(`bilgiler`, artists.body.artists.items[0])
}
searchArtist()
app.use('/', router)
app.listen(9000, () => {
    console.log('runnig')
})