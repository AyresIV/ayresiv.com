// Splash Screen Logic
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
const enterButton = document.getElementById('enter-button');

enterButton.addEventListener('click', (e) => {
    // Ripple Effect
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');


    const rect = enterButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    // Add ripple to the button
    enterButton.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);

    // Fade and zoom out the splash screen
    splashScreen.classList.add('fade-zoom-out');
    setTimeout(() => {
        splashScreen.style.display = 'none'; // Hide splash screen after animation
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');
    }, 500); // Match the duration of the CSS transition
});

// Gradient Effect
window.onpointermove = (event) => {
    const { clientX, clientY } = event;

    const mouseToColorValueX = Math.round((clientX / window.innerWidth) * 255);
    const mouseToColorValueY = Math.round((clientY / window.innerHeight) * 255);

    const gradientColorLeft = `rgb(${mouseToColorValueX}, 88, 125)`;
    const gradientColorRight = `rgb(125, 64, ${mouseToColorValueY})`;

    document.querySelector('.gradient').style.backgroundImage = `linear-gradient(60deg, ${gradientColorLeft}, ${gradientColorRight})`;
};

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});