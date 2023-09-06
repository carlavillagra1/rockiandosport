const btnBuscar = document.querySelector("#btnbuscar");
inputIngreso = document.querySelector("#ingreso");
const contenedor = document.querySelector("#contenedor");
console.log(productos);


const mostrarProductos = (data) => {
    data.forEach(producto => {
        const cajas = document.createElement("div");
        cajas.innerHTML = `<div class="hijo">
        <img src=" ../img/${producto?.img}" alt="${producto?.nombre}">
        <h2>${producto?.nombre}</h2>
        <h2>Talle: ${producto?.talle}</h2>
            <p>Precio: $${producto?.precio} </p>
            <div class="botonComprar">
                <button id='${producto.id}'  class="btncomprar">Agregar al carrito</button>
            </div>
        </div>`;
        contenedor.appendChild(cajas);

    });
    const btnComprar = document.querySelectorAll('.btncomprar');
    btnComprar.forEach(el => {
        el.addEventListener('click', (e) => {
            agregarAlcarrito(e.target.id);
        })
    })

}
mostrarProductos(productos);


//Funciones de búsqueda
function buscarProductos(arr, filtro) {
    const encontrado = arr.find((el) => {
        return el.nombre.includes(filtro);
    });
    return encontrado;
}
function filtrarProducto(arr, filtro) {
    const filtrado = arr.filter((el) => {
        return el.nombre.includes(filtro);
    });
    return filtrado;
}

function crearHtml(arr) {
    contenedor.innerHTML = "";
    let html;
    for (const el of arr) {
        html = `<div class="hijo">
                <img src=" ../img/${el.img}" alt="${el.nombre}">
                <h2>${el.nombre}</h2>
                <h2>Talle: ${el.talle}</h2>
                    <p>Precio: $${el.precio} </p>
                    <div class="botonComprar">
                        <button class="btncomprar" id="${el.id}">Agregar al carrito</button>
                    </div>
                </div>`;
        //se la agrego al contenedor
        //contenedor.innerHTML = contenedor.innerHTML + html;
        contenedor.innerHTML += html;
    }
}

btnBuscar.addEventListener("click", (e) => {
    const filtrados = filtrarProducto(productos, inputIngreso.value);
    crearHtml(filtrados);
});


const carrito = [];


function agregarAlcarrito(id) {
    const productoEncontrado = productos.find(prod => prod.id === parseInt(id));
    const carritoItem = carrito.find(item => item.producto.id === productoEncontrado.id);

    if (carritoItem) {
        carritoItem.cantidad++; // Incrementa la cantidad si el producto ya está en el carrito
    } else {
        carrito.push({ producto: productoEncontrado, cantidad: 1 }); // Agrégalo como un nuevo ítem con cantidad 1
    }

    mostrarCarrito();
}

function mostrarCarrito (){
    const contenedorCarrito = document.querySelector("#contenedor-carrito");
    contenedorCarrito.innerHTML ="";
    carrito.forEach(item => {
        const cajacarrito = document.createElement("div");
        cajacarrito.innerHTML = `
            <p>Producto: ${item.producto.nombre}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Precio Unitario: $${item.producto.precio}</p>
            <p>Total: $${item.producto.precio * item.cantidad}</p>
        `;
        contenedorCarrito.appendChild(cajacarrito);
    });
    }




















/*
function agregarAlcarrito(id) {

const existe = carrito.some(prod => prod.id === parseInt(id));
if (existe) {
        carrito.map(prod => prod.cantidad ++)
}
else{
    let productoEncontrado = productos.find(prod => prod.id === parseInt(id));
    carrito.push(productoEncontrado);

}
console.log(carrito);
}*/