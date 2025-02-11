let currentTab = 0;



// Function to update the bundle/package details in the Individuals tab
function updateBundleDetails(title, price, description) {
    const bundleDetails = document.getElementById('bundle-details');
    bundleDetails.innerHTML = `
        <h3 class="selected-title">${title}</h3>
        <p class="selected-price">Price: ${price}</p>
        <p class="selected-description">${description}</p>
        <!-- Removed the button -->
    `;
    
    // Hide the placeholder text
    const placeholderText = document.querySelector('.tabs__tab--active h2');
    if (placeholderText) {
        placeholderText.style.display = 'none';
    }
}

// Add event listeners to all bundles and packages
document.querySelectorAll('.services__item, .bundles__item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.services__item-title, .bundles__item-title').textContent;
        const price = item.querySelector('.services__item-price, .bundles__item-price').textContent;
        const description = descriptions[title] || "No description available.";
        updateBundleDetails(title, price, description);
    });
});

// Tab switching functionality
function changeTab(direction) {
    const tabs = document.querySelectorAll('.tabs__tab');
    currentTab += direction;

    if (currentTab < 0) {
        currentTab = tabs.length - 1;
    } else if (currentTab >= tabs.length) {
        currentTab = 0;
    }

    tabs.forEach((tab, index) => {
        tab.classList.toggle('tabs__tab--active', index === currentTab);
    });
}
function toggleNav() {
    const navList = document.querySelector('.nav__list');
    navList.classList.toggle('active');
}
// JavaScript to handle package selection
document.addEventListener("DOMContentLoaded", function () {
    // Get all service and bundle items
    const serviceItems = document.querySelectorAll(".services__item, .bundles__item");
    const bundleDetails = document.getElementById("bundle-details");
    const discordButton = document.getElementById("discord-button");

    // Add click event listener to each item
    serviceItems.forEach((item) => {
        item.addEventListener("click", () => {
            // Get the title and price of the selected package
            const title = item.querySelector(".services__item-title, .bundles__item-title").textContent;
            const price = item.querySelector(".services__item-price, .bundles__item-price").textContent;

            // Update the bundle details
            bundleDetails.innerHTML = `
                <strong>Selected Package:</strong> ${title} <br>
                <strong>Price:</strong> ${price}
            `;

            // Append the Discord button to the bundle details
            bundleDetails.appendChild(discordButton);

            // Show the Discord button
            discordButton.style.display = "inline-block";
        });
    });
});