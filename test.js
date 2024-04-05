// const jsmediatags = window.jsmediatags;

// document.querySelector("#input").addEventListener("change", (event) => {
//     const file = event.target.files[0];
    
//     jsmediatags.read(file, {
//         onSuccess: function(tag){
//             document.querySelector("#Song").textContent = tag.tags.title;
//             document.querySelector("#Artist").textContent = tag.tags.artist;
//             const data = tag.tags.picture.data;
//             const format = tag.tags.picture.format;
//             let base64String = "";

//             for (let index = 0; index < data.length; index++) {
//                 base64String += String.fromCharCode(data[index])
                
//             }
//             document.querySelector("#cover").style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`;
//                 },
//         onError: function(error){
//             console.log(error);
//         }
//     });
// });


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
            songPath = "http://127.0.0.1:5500/song/" + element.href.split("/song/")[1];
            songs.push(songPath);
        }
        
    }
    console.log(songs)
    return songs
}

getSongs()


