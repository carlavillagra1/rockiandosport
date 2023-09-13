const btnBuscar = document.querySelector("#btnbuscar");
inputIngreso = document.querySelector("#ingreso");
const contenedor = document.querySelector("#contenedor");
const botonCarrito = document.querySelector("#btnCarrito")
const botonCerrar = document.querySelector("#btn-close")
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
        // Convertir tanto el nombre del producto como el filtro a minúsculas antes de comparar
        return el.nombre.toLowerCase().includes(filtro.toLowerCase());
    });
    return encontrado;
}
function filtrarProducto(arr, filtro) {
    const filtrado = arr.filter((el) => {
        return el.nombre.toLowerCase().includes(filtro.toLowerCase());
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
    localStorage.setItem("carrito", JSON.stringify(carrito));


}
const contenedorCarrito = document.querySelector("#contenedor-carrito");

function mostrarCarrito() {
	const buttonClose = document.createElement("button");
	buttonClose.textContent = "X";
	buttonClose.classList.add("button-close");
	contenedorCarrito.classList.remove("hide");
	contenedorCarrito.innerHTML = "<h1> Carrito de compras </h1> ";
	contenedorCarrito.appendChild(buttonClose);
	buttonClose.addEventListener("click", () => {
		contenedorCarrito.classList.add("hide");
	});
    const mostrartotal= document.createElement("h2");
    mostrartotal.textContent= `Total de la compra: ${carrito.reduce((total, item) => total + item.cantidad * item.producto.precio, 0)}`;
    mostrartotal.classList.add("totalCarrito");
    contenedorCarrito.appendChild(mostrartotal);
	carrito.forEach((item) => {
		const cajacarrito = document.createElement("div");
		cajacarrito.innerHTML = `
            <p>Producto: ${item.producto.nombre}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Precio : $${item.producto.precio}</p>
            <p> Total: $${item.producto.precio * item.cantidad}</p>
            <p><span class="borrar-prod" data-id="${removerDelCarrito}"> X </span></p>
            
        `;

		contenedorCarrito.appendChild(cajacarrito);
	});
    
}



botonCarrito.addEventListener("click", (e) => {
    return mostrarCarrito();

})


function removerDelCarrito(id){
    const prodEliminado = carrito.find((producto) => producto.id === id) ;
    carrito = carrito.filter((prodId) =>{
        return prodId != prodEliminado;
    })
    const posicion = carrito.indexOf(prodEliminado);
    const borrado = carrito.splice(posicion,1);
}
