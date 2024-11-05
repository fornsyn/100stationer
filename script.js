




document.addEventListener('DOMContentLoaded', () => {
  const stationInput = document.getElementById('stationInput'); // Ensure this matches your input field ID

  // Function to handle placing all stations when "all" is entered
  stationInput.addEventListener('input', (event) => {
    if (event.target.value.toLowerCase() === 'allihopa') {
      event.target.value = ''; // Clear the input for better testing experience

      // Loop through each station in the 'stations' list and place it on the map
      for (const stationKey in stations) {
        const station = stations[stationKey];
        placeStationElements(stationKey, station); // Place each station on the map
      }

      // Set the counter to 100 to simulate that all stations have been guessed
      totalCounter = 100;
      updateTotalCounter(); // Update the counter to show 100/100
    }
  });
});



// Save the initial scroll position to lock in place
let initialScrollY = 0;

function lockScroll() {
  initialScrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${initialScrollY}px`;
}

function unlockScroll() {
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, initialScrollY);
}

// Detect viewport height change (keyboard appearance) and lock scroll
window.addEventListener('resize', () => {
  if (window.innerHeight < 500) { // Adjust threshold as needed for keyboard detection
    lockScroll(); // Lock scroll when keyboard appears
  } else {
    unlockScroll(); // Unlock scroll when keyboard is hidden
  }
});




function scaleGame() {
  const wrapper = document.getElementById('wrapper');
  const originalWidth = 1600; // Your original game width
  const originalHeight = 1200; // Your original game height
  const widthRatio = window.innerWidth / originalWidth;
  const heightRatio = window.innerHeight / originalHeight;
  const scale = Math.min(widthRatio, heightRatio); // Use the smaller ratio to maintain aspect ratio

  wrapper.style.transform = `scale(${scale})`; // Scale the wrapper
}

// Initial scale on load
scaleGame();

// Update scale on window resize
window.addEventListener('resize', scaleGame);





let soundEnabled = true;  // Global sound toggle variable

class ControlledAudio {
  constructor(src) {
    this.audio = new Audio(src);
    this.volume = 1.0; // Default volume is 100%
  }

  play() {
    if (soundEnabled) {
      this.audio.volume = this.volume; // Set the audio volume
      this.audio.play().catch(error => console.log('Audio playback failed:', error));
    }
  }

  setVolume(volume) {
    this.volume = volume;
    if (soundEnabled) {
      this.audio.volume = this.volume; // Only adjust volume if sound is enabled
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}









// Timer Toggle Function for sound
function toggleSound(soundToggleImg, isGameScreen = false) {
  // Toggle the global sound setting
  soundEnabled = !soundEnabled;

  // Change the button image based on sound state and screen context
  if (soundEnabled) {
    if (isGameScreen) {
      soundToggleImg.src = 'Images/UI/sound_toggle_on.png'; // Game screen ON state
    } else {
      soundToggleImg.src = 'Images/UI/Settings_sound-01.png'; // Settings screen ON state
    }
  } else {
    if (isGameScreen) {
      soundToggleImg.src = 'Images/UI/sound_toggle_off.png'; // Game screen OFF state
    } else {
      soundToggleImg.src = 'Images/UI/Settings_sound-02.png'; // Settings screen OFF state
    }
  }

  // Play the select sound when toggling (if sound is on)
  const selectSound = new ControlledAudio('Sounds/SFX/select_button1.mp3');
  selectSound.play();
}

// Event listener for the start menu sound toggle button
const startMenuSoundToggleBtn = document.getElementById('soundToggleImg');
startMenuSoundToggleBtn.addEventListener('click', function() {
  toggleSound(startMenuSoundToggleBtn, false); // Not game screen
});


// Event listener for the game screen sound toggle button
const gameScreenSoundToggleBtn = document.getElementById('soundToggleGame');
gameScreenSoundToggleBtn.addEventListener('click', function() {
  toggleSound(gameScreenSoundToggleBtn, true); // Game screen context
});




// Initialization function
function initializeSoundButtons() {
  const startMenuSoundToggleBtn = document.getElementById('soundToggleImg');
  const gameScreenSoundToggleBtn = document.getElementById('soundToggleGame');
  
  // Set the initial state for both buttons
  if (soundEnabled) {
    startMenuSoundToggleBtn.src = 'Images/UI/Settings_sound-01.png';
    gameScreenSoundToggleBtn.src = 'Images/UI/sound_toggle_on.png';
  } else {
    startMenuSoundToggleBtn.src = 'Images/UI/Settings_sound-02.png';
    gameScreenSoundToggleBtn.src = 'Images/UI/sound_toggle_off.png';
  }
}

// Force update the game screen button right before the game starts
function startGame() {
  // Force the game screen button to display the correct image before showing the game screen
  const gameScreenSoundToggleBtn = document.getElementById('soundToggleGame');
  
  if (soundEnabled) {
    gameScreenSoundToggleBtn.src = 'Images/UI/sound_toggle_on.png'; // Sound is ON
  } else {
    gameScreenSoundToggleBtn.src = 'Images/UI/sound_toggle_off.png'; // Sound is OFF
  }

  // Transition to the game screen
  document.getElementById('startMenu').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';

  // Initialize sound button states after the game screen is loaded
  initializeSoundButtons();
}



// Preöpad all images
function preloadImages(imagePaths) {
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
}

const buttonImages = [
  'Images/UI/RigidBtn_Menubox_Idle.png',
  'Images/UI/RigidBtn_Menubox_Instruct.png',
  'Images/UI/RigidBtn_Menubox_Settings.png',
  'Images/UI/RigidBtn_Menubox_Start.png',
  'Images/UI/Settings_sound-02.png',
  'Images/UI/Start_button-01.png',
  'Images/UI/Start_button-02.png',
  'Images/UI/Instructions_button-01.png',
  'Images/UI/Instructions_button-02.png',
  'Images/UI/Settings_button-01.png',
  'Images/UI/Settings_button-02.png',
  'Images/UI/OK_button-01.png',
  'Images/UI/OK_button-02.png',
  'Images/UI/OK_button-red.png',
  'Images/UI/Settings_sound-01.png',
  'Images/UI/Settings_sound-02.png',
  'Images/UI/Settings_time-01.png',
  'Images/UI/Settings_time-02.png',
  'Images/UI/sound_toggle_on.png',
  'Images/UI/sound_toggle_off.png',
  'Images/UI/help_down.png',
  'Images/UI/help_up.png',
  'Images/UI/return_down.png',
  'Images/UI/return_up.png',
  'Images/UI/reveal_down.png',
  'Images/UI/reveal_up.png',
  'Images/UI/Finished_game-01.png',
  'Images/UI/Finished_game-02.png',
  'Images/UI/return_menu_cancel.png',
  'Images/UI/return_menu_ok.png',
  'Images/UI/return_menu_idle.png',
  'Images/UI/reveal_menu_cancel.png',
  'Images/UI/reveal_menu_ok.png',
  'Images/UI/reveal_menu_idle.png',
  'Images/UI/Time_up-01.png',
  'Images/UI/Time_up-02.png',
  'Images/UI/Time_up-03.png',
  'Images/Brighten/bright_big.png',
  'Images/Brighten/bright_mid.png',
  'Images/Brighten/bright_small.png',
  'Images/Brighten/kymlinge_ghost.png',
];


window.addEventListener('load', () => {
  preloadImages(buttonImages);
});



// Preload all button sounds
const startGameSound = new ControlledAudio('Sounds/SFX/start_button1.mp3');
startGameSound.preload = 'auto';

const okButtonSound = new ControlledAudio('Sounds/SFX/close_button1.mp3');
okButtonSound.preload = 'auto';

const instructionsButtonSound = new ControlledAudio('Sounds/SFX/open_button1.mp3');
instructionsButtonSound.preload = 'auto';

const settingsToggleSound = new ControlledAudio('Sounds/SFX/open_button1.mp3');
settingsToggleSound.preload = 'auto';

const selectSound = new ControlledAudio('Sounds/SFX/select_button1.mp3');  // For empty field
selectSound.preload = 'auto';  // Preload the sound

const wrongSound = new ControlledAudio('Sounds/SFX/wrong1.mp3');
wrongSound.preload = 'auto';

const kymlingeGhostSound = new ControlledAudio('Sounds/SFX/kymlinge_ghost.mp3');
kymlingeGhostSound.preload = 'auto';

const revealSound = new ControlledAudio('Sounds/SFX/reveal.mp3');
revealSound.preload = 'auto';

const winSound = new ControlledAudio('Sounds/SFX/win.mp3');
winSound.preload = 'auto';

// Handling button image swaps based on button clicks
const menuBox = document.getElementById('menuBox');
const instructionsBtn = document.getElementById('instructionsBtn');
const settingsBtn = document.getElementById('settingsBtn');
const startGameBtn = document.getElementById('startGameBtn');

// Instructions Button Sound and Animation
instructionsBtn.addEventListener('mousedown', () => {
  instructionsButtonSound.play(); // Play the sound when the button is pressed
  menuBox.src = "Images/UI/RigidBtn_Menubox_Instruct.png";
});

instructionsBtn.addEventListener('mouseup', () => {
  setTimeout(() => {
    menuBox.src = "Images/UI/RigidBtn_Menubox_Idle.png";
  }, 400);
});

// Settings Button Sound and Animation
settingsBtn.addEventListener('mousedown', () => {
  settingsToggleSound.play(); // Play the sound when the button is pressed
  menuBox.src = "Images/UI/RigidBtn_Menubox_Settings.png";
});




settingsBtn.addEventListener('mouseup', () => {
  setTimeout(() => {
    menuBox.src = "Images/UI/RigidBtn_Menubox_Idle.png";
  }, 400);
});

// Start Game Button Sound and Animation
startGameBtn.addEventListener('mousedown', () => {
  // Play the start game sound instantly when the button is pressed
  startGameSound.play();

  // Change the button image to down-state immediately
  menuBox.src = 'Images/UI/RigidBtn_Menubox_Start.png';
});




startGameBtn.addEventListener('mouseup', () => {
  const startScreen = document.getElementById('startScreen');
  const gameContainer = document.getElementById('gameContainer');

  // Revert the button image to idle state after 400ms
  setTimeout(() => {
    menuBox.src = 'Images/UI/RigidBtn_Menubox_Idle.png'; // Revert to idle image after 400ms
  }, 400);

  // Start the fade-out transition for the start screen
  startScreen.classList.add('fade-out');

  setTimeout(() => {
    startScreen.style.display = 'none'; // Hide the start screen after fade-out

    // Show the game container and trigger the fade-in effect
    gameContainer.style.display = 'flex';
    gameContainer.style.opacity = '0'; // Start at 0 opacity for fade-in effect
    gameContainer.classList.remove('fade-out'); // Ensure fade-out class is not present

     // Initialize sound button states after the game screen is loaded
     initializeSoundButtons(); // <-- Add this line to update the sound button

    // Trigger fade-in effect by changing opacity to 1
    setTimeout(() => {
      gameContainer.style.transition = 'opacity 0.4s ease'; // Add the transition directly
      gameContainer.style.opacity = '1'; // Fade in by changing opacity to 1

      // Automatically focus the typing field
      document.getElementById('stationInput').focus();
    }, 50); // Small delay to ensure the display change is applied before fading in
  }, 400); // Match the fade-out duration (0.4s)
});




// Instructions OK Button Sound and Animation
document.addEventListener('DOMContentLoaded', () => {
  const okBtn = document.getElementById('okBtn');
  const okBtnImg = document.getElementById('okImg'); // Get the image inside the OK button
  const instructionsBox = document.getElementById('instructionsBox');

  if (okBtn && instructionsBox && okBtnImg) {
    okBtn.addEventListener('mousedown', () => {
      okButtonSound.play(); // Play the sound when the button is pressed
      okBtnImg.src = 'Images/UI/OK_button-02.png'; // Change the image inside the button immediately
    });

    okBtn.addEventListener('mouseup', () => {
      hideElement(instructionsBox); // Hide the instructions box immediately
      setTimeout(() => {
        okBtnImg.src = 'Images/UI/OK_button-01.png'; // Revert to idle image after 400ms
      }, 400);
    });

    instructionsBtn.addEventListener('click', () => {
      instructionsButtonSound.play();  // Play the open sound instantly
      showElement(instructionsBox); // Show the instructions box
    });
  }
});

// Settings OK Button Sound and Animation
document.addEventListener('DOMContentLoaded', () => {
  const settingsBox = document.getElementById('settingsBox');
  const okSettingsBtn = document.getElementById('okSettingsBtn');
  const okSettingsImg = document.getElementById('okSettingsImg'); // Get the image inside the OK button

  if (settingsBtn && settingsBox && okSettingsBtn && okSettingsImg) {
    settingsBtn.addEventListener('click', () => {
      settingsToggleSound.play();  // Play the open sound instantly
      showElement(settingsBox); // Show the settings box
    });

    okSettingsBtn.addEventListener('mousedown', () => {
      okButtonSound.play(); // Play the sound when the button is pressed
      okSettingsImg.src = 'Images/UI/OK_button-02.png'; // Change the image inside the button immediately
    });

    okSettingsBtn.addEventListener('mouseup', () => {
      hideElement(settingsBox); // Hide the settings box immediately
      setTimeout(() => {
        okSettingsImg.src = 'Images/UI/OK_button-01.png'; // Revert to idle image after 400ms
      }, 400);
    });
  }
});













// Function to show the element with fade-in
function showElement(element) {
  element.classList.remove('hidden', 'fade-out');
  element.style.display = 'block'; // Make the element visible first
  element.style.opacity = '0'; // Start with 0 opacity
  element.style.transition = 'opacity 0.4s ease'; // Set the transition for opacity
  setTimeout(() => {
    element.style.opacity = '1'; // Change to full opacity for fade-in
  }, 50); // Small delay to ensure the changes are applied
}

// Function to hide the element with fade-out
function hideElement(element) {
  element.style.transition = 'opacity 0.4s ease'; // Set the transition for opacity
  element.style.opacity = '0'; // Change to 0 opacity for fade-out
  setTimeout(() => {
    element.classList.add('hidden');
    element.style.display = 'none'; // Hide the element after fade-out
  }, 400); // Match the fade-out duration
}
























// Stations list
const stations = {
  //DELADE STATIONER
  "T-centralen": {
        aliases: ["tc", "tcentralen"],
        labelClass: "label-TC",
        labels: ['blue', 'green', 'red'],
        textCoords: { x: (1153 / 1600) * 100, y: (509.5 / 1200) * 100 },
        brightCoords: { x: (1210 / 1600) * 100, y: (510 / 1200) * 100 },
        brightImage: "bright_big.png",
        flashCoords: { x: (1210 / 1600) * 100, y: (510 / 1200) * 100 },
        flashType: "blink5"
      },
      "Fridhemsplan": {
        aliases: [],
        labelClass: "label-rotated",
        labels: ['blue', 'green'],
        textCoords: { x: (865 / 1600) * 100, y: (410 / 1200) * 100 },
        brightCoords: { x: (865 / 1600) * 100, y: (440 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (865 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
      },
      "Slussen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green', 'red'],
      textCoords: { x: (1266 / 1600) * 100, y: (619/ 1200) * 100 },
        brightCoords: { x: (1210 / 1600) * 100, y: (621 / 1200) * 100 },
        brightImage: "bright_big.png",
        flashCoords: { x: (1211 / 1600) * 100, y: (620 / 1200) * 100 },
        flashType: "blink4"
      },
      "Gamla stan": {
      aliases: ["gamlastan"],
      labelClass: "label-straight",
      labels: ['green', 'red'],
      textCoords: { x: (1266 / 1600) * 100, y: (569/ 1200) * 100 },
        brightCoords: { x: (1210 / 1600) * 100, y: (572 / 1200) * 100 },
        brightImage: "bright_big.png",
        flashCoords: { x: (1211 / 1600) * 100, y: (572 / 1200) * 100 },
        flashType: "blink4"
      },
      
  
  
  
  //GRÖN LINJE
  
  
  "Hagsätra": {
      aliases: [],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (800 / 1600) * 100, y: (1124 / 1200) * 100 },
        brightCoords: { x: (822 / 1600) * 100, y: (1136 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (822 / 1600) * 100, y: (1136 / 1200) * 100 },
        flashType: "blink1"
    },
  "Rågsved": {
      aliases: [],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (842 / 1600) * 100, y: (1081 / 1200) * 100 },
        brightCoords: { x: (864 / 1600) * 100, y: (1091 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (864 / 1600) * 100, y: (1091 / 1200) * 100 },
        flashType: "blink1"
    },
  "Högdalen": {
      aliases: [],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (885 / 1600) * 100, y: (1038 / 1200) * 100 },
        brightCoords: { x: (907 / 1600) * 100, y: (1051 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (907 / 1600) * 100, y: (1051 / 1200) * 100 },
        flashType: "blink1"
    },
  "Bandhagen": {
      aliases: [],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (930 / 1600) * 100, y: (995 / 1200) * 100 },
        brightCoords: { x: (952 / 1600) * 100, y: (1007 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (952 / 1600) * 100, y: (1007 / 1200) * 100 },
        flashType: "blink1"
    },
  "Stureby": {
      aliases: [],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (972 / 1600) * 100, y: (951 / 1200) * 100 },
        brightCoords: { x: (994 / 1600) * 100, y: (964 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (994 / 1600) * 100, y: (964 / 1200) * 100 },
        flashType: "blink1"
    },
  "Svedmyra": {
      aliases: [],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (1015 / 1600) * 100, y: (908 / 1200) * 100 },
        brightCoords: { x: (1037 / 1600) * 100, y: (921 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1037 / 1600) * 100, y: (921 / 1200) * 100 },
        flashType: "blink1"
    },
  "Sockenplan": {
      aliases: [],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (1058 / 1600) * 100, y: (866 / 1200) * 100 },
        brightCoords: { x: (1080 / 1600) * 100, y: (879 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1080 / 1600) * 100, y: (879 / 1200) * 100 }, 
        flashType: "blink1"
    },
  "Enskede gård": {
      aliases: ["enskedegård"],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (1103 / 1600) * 100, y: (820 / 1200) * 100 },
        brightCoords: { x: (1125 / 1600) * 100, y: (833 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1125 / 1600) * 100, y: (833 / 1200) * 100 },
        flashType: "blink1"
    },
  "Globen": {
      aliases: [],
      labelClass: "label-straight-right",
      labels: ['green'],
      textCoords: { x: (1145 / 1600) * 100, y: (778 / 1200) * 100 },
        brightCoords: { x: (1167 / 1600) * 100, y: (791 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1167 / 1600) * 100, y: (791 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Farsta strand": {
      aliases: ["farstastrand"],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1248 / 1600) * 100, y: (1146 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (1146 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (1146 / 1200) * 100 },
        flashType: "blink1" 
    },
    "Farsta": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1248 / 1600) * 100, y: (1104 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (1104 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (1104 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Hökarängen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1248 / 1600) * 100, y: (1064 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (1064 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (1064 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Gubbängen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1248 / 1600) * 100, y: (1023 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (1023 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (1023 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Tallkrogen": {
      aliases: [],
      labelClass: "label-rotated-right",
      labels: ['green'],
      textCoords: { x: (1204 / 1600) * 100, y: (977 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (982 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (982 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Skogskyrkogården": {
      aliases: [],
      labelClass: "label-rotated-right",
      labels: ['green'],
      textCoords: { x: (1204 / 1600) * 100, y: (937 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (942 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (942 / 1200) * 100 },
        flashType: "blink1"  
    },
  "Sandsborg": {
      aliases: [],
      labelClass: "label-rotated-right",
      labels: ['green'],
      textCoords: { x: (1204 / 1600) * 100, y: (898 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (903 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (903 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Blåsut": {
      aliases: [],
      labelClass: "label-rotated-right",
      labels: ['green'],
      textCoords: { x: (1204 / 1600) * 100, y: (855 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (859 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (859 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Skarpnäck": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1459 / 1600) * 100, y: (981 / 1200) * 100 },
        brightCoords: { x: (1439 / 1600) * 100, y: (984 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1439 / 1600) * 100, y: (984 / 1200) * 100 },
        flashType: "blink1"  
    },
  "Bagarmossen": {
      aliases: ["bagis"],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1417 / 1600) * 100, y: (939 / 1200) * 100 },
        brightCoords: { x: (1397 / 1600) * 100, y: (942 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1397 / 1600) * 100, y: (942 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Kärrtorp": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1379 / 1600) * 100, y: (901 / 1200) * 100 },
        brightCoords: { x: (1359 / 1600) * 100, y: (904 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1359 / 1600) * 100, y: (904 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Björkhagen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1341 / 1600) * 100, y: (862 / 1200) * 100 },
        brightCoords: { x: (1321 / 1600) * 100, y: (865 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1321 / 1600) * 100, y: (865 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Hammarbyhöjden": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1302       / 1600) * 100, y: (825 / 1200) * 100 },
        brightCoords: { x: (1282 / 1600) * 100, y: (828 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1282 / 1600) * 100, y: (828 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Skärmarbrink": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1263 / 1600) * 100, y: (785 / 1200) * 100 },
        brightCoords: { x: (1233 / 1600) * 100, y: (786 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1233 / 1600) * 100, y: (786 / 1200) * 100 },
        flashType: "blink2_liggande" 
    },
  "Gullmarsplan": {
      aliases: ["gullmar", "gullmars"],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1266 / 1600) * 100, y: (749 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (749 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (749 / 1200) * 100 },
        flashType: "blink3_liggande" 
    },
  "Skanstull": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1266 / 1600) * 100, y: (704 / 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (704 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (704 / 1200) * 100 },
        flashType: "blink3_liggande"
    },
  "Medborgarplatsen": {
      aliases: ["medis"],
      labelClass: "label-straight",
      labels: ['green'],
      textCoords: { x: (1266 / 1600) * 100, y: (663/ 1200) * 100 },
        brightCoords: { x: (1226 / 1600) * 100, y: (663 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1226 / 1600) * 100, y: (663 / 1200) * 100 },
        flashType: "blink3_liggande" 
    },
  
      "Hötorget": {
        aliases: [],
        labelClass: "label-rotated",
        labels: ['green'],
        textCoords: { x: (1082 / 1600) * 100, y: (410 / 1200) * 100 },
        brightCoords: { x: (1082 / 1600) * 100, y: (451 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (1082 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
      },
      "Rådmansgatan": {
        aliases: [],
        labelClass: "label-rotated",
        labels: ['green'],
        textCoords: { x: (1030 / 1600) * 100, y: (410 / 1200) * 100 },
        brightCoords: { x: (1030 / 1600) * 100, y: (451 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (1030 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
      },
      "Odenplan": {
        aliases: [],
        labelClass: "label-rotated",
        labels: ['green'],
        textCoords: { x: (980 / 1600) * 100, y: (410 / 1200) * 100 },
        brightCoords: { x: (980 / 1600) * 100, y: (451 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (980 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
      },
      "Sankt Eriksplan": {
        aliases: ["st eriksplan", "s:t eriksplan", "sankteriksplan", "steriksplan", "s:teriksplan"],
        labelClass: "label-rotated",
        labels: ['green'],
        textCoords: { x: (925 / 1600) * 100, y: (410 / 1200) * 100 },
        brightCoords: { x: (925 / 1600) * 100, y: (440 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (925 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
      },
  
      "Thorildsplan": {
        aliases: [],
        labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (805 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (805 / 1600) * 100, y: (440 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (805 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
      },
      "Kristineberg": {
        aliases: [],
        labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (755 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (755 / 1600) * 100, y: (440 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (755 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
      },
      "Alvik": {
        aliases: [],
        labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (710 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (710 / 1600) * 100, y: (440 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (710 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
      },
  "Stora mossen": {
      aliases: ["storamossen"],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (666 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (666 / 1600) * 100, y: (440 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (666 / 1600) * 100, y: (451 / 1200) * 100 },
        flashType: "blink3"
    },
  "Abrahamsberg": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (627 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (627 / 1600) * 100, y: (460 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (627 / 1600) * 100, y: (460 / 1200) * 100 },
        flashType: "blink2"
    },
  "Brommaplan": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (583 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (583 / 1600) * 100, y: (460 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (583 / 1600) * 100, y: (460 / 1200) * 100 },
        flashType: "blink2" 
    },
  "Åkeshov": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (541 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (541 / 1600) * 100, y: (460 / 1200) * 100 },
        brightImage: "bright_mid.png",
        flashCoords: { x: (541 / 1600) * 100, y: (460 / 1200) * 100 },
        flashType: "blink2" 
    },
  "Ängbyplan": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (496 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (496 / 1600) * 100, y: (467 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (496 / 1600) * 100, y: (467 / 1200) * 100 },
        flashType: "blink1"
    },
  "Islandstorget": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (449 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (449 / 1600) * 100, y: (467 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (449 / 1600) * 100, y: (467 / 1200) * 100 },
        flashType: "blink1"
      },
  "Blackeberg": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (403 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (403 / 1600) * 100, y: (467 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (403 / 1600) * 100, y: (467 / 1200) * 100 },
        flashType: "blink1"
    },
  "Råcksta": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (359 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (359 / 1600) * 100, y: (467 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (359 / 1600) * 100, y: (467 / 1200) * 100 },
        flashType: "blink1"
    },
    "Vällingby": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (314 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (314 / 1600) * 100, y: (467 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (314 / 1600) * 100, y: (467 / 1200) * 100 },
        flashType: "blink1"
    },
  "Johannelund": {
      aliases: [],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (269 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (269 / 1600) * 100, y: (467 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (269 / 1600) * 100, y: (467 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Hässelby gård": {
      aliases: ["hässelbygård"],
      labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (224 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (224 / 1600) * 100, y: (467 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (224 / 1600) * 100, y: (467 / 1200) * 100 },
        flashType: "blink1" 
    },
   "Hässelby strand": {
        aliases: ["hässelbystrand"],
        labelClass: "label-rotated-right",
        labels: ['green'],
        textCoords: { x: (177 / 1600) * 100, y: (480 / 1200) * 100 },
        brightCoords: { x: (177  / 1600) * 100, y: (467 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (177 / 1600) * 100, y: (467 / 1200) * 100 },
        flashType: "blink1" 
      },
      
  
  
  
  
  
  
  
  
  
  
  
  
  // RÖD LINJE
  "Norsborg": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (215 / 1600) * 100, y: (1145 / 1200) * 100 },
        brightCoords: { x: (190 / 1600) * 100, y: (1142 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (190 / 1600) * 100, y: (1142 / 1200) * 100 },
        flashType: "blink1"       
    },
  "Hallunda": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (261 / 1600) * 100, y: (1099 / 1200) * 100 },
        brightCoords: { x: (236 / 1600) * 100, y: (1096 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (236 / 1600) * 100, y: (1096 / 1200) * 100 },
        flashType: "blink1"  
    },
  "Alby": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (304 / 1600) * 100, y: (1055 / 1200) * 100 },
        brightCoords: { x: (279 / 1600) * 100, y: (1052 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (279 / 1600) * 100, y: (1052 / 1200) * 100 },
        flashType: "blink1"   
    },
  "Fittja": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (345 / 1600) * 100, y: (1014 / 1200) * 100 },
        brightCoords: { x: (320 / 1600) * 100, y: (1011 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (320 / 1600) * 100, y: (1011 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Masmo": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (386 / 1600) * 100, y: (974 / 1200) * 100 },
        brightCoords: { x: (361 / 1600) * 100, y: (971 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (361 / 1600) * 100, y: (971 / 1200) * 100 },
        flashType: "blink1"  
    },
  "Vårby gård": {
      aliases: ["vårbygård"],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (426 / 1600) * 100, y: (934 / 1200) * 100 },
        brightCoords: { x: (401 / 1600) * 100, y: (931 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (401 / 1600) * 100, y: (931 / 1200) * 100 },
        flashType: "blink1"   
    },
  "Vårberg": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (468 / 1600) * 100, y: (892 / 1200) * 100 },
        brightCoords: { x: (443 / 1600) * 100, y: (889 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (443 / 1600) * 100, y: (889 / 1200) * 100 }, 
        flashType: "blink1"    
    },
  "Skärholmen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (508 / 1600) * 100, y: (852 / 1200) * 100 },
        brightCoords: { x: (483 / 1600) * 100, y: (849 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (483 / 1600) * 100, y: (849 / 1200) * 100 }, 
        flashType: "blink1"    
    },
  "Sätra": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (548 / 1600) * 100, y: (812 / 1200) * 100 },
        brightCoords: { x: (523 / 1600) * 100, y: (809 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (523 / 1600) * 100, y: (809 / 1200) * 100 }, 
        flashType: "blink1" 
    },
  "Bredäng": {
    aliases: [],
    labelClass: "label-straight",
    labels: ['red'],
    textCoords: { x: (590 / 1600) * 100, y: (770 / 1200) * 100 },
      brightCoords: { x: (565 / 1600) * 100, y: (767 / 1200) * 100 },
      brightImage: "bright_small.png",
      flashCoords: { x: (565 / 1600) * 100, y: (767 / 1200) * 100 }, 
      flashType: "blink1" 
  },
  "Mälarhöjden": {
        aliases: [],
        labelClass: "label-straight",
        labels: ['red'],
        textCoords: { x: (631 / 1600) * 100, y: (729 / 1200) * 100 },
        brightCoords: { x: (606 / 1600) * 100, y: (726 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (606 / 1600) * 100, y: (726 / 1200) * 100 },
        flashType: "blink1"
        
      },
  "Axelsberg": {
      aliases: [],
      labelClass: "label-rotated",
      labels: ['red'],
      textCoords: { x: (653 / 1600) * 100, y: (661 / 1200) * 100 },
        brightCoords: { x: (643 / 1600) * 100, y: (686 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (643 / 1600) * 100, y: (686 / 1200) * 100 }, 
      flashType: "blink1"
    },
  "Örnsberg": {
      aliases: [],
      labelClass: "label-rotated",
      labels: ['red'],
      textCoords: { x: (716 / 1600) * 100, y: (661 / 1200) * 100 },
        brightCoords: { x: (716 / 1600) * 100, y: (686 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (716 / 1600) * 100, y: (686 / 1200) * 100 }, 
      flashType: "blink1"
    }, 
  "Aspudden": {
      aliases: [],
      labelClass: "label-rotated",
      labels: ['red'],
      textCoords: { x: (784 / 1600) * 100, y: (661 / 1200) * 100 },
        brightCoords: { x: (784 / 1600) * 100, y: (686 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (784 / 1600) * 100, y: (686 / 1200) * 100 }, 
      flashType: "blink1"
    },
     "Fruängen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (638 / 1600) * 100, y: (946 / 1200) * 100 },
      brightCoords: { x: (613 / 1600) * 100, y: (943 / 1200) * 100 },
      brightImage: "bright_small.png",
      flashCoords: { x: (613 / 1600) * 100, y: (943 / 1200) * 100 }, 
      flashType: "blink1"  
    },
  "Västertorp": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (688 / 1600) * 100, y: (896 / 1200) * 100 },
      brightCoords: { x: (663 / 1600) * 100, y: (893 / 1200) * 100 },
      brightImage: "bright_small.png",
      flashCoords: { x: (663 / 1600) * 100, y: (893 / 1200) * 100 }, 
      flashType: "blink1" 
    },
  "Hägerstensåsen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (736 / 1600) * 100, y: (848 / 1200) * 100 },
      brightCoords: { x: (711 / 1600) * 100, y: (845 / 1200) * 100 },
      brightImage: "bright_small.png",
      flashCoords: { x: (711 / 1600) * 100, y: (845 / 1200) * 100 }, 
      flashType: "blink1"  
    },
  "Telefonplan": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (786 / 1600) * 100, y: (798 / 1200) * 100 },
      brightCoords: { x: (761 / 1600) * 100, y: (795 / 1200) * 100 },
      brightImage: "bright_small.png",
      flashCoords: { x: (761 / 1600) * 100, y: (795 / 1200) * 100 }, 
      flashType: "blink1"
    },
  "Midsommarkransen": {
      aliases: ["kransen"],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (833 / 1600) * 100, y: (751 / 1200) * 100 },
      brightCoords: { x: (808 / 1600) * 100, y: (748 / 1200) * 100 },
      brightImage: "bright_small.png",
      flashCoords: { x: (808 / 1600) * 100, y: (748 / 1200) * 100 }, 
      flashType: "blink1" 
    },
  "Liljeholmen": {
      aliases: [],
      labelClass: "label-rotated",
      labels: ['red'],
      textCoords: { x: (854 / 1600) * 100, y: (661 / 1200) * 100 },
        brightCoords: { x: (854 / 1600) * 100, y: (695 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (854 / 1600) * 100, y: (695 / 1200) * 100 }, 
      flashType: "blink2"
    },
  "Hornstull": {
      aliases: [],
      labelClass: "label-rotated",
      labels: ['red'],
      textCoords: { x: (922 / 1600) * 100, y: (661 / 1200) * 100 },
        brightCoords: { x: (922 / 1600) * 100, y: (695 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (922 / 1600) * 100, y: (695 / 1200) * 100 }, 
      flashType: "blink2"
    },
  "Zinkensdamm": {
      aliases: ["zinken"],
      labelClass: "label-rotated",
      labels: ['red'],
      textCoords: { x: (990 / 1600) * 100, y: (661 / 1200) * 100 },
        brightCoords: { x: (990 / 1600) * 100, y: (695 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (990 / 1600) * 100, y: (695 / 1200) * 100 }, 
      flashType: "blink2"
    },
  "Mariatorget": {
      aliases: [],
      labelClass: "label-rotated",
      labels: ['red'],
      textCoords: { x: (1058 / 1600) * 100, y: (661 / 1200) * 100 },
        brightCoords: { x: (1058 / 1600) * 100, y: (695 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1058 / 1600) * 100, y: (695 / 1200) * 100 }, 
      flashType: "blink2"
    },
  "Östermalmstorg": {
      aliases: [], 
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (1216 / 1600) * 100, y: (410 / 1200) * 100 },
        brightCoords: { x: (1186 / 1600) * 100, y: (399 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1186 / 1600) * 100, y: (399 / 1200) * 100 },
        flashType: "blink2_liggande"
    },
  "Stadion": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
        textCoords: { x: (1200 / 1600) * 100, y: (315 / 1200) * 100 },
        brightCoords: { x: (1178 / 1600) * 100, y: (315 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1178 / 1600) * 100, y: (315 / 1200) * 100 },
        flashType: "blink1"
    },
  "Tekniska högskolan": {
      aliases: ["tekniska", "tekniskahögskolan"],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (1200 / 1600) * 100, y: (261 / 1200) * 100 },
        brightCoords: { x: (1178 / 1600) * 100, y: (261 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1178 / 1600) * 100, y: (261 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Universitetet": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (1200 / 1600) * 100, y: (209 / 1200) * 100 },
        brightCoords: { x: (1178 / 1600) * 100, y: (209 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1178 / 1600) * 100, y: (209 / 1200) * 100 },
        flashType: "blink1" 
    },
  "Bergshamra": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (1200 / 1600) * 100, y: (162 / 1200) * 100 },
        brightCoords: { x: (1178 / 1600) * 100, y: (162 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1178 / 1600) * 100, y: (162 / 1200) * 100 },
        flashType: "blink1"
    },
    "Danderyds sjukhus": {
      aliases: ["danderydssjukhus", "danderyd"],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (1200 / 1600) * 100, y: (116 / 1200) * 100 },
        brightCoords: { x: (1178 / 1600) * 100, y: (116 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1178 / 1600) * 100, y: (116 / 1200) * 100 },
        flashType: "blink1"
    },
    "Mörby centrum": {
      aliases: ["mörby", "mörbycentrum", "mörby c", "mörbyc"],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (1200 / 1600) * 100, y: (68 / 1200) * 100 },
        brightCoords: { x: (1178 / 1600) * 100, y: (68 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1178 / 1600) * 100, y: (68  / 1200) * 100 },
        flashType: "blink1"
    },
      "Karlaplan": {
        aliases: [],
        labelClass: "label-straight",
        labels: ['red'],
        textCoords: { x: (1278 / 1600) * 100, y: (375 / 1200) * 100 },
        brightCoords: { x: (1255 / 1600) * 100, y: (365 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1255 / 1600) * 100, y: (365 / 1200) * 100 },
        flashType: "blink1"  
      },
      "Gärdet": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (1351 / 1600) * 100, y: (338 / 1200) * 100 },
        brightCoords: { x: (1328 / 1600) * 100, y: (328 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1328 / 1600) * 100, y: (328 / 1200) * 100 },
        flashType: "blink1"
    },
  "Ropsten": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['red'],
      textCoords: { x: (1431 / 1600) * 100, y: (288/ 1200) * 100 },
        brightCoords: { x: (1408 / 1600) * 100, y: (288 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1408 / 1600) * 100, y: (288 / 1200) * 100 },
        flashType: "blink1"
    },
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // BLÅ LINJE
  
  "Hjulsta": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (294 / 1600) * 100, y: (78 / 1200) * 100 },
        brightCoords: { x: (274 / 1600) * 100, y: (80 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (274 / 1600) * 100, y: (80 / 1200) * 100 },
      flashType: "blink1"
    },
  "Tensta": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (325 / 1600) * 100, y: (111 / 1200) * 100 },
        brightCoords: { x: (305 / 1600) * 100, y: (112 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (305 / 1600) * 100, y: (112 / 1200) * 100 },
      flashType: "blink1"
    }, 
  "Rinkeby": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (358 / 1600) * 100, y: (143 / 1200) * 100 },
        brightCoords: { x: (338  / 1600) * 100, y: (145 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (338 / 1600) * 100, y: (145 / 1200) * 100 },
      flashType: "blink1"
    },
  "Rissne": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (390 / 1600) * 100, y: (175 / 1200) * 100 },
        brightCoords: { x: (370 / 1600) * 100, y: (176 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (370 / 1600) * 100, y: (176 / 1200) * 100 },
      flashType: "blink1"
    },
  "Duvbo": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (422 / 1600) * 100, y: (205 / 1200) * 100 },
        brightCoords: { x: (402 / 1600) * 100, y: (208 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (402 / 1600) * 100, y: (208 / 1200) * 100 },
      flashType: "blink1"
    },
  "Sundbybergs C": {
      aliases: ["sundbybergs centrum", "sundbyberg", "sumpan", "sundbybergscentrum", "sundbybergsc"],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (453 / 1600) * 100, y: (237 / 1200) * 100 },
        brightCoords: { x: (433 / 1600) * 100, y: (239 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (433 / 1600) * 100, y: (239 / 1200) * 100 },
      flashType: "blink1"
    },
  "Solna strand": {
      aliases: ["solnastrand", "vreten"] ,
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (484 / 1600) * 100, y: (269 / 1200) * 100 },
        brightCoords: { x: (464 / 1600) * 100, y: (271 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (464 / 1600) * 100, y: (271 / 1200) * 100 },
      flashType: "blink1"
    },
  "Huvudsta": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (515 / 1600) * 100, y: (300 / 1200) * 100 },
        brightCoords: { x: (495 / 1600) * 100, y: (302 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (495 / 1600) * 100, y: (302 / 1200) * 100 },
      flashType: "blink1"
    },
  "Akalla": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (561 / 1600) * 100, y: (120 / 1200) * 100 },
        brightCoords: { x: (541 / 1600) * 100, y: (122 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (541 / 1600) * 100, y: (122 / 1200) * 100 },
      flashType: "blink1" 
    },
  "Husby": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (596 / 1600) * 100, y: (155 / 1200) * 100 },
        brightCoords: { x: (576 / 1600) * 100, y: (157 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (576 / 1600) * 100, y: (157 / 1200) * 100 },
      flashType: "blink1" 
    },
  "Kista": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (628 / 1600) * 100, y: (188 / 1200) * 100 },
        brightCoords: { x: (608 / 1600) * 100, y: (190 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (608 / 1600) * 100, y: (190 / 1200) * 100 },
      flashType: "blink1" 
    },

    "Kymlinge": {
      aliases: [],
      labelClass: "label-rotated",
      labels: ['blue'],
      textCoords: { x: (730/ 1600) * 100, y: (160 / 1200) * 100 },
        brightCoords: { x: (715 / 1600) * 100, y: (180 / 1200) * 100 },
        brightImage: "kymlinge_ghost.png",
        flashCoords: { x: (678 / 1600) * 100, y: (190 / 1200) * 100 },
      flashType: "blink1" 
    },

  "Hallonbergen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (660 / 1600) * 100, y: (219 / 1200) * 100 },
        brightCoords: { x: (640 / 1600) * 100, y: (221 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (640 / 1600) * 100, y: (221 / 1200) * 100 },
      flashType: "blink1" 
    },
  "Näckrosen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (690  / 1600) * 100, y: (250 / 1200) * 100 },
        brightCoords: { x: (670 / 1600) * 100, y: (252 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (670 / 1600) * 100, y: (252 / 1200) * 100 },
      flashType: "blink1" 
    },
  "Solna centrum": {
      aliases: ["solnacentrum"],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (722  / 1600) * 100, y: (280 / 1200) * 100 },
        brightCoords: { x: (702 / 1600) * 100, y: (283 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (702 / 1600) * 100, y: (283 / 1200) * 100 },
      flashType: "blink1" 
    },
  "Västra skogen": {
      aliases: ["västraskogen"],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (759 / 1600) * 100, y: (318 / 1200) * 100 },
        brightCoords: { x: (729 / 1600) * 100, y: (320 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (729 / 1600) * 100, y: (320 / 1200) * 100 },
      flashType: "blink2_liggande"
    },
  "Stadshagen": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (608 / 1600) * 100, y: (353 / 1200) * 100 },
        brightCoords: { x: (764 / 1600) * 100, y: (355 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (764 / 1600) * 100, y: (355 / 1200) * 100 },
      flashType: "blink2_liggande"
    },
  "Rådhuset": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (925 / 1600) * 100, y: (550 / 1200) * 100 },
        brightCoords: { x: (925 / 1600) * 100, y: (512 / 1200) * 100 },
      brightImage: "bright_small.png",
      flashCoords: { x: (925 / 1600) * 100, y: (512 / 1200) * 100 },
      flashType: "blink2"
    },
  "Kungsträdgården": {
      aliases: [],
      labelClass: "label-straight",
      labels: ['blue'],
      textCoords: { x: (1351  / 1600) * 100, y: (509 / 1200) * 100 },
        brightCoords: { x: (1331 / 1600) * 100, y: (511 / 1200) * 100 },
        brightImage: "bright_small.png",
        flashCoords: { x: (1331 / 1600) * 100, y: (511 / 1200) * 100 },
      flashType: "blink1" 
    }
  
      
    };
  



// Initialize counters for each subway line and total stations
let totalCounter = 0;
let blueCounter = 0;
let greenCounter = 0;
let redCounter = 0;

// Function to update the total counter display
function updateTotalCounter() {
  const totalCounterText = document.getElementById('counterText');
  totalCounterText.textContent = `${totalCounter}/100`; // Update the counter display

  // Check if all 100 stations are guessed
  if (totalCounter === 100) {
    showFinishedGameScreen(); // Show the end screen when all stations are guessed
  }
}

// Function to update the blue line counter display
function updateBlueCounter() {
  const blueCounterText = document.getElementById('blueCounterText');
  blueCounterText.textContent = `${blueCounter}/20`;
}

// Function to update the green line counter display
function updateGreenCounter() {
  const greenCounterText = document.getElementById('greenCounterText');
  greenCounterText.textContent = `${greenCounter}/49`;
}

// Function to update the red line counter display
function updateRedCounter() {
  const redCounterText = document.getElementById('redCounterText');
  redCounterText.textContent = `${redCounter}/36`;
}

// Function to increment the counters based on the line labels
function incrementCounters(station) {
  // Increment the total counter
  totalCounter++;
  updateTotalCounter();

  // Check and increment the corresponding line counters
  if (station.labels.includes('blue')) {
    blueCounter++;
    updateBlueCounter();
  }
  
  if (station.labels.includes('green')) {
    greenCounter++;
    updateGreenCounter();
  }

  if (station.labels.includes('red')) {
    redCounter++;
    updateRedCounter();
  }
}







function normalizeString(str) {
  return str
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Decompose combined letters into base letters and diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/å/g, 'a') // Replace specific Swedish characters
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o');
}







// Array to track guessed stations
let guessedStations = [];

// Function to animate the OK button
function animateSubmitButton() {
  submitImg.src = 'Images/UI/OK_button-02.png'; // Change to clicked state
  setTimeout(() => {
    submitImg.src = 'Images/UI/OK_button-01.png'; // Revert to idle state
  }, 150); // Delay for the heavier feel
}

// Add an event listener for the Enter key to handle form submission manually
document.getElementById('stationInput').addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent the default form submission behavior
    const inputField = document.getElementById('stationInput');
    let input = inputField.value.trim(); // Get input value and trim spaces

    // Trigger OK button animation if the input field is empty
    const submitImg = document.getElementById('submitImg'); // Get the OK button image element

    if (input === "") {
      // Animate OK button to its down state when the field is empty
      animateSubmitButton();

      // Play the select sound
      try {
        const selectSound = new ControlledAudio('Sounds/SFX/select_button1.mp3');  // Create new instance of the sound
        selectSound.play().catch(error => console.log('Audio playback failed:', error));  // Play select_button1.mp3 when the field is empty
      } catch (error) {
        console.log('Audio playback error:', error);  // Log any playback errors
      }

      inputField.value = ''; // Clear the input field
      return;  // Exit the function
    }

    // If the input is not empty, proceed with the normal submit function
    submitStation(); // Call the station submission function manually
  }
});

let gameOver = false; // Flag to indicate if the game has ended

function submitStation() {
  if (gameOver) return; // Prevent submission if the game is over

  const inputField = document.getElementById('stationInput');
  let input = inputField.value.trim(); // Get input value and trim spaces

  // Normalize the input string to handle lowercase, accents, and Swedish letters
  input = normalizeString(input);

  const submitImg = document.getElementById('submitImg'); // Get the OK button image element

  let stationFound = false; // Flag to track if the station was found
  let stationAlreadyGuessed = false; // Flag to track if the station was already guessed

  // Check if input matches any station or alias
  for (const stationKey in stations) {
    const station = stations[stationKey];
    const normalizedAliases = station.aliases.map(alias => normalizeString(alias));
    const normalizedStationKey = normalizeString(stationKey);

    if (normalizedAliases.includes(input) || normalizedStationKey === input) {
      stationFound = true; // Station found, set flag to true

      if (guessedStations.includes(stationKey)) {
        stationAlreadyGuessed = true;
        break;
      }

      animateSubmitButton();
      placeStationElements(stationKey, station);

      // Special handling for Kymlinge
      if (stationKey === "Kymlinge") {
        console.log("Kymlinge detected, playing ghost sound and clearing input.");
        kymlingeGhostSound.play().catch(error => console.log('Audio playback failed:', error));
      } else {
        console.log("Playing random sound for a regular station.");
        playRandomSound();
      }

      // Mark station as guessed and clear input
      guessedStations.push(stationKey);
      incrementCounters(station);

      if (!timerStarted && timerEnabled) {
        startTimer();
        timerStarted = true;
      }

      inputField.value = ''; // Clear the input field after a correct guess
      console.log("Input cleared after correct guess.");
      return;
    }
  }

  if (stationAlreadyGuessed) {
    try {
      const selectSound = new ControlledAudio('Sounds/SFX/select_button1.mp3');
      selectSound.play().catch(error => console.log('Audio playback failed:', error));
    } catch (error) {
      console.log('Audio playback error:', error);
    }
    inputField.value = ''; // Clear the input field when the station is already guessed
    console.log("Input cleared after already guessed.");
    return;
  }

  // If no station was found, play the incorrect guess sound and leave input in the field
  if (!stationFound) {
    try {
      const wrongSound = new ControlledAudio('Sounds/SFX/wrong1.mp3');
      wrongSound.play().catch(error => console.log('Audio playback failed:', error));
    } catch (error) {
      console.log('Audio playback error:', error);
    }

    submitImg.src = 'Images/UI/OK_button-red.png';
    setTimeout(() => {
      submitImg.src = 'Images/UI/OK_button-01.png';
    }, 100);
    console.log("Incorrect guess, input left in field.");
  }
}









// Submit Button Animation and Click Events

const submitBtn = document.getElementById('submitBtn');
const submitImg = document.getElementById('submitImg');
const stationInput = document.getElementById('stationInput');

// Mouse down: animate when the button is clicked
submitBtn.addEventListener('mousedown', () => {
  animateSubmitButton();
});

// Keypress: animate when 'Enter' is pressed
stationInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    animateSubmitButton();
  }
});

// Event listener for submit button
submitBtn.addEventListener('click', () => {
  const inputField = document.getElementById('stationInput');
  let input = inputField.value.trim(); // Get input value and trim spaces

  if (input === "") {
    // If input is empty, behave like pressing Enter
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    stationInput.dispatchEvent(event);
  } else {
    // Otherwise, proceed with regular submission
    submitStation();
  }

  // Automatically focus the input field after submission
  inputField.focus();
});

// Event listener for pressing 'Enter' key
stationInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    submitStation();

    // Automatically focus the input field after submission
    stationInput.focus();
  }
});







  




// Array to hold the paths to your sound files
const soundEffects = [];
for (let i = 1; i <= 25; i++) {
  soundEffects.push(`Sounds/SFX/plop${i}.mp3`);
}

// Function to play a sound effect, with a special sound for Kymlinge
function playRandomSound(isKymlinge = false) {
  if (isKymlinge) {
    // Play the Kymlinge-specific ghost sound
    kymlingeGhostSound.play().catch(error => console.log('Audio playback failed:', error));
  } else {
    // Play a random sound effect from the array
    const randomIndex = Math.floor(Math.random() * soundEffects.length); // Pick a random index
    const audio = new ControlledAudio(soundEffects[randomIndex]);
    audio.volume = 0.7;  // Set volume level
    audio.play(); // Play the randomly selected sound
  }
}




// Function to play a random typing sound
function playRandomTypingSound() {
  // Generate a random number between 1 and 25
  const randomIndex = Math.floor(Math.random() * 25) + 1;
  
  // Construct the path to the random sound file
  const typingSound = new ControlledAudio(`Sounds/SFX/typing${randomIndex}.mp3`);
  typingSound.volume = 0.7;
  
  // Play the sound
  typingSound.play();
}

// Event listener for keydown in the typing field (for letters and backspace)
document.getElementById('stationInput').addEventListener('keydown', (event) => {
  const inputField = document.getElementById('stationInput');
  const currentText = inputField.value;

  // Handle typing (for letters, numbers, and valid input keys)
  if (event.key.length === 1) {
    playRandomTypingSound();
  }

  // Handle backspace sound, but only if there's text to delete
  if (event.key === 'Backspace' && currentText.length > 0) {
    playRandomTypingSound();
  }
});




  
// Function to place station text and bright image
function placeStationElements(stationKey, station) {
    // Get the actual size of the map container (scaled size)
    const mapContainer = document.getElementById('mapContainer');
    const mapWidth = mapContainer.offsetWidth;
    const mapHeight = mapContainer.offsetHeight;
  
    // Calculate the pixel coordinates for the station text
    const adjustedTextX = (station.textCoords.x / 100) * mapWidth;
    const adjustedTextY = (station.textCoords.y / 100) * mapHeight;
  
    // Create and position the station text
    const stationText = document.createElement('div');
    stationText.textContent = stationKey;
    stationText.classList.add(station.labelClass, 'station-text');
    stationText.style.position = 'absolute';
    stationText.style.left = `${adjustedTextX}px`;
    stationText.style.top = `${adjustedTextY}px`;
  
    if (station.labelClass === "label-rotated") {
        stationText.style.transform = 'translate(0%, -50%) rotate(-45deg)';
        stationText.style.transformOrigin = '0% 50%';
    } else {
        stationText.style.transform = 'translate(0%, -50%)';
        stationText.style.transformOrigin = '0% 50%';
    }
  
    mapContainer.appendChild(stationText);
  
    // Calculate the pixel coordinates for the bright image
    const adjustedBrightX = (station.brightCoords.x / 100) * mapWidth;
    const adjustedBrightY = (station.brightCoords.y / 100) * mapHeight;
  
    // Create and position the bright image
    const brightImage = document.createElement('img');
    brightImage.src = `Images/Brighten/${station.brightImage}`;
    brightImage.classList.add('bright-image');
    brightImage.style.position = 'absolute';
    brightImage.style.left = `${adjustedBrightX}px`;
    brightImage.style.top = `${adjustedBrightY}px`;
    brightImage.style.transform = 'translate(-50%, -50%)';
  
    mapContainer.appendChild(brightImage);
  
    // Debugging logs
    console.log(`Placing elements for station: ${stationKey}`);

  

    // Clear the input field after processing
    const inputField = document.getElementById('stationInput');
    inputField.value = '';
    console.log("Cleared the input field");
}

  





// Function to trigger the flash animation at specified coordinates with a specific flash type
function triggerFlash(x, y, flashType) {
  // Create a div element for the flash animation
  const flashElement = document.createElement('div');
  flashElement.className = `flash ${flashType}`; // Assign the flash type as a class
  flashElement.style.left = x + '%';
  flashElement.style.top = y + '%';

  // Set specific sizes for each flash type based on width and height
  switch (flashType) {
      case "blink1":
          flashElement.style.width = '38px';
          flashElement.style.height = '38px';
          break;
      case "blink2":
          flashElement.style.width = '38px';
          flashElement.style.height = '62px';
          break;
      case "blink3":
          flashElement.style.width = '28px';
          flashElement.style.height = '83px';
          break;
      case "blink2_liggande": // New flash type
          flashElement.style.width = '63px';
          flashElement.style.height = '38px';
          break;
      case "blink3_liggande": // New flash type
          flashElement.style.width = '83px';
          flashElement.style.height = '38px';
          break;
      case "blink4": // New flash type
          flashElement.style.width = '112px';
          flashElement.style.height = '32px';
          break;
      case "blink5": // New flash type
          flashElement.style.width = '177px';
          flashElement.style.height = '47px';
          break;
      // Add more flash types if needed...
  }

  // Append the flash element to the map container
  document.getElementById('mapContainer').appendChild(flashElement);

  // Array to store the image file paths for the selected flash type
  let imageFiles = [];

  // Choose the appropriate image sequence based on the flashType
  switch (flashType) {
      case "blink1":
          imageFiles = [
              'Images/Animations/Blink 1/blink1-01.png',
              'Images/Animations/Blink 1/blink1-02.png',
              'Images/Animations/Blink 1/blink1-03.png'
          ];
          break;
      case "blink2":
          imageFiles = [
              'Images/Animations/Blink 2/blink2-01.png',
              'Images/Animations/Blink 2/blink2-02.png',
              'Images/Animations/Blink 2/blink2-03.png'
          ];
          break;
      case "blink3":
          imageFiles = [
              'Images/Animations/Blink 3/blink3-01.png',
              'Images/Animations/Blink 3/blink3-02.png',
              'Images/Animations/Blink 3/blink3-03.png'
          ];
          break;
      case "blink2_liggande": // New flash type
          imageFiles = [
              'Images/Animations/Blink 2 Liggande/blink2_liggande01.png',
              'Images/Animations/Blink 2 Liggande/blink2_liggande02.png',
              'Images/Animations/Blink 2 Liggande/blink2_liggande03.png'
          ];
          break;
      case "blink3_liggande": // New flash type
          imageFiles = [
              'Images/Animations/Blink 3 Liggande/blink3_liggande01.png',
              'Images/Animations/Blink 3 Liggande/blink3_liggande02.png',
              'Images/Animations/Blink 3 Liggande/blink3_liggande03.png'
          ];
          break;
      case "blink4": // New flash type
          imageFiles = [
              'Images/Animations/Blink 4/Blink4-01.png',
              'Images/Animations/Blink 4/Blink4-02.png',
              'Images/Animations/Blink 4/Blink4-03.png'
          ];
          break;
      case "blink5": // New flash type
          imageFiles = [
              'Images/Animations/Blink 5/Blink5-01.png',
              'Images/Animations/Blink 5/Blink5-02.png',
              'Images/Animations/Blink 5/Blink5-03.png'
          ];
          break;
      // Add more flash image sequences as needed...
  }

  // Function to cycle through the images
  let frame = 0;
  const animationInterval = setInterval(() => {
      if (frame >= imageFiles.length) {
          clearInterval(animationInterval); // Stop animation once all frames are shown
          flashElement.remove(); // Remove flash element after the animation is complete
      } else {
          flashElement.style.backgroundImage = `url('${imageFiles[frame]}')`;
          frame++;
      }
  }, 60); // Set interval timing for frame switching
}




  





  

  

































// Timer Variables and Functions
let timerStarted = false;
let timerEnabled = true;
let countdown;

function startTimer() {
  if (!timerEnabled) return;

  let timeRemaining = 600;
  const timerDisplay = document.getElementById('timerDisplay');
  const timerFrame = document.getElementById('timerFrame');

  countdown = setInterval(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timeRemaining--;

    if (timeRemaining === 58) {
      timerFrame.src = "Images/UI/timer_box-red.png";
      timerDisplay.style.color = "#f8d1ca";
    }

    if (timeRemaining < 0) {
      clearInterval(countdown);
      gameOver = true; // Set gameOver to true when time runs out
      gameOverFunction();
    }
  }, 1000);
}

function gameOverFunction() {
  clearInterval(countdown);

  const currentTotal = totalCounter;
  const blueLineCount = blueCounter;
  const greenLineCount = greenCounter;
  const redLineCount = redCounter;

  showTimeUpScreen(currentTotal, blueLineCount, greenLineCount, redLineCount);

  // Disable the input field when the game ends
  document.getElementById('stationInput').disabled = true;
}

function showTimeUpScreen(currentTotal, blueLineCount, greenLineCount, redLineCount) {
  console.log("showTimeUpScreen triggered");

  wrongSound.play();

  const timeUpOverlay = document.getElementById("timeUpOverlay");
  timeUpOverlay.classList.remove("hidden");
  timeUpOverlay.style.display = "flex";

  document.getElementById("timeUpCounterText").textContent = `${currentTotal}/100`;
  document.getElementById("timeUpBlueCounterText").textContent = `${blueLineCount}/20`;
  document.getElementById("timeUpGreenCounterText").textContent = `${greenLineCount}/49`;
  document.getElementById("timeUpRedCounterText").textContent = `${redLineCount}/36`;
}

window.addEventListener("load", function() {
  document.getElementById("timeUpOverlay").style.display = "none";
});













// Timer Toggle Function
function toggleTimer() {
  const timerFrame = document.getElementById('timerFrame');
  const timerDisplay = document.getElementById('timerDisplay'); // Access the timer text
  const timerToggleImg = document.getElementById('timerToggleImg');



  
  // Toggle the state of the timer
  if (timerEnabled) {
    // Disable the timer
    timerEnabled = false;
    clearInterval(countdown);  // Stop the timer if it's running
    timerFrame.style.visibility = 'hidden'; // Hide the timer frame without display change
    timerFrame.style.opacity = '0';         // Set opacity to 0 to fully hide
    timerDisplay.style.visibility = 'hidden'; // Hide the timer text
    timerDisplay.style.opacity = '0';
    timerToggleImg.src = 'Images/UI/Settings_time-02.png'; // Update to the "Timer Off" image
  } else {
    // Enable the timer
    timerEnabled = true;
    timerFrame.style.visibility = 'visible'; // Show the timer frame
    timerFrame.style.opacity = '1';          // Set opacity to 1 to fully show
    timerFrame.src = 'Images/UI/timer_box.png'; // Ensure the normal timer frame is shown
    timerDisplay.style.visibility = 'visible'; // Show the timer text
    timerDisplay.style.opacity = '1';
    timerToggleImg.src = 'Images/UI/Settings_time-01.png'; // Update to the "Timer On" image
  }

  // Play the toggle sound after switching states
  const selectSound = new ControlledAudio('Sounds/SFX/select_button1.mp3');
  selectSound.play();
}

// Event listener for the toggle button
document.getElementById('timerToggleBtn').addEventListener('click', toggleTimer);








document.addEventListener('DOMContentLoaded', () => {
  // Help button and related elements
  const helpBtn = document.getElementById('helpBtn'); 
  const helpBtnImg = document.getElementById('helpBtnImg'); 
  const gameHelpBox = document.getElementById('gameHelpBox'); 
  const gameHelpOkBtn = document.getElementById('gameHelpOkBtn'); 
  const gameHelpOkImg = document.getElementById('gameHelpOkImg'); 

  // Use the already preloaded sounds
  const openButtonSound = instructionsButtonSound; // Reuse instructionsButtonSound for the help button
  const selectButtonSound = selectSound; // Reuse selectSound for the OK button

  // Function to show element
  const showElement = (element) => {
    element.classList.remove('hidden');
  };

  // Function to hide element
  const hideElement = (element) => {
    element.classList.add('hidden');
  };

  // Help button behavior
  helpBtn.addEventListener('mousedown', () => {
    helpBtnImg.src = 'Images/UI/help_down.png'; 
    openButtonSound.play(); // Play sound when help button is pressed
  });

  helpBtn.addEventListener('mouseup', () => {
    helpBtnImg.src = 'Images/UI/help_up.png'; 
    showElement(gameHelpBox); // Show the game help infobox
  });

  // OK button behavior (to close the help infobox)
  gameHelpOkBtn.addEventListener('mousedown', () => {
    gameHelpOkImg.src = 'Images/UI/OK_button-02.png'; 
    selectButtonSound.play(); // Play sound when OK button is pressed
  });

  gameHelpOkBtn.addEventListener('mouseup', () => {
    gameHelpOkImg.src = 'Images/UI/OK_button-01.png'; 
    hideElement(gameHelpBox); // Hide the game help infobox
  });
});







//RETURN BUTTON

document.addEventListener('DOMContentLoaded', () => {
  const returnBtn = document.getElementById('returnBtn');
  const returnBtnImg = document.getElementById('returnBtnImg');
  const returnMenuBox = document.getElementById('returnMenuBox');
  const returnMenuBoxImg = document.getElementById('returnMenuBoxImg');  // Main image to swap
  const returnOkBtn = document.getElementById('returnOkBtn');  
  const returnCancelBtn = document.getElementById('returnCancelBtn'); 

  const openButtonSound = instructionsButtonSound;
  const selectButtonSound = selectSound;

  // Function to show element by removing 'hidden' class
  const showElement = (element) => {
    element.classList.remove('hidden');
  };

  // Function to hide element by adding 'hidden' class
  const hideElement = (element) => {
    element.classList.add('hidden');
  };

  // Return button behavior
  returnBtn.addEventListener('mousedown', () => {
    returnBtnImg.src = 'Images/UI/return_down.png';
    openButtonSound.play();
  });

  returnBtn.addEventListener('mouseup', () => {
    returnBtnImg.src = 'Images/UI/return_up.png';
    showElement(returnMenuBox);  // Show the return confirmation box
  });

  // OK button behavior (swap image to OK and reload page)
  returnOkBtn.addEventListener('mousedown', () => {
    returnMenuBoxImg.src = 'Images/UI/return_menu_ok.png';  // Change main image to OK
    selectButtonSound.play();
  });

  returnOkBtn.addEventListener('mouseup', () => {
    location.reload();  // Reload the page to return to the start screen
  });

  // Cancel button behavior (swap image to Cancel and close menu)
  returnCancelBtn.addEventListener('mousedown', () => {
    returnMenuBoxImg.src = 'Images/UI/return_menu_cancel.png';  // Change main image to Cancel
    selectButtonSound.play();
  });

  returnCancelBtn.addEventListener('mouseup', () => {
    hideElement(returnMenuBox);  // Hide the return confirmation box
    returnMenuBoxImg.src = 'Images/UI/return_menu_idle.png';  // Reset image to idle state
  });
});








// REVEAL BUTTON

document.addEventListener('DOMContentLoaded', () => {
  const revealBtn = document.getElementById('revealBtn');
  const revealBtnImg = document.getElementById('revealBtnImg');
  const revealMenuBox = document.getElementById('revealMenuBox');
  const revealMenuBoxImg = document.getElementById('revealMenuBoxImg');  // Main image to swap
  const revealOkBtn = document.getElementById('revealOkBtn');  
  const revealCancelBtn = document.getElementById('revealCancelBtn'); 

  const openButtonSound = instructionsButtonSound;
  const selectButtonSound = selectSound;

  // Function to show element by removing 'hidden' class
  const showElement = (element) => {
    element.classList.remove('hidden');
  };

  // Function to hide element by adding 'hidden' class
  const hideElement = (element) => {
    element.classList.add('hidden');
  };

  // Function to stop the timer
  function stopTimer() {
    clearInterval(countdown); // Stops the countdown
    timerStarted = false;     // Resets the start flag
  }

  // Reveal button behavior
  revealBtn.addEventListener('mousedown', () => {
    revealBtnImg.src = 'Images/UI/reveal_down.png';
    openButtonSound.play();
  });

  revealBtn.addEventListener('mouseup', () => {
    revealBtnImg.src = 'Images/UI/reveal_up.png';
    showElement(revealMenuBox);  // Show the reveal confirmation box
  });

  // OK button behavior for Reveal
  revealOkBtn.addEventListener('mousedown', () => {
    revealMenuBoxImg.src = 'Images/UI/reveal_menu_ok.png';  // Change main image to OK
    revealSound.play();
  });

  revealOkBtn.addEventListener('mouseup', () => {
    // Hide the reveal menu box and reset image after a delay
    setTimeout(() => {
      revealMenuBoxImg.src = 'Images/UI/reveal_menu_idle.png';
      hideElement(revealMenuBox);
    }, 1);
    
    // Stop the timer when revealing all stations
    stopTimer();

    // Trigger the reveal of all unguessed stations
    revealUnguessedStations();
  });

  // Cancel button behavior (same as return button)
  revealCancelBtn.addEventListener('mousedown', () => {
    revealMenuBoxImg.src = 'Images/UI/reveal_menu_cancel.png';  // Change main image to Cancel
    selectButtonSound.play();
  });

  revealCancelBtn.addEventListener('mouseup', () => {
    hideElement(revealMenuBox);  // Hide the reveal confirmation box
    revealMenuBoxImg.src = 'Images/UI/reveal_menu_idle.png';  // Reset image to idle state
  });
});












// Function to reveal all unguessed stations in a darker color
function revealUnguessedStations() {
  for (const stationKey in stations) {
    const station = stations[stationKey];

    if (guessedStations.includes(stationKey)) {
      // Display guessed stations with the original color
      placeStationElements(stationKey, station);  // Use existing color and positioning
    } else {
      // Dark color for unguessed stations
      const darkColor = "#b4beb9";      // Color for unguessed stations

      // Set the color for unguessed stations
      displayStationText(stationKey, station, darkColor); // Call with dark color
    }
  }
}

function displayStationText(stationKey, station, color) {
  const textElement = document.createElement("div");
  textElement.innerText = stationKey;

  // Apply the specific label class for styling, including font size
  textElement.classList.add(station.labelClass);  // e.g., 'label-straight', 'label-rotated', or 'tc-label'
  
  // Set color and z-index to ensure it appears above the map
  textElement.style.color = color;
  textElement.style.zIndex = '10'; // Higher z-index to appear above the map
  
  textElement.style.position = "absolute";
  textElement.style.left = `${station.textCoords.x}%`;
  textElement.style.top = `${station.textCoords.y}%`;
  
  // Append the text element to the map container
  const mapContainer = document.getElementById('mapContainer'); // Use the correct map container ID
  mapContainer.appendChild(textElement);
}








document.addEventListener('DOMContentLoaded', () => {
  // Time Up Screen Reveal Button Behavior
  const timeUpRevealButton = document.getElementById('timeUpRevealButton');
  const timeUpImage = document.getElementById('timeUpImage'); // Main time-up overlay image
  const timeUpOverlay = document.getElementById('timeUpOverlay'); // Overlay to be hidden

  timeUpRevealButton.addEventListener('mousedown', () => {
    timeUpImage.src = 'Images/UI/Time_up-02_down.png'; // Show down state for reveal button
    revealSound.play()
  });

  timeUpRevealButton.addEventListener('mouseup', () => {
    timeUpImage.src = 'Images/UI/Time_up-02.png'; // Reset to up state for reveal button
    revealUnguessedStations(); // Call reveal function to show unguessed stations
    timeUpOverlay.classList.add('hidden'); // Hide the time-up overlay
  });

  // Time Up Screen Return Button Behavior
  const timeUpReturnButton = document.getElementById('timeUpReturnButton');

  timeUpReturnButton.addEventListener('mousedown', () => {
    timeUpImage.src = 'Images/UI/Time_up-03_down.png'; // Show down state for return button
  });

  timeUpReturnButton.addEventListener('mouseup', () => {
    timeUpImage.src = 'Images/UI/Time_up-03.png'; // Reset to up state for return button
    location.reload(); // Reload the page to return to start
  });
});






function showFinishedGameScreen() {
  const finishedGameOverlay = document.getElementById('finishedGameOverlay');
  finishedGameOverlay.classList.remove('hidden'); // Display the end screen overlay
  winSound.play();
}


document.addEventListener('DOMContentLoaded', () => {
  const finishedGameReturnButton = document.getElementById('finishedGameReturnButton');
  const finishedGameImage = document.getElementById('finishedGameImage'); // Overlay image

  finishedGameReturnButton.addEventListener('mousedown', () => {
    finishedGameImage.src = 'Images/UI/Finished_game-02.png'; // Down state for button
  });

  finishedGameReturnButton.addEventListener('mouseup', () => {
    finishedGameImage.src = 'Images/UI/Finished_game-01.png'; // Up state for button
    location.reload(); // Reload to restart the game
  });
});



