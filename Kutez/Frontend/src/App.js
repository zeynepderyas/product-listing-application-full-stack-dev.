document.addEventListener("DOMContentLoaded", async () => {
    const productsContainer = document.getElementById("products-container");
    const scrollLeftBtn = document.getElementById("scroll-left");
    const scrollRightBtn = document.getElementById("scroll-right");

    try {
        const response = await fetch("http://127.0.0.1:5000/products");

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        const products = await response.json();
        renderProducts(products);

        // Scroll buttons activation
        enableScrollButtons(productsContainer, scrollLeftBtn, scrollRightBtn);
    } catch (error) {
        console.error("Error loading products:", error);
        productsContainer.innerHTML = `<p>Error loading products. Please check the console for more details.</p>`;
    }
});

function renderProducts(products) {
    const productsContainer = document.getElementById("products-container");

    if (!products || products.length === 0) {
        productsContainer.innerHTML = `<p>No products available.</p>`;
        return;
    }

    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        const defaultImage = product.images.yellow;

        productElement.innerHTML = `
            <img src="${defaultImage}" alt="${product.name}" class="product-image">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)} USD</p>
            <div class="color-options">
                <button class="color-btn" data-color="yellow"></button>
                <button class="color-btn" data-color="rose"></button>
                <button class="color-btn" data-color="white"></button>
            </div>
            <p class="material-text">Yellow Gold</p> <!-- Sadece renk ismini göster -->
            <div class="rating">
                <div class="stars">${generateStars(product.popularityScore)}</div>
                <span class="rating-text">${(product.popularityScore / 20).toFixed(1)} / 5</span>
            </div>
        `;

        const colorButtons = productElement.querySelectorAll(".color-btn");
        const productImage = productElement.querySelector(".product-image");
        const materialText = productElement.querySelector(".material-text");

        colorButtons.forEach((button) => {
            button.addEventListener("click", () => {
                colorButtons.forEach((btn) => btn.classList.remove("active"));
                button.classList.add("active");
                const color = button.getAttribute("data-color");
                productImage.src = product.images[color];

                // Renk ismini güncelle
                if (color === "yellow") {
                    materialText.textContent = "Yellow Gold";
                } else if (color === "rose") {
                    materialText.textContent = "Rose Gold";
                } else if (color === "white") {
                    materialText.textContent = "White Gold";
                }
            });
        });

        productsContainer.appendChild(productElement);
    });
}

function generateStars(score) {
    const maxStars = 5;
    const fullStars = Math.floor(score / 20); // Her 20 puan bir tam yıldız eder
    const hasHalfStar = (score % 20) >= 10; // Yarım yıldız kontrolü
    let stars = '';

    // Dolu yıldızlar
    for (let i = 0; i < fullStars; i++) {
        stars += '<span class="star full">★</span>';
    }

    // Yarım yıldız
    if (hasHalfStar) {
        stars += '<span class="star half">★</span>';
    }

    // Boş yıldızlar
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < maxStars; i++) {
        stars += '<span class="star empty">★</span>';
    }

    return stars;
}

// Enable scroll buttons
function enableScrollButtons(container, leftBtn, rightBtn) {
    // Scroll left
    leftBtn.addEventListener("click", () => {
        container.scrollBy({
            left: -300, // Scroll left by 300px
            behavior: "smooth",
        });
    });

    // Scroll right
    rightBtn.addEventListener("click", () => {
        container.scrollBy({
            left: 300, // Scroll right by 300px
            behavior: "smooth",
        });
    });

    // Enable/disable buttons based on scroll position
    container.addEventListener("scroll", () => {
        leftBtn.disabled = container.scrollLeft === 0; // At the left edge
        rightBtn.disabled =
            container.scrollLeft + container.clientWidth >= container.scrollWidth; // At the right edge
    });
}
