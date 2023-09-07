const audioElement = document.getElementById('audio');
const button = document.getElementById('button');


// VoiceRSS Javascript SDK

const apiKey = 'e5138a592e604be4a79756c1fd7d381e'
const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'

// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing  the joke to the voice API
function tellMeAJoke(joke) {
    VoiceRSS.speech({
        key: apiKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        data.setup ? joke = `${data.setup} ... ${data.delivery}` : joke = data.joke;

        tellMeAJoke(joke);
        toggleButton();
    } catch (error) {
        console.log('get jokes\n', error);
    }
}



button.addEventListener('click', () => {
    getJokes();
});

audioElement.addEventListener('ended', () => {
    toggleButton();
});