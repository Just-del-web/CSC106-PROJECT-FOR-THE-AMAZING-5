document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.querySelector('.cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const subtotalEl = document.querySelector('.summary-item strong:nth-child(2)'); 
    const totalEl = document.querySelector('.summary-item strong:nth-child(2)');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '<h2>Your Items</h2>'; 

        if (cart.length === 0) {
            cartContainer.innerHTML += '<p>Your cart is empty.</p>';
            updateSummary();
            checkoutBtn.disabled = true;
            return;
        }

        checkoutBtn.disabled = false;

        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                </div>
                <div class="item-controls">
                    <input type="number" class="quantity" value="${item.quantity}" min="1">
                    <br><br>
                    <button class="remove-btn">Remove</button>
                </div>
            `;

            div.querySelector('.quantity').addEventListener('input', e => {
                let newQty = parseInt(e.target.value);
                if (isNaN(newQty) || newQty < 1) newQty = 1;
                e.target.value = newQty;

                const cart = JSON.parse(localStorage.getItem('cart'));
                cart[index].quantity = newQty; 
                localStorage.setItem('cart', JSON.stringify(cart));
                updateSummary();
            });

            div.querySelector('.remove-btn').addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart'));
                cart.splice(index, 1); 
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });

            cartContainer.appendChild(div);
        });

        updateSummary();
    }

  function updateSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let subtotal = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g,"")) || 0;
        return acc + price * item.quantity;
    }, 0);

    const summaryItems = document.querySelectorAll('.summary-item strong');

    if(summaryItems.length >= 2){
        summaryItems[0].innerText = `$${subtotal.toLocaleString()}`; 
        summaryItems[1].innerText = `$${subtotal.toLocaleString()}`; 
        }
}

    renderCart();

    window.addEventListener('cartUpdated', renderCart);
});




// Landing.html javascript

document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".cartBtn");

    const notification = document.createElement("div");
    notification.className = "cart-notification";
    document.body.appendChild(notification);

    cartButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const productCard = btn.closest(".product-card");

            const productName = productCard.querySelector("img").alt;
            const productPrice = productCard.querySelector(".price").innerText.trim();
            const productImage = productCard.querySelector("img").src;

            const product = { 
                id: Date.now(), 
                name: productName, 
                price: productPrice, 
                image: productImage, 
                quantity: 1 
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            cart.push(product);

            localStorage.setItem("cart", JSON.stringify(cart));

            window.dispatchEvent(new Event("cartUpdated"));

            showNotification(`${productName} added to cart!`);
        });
    });

    function showNotification(message) {
        notification.textContent = message;
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 4000);
      }
});


// Delivery.html javascript

document.addEventListener("DOMContentLoaded", () => {
    const itemsList = document.querySelector(".itemsli ul");

    itemsList.innerHTML = "";

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        itemsList.innerHTML = "<li>No items here</li>";
        return;
    }

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${item.name}</a>`;
        itemsList.appendChild(li);
    });
});



// Delivery.html javascript

document.addEventListener("DOMContentLoaded", function () {

    const btn = document.getElementById("button");

    btn.addEventListener("click", function () {

        const fields = [
            "firstName", "lastName", "customerEmail", "pn",
            "numofitems", "ccn", "cdname", "expdt",
            "cvv", "address", "city", "country"
        ];

        let msg = document.getElementById("formMessage");
        if (!msg) {
            msg = document.createElement("p");
            msg.id = "formMessage";
            msg.style.color = "red";
            msg.style.fontWeight = "bold";
            document.querySelector(".divContainer").appendChild(msg);
        }

        for (let id of fields) {
            if (document.getElementById(id).value.trim() === "") {
                msg.textContent = "Please fill in all required fields.";
                return;
            }
        }

        const card = document.getElementById("ccn").value.trim();
        if (!/^\d{16}$/.test(card)) {
            msg.textContent = "Card number must be exactly 16 digits.";
            return;
        }

        const cvv = document.getElementById("cvv").value.trim();
        if (!/^\d{3}$/.test(cvv)) {
            msg.textContent = "CVV must be exactly 3 digits.";
            return;
        }

        msg.style.color = "green";
        msg.textContent = "All details are valid!";
    });

});



// Contact and inquiry.html javascript

document.addEventListener("DOMContentLoaded", function () {

    const submitBtn = document.getElementById("submitButton");
    if (!submitBtn) return;

    submitBtn.addEventListener("click", function () {

        let msg = document.getElementById("contactMessage");
        if (!msg) {
            msg = document.createElement("p");
            msg.id = "contactMessage";
            msg.style.color = "red";
            msg.style.fontWeight = "bold";
            submitBtn.parentElement.appendChild(msg);
        }

        const name = document.getElementById("userName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("userPhoneNumber").value.trim();
        const message = document.getElementById("suserSubject").value.trim();

        if (name === "" || email === "" || phone === "" || message === "") {
            msg.textContent = "Please fill in all required fields.";
            return;
        }

        if (!email.includes("@")) {
            msg.textContent = "Email must contain '@'.";
            return;
        }

        msg.style.color = "green";
        msg.textContent = "Message sent successfully!";
    });

});

//JavaScript Hover Effect for Event Cards
    
const cards = document.querySelectorAll('.event-card');
        cards.forEach(card => {
            card.addEventListener('mouseover', () => {
                card.style.backgroundColor = '#f4f4f4';
                card.style.transition = '0.3s';
            });
            card.addEventListener('mouseout', () => {
                card.style.backgroundColor = 'white';
            });
        });
    