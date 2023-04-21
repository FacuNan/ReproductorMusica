const btnReaccion = document.getElementById('reaccion');
const contenedorListaMusic = document.getElementById('lista-music');
const controles = document.getElementById('controles');

const menuMusic = document.getElementById('menuMusic');
const titlePlaylist = document.getElementById('titlePlaylist');
const playDescription = document.getElementById('playDescription');
const imgAlbum = document.getElementById('imgAlbum');
const album = document.getElementById('album');


menuMusic.addEventListener('click', agregarInfo)
contenedorListaMusic.addEventListener('click', reproducirMusica)


function agregarInfo(e) {
    let jsonUrl = '';
    let titlePlay = '';
    let descripcion = '';
    let srcImg = '';

    if (e.target.classList.contains('playEstudiar')) {
        jsonUrl = 'assets/musicJSON/estudiando.json';
        titlePlay = 'música para estudiar';
        descripcion = 'La mejor play list';
        srcImg = 'assets/img/estudiando.jpg';

        album.style.background = "linear-gradient(to right, rgba(2,2,2,0.726) 15%, rgba(8,8,8,0.829)), url(assets/img/estudiando.jpg)"
    } else if (e.target.classList.contains('playRock')) {
        jsonUrl = 'assets/musicJSON/rock.json';
        titlePlay = 'música para rockear';
        descripcion = 'La mejor play list';
        srcImg = 'assets/img/rockear.png';

        album.style.background = "linear-gradient(to right, rgba(2,2,2,0.726) 15%, rgba(8,8,8,0.829)), url(assets/img/rockear.png)"
    } else if (e.target.classList.contains('playDeporte')) {
        jsonUrl = 'assets/musicJSON/deporte.json';
        titlePlay = 'música para hacer deportes';
        descripcion = 'La mejor play list';
        srcImg = 'assets/img/deporte.jpg';

        album.style.background = "linear-gradient(to right, rgba(2,2,2,0.726) 15%, rgba(8,8,8,0.829)), url(assets/img/deporte.jpg)"
    }

    titlePlaylist.innerHTML = titlePlay;
    playDescription.innerHTML = descripcion;
    imgAlbum.src = srcImg
    cargarMusica(jsonUrl);



}

function cargarMusica(url) {
    fetch(url).then(function (response) {
        return response.json()
    }).then(function (data) {
        let html = '';
        data.forEach(music => {
            html += `<li class="music">
           <input type="text" value="${music.url}" style="display:none">
           <a href="#" id="${music.id}" class="btn play-music"><i class="far fa-play-circle"></i></a>
           <h3>${music.artista}</h3> 
           <h3 class="name" id="name">${music.nombre}</h3> 
           <h3 class="time">1.44 s</h3>
       </li>`

            contenedorListaMusic.innerHTML = html;
        })
    })

}

function reproducirMusica(e) {
    console.log(e.target.parentElement.children[0].value)
    if (e.target.classList.contains('play-music')) {
        let urlM = e.target.parentElement.children[0].value;
        controles.innerHTML = `
        <a href="#" class="btn control atras">
        <i class="fas fa-backward"></i>
    </a>
    <audio src="${urlM}" style="width:50vw" controls autoplay><input type="text" style="display:none" value="${urlM}"></audio>
    <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>
        `

    }
}


