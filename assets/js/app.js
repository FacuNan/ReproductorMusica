const btnReaccion = document.getElementById('reaccion');
const contenedorListaMusic = document.getElementById('lista-music');
const controles = document.getElementById('controles');

const menuMusic = document.getElementById('menuMusic');
const titlePlaylist = document.getElementById('titlePlaylist');
const playDescription = document.getElementById('playDescription');
const imgAlbum = document.getElementById('imgAlbum');
const album = document.getElementById('album');
const albumList = document.querySelector(".album-list-music");


menuMusic.addEventListener('click', agregarInfo)
contenedorListaMusic.addEventListener('click', reproducirMusica)
controles.addEventListener('click', controlar)


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
    } else if (e.target.classList.contains('playVideo')) {
        jsonUrl = 'assets/musicJSON/videos.json';
        titlePlay = 'música para hacer deportes';
        descripcion = 'Los mejores karaokes';
        srcImg = 'assets/img/karaoke.jpg';


        album.style.background = "linear-gradient(to right, rgba(2,2,2,0.726) 15%, rgba(8,8,8,0.829)), url(assets/img/karaoke.jpg)"

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
           <i class="far fa-play-circle play-music id="${music.id}"></i>
           <h3>${music.artista}</h3> 
           <h3 class="name" id="name">${music.nombre}</h3> 
           <h3 class="time">1.44 s</h3>
       </li>`

            contenedorListaMusic.innerHTML = html;
        })
    })

}

function reproducirMusica(e) {
    if (e.target.classList.contains('play-music')) {
        let urlM = e.target.parentElement.children[0].value;
        controles.innerHTML = `
        <a href="#" class="btn control atras">
        <i class="fas fa-backward"></i>
    </a>
    <audio src="${urlM}" style="width:50vw" controls autoplay><input type="text" style="display:none" value="${urlM}"></audio>
    <a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`
        e.target.classList.add('reaccion-activa-reproducida');
    }







}

function controlar(e) {


    let urlMusic = e.target.parentElement.parentElement.children[1].children[0]

    let url = urlMusic.value;

    let musicArray = Array.from(contenedorListaMusic.children);

    if (e.target.parentElement.classList.contains('siguiente')) {
        musicArray.forEach(liMusic => {
            if (liMusic.children[0].value === url) {
                let siguienteMusica = liMusic.nextElementSibling.children[0].value;

                let elementoParareproducido = liMusic.nextElementSibling.children[1];


                siguienteAtras(siguienteMusica, elementoParareproducido);
            }
        })
    } else if (e.target.classList.contains('atras')) {

        musicArray.forEach(liMusic => {
            if (liMusic.children[0].value === url) {
                let atrasMusica = liMusic.previousElementSibling.children[0].value;


                let elementoParareproducir = liMusic.previousElementSibling.children[1];

                siguienteAtras(atrasMusica, elementoParareproducir)

            }

        })


    }


}

function siguienteAtras(musica, reproducido) {
    controles.innerHTML = `
    <a href="#" class="btn control atras">
    <i class="fas fa-backward"></i>
</a>
<audio src="${musica}" style="width:50vw" controls autoplay><input type="text" style="display:none" value="${musica}"></audio>
<a href="#" class="btn control siguiente"><i class="fas fa-forward"></i></a>`

    reproducido.classList.add('reaccion-activa-reproducida')
}

const btnFiles = document.getElementById("files");

btnFiles.addEventListener('change', cargarArchivos)

function cargarArchivos(e) {
    const files = Array.from(e.target.files);

    files.forEach(f => {
        const reader = new FileReader();
        reader.onload = (function (archivo) {
            return function (evt) {
                const li = document.createElement('li');
                li.classList.add('music');
                li.innerHTML = `
        <input type="text" value="${evt.target.result}" style="display:none">
           <i class="far fa-play-circle play-music id=""></i>
           <h3>${archivo.name}</h3> 
           <h3 class="name" id="name">${archivo.name}</h3> 
           <h3 class="time">1.44 s</h3>
        `
                contenedorListaMusic.appendChild(li);
                console.log(evt.target.result);
            }

        })(f)
        reader.readAsDataURL(f)
    })

}





