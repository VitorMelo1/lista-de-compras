

let listaDeItens = []

const form = document.getElementById("form-itens")
const itensInput = document.getElementById("receber-item")
const UlItens = document.getElementById("lista-de-itens")
const ulItensComprados = document.getElementById("itens-comprados")

form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    salvarItem();
    mostrarItem();
    itensInput.focus()
})

function salvarItem() {
    const comprasItem = itensInput.value.trim();
    if (!comprasItem) {
        alert("Por favor, insira um item.");
        return;
    }

    const checarDuplicado = listaDeItens.some((elemento) => elemento.valor.toUpperCase() === comprasItem.toUpperCase());
    if (checarDuplicado) {
        alert("O item: " + comprasItem + " já existe");
    } else {
        listaDeItens.push({
            valor: comprasItem,
            checar: false
        });
    }

    itensInput.value=''
}

function mostrarItem() {
    UlItens.innerHTML = '';
    ulItensComprados.innerHTML =''
    listaDeItens.forEach((elemento, index) => {
        if (elemento.checar) {
            ulItensComprados.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />  
                <span class="itens-comprados is-size-5">${elemento.valor}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>
    `
        } else {
            UlItens.innerHTML += `  
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${elemento.valor}"></input>
        </div>
        <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
    </li>`;
        }
    });

    const inputCheck = document.querySelectorAll('input[type="checkbox"]');
    inputCheck.forEach(i => {
        i.addEventListener("click", (evento) => {
            const valorDoElemento = evento.target.parentElement.parentElement.getAttribute('data-value');
            listaDeItens[valorDoElemento].checar = evento.target.checked;
            mostrarItem()
        });
    });
}

