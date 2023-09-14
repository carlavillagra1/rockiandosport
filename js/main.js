const btnBuscar = document.querySelector("#btnbuscar");
inputIngreso = document.querySelector("#ingreso");
const contenedor = document.querySelector("#contenedor");
const botonCarrito = document.querySelector("#btnCarrito")
const botonCerrar = document.querySelector("#btn-close")

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

const carrito=[]

// CARRITO GLOBAL

function agregarAlcarrito(id) {
    const productoEncontrado = productos.find(prod => prod.id === parseInt(id));
    const carritoItem = carrito.find(item => item.producto.id === productoEncontrado.id);

    if (carritoItem) {
        carritoItem.cantidad++; // Incrementa la cantidad si el producto ya está en el carrito
        console.log(carritoItem)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        // VUELVO A ALMACENAR LA NUEVA CANTIDAD EN "CARRITO"

    } else {
        carrito.push({ producto: productoEncontrado, cantidad: 1 }); // Agrégalo como un nuevo ítem con cantidad 1
        localStorage.setItem('carrito', JSON.stringify(carrito))
        // ALMACENO EN STORAGE EL NUEVO OBJETO AGREGADO
    }
    mostrarCarrito()
}

const contenedorCarrito = document.querySelector("#contenedor-carrito");

function mostrarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'))
    //  TRAIGO LOS PRODUCTOS ALMACENADOS DEL STORAGE, PARSEADOS, COMO ES UN ARRAY, LO RECORRO PARA
    // MOSTRAR EN EL CARRITO.
    console.log(carritoGuardado)

    const buttonClose = document.createElement("button");
    buttonClose.textContent = "X";
    buttonClose.classList.add("button-close");
    contenedorCarrito.classList.remove("hide");
    contenedorCarrito.innerHTML = "<h1> Carrito de compras </h1> ";
    contenedorCarrito.appendChild(buttonClose);
    buttonClose.addEventListener("click", () => {
        contenedorCarrito.classList.add("hide");
    });
    const mostrartotal = document.createElement("h2");
    mostrartotal.textContent = `Total de la compra: ${carritoGuardado.reduce((total, item) => total + item.cantidad * item.producto.precio, 0)}`;
    mostrartotal.classList.add("totalCarrito");
    contenedorCarrito.appendChild(mostrartotal);
    carritoGuardado.forEach((item) => {
        const cajacarrito = document.createElement("div");
        cajacarrito.innerHTML = `
            <p>Producto: ${item.producto.nombre}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Precio : $${item.producto.precio}</p>
            <p> Total: $${item.producto.precio * item.cantidad}</p>
            <p onclick="removerDelCarrito(${item.id})" class="borrar"> X </p>
            
        `;

        contenedorCarrito.appendChild(cajacarrito);
    });

}
/* Boton ver carrito*/
botonCarrito.addEventListener("click", (e) => {
    mostrarCarrito();

})

/* Eliminar producto del carrito*/
function removerDelCarrito(id) {
    const prodEliminado = carrito.find((producto) => producto.id);
    const posicion = carrito.indexOf(prodEliminado);
    //  BUSCO LA POSICIÓN EN EL ARRAY DEL OBJETO A ELIMINAR 
    carrito.splice(posicion, 1);
    //  LO ELIMINO CON SPLICE  Y LUEGO VUELVO A LLAMAR A LA FUNCIÓN QUE MUESTRA LOS
    console.log(carrito)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    // VUELVO A GUARDAR LOS DATOS EN EL STORAGE, LOS QUE QUEDAN EN EL ARRAY
    localStorage.removeItem(prodEliminado)
    mostrarCarrito()

}
