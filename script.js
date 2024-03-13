let currSong = new Audio()

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
    let a = await fetch("http://127.0.0.1:5500/song/")
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
})

}    
   
main()
  
