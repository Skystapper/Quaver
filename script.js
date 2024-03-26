let currSong = new Audio()
let songs;
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




async function getSongs(){
    let a = await fetch("/song/")
    let response = await a.text()
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".flac") || element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/song/")[1])
        
        }
        
    }
    
    return songs
}

getSongs()

const playMusic = (track, pause=false) => {
                
                    songURL = "/song/" + track;
               
                currSong.src = songURL;
                
                
                
                if(!pause){
                    currSong.play();
                    play.src = "img/pause.svg"

                }
                document.querySelector(".songinfo").innerText = decodeURIComponent(track);
                document.querySelector(".songtime").innerHTML = "00:00/00:00"

                
            
};



async function main() {

let songs = await getSongs()
console.log(songs)  

playMusic(songs[0], true)

let songUl = document.querySelector(".songlist").getElementsByTagName("ol")[0]
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
        
        var songURL = "/song/" + filePath.innerText;
        fetch(songURL)
        .then(response => {
            if (response.ok) {
                playMusic(filePath.innerText);
                
            } else {
                // Use innerHTML if the GET request is not successful
               
                // songURL = "/song/" + filePath.innerHTML;
                playMusic(filePath.innerHTML);
                
            }
        })
       
    
})});



play.addEventListener("click", ()=>{
    if(currSong.paused){
        currSong.play()
        play.src = "img/pause.svg"

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

// Find the index
let index = songs.indexOf(fileName);

// Check if index is valid and play the previous song
if (index !== -1 && index - 1 >= 0) {
    let previousSong = songs[index - 1];
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
}

)
}    
   
main()
  
