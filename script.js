document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-theme', savedTheme === 'dark');
        themeToggleButton.textContent = savedTheme === 'dark' ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro';
    }

    themeToggleButton.addEventListener('click', () => {
        const isDarkTheme = body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        themeToggleButton.textContent = isDarkTheme ? 'Alternar para Tema Claro' : 'Alternar para Tema Escuro';
    });

    renderProducts();

    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
        } else {
            alert('Pedido realizado com sucesso!');
            cart = [];
            renderCart();
        }
    });
});

let products = [
    {id: 1, name: 'Curso 1', price: 10.99, image: 'img/product1.jpeg'},
    {id: 2, name: 'Curso 2', price: 20.99, image: 'img/product2.jpeg'},
    {id: 3, name: 'Curso 3', price: 30.99, image: 'img/product3.jpeg'},
    {id: 4, name: 'Curso 4', price: 40.99, image: 'img/product4.jpeg'},
    {id: 5, name: 'Curso 5', price: 50.99, image: 'img/product5.jpeg'},
    {id: 6, name: 'Curso 6', price: 60.99, image: 'img/product6.jpeg'},
    {id: 7, name: 'Curso 7', price: 70.99, image: 'img/product7.jpeg'},
    {id: 8, name: 'Curso 8', price: 80.99, image: 'img/product8.jpeg'},
    {id: 9, name: 'Curso 9', price: 90.99, image: 'img/product9.jpeg'},
];

let cart = [];

function renderProducts() {
    let carrosselItems = document.querySelector('.carrossel-items');
    carrosselItems.innerHTML = '';

    products.forEach((product) => {
        let productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button>Adicionar ao carrinho</button>
        `;
        productDiv.querySelector('button').addEventListener('click', () => addToCart(product.id));
        carrosselItems.appendChild(productDiv);
    });

    updateCarrossel();
}

function addToCart(productId) {
    let product = products.find((product) => product.id === productId);
    cart.push(product);
    renderCart();
}

function renderCart() {
    let cartTable = document.querySelector('.cart table tbody');
    cartTable.innerHTML = ''; 

    cart.forEach((product) => {
        let cartRow = document.createElement('tr');  
        cartRow.innerHTML = `
            <td>${product.name}</td>  
            <td>R$ ${product.price.toFixed(2)}</td>  
        `;
        cartTable.appendChild(cartRow);  
    });

    updateTotal(); 
}

function updateTotal() {
    const total = cart.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
}

function updateCarrossel() {
    const carrosselItems = document.querySelector('.carrossel-items');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentIndex = 0;
    const itemsPerPage = 3;
    const itemWidth = carrosselItems.querySelector('.product')?.offsetWidth || 0;

    const updateCarrosselPosition = () => {
        carrosselItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    };

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarrosselPosition();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < Math.ceil(products.length / itemsPerPage) - 1) {
            currentIndex++;
            updateCarrosselPosition();
        }
    });

    updateCarrosselPosition();
}
