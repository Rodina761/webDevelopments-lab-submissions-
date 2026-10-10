let cartQuantity = 0;

function showQuantity() {
    document.getElementById('result').textContent = 'Cart quantity: ' + cartQuantity;
}

function addToCart() {
    cartQuantity = cartQuantity + 1;
    document.getElementById('result').textContent = 'Cart quantity: ' + cartQuantity;
}

function addTwo() {
    cartQuantity = cartQuantity + 2;
    document.getElementById('result').textContent = 'Cart quantity: ' + cartQuantity;
}

function addThree() {
    cartQuantity = cartQuantity + 3;
    document.getElementById('result').textContent = 'Cart quantity: ' + cartQuantity;
}

function resetCart() {
    cartQuantity = 0;
    document.getElementById('result').textContent = 'Cart quantity: ' + cartQuantity;
}
