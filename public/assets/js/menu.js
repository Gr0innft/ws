/*--------------- Wholesale Menu JavaScript -------------
 * 
 * 01. Hamburger Menu Toggle
 * 02. Mobile Dropdown Toggle
 * 03. Header Sticky on Scroll
 * 04. Close Menu on Overlay Click
 * 
 *-------------------------------------------------------*/

(function() {
    'use strict';

    // ============ Hamburger Menu Toggle ============
    const menuToggle = document.getElementById('menuToggle');
    const menuToggleSticky = document.getElementById('menuToggleSticky');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const hamburgerCloseBtn = document.getElementById('hamburgerCloseBtn');
    const bodyOverlay = document.getElementById('bodyOverlay');
    const menuBurgers = document.querySelectorAll('.menu-burger');

    // Function to open hamburger menu
    function openMenu() {
        hamburgerMenu.classList.add('opened');
        bodyOverlay.classList.add('opened');
        menuBurgers.forEach(burger => burger.classList.add('active'));
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }

    // Function to close hamburger menu
    function closeMenu() {
        hamburgerMenu.classList.remove('opened');
        bodyOverlay.classList.remove('opened');
        menuBurgers.forEach(burger => burger.classList.remove('active'));
        // Re-enable body scroll
        document.body.style.overflow = '';
    }

    // Event listeners for menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }

    if (menuToggleSticky) {
        menuToggleSticky.addEventListener('click', openMenu);
    }

    if (hamburgerCloseBtn) {
        hamburgerCloseBtn.addEventListener('click', closeMenu);
    }

    if (bodyOverlay) {
        bodyOverlay.addEventListener('click', closeMenu);
    }

    // ============ Mobile Dropdown Toggle ============
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // If it's an anchor tag, prevent default to allow dropdown toggle
            // Users can click the submenu items or click the parent link again to navigate
            if (this.tagName === 'A') {
                e.preventDefault();
            }
            
            const menuItem = this.parentElement;
            const dropdown = menuItem.querySelector('.mobile-dropdown');

            // Toggle active class on both dropdown and toggle button
            dropdown.classList.toggle('active');
            this.classList.toggle('active');
        });
    });

    // ============ Header Sticky on Scroll ============
    // Based on original example logic - exact match
    let lastScrollTop = "";
    const stickyHeader = document.querySelector('.header-sticky');
    const stickyHeader2 = document.querySelector('.header-sticky-2');
    const scrollThreshold = 100;

    function stickyMenu(targetMenu, toggleClass) {
        if (!targetMenu) return;
        
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st > scrollThreshold) {
            if (st > lastScrollTop) {
                // Scrolling down - remove sticky class
                targetMenu.classList.remove(toggleClass);
            } else {
                // Scrolling up - add sticky class
                targetMenu.classList.add(toggleClass);
            }
        } else {
            // At top of page - remove sticky class
            targetMenu.classList.remove(toggleClass);
        }
        
        lastScrollTop = st;
    }

    function handleStickyHeader() {
        stickyMenu(stickyHeader, 'sticky');
        stickyMenu(stickyHeader2, 'sticky');
    }
    
    // Initialize on load to set correct state if already scrolled
    if (document.readyState === 'complete') {
        handleStickyHeader();
    } else {
        window.addEventListener('load', handleStickyHeader);
    }

    // Throttle function to improve performance
    function throttle(func, delay) {
        let timeoutId;
        let lastRan;
        
        return function() {
            const context = this;
            const args = arguments;
            
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function() {
                    if ((Date.now() - lastRan) >= delay) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, delay - (Date.now() - lastRan));
            }
        };
    }

    // Add scroll event listener with throttle
    window.addEventListener('scroll', throttle(handleStickyHeader, 100));

    // ============ Close Menu on ESC Key ============
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && hamburgerMenu.classList.contains('opened')) {
            closeMenu();
        }
    });

    // ============ Prevent Menu Links from Closing Menu Immediately ============
    // (In case you want to add smooth scroll or other behaviors)
    const mobileMenuLinks = document.querySelectorAll('.hamburger_menu a');
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If it's not a dropdown toggle, close the menu after a short delay
            // This allows the page navigation to feel smooth
            if (!this.closest('.mobile-dropdown-toggle')) {
                setTimeout(closeMenu, 300);
            }
        });
    });

    // ============ Back to Top Button ============
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Show/hide button on scroll
        window.addEventListener('scroll', throttle(function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                backToTop.classList.add('opacity-0', 'invisible');
                backToTop.classList.remove('opacity-100', 'visible');
            }
        }, 100));
        
        // Smooth scroll to top on click
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

})();

