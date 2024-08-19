import { Leon, Lobo, Oso, Serpiente, Aguila } from "./animales.js";

// Obtiene el botón para registrar un nuevo animal y define la URL del archivo JSON con datos de animales
let boton = document.getElementById("btnRegistrar");
var Url = "../../animales.json"

// Función para mostrar una vista previa de la imagen del animal seleccionado
const mostrarPreview = async () => {
    let selectanimal = document.getElementById("animal").value;
    let imgpreview = document.getElementById("imgpreview");
    let urlImagen = await obtenerImg(selectanimal);
    imgpreview.src = urlImagen;
};

// Función para obtener la URL de la imagen del animal desde el archivo JSON
const obtenerImg = async (filtrar) => {
    let respuesta = await fetch(Url);
    let datos = await respuesta.json();
    // Busca la imagen del animal cuyo nombre coincide con el valor de `filtrar`
    const imagen = datos.animales.find(animalData => animalData.name === filtrar)?.imagen;
    return imagen || null;
}

// Función para obtener la URL del sonido del animal desde el archivo JSON
const obtenerSonido = async (filtrar) => {
    let respuesta = await fetch(Url);
    let datos = await respuesta.json();
    const sonidoAnimal = datos.animales.find(animalData => animalData.name === filtrar)?.sonido;
    return sonidoAnimal || null;
}

// Función para agregar un nuevo animal y mostrarlo en la interfaz
const agregar = async () => {
    try {
        // Obtiene los valores de los inputs del formulario
        let nombre = document.getElementById("animal").value;
        let edad = document.getElementById("edad").value;
        let imagen = await obtenerImg(nombre);
        let comentarios = document.getElementById("comentarios").value;
        let sonido = await obtenerSonido(nombre);
        
        // Valida los campos del formulario y muestra alertas si están vacíos o inválidos
        if (nombre == "null") { alert("Debe ingresar un animal"); return; }
        if (edad == "null") { alert("Debe ingresar la edad del animal"); return; }
        if (comentarios == "") { alert("Debe ingresar un comentario"); return; }

        // Crea una instancia del objeto animal correspondiente según el nombre del animal
        switch (nombre) {
            case 'Leon':
                let leon = new Leon(nombre, edad, imagen, comentarios, sonido);
                mostrarAnimal(leon);
                break;
            case 'Lobo':
                let lobo = new Lobo(nombre, edad, imagen, comentarios, sonido);
                mostrarAnimal(lobo);
                break;
            case 'Oso':
                let oso = new Oso(nombre, edad, imagen, comentarios, sonido);
                mostrarAnimal(oso);
                break;
            case 'Serpiente':
                let serpiente = new Serpiente(nombre, edad, imagen, comentarios, sonido);
                mostrarAnimal(serpiente);
                break;
            case 'Aguila':
                let aguila = new Aguila(nombre, edad, imagen, comentarios, sonido);
                mostrarAnimal(aguila);
                break;
            default:
                break;
        }

        // Limpia los campos del formulario después de agregar el animal
        limpiar.show();

    } catch (error) {
        // Maneja errores y los muestra en la consola
        console.log(error);
    }
};

// Función para mostrar la información del animal en la interfaz
const mostrarAnimal = (animal) => {
    const contenedor = document.getElementById('Animales');
    const divAnimal = document.createElement('div');
    divAnimal.classList = "mb-2 mx-3";
    divAnimal.style.width = "170px";
    divAnimal.innerHTML = `
        <img id="imagen" src="${animal.Img}" class="card-img-top" alt="${animal.Nombre}" data-bs-toggle="modal" data-bs-target="#exampleModal" id="toggleInfo">
        <div class="card-body text-center bg-light p-0">
            <button id="btnSonido" class="btn btn-secondary w-100 rounded-0"><i class="fa-solid fa-volume-high fs-4"></i></button>
        </div>
    `;
    contenedor.appendChild(divAnimal);

    // Agrega un evento click al botón de sonido para reproducir el sonido del animal
    divAnimal.querySelector('#btnSonido').addEventListener('click', () => {
        reproducir(animal.Sonido);
    });

    // Agrega un evento click a la imagen para mostrar el modal con la información del animal
    document.querySelector("#imagen").addEventListener("click", () => {
        modal(animal);
    });
};

// Función para reproducir el sonido del animal
let reproducir = (animal) => {
    const audio = document.getElementById('player');
    audio.src = animal;
    audio.play();
}

// Función para actualizar y mostrar el contenido del modal con la información del animal
let modal = (mostrar) => {
        let modal = document.querySelector("#exampleModal .modal-body");
        let modalData = document.createElement('div');
        modalData.innerHTML = `
                <img id="imagen" src="${mostrar.Img}" class="card-img-top" alt="${mostrar.Nombre}">
                <p>${mostrar.Edad}<br>Comentarios</p>
                <span>${mostrar.Comentarios}</span>
            `;
        modal.replaceChildren(modalData);
        
}

// Función IIFE para limpiar los campos del formulario
let limpiar = (() => {
    return {
        show: () => {
            document.getElementById("animal").value = "null";
            document.getElementById("edad").value = "null";
            document.getElementById("comentarios").value = "";
            document.getElementById("imgpreview").src = "";
        }
    }
})()

// Añade un evento click al botón para agregar un nuevo animal
boton.addEventListener("click", agregar);

// Añade un evento change al elemento de selección de animal para mostrar la vista previa de la imagen
document.getElementById('animal').addEventListener('change', mostrarPreview);