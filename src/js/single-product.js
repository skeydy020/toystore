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

// Thay doi hinh anh hien thi san pham
function changeImage(element) {
    // Get the image element inside the button
    var imgElement = element.querySelector('img');
    // Get the main image element
    var mainImage = document.getElementById('mainImage');
    // Update the main image source with the selected preview image source
    mainImage.src = imgElement.src;
}