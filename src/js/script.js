window.onload = () => {
    document.querySelectorAll('.card-cart').forEach(card => {
        const salePriceElement = card.querySelector('.price-onsale');
        const totalPriceElement = card.querySelector('.total-price');

        if (salePriceElement && totalPriceElement) {
            totalPriceElement.innerText = salePriceElement.innerText;
        }
    });
};
// Ham + - so luong san pham
document.querySelectorAll('.increment').forEach(function (button) {
    button.addEventListener('click', function () {
        let quantityDisplay = this.parentElement.querySelector('.quantityDisplay');
        let quantity = parseInt(quantityDisplay.textContent);
        quantityDisplay.textContent = quantity + 1;
        calculateTotal(this);
    });
});

document.querySelectorAll('.decrement').forEach(function (button) {
    button.addEventListener('click', function () {
        let quantityDisplay = this.parentElement.querySelector('.quantityDisplay');
        let quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 1) {
            quantityDisplay.textContent = quantity - 1;
        }
        calculateTotal(this);
    });
});
// Ham tinh tien
function calculateTotal(button) {
    let card = button.closest('.card-cart');
    let price = card.querySelector('.price-onsale').textContent.replace(/[^\d]/g, ''); // Remove non-numeric chars
    let quantity = parseInt(card.querySelector('.quantityDisplay').textContent);
    let total = price * quantity;

    card.querySelector('.total-price').textContent = total.toLocaleString() + " Đ";
}
// Thay doi hinh anh hien thi san pham
function changeImage(element) {
    // Get the image element inside the button
    var imgElement = element.querySelector('img');
    // Get the main image element
    var mainImage = document.getElementById('mainImage');
    // Update the main image source with the selected preview image source
    mainImage.src = imgElement.src;
}
// Magnify anh san pham
window.onload = function () {
    const magnifier = document.getElementById('magnifier');
    const img = document.getElementById('mainImage');

    img.addEventListener('mousemove', function (event) {
        magnifier.style.display = "block";

        let pos = getCursorPos(event);
        let x = pos.x;
        let y = pos.y;

        // Move magnifier
        magnifier.style.left = x - magnifier.offsetWidth / 2 + 'px';
        magnifier.style.top = y - magnifier.offsetHeight / 2 + 'px';

        // Set the zoomed background of the magnifier
        magnifier.style.backgroundImage = `url(${img.src})`;

        let imgWidth = img.offsetWidth;
        let imgHeight = img.offsetHeight;

        // Increase the size of the background for the zoom effect
        magnifier.style.backgroundSize = `${imgWidth * 2}px ${imgHeight * 2}px`;

        // Adjust the position of the zoomed background
        magnifier.style.backgroundPosition = `-${x * 2 - magnifier.offsetWidth / 2}px -${y * 2 - magnifier.offsetHeight / 2}px`;
    });

    img.addEventListener('mouseleave', function () {
        magnifier.style.display = "none";
    });

    // Function to get the cursor position relative to the image
    function getCursorPos(event) {
        let rect = img.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        return { x: x, y: y };
    }
}
