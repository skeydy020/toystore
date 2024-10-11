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


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$('.side-bar-item');
const panes = $$('.box-content');

tabs.forEach((tab, index) => {
    const pane = panes[index];
    
    tab.onclick = function(){
        $('.side-bar-item.active').classList.remove('active');
        $('.box-content.active').classList.remove('active');

        this.classList.add('active');
        pane.classList.add('active');
    }
});

// get location data
var cities = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");

var parameter = {
  url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
  method: "GET",
  responseType: "application/json"
};

// Use axios to fetch data
axios(parameter)
  .then(function (response) {
    renderCity(response.data);
  })
  .catch(function (error) {
    console.error("Error fetching data:", error);
  });

function renderCity(data) {
  // Populate the city dropdown
  data.forEach(function (city) {
    cities.options[cities.options.length] = new Option(city.Name, city.Id);
  });

  // Handle city change event
  cities.onchange = function () {
    districts.length = 1;  // Reset districts dropdown
    wards.length = 1;      // Reset wards dropdown

    if (this.value !== "") {
      const selectedCity = data.find(city => city.Id === this.value);
      if (selectedCity) {
        // Populate the districts dropdown
        selectedCity.Districts.forEach(function (district) {
          districts.options[districts.options.length] = new Option(district.Name, district.Id);
        });
      }
    }
  };

  // Handle district change event
  districts.onchange = function () {
    wards.length = 1;  // Reset wards dropdown

    const selectedCity = data.find(city => city.Id === cities.value);
    if (selectedCity && this.value !== "") {
      const selectedDistrict = selectedCity.Districts.find(district => district.Id === this.value);
      if (selectedDistrict) {
        // Populate the wards dropdown
        selectedDistrict.Wards.forEach(function (ward) {
          wards.options[wards.options.length] = new Option(ward.Name, ward.Id);
        });
      }
    }
  };
}
