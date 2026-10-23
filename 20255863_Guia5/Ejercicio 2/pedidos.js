let pedidos = [];

const formulario = document.querySelector("#idFormulario");
const inputProducto = document.querySelector("#idTxtProducto");
const inputPrecio = document.querySelector("#idTxtPrecio");
const inputCantidad = document.querySelector("#idTxtCantidad");
const inputPrecioMax = document.querySelector("#idTxtPrecioMax");

const contenedorTabla = document.querySelector("#idContenedorTabla");
const totalUnidadesText = document.querySelector("#idTotalUnidades");
const montoTotalText = document.querySelector("#idMontoTotal");

const btnFiltrar = document.querySelector("#idBtnFiltrar");
const btnMostrarTodos = document.querySelector("#idBtnMostrarTodos");
const btnLimpiar = document.querySelector("#idBtnLimpiar");

formulario.addEventListener("submit", agregarPedido);
btnFiltrar.addEventListener("click", filtrarPorPrecio);
btnMostrarTodos.addEventListener("click", mostrarTodosPedidos);
btnLimpiar.addEventListener("click", borrarTodo);

mostrarTabla(pedidos);

function agregarPedido(e) {
    e.preventDefault();

    let nombre = inputProducto.value;
    let precio = parseFloat(inputPrecio.value);
    let cantidad = parseInt(inputCantidad.value);

    if (nombre.trim() === "") {
        alert("Por favor ingrese un nombre de producto");
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        alert("El precio debe ser un número positivo mayor a 0");
        return;
    }

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("La cantidad debe ser un número entero mayor a 0");
        return;
    }

    let nuevoPedido = {
        producto: nombre,
        precio: precio,
        cantidad: cantidad
    };

    pedidos.push(nuevoPedido);

    formulario.reset();

    mostrarTabla(pedidos);
    calcularTotales(pedidos);
}

function mostrarTabla(lista) {
    if (lista.length === 0) {
        contenedorTabla.innerHTML = "<p>No hay pedidos guardados todavía.</p>";
        return;
    }

    let html = "<table>";
    html += "<thead>";
    html += "<tr>";
    html += "<th>Producto</th>";
    html += "<th>Precio unitario</th>";
    html += "<th>Cantidad</th>";
    html += "<th>Subtotal</th>";
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";

    let filas = lista.map(function(p) {
        let subtotal = p.precio * p.cantidad;
        return "<tr>" +
            "<td>" + p.producto + "</td>" +
            "<td>$" + p.precio.toFixed(2) + "</td>" +
            "<td>" + p.cantidad + "</td>" +
            "<td>$" + subtotal.toFixed(2) + "</td>" +
            "</tr>";
    });

    html += filas.join("");
    html += "</tbody></table>";

    contenedorTabla.innerHTML = html;
}

function calcularTotales(lista) {
    let sumaUnidades = lista.reduce(function(acum, p) {
        return acum + p.cantidad;
    }, 0);

    let sumaMonto = lista.reduce(function(acum, p) {
        return acum + (p.precio * p.cantidad);
    }, 0);

    totalUnidadesText.textContent = sumaUnidades;
    montoTotalText.textContent = "$" + sumaMonto.toFixed(2);
}

function filtrarPorPrecio() {
    let max = parseFloat(inputPrecioMax.value);

    if (isNaN(max) || max <= 0) {
        alert("Escriba un precio máximo válido");
        return;
    }

    let filtrados = pedidos.filter(function(p) {
        return p.precio <= max;
    });

    mostrarTabla(filtrados);
    calcularTotales(filtrados);
}

function mostrarTodosPedidos() {
    inputPrecioMax.value = "";
    mostrarTabla(pedidos);
    calcularTotales(pedidos);
}

function borrarTodo() {
    if (pedidos.length === 0) {
        alert("No hay nada que borrar");
        return;
    }

    let seguro = confirm("¿Está seguro de borrar todos los pedidos?");
    if (seguro) {
        pedidos = [];
        inputPrecioMax.value = "";
        mostrarTabla(pedidos);
        calcularTotales(pedidos);
    }
}