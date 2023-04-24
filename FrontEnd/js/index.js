const formAgregarProducto = document.getElementById("agregarProducto");
const formPublicarMensaje = document.getElementById("formPublicarMensaje");
const socket = io.connect();

//------------------------------------------------------------------------------------
/*
formAgregarProducto.addEventListener("submit", (e) => {
    e.preventDefault();

    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value,
        description: formAgregarProducto[3].value,
        code: formAgregarProducto[4].value,
        stock: formAgregarProducto[5].value,
    };

    const productJSON = JSON.stringify(producto);

    fetch("http://localhost:8080/api/productos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: productJSON,
    });

    socket.emit("update", producto);
    formAgregarProducto.reset();
});
*/
socket.on("productos", (productos) => {
    makeHtmlTable(productos).then((html) => {
        document.getElementById("productos").innerHTML = html;
    });
});

function makeHtmlTable(productos) {
    return fetch("./views/lista.hbs")
        .then((respuesta) => respuesta.text())
        .then((plantilla) => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos });
            return html;
        });
}

//-------------------------------------------------------------------------------------

const inputEmail = document.getElementById("inputEmail");
const inputName = document.getElementById("inputName");
const inputLastName = document.getElementById("inputLastName");
const inputAge = document.getElementById("inputAge");
const inputAlias = document.getElementById("inputAlias");
const inputAvatar = document.getElementById("inputAvatar");

const inputMensaje = document.getElementById("inputMensaje");
const btnEnviar = document.getElementById("btnEnviar");

formPublicarMensaje.addEventListener("submit", (e) => {
    e.preventDefault();

    const mensaje = {
        author: {
            email: inputEmail.value,
            name: inputName.value,
            surname: inputLastName.value,
            age: inputAge.value,
            nickname: inputAlias.value,
            avatar: inputAvatar.value,
        },
        text: inputMensaje.value,
    };


    socket.emit("nuevoMensaje", mensaje);
    //   formPublicarMensaje.reset();
    inputMensaje.focus();
});

socket.on("mensajes", (mensajes) => {

    const html = makeHtmlList(mensajes);
    document.getElementById("mensajes").innerHTML = html;

});

function makeHtmlList(mensajes) {
    return mensajes.mensajes.map((mensaje) => {
        return `
            <div>
                <b style="color:blue;">${mensaje.author.name}</b>
                [<span style="color:brown;">${mensaje.date}</span>] :
                <i style="color:green;">${mensaje.text}</i>
            </div>
        `;
    })
        .join(" ");
}
