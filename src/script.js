window.onload = () => {
    document.querySelectorAll('.card-cart').forEach(card => {
        const salePriceElement = card.querySelector('.price-onsale');
        const totalPriceElement = card.querySelector('.total-price');
        
        if (salePriceElement && totalPriceElement) {
            totalPriceElement.innerText = salePriceElement.innerText;
        }
    });
};

document.querySelectorAll('.increment').forEach(function(button) {
    button.addEventListener('click', function() {
        let quantityDisplay = this.parentElement.querySelector('.quantityDisplay');
        let quantity = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = quantity + 1;
        calculateTotal(this);
    });
});

document.querySelectorAll('.decrement').forEach(function(button) {
    button.addEventListener('click', function() {
        let quantityDisplay = this.parentElement.querySelector('.quantityDisplay');
        let quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 1) {
            quantityDisplay.textContent = quantity - 1;
        }
        calculateTotal(this);
    });
});

function calculateTotal(button) {
    let card = button.closest('.card-cart');
    let price = card.querySelector('.price-onsale').textContent.replace(/[^\d]/g, ''); // Remove non-numeric chars
    let quantity = parseInt(card.querySelector('.quantityDisplay').textContent);
    let total = price * quantity;
    
    card.querySelector('.total-price').textContent = total.toLocaleString() + " Đ";
}
