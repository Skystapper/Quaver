let currSong = new Audio()
let songs;
let currfolder;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function displayAlbums(){
    // currfolder = "song"
    console.log(currfolder)
    let a = await fetch(`http://127.0.0.1:5502/Quaver/song`)
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".card-container")
    // cardContainer.innerHTML = ""
    Array.from(anchors).forEach(async e=>{
       if(e.href.includes("/Quaver/song/")){
            
            let folder = e.href.split("/").slice(-1)[0]
            let a = await fetch(`http://127.0.0.1:5502/Quaver/song/${folder}/info.json`)
            let response = await a.json()
            
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${folder}" class="card">
            
            <div class="pic">
                <img src="../Quaver/song/${folder}/cover.jpg" alt="img">
                <div class="play">
                    <svg width="16" height="16" viewBox="0 0 20 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                            stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`
            
            
        }

        Array.from(document.getElementsByClassName("card")).forEach(e=>{
    
    e.addEventListener("click", async item=>{
        console.log("clicked")
        currfolder = `song/${item.currentTarget.dataset.folder}`
        console.log(item.currentTarget.dataset.folder)
        await getSongs(currfolder)
        console.log(songs)
        playMusic(songs[0])

    })
    
})

    })
}


async function getSongs(currfolder){
    let a = await fetch(`http://127.0.0.1:5502/Quaver/${currfolder}`)
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".flac") || element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${currfolder}/`)[1])
            
        
        }
        
    }
    
    let songUl = document.querySelector(".songlist").getElementsByTagName("ol")[0]
    songUl.innerHTML = ""
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `
        
        
        <li>
                            <div class="songblock">
                                <img src="img/logo.svg" alt="">
    
                                <div class="info">
                                    <div>${decodeURIComponent(song)}</div>
                                    <div>Artist Name</div>
                                </div>
                            </div>
                            <img id="playnow" src="img/play.svg" alt="">
                       
        
        
        
         </li>`;
        
    }
    
    
    // var audio = new Audio(songs[0])
    // audio.play()
    
    // audio.addEventListener("loadeddata", ()=>{
    //     let duration = audio.duration
    //     console.log(duration)
    // } )
    
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")  ).forEach(e => {
        e.addEventListener('click', element=>{
        console.log(e.querySelector(".info").getElementsByTagName("div")[0].innerText)
    
        
            const filePath = e.querySelector(".info").getElementsByTagName("div")[0]
            
            var songURL = `/Quaver/${currfolder}/` + filePath.innerText;
            fetch(songURL)
            .then(response => {
                if (response.ok) {
                    playMusic(filePath.innerText);
                    
                } else {
                    // Use innerHTML if the GET request is not successful
                   
                    // songURL = `${folder}` + filePath.innerHTML;
                    playMusic(filePath.innerHTML);
                    
                }
            })
           
        
    })});
    
}

getSongs('song/ncs')

const playMusic = (track, pause=false) => {
                
                    songURL = `/Quaver/${currfolder}/` + track;
               
                currSong.src = songURL;
                
                
                
                if(!pause){
                    currSong.play();
                    play.src = "img/pause.svg"

                }
                document.querySelector(".songinfo").innerText = decodeURIComponent(track);
                document.querySelector(".songtime").innerHTML = "00:00/00:00"

                
            
};



async function main() {
// currfolder =  "song/All%20Songs"
// await getSongs(currfolder)
// console.log(songs)  
currfolder = `song/All%20Songs`
    console.log(currfolder)
    await getSongs(currfolder)
    console.log(songs)
    playMusic(songs[0], true)
// playMusic(songs[0], true)


// 

// let songUl = document.querySelector(".songlist").getElementsByTagName("ol")[0]
// for (const song of songs) {
//     songUl.innerHTML = songUl.innerHTML + `
    
    
//     <li>
//                         <div class="songblock">
//                             <img src="img/logo.svg" alt="">

//                             <div class="info">
//                                 <div>${decodeURIComponent(song)}</div>
//                                 <div>Artist Name</div>
//                             </div>
//                         </div>
//                         <img id="playnow" src="img/play.svg" alt="">
                   
    
    
    
//      </li>`;
    
// }


// // var audio = new Audio(songs[0])
// // audio.play()

// // audio.addEventListener("loadeddata", ()=>{
// //     let duration = audio.duration
// //     console.log(duration)
// // } )

// Array.from(document.querySelector(".songlist").getElementsByTagName("li")  ).forEach(e => {
//     e.addEventListener('click', element=>{
//     console.log(e.querySelector(".info").getElementsByTagName("div")[0].innerText)

    
//         const filePath = e.querySelector(".info").getElementsByTagName("div")[0]
        
//         var songURL = `/${currfolder}/` + filePath.innerText;
//         fetch(songURL)
//         .then(response => {
//             if (response.ok) {
//                 playMusic(filePath.innerText);
                
//             } else {
//                 // Use innerHTML if the GET request is not successful
               
//                 // songURL = `${folder}` + filePath.innerHTML;
//                 playMusic(filePath.innerHTML);
                
//             }
//         })
       
    
// })});



play.addEventListener("click", ()=>{
    if(currSong.paused){
        currSong.play()
        play.src = "img/pause.svg"
        console.log(currfolder)

    }
    else{
        play.src = "img/play.svg"
        currSong.pause()
        
    }
})


currSong.addEventListener("timeupdate", ()=>{
    
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currSong.currentTime)}/${secondsToMinutesSeconds(currSong.duration)}`
    document.querySelector(".circle").style.left = currSong.currentTime*100/currSong.duration + "%"


})
// document.querySelector(".seekbar").addEventListener("click", e=>{
//     let percent = (e.offsetX*100/e.target.getBoundingClientRect().width)
//     document.querySelector(".circle").style.left = (e.offsetX*100/e.target.getBoundingClientRect().width) + "%"
//     currSong.currentTime = currSong.duration*percent/100

// })

let circle = document.querySelector(".circle");
let seekbar = document.querySelector(".seekbar");
let isDragging = false;

circle.addEventListener("mousedown", startDragging);
seekbar.addEventListener("click", moveCircle);

function startDragging(e) {
    isDragging = true;
}

function moveCircle(e) {
    if (!isDragging) {
        let offsetX = e.clientX - seekbar.getBoundingClientRect().left;
        let percent = (offsetX * 100 / seekbar.getBoundingClientRect().width);
        if (percent >= 0 && percent <= 100) {
            circle.style.left = percent + "%";
            currSong.currentTime = currSong.duration * percent / 100;
        }
    }
}

document.addEventListener("mousemove", dragCircle);
document.addEventListener("mouseup", stopDragging);

function dragCircle(e) {
    if (isDragging) {
        let offsetX = e.clientX - seekbar.getBoundingClientRect().left;
        let percent = (offsetX * 100 / seekbar.getBoundingClientRect().width);
        if (percent >= 0 && percent <= 100) {
            circle.style.left = percent + "%";
            currSong.currentTime = currSong.duration * percent / 100;
        }
    }
}

function stopDragging(e) {
    isDragging = false;
}



previous.addEventListener("click", ()=>{
    // Extract the file name and encode it
let fileName = encodeURIComponent(decodeURIComponent(currSong.src.split("/").pop()));
console.log(currfolder)
console.log(fileName)
console.log(songs)
// Find the index
let index = songs.indexOf(fileName);

// Check if index is valid and play the previous song
if (index !== -1 && index - 1 >= 0) {
    let previousSong = songs[index - 1];
    console.log(currfolder)
    playMusic(previousSong);
}


})

next.addEventListener("click", ()=>{
    
    
   // Extract the file name and encode it
let fileName = encodeURIComponent(decodeURIComponent(currSong.src.split("/").pop()));

// Find the index
let index = songs.indexOf(fileName);

// Check if index is valid and play the next song
if (index !== -1 && index + 1 < songs.length) {
    let nextSong = songs[index + 1];
    console.log(currfolder)
    playMusic(nextSong);
    console.log(nextSong);
}

})


document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
    currSong.volume = parseInt(e.target.value)/100
})



document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0%"
    document.querySelector(".right").style.filter = "blur(3px)"
})

document.querySelector(".cross").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "-250%"
    document.querySelector(".right").style.filter = "blur(0px)"
})

displayAlbums()
displayAlbums()


document.getElementById("login-sec").addEventListener("click", ()=>{

    window.location.href = "login.html";
})

document.getElementById("login-sec-two").addEventListener("click", ()=>{

    window.location.href = "login.html";
})



}    
   
main()
  

document.querySelector(".btn-search").addEventListener("click", (btn) => {
    document.querySelector(".search-area").style = "right: 0%";
  });
  document.querySelector(".search-close-btn").addEventListener("click", (btn) => {
    document.querySelector(".search-area").style = "right: -200%";
  });


        
//   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//   if (loggedInUser) {
//       // Hide the login button
//       document.getElementById('login-sec').style.display = 'none';
//       document.getElementById('login-sec-two').style.display = 'none';

//       // Show the circular div with the initial of the username
//       const initial = loggedInUser.username.charAt(0).toUpperCase();
//       const loggedInUserDiv = document.getElementById('loggedInUser');
//       loggedInUserDiv.textContent = initial;
//       // Optionally, you can add an event listener to perform an action when the circular div is clicked
//       loggedInUserDiv.addEventListener('click', function() {
//           // Perform any action, such as redirecting to a user profile page
//           window.location.href = 'profile.html';
//       });
//   }



  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
      // Hide the login button if a user is logged in
      document.querySelector('#loginButton').style.display = 'none';

      const initial = loggedInUser.username.charAt(0).toUpperCase();
      const loggedInUserDiv = document.createElement('div');
      loggedInUserDiv.className = 'initial-circle';
      loggedInUserDiv.textContent = initial;
      document.querySelector('.header').appendChild(loggedInUserDiv);

      // Add event listeners for hover and click events
      loggedInUserDiv.addEventListener('mouseenter', function() {
          // Replace the initial with the logout icon when hovered over
          loggedInUserDiv.innerHTML = '<i class="fas fa-sign-out-alt" style = "position: absolute; right:28px" id="logout-part" aria-hidden="true"></i>';
      });

      loggedInUserDiv.addEventListener('mouseleave', function() {
          // Replace the logout icon with the initial when mouse leaves
          loggedInUserDiv.textContent = initial;
      });

      loggedInUserDiv.addEventListener('click', function() {
          // Remove the logged-in user information from localStorage
          localStorage.removeItem('loggedInUser');
          alert('Logged out successfully!');
          // Redirect to the home page
          window.location.href = 'music.html';
      });
  } else {
      // Show the login button if no user is logged in
      const loginButton = document.createElement('button');
      loginButton.className = 'login btn';
      loginButton.textContent = 'Login';
      document.getElementById('loginButton').appendChild(loginButton);
      // Optionally, you can add an event listener to perform an action when the login button is clicked
      loginButton.addEventListener('click', function() {
          // Redirect to the login page
          window.location.href = 'login.html';
      });
  }
