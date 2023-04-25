const btnPlay = document.querySelectorAll('.karaoke');
const title = document.querySelector('.title');
const listKaraokes = document.querySelector('.karaokes');
const videoKaraoke = document.getElementById('video_karaoke');



function agregarInfo() {
    const jsonUrl = 'assets/musicJSON/videos.json';

    agregarVideo(jsonUrl)


}

const jsonUrl = 'assets/musicJSON/videos.json';
agregarVideo(jsonUrl)

function agregarVideo(url) {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        let html = '';
        data.forEach(karaoke => {
            html += `
            <li class="karaoke " >
            <input type="text" value="${karaoke.url}" style="display:none" >
        <a href="#">${karaoke.artista}</a>
        <i class="far fa-play-circle play-video" id="" ></i>
    </li>`

            listKaraokes.innerHTML = html;

            listKaraokes.addEventListener('click', reproducirVideo)




        })
    })
}

function reproducirVideo(e) {

    if (e.target.classList.contains('play-video')) {

        let urlM = e.target.parentElement.children[0].value;


        let reproductor = `<video class="reproductor" src="${urlM}" controls autoplay></video>`

        videoKaraoke.innerHTML = reproductor;
    }










}