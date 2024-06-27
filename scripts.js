const list = document.querySelector('ul');
const buttonShowAll = document.querySelector('.show-all');
const buttonMapAll = document.querySelector('.map-all');
const sumAll = document.querySelector('.sum-all');
const filterAll = document.querySelector('.filter-all');
const cart = [];
let currentDisplay = menuOptions;

function showAll(productsArray) {
    currentDisplay = productsArray;
    let myLi = '';

    productsArray.forEach((product, index) => {
        myLi += `
            <li>
                <img src=${product.src}>
                <p>${product.name}</p>
                <p class="item-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-index=${index}>Adicionar ao Carrinho</button>
            </li>`;
    });

    list.innerHTML = myLi;
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const index = event.target.getAttribute('data-index');
    const existingItem = cart.find(item => item.name === currentDisplay[index].name);

    if (existingItem) {
        // Se o produto já está no carrinho, aumente a quantidade
        existingItem.quantity += 1;
    } else {
        // Caso contrário, adicione o produto com quantidade 1
        cart.push({ ...currentDisplay[index], quantity: 1 });
    }

    displayCart(); // Atualize a exibição do carrinho
}

function displayCart() {
    let cartItems = '';
    cart.forEach((item, index) => {
        cartItems += `
            <li>
                <img src=${item.src} style="width:50px; height:50px;">
                <p>${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)} (Quantidade: ${item.quantity})</p>
            </li>`;
    });
    list.innerHTML = cartItems;
}

function mapAllItems() {
    const newPrices = menuOptions.map((product) => ({
        ...product,
        price: product.price * 0.9, // dar 10% de desconto
    }));

    showAll(newPrices);
}

function filterAllItens() {
    const filterJustVegan = menuOptions.filter((product) => product.vegan);

    showAll(filterJustVegan);
}



sumAll.addEventListener('click', displayCart);
buttonShowAll.addEventListener('click', () => showAll(menuOptions));
buttonMapAll.addEventListener('click', mapAllItems);
filterAll.addEventListener('click', filterAllItens);
