document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');
    const pageName = document.location.pathname.split("/").pop().replace('.html', '');
    
    // Set the active menu item
    const menuItems = document.querySelectorAll('aside nav a');
    menuItems.forEach(item => {
        if (item.getAttribute('href') === pageName + '.html') {
            item.classList.add('text-mindbuddy-lightblue');
            item.classList.remove('text-gray-600');
        }
    });

    // Load page-specific content
    fetch(pageName + '-content.html')
        .then(response => response.text())
        .then(html => {
            content.innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            content.innerHTML = '<h1 class="text-3xl font-bold mb-8 text-mindbuddy-navy font-space-grotesk">Error loading content</h1>';
        });
});