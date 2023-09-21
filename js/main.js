
const btnBuscar = document.querySelector("#btnbuscar");
inputIngreso = document.querySelector("#ingreso");
const contenedor = document.querySelector("#contenedor");
const botonCarrito = document.querySelector("#btnCarrito");
const botonCerrar = document.querySelector("#btn-close");



const url = "../data/productos.json";
fetch(url)
.then(res => res.json())
.then(data=>{
    mostrarProductos(data)

})


const mostrarProductos = (data) => {
    data.forEach(({ id, img, nombre, talle, precio }) => {
        const cajas = document.createElement("div");
        cajas.innerHTML = `<div class="hijo">
        <img src="../img/${img}" alt="${nombre}">
        <h2>${nombre}</h2>
        <h2>Talle: ${talle}</h2>
            <p>Precio: $${precio}</p>
            <div class="botonComprar">
                <button id='${id}'  class="btncomprar">Agregar al carrito</button>
            </div>
        </div>`;
        contenedor.appendChild(cajas);
    });

    const btnComprar = document.querySelectorAll('.btncomprar');
    btnComprar.forEach(el => {
        el.addEventListener('click', (e) => {
            Toastify({
                text: "Producto agregado al carrito",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #3d432d, #daca4a)",
                },
                onClick: function () { } // Callback after click
            }).showToast();
            agregarAlcarrito(data,e.target.id);

        })
    })
    //boton buscar producto
btnBuscar.addEventListener("click", (e) => {
    const filtrados = filtrarProducto(data, inputIngreso.value);
    crearHtml(data,filtrados);


});

}



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
//muestra los productos filtrados
function crearHtml(data,arr) {
    contenedor.innerHTML = "";
    let html;
    for (const { id, img, nombre, talle, precio } of arr) {
        html = `<div class="hijo">
                <img src=" ../img/${img}" alt="${nombre}">
                <h2>${nombre}</h2>
                <h2>Talle: ${talle}</h2>
                    <p>Precio: $${precio} </p>
                    <div class="botonComprar">
                        <button class="btncomprar" id="${id}">Agregar al carrito</button>
                    </div>
                </div>`;
        //se la agrego al contenedor
        //contenedor.innerHTML = contenedor.innerHTML + html;
        contenedor.innerHTML += html;
        const btnComprar = document.querySelectorAll('.btncomprar');
        btnComprar.forEach(el => {
            el.addEventListener('click', (e) => {
                Toastify({
                    text: "Producto agregado al carrito",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #3d432d, #daca4a)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
                agregarAlcarrito(data,e.target.id);

            })
        })


    }
    
}



const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//  CARRITO GLOBAL

function agregarAlcarrito(productos, id) {
    const productoEncontrado = productos.find(prod => prod.id === parseInt(id));
    const carritoItem = carrito.find(item => item.producto.id === productoEncontrado.id);

    if (carritoItem) {
        carritoItem.cantidad++; // Incrementa la cantidad si el producto ya está en el carrito
        localStorage.setItem('carrito', JSON.stringify(carrito))
        // VUELVO A ALMACENAR LA NUEVA CANTIDAD EN "CARRITO"
        mostrarCarrito()

    } else {
        carrito.push({ producto: productoEncontrado, cantidad: 1 }); // Agrégalo como un nuevo ítem con cantidad 1
        localStorage.setItem('carrito', JSON.stringify(carrito))
        //  ALMACENO EN STORAGE EL NUEVO OBJETO AGREGADO
        mostrarCarrito()
    }
}
const contenedorCarrito = document.querySelector("#contenedor-carrito");

function mostrarCarrito() {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    // TRAIGO LOS PRODUCTOS ALMACENADOS DEL STORAGE, PARSEADOS, COMO ES UN ARRAY, LO RECORRO PARA
    // MOSTRAR EN EL CARRITO
    const buttonClose = document.createElement("button");
    buttonClose.innerHTML = `<img src ="../img/marca-x.png " alt="boton borrar"> `
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
    const buttonVaciar = document.createElement("button");
    buttonVaciar.textContent = "Vaciar carrito";
    buttonVaciar.classList.add("button-vaciar");
    contenedorCarrito.classList.add("vaciarCarrito");
    contenedorCarrito.appendChild(buttonVaciar);
    buttonVaciar.addEventListener("click", () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Seguro que quieres vaciar el carrito?',
            text: "Tendras que volver a empezar con tu compra!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, quiero borrar todo!',
            cancelButtonText: 'No, cancelar!',
            customClass: {
                popup: 'my-sweetalert',
            },
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: 'Carrito vacio!',
                    text: 'Elige los productos que deseas.',
                    customClass: {
                        popup: 'my-sweetalert',
                    },


                })
                localStorage.clear();
                carrito.length = 0;
                mostrarCarrito()
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel

            ) {
                swalWithBootstrapButtons.fire({
                        title: 'Cancelado!',
                        text: 'Se cancelo el proceso de vaciar carrito',
                        customClass: {
                            popup: 'my-sweetalert',
                        },
    
    
                    })
            }

        })

    });
    carritoGuardado.forEach(({ producto, cantidad}) => {
        const cajacarrito = document.createElement("div");
        cajacarrito.innerHTML = `
            <p>Producto: ${producto.nombre}</p>
            <p>Cantidad: ${cantidad}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Total: $${producto.precio * cantidad}</p>
            <p onclick="removerDelCarrito(${producto.id})" class="borrar">
                <button><img src="../img/borrar.png" alt="botón borrar"></button>
            </p>
        `;

        contenedorCarrito.appendChild(cajacarrito);

    });

    const totalCarrito = carritoGuardado.reduce((total, item) => total + item.cantidad * item.producto.precio, 0);

    const buttonFinalizar = document.createElement("button");
    buttonFinalizar.textContent = "Finalizar compra";
    buttonFinalizar.classList.add("button-finalizar");
    contenedorCarrito.classList.add("finalizarCompra");
    contenedorCarrito.appendChild(buttonFinalizar);
    buttonFinalizar.addEventListener("click", () => {
        Swal.fire({
            title: 'Gracias por tu compra!',
            text: ` El total de la compra es: $${totalCarrito} `,
            imageUrl: '../img/logo.jpg',
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: 'Custom image',
            customClass: {
                popup: 'my-sweetalert',
            },
        })
        localStorage.clear();
        carrito.length = 0;
        mostrarCarrito()

    })
    if (carrito.length === 0) {
        buttonVaciar.classList.add("noMostrar")
        buttonFinalizar.classList.add("noMostrar")

    }
}


/* Boton ver carrito*/
botonCarrito.addEventListener("click", (e) => {
    mostrarCarrito();

})

/* Eliminar producto del carrito*/
function removerDelCarrito(id) {
    const prodEliminado = carrito.find((producto) => producto.producto.id === id);
    if( prodEliminado.cantidad === 1){
    const posicion = carrito.indexOf(prodEliminado);
    //  BUSCO LA POSICIÓN EN EL ARRAY DEL OBJETO A ELIMINAR 
    carrito.splice(posicion, 1);
    //  LO ELIMINO CON SPLICE  Y LUEGO VUELVO A LLAMAR A LA FUNCIÓN QUE MUESTRA LOS
    } else{
        prodEliminado.cantidad --;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    // VUELVO A GUARDAR LOS DATOS EN EL STORAGE, LOS QUE QUEDAN EN EL ARRAY
    localStorage.removeItem(prodEliminado);
    mostrarCarrito()

}

