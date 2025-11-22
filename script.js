// Get text and transform it to voice to speech with APIs

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Pass joke to VoiceRSS
function tellJoke(joke) {
    VoiceRSS.speech({
    //Insert your API key from VoiceRSS - this one is no longer valid
            key: 'API-KEY',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
});
}

// GET jokes from Joke API
async function getJokes() {
    let joke = '';
    const jokeApi = 'https://v2.jokeapi.dev/joke/Programming,Pun?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(jokeApi);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        console.log(joke);
        // Test-to-speech
        tellJoke(joke);
        // /Disable button
        toggleButton();
    } catch (error) {
        console.log('woops', error);
    }
}


// Event listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);