let currSong = new Audio()
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

const playMusic = (track) => {
    const songURL = "/song/" + track.innerText;

    fetch(songURL)
        .then(response => {
            if (response.ok) {
                currSong.src = songURL;
                currSong.play();
                
            } else {
                // Use innerHTML if the GET request is not successful
                clearErrorMessage();
                currSong.src = "/song/" + track.innerHTML;
                currSong.play();
                
            }
        })
        .catch(error => {
            // Use innerHTML in case of an error
            currSong.src = "/song/" + track.innerHTML;
            currSong.play();
            
        });
};



async function main() {

let songs = await getSongs()
console.log(songs)  


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
    console.log(e.querySelector(".info").getElementsByTagName("div")[0].innerHTML)
    console.log(encodeURI(e.querySelector(".info").getElementsByTagName("div")[0]))

    
        const filePath = e.querySelector(".info").getElementsByTagName("div")[0]
        playMusic(filePath);
        
    
    
})});
}    
   
main()
  
