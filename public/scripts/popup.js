window.addEventListener('load', function() {
    const popup = document.getElementById('popup');
    // Show the popup
    popup.classList.remove('hidden');
    // Hide the popup after 2 seconds
    setTimeout(function() {
        popup.classList.add('hidden');
    }, 5000);

    const loadingBar = document.getElementById('loadingBar');
    loadingBar.style.animationDuration = '5s'; // Set animation duration here
    loadingBar.style.animationPlayState = 'running';
});