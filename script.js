const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passi joke to text-to-speech api
function tellMe(joke) {
  VoiceRSS.speech({
    key: "0dd55517ab174fec8f545ba4c4933008", //Api key should be hidden
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from joke API
async function getJokes() {
  let joke = '';
  const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(jokeApiUrl);
    const data = await response.json();
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    // Disable the button when a joke is playing
    toggleButton();
  } catch(error) {
    // Catch errors
    console.log(error);
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
