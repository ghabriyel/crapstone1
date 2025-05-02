// Toggle each menu individually
document.querySelectorAll('.editUser .hamburger').forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
  
      const menu = this.nextElementSibling;
  
      // Close other menus
      document.querySelectorAll('.hamburgerContent').forEach(m => {
        if (m !== menu) m.style.display = 'none';
      });
  
      // Toggle current one
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });
  });
  
  // Close any menu when clicking outside
  document.addEventListener('click', function () {
    document.querySelectorAll('.hamburgerContent').forEach(menu => {
      menu.style.display = 'none';
    });
  });
  