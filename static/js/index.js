// Script de control del cliente

getProducts()

function getProducts() {
    // window.location = '/productos'
    console.log('obteniendo productos')
    fetch('http://localhost:8080/api/productos/')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const targetDOM = document.getElementById('contenedorProductos')
            targetDOM.innerHTML = ''
            for (el of data.payload) {
                const newElement = document.createElement('tr')
                newElement.innerHTML = `
                <th scope="row">${el._id}</th>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.category}</td>
                <td>${el.price}</td>
                <td>${el.stock}</td>
                `
                targetDOM.appendChild(newElement)
            }

            const opcionesPaginacion = {
                totalPages: data.totalPages,
                hasNextPage: data.hasNextPage,
                hasPrevPage: data.hasPrevPage,
                nextPage: data.nextPage,
                prevPage: data.prevPage,
                prevLink: data.prevLink,
                nextLink: data.nextLink
            }

            navSetup(opcionesPaginacion)
        })
}

function navSetup(opcionesPaginacion) {
    const { totalPages, hasNextPage, hasPrevPage, nextPage, prevPage, prevLink, nextLink } = opcionesPaginacion
    const targetDOM = document.getElementById('navBar')
    targetDOM.innerHTML = ''
    let contentDOM
    // PrevPage
    const prevPageDisabled = (hasPrevPage) ? '' : 'disabled'
    const nextPageDisabled = (hasNextPage) ? '' : 'disabled'
    contentDOM = `<li class="page-item ${prevPageDisabled}">
                 <a class="page-link" href='#'>Anterior</a>
                 </li>
                 `
    targetDOM.innerHTML += contentDOM

    for (i = 1; i <= totalPages; i++) {
        contentDOM = `
        <li class="page-item"> <a class="page-link" href="#">${i}</a></li >
        `
        targetDOM.innerHTML += contentDOM
    }

    contentDOM = `<li class="page-item ${nextPageDisabled}">
    <a class="page-link" href='#'>Siguiente</a>
    </li>
    `
    targetDOM.innerHTML += contentDOM

}
