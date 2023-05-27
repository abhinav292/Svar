console.log("Welcome to Svar");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById("masterPlay");
let forwardButton = document.querySelector(".fa-forward");
let backwardButton = document.querySelector(".fa-backward");
let MyProgressBar = document.getElementById("MyProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {
    songName: "Infected",
    filePath: "songs/Infected.mp3",
    coverPath: "Covers/Infected.mp3",
  },
  {
    songName: "Take it over",
    filePath: "songs/Take over.mp3",
    coverPath: "Covers/Take it over.png",
  },
  {
    songName: "Paisa Hai Toh",
    filePath: "songs/Paisa hai toh.mp3",
    coverPath: "Covers/Farzi.jpg",
  },
];

// Function to play a specific song
const playSong = (index) => {
  if (index >= 0 && index < songs.length) {
    audioElement.src = songs[index].filePath;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  }
};

// Function to pause the current song
const pauseSong = () => {
  audioElement.pause();
  masterPlay.classList.remove("fa-circle-pause");
  masterPlay.classList.add("fa-circle-play");
  gif.style.opacity = 0;
};

// Function to play the next song
const playNextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
};

// Function to play the previous song
const playPreviousSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
};

// Handle Play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong(songIndex);
  } else {
    pauseSong();
  }
});

// Handle Forward button click
forwardButton.addEventListener("click", () => {
  playNextSong();
});

// Handle Backward button click
backwardButton.addEventListener("click", () => {
  playPreviousSong();
});

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  const progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  MyProgressBar.value = progress;
});

MyProgressBar.addEventListener("input", () => {
  const seekTime = (audioElement.duration / 100) * MyProgressBar.value;
  audioElement.currentTime = seekTime;
});

songItems.forEach((element, index) => {
  const playButton = element.querySelector(".songItemPlay");
  playButton.addEventListener("click", () => {
    makeAllPlays();
    playButton.classList.remove("fa-circle-play");
    playButton.classList.add("fa-circle-pause");
    if (songIndex === index && !audioElement.paused) {
      pauseSong();
    } else {
      songIndex = index;
      playSong(songIndex);
    }
  });
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};
