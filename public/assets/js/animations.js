(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {

        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // ============ Service Card Stacking Animation ============
        let device_width = window.innerWidth;
        const serviceStack = gsap.utils.toArray(".service-stack");
        
        if (serviceStack.length > 0) {
            // Only apply on desktop devices
            if (device_width > 991) {
                serviceStack.forEach(item => {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.9,
                        y: 50,
                        scrollTrigger: {
                            trigger: item,
                            scrub: true,
                            start: "top top",
                            pin: true,
                            pinSpacing: false,
                            markers: false, // Set to true for debugging
                        },
                    });
                });
            }
        }

        // ============ Sticky Sidebar for Team Details ============
        function initStickySidebar() {
            if (window.innerWidth >= 992) {
                const stickyElements = document.querySelectorAll(".tj-sticky");
                
                if (stickyElements.length > 0) {
                    // Store existing sticky triggers to kill only those
                    const stickyTriggers = [];
                    ScrollTrigger.getAll().forEach(trigger => {
                        if (trigger.vars && trigger.vars.trigger) {
                            const triggerElement = trigger.vars.trigger;
                            if (Array.from(stickyElements).includes(triggerElement)) {
                                stickyTriggers.push(trigger);
                            }
                        }
                    });
                    
                    // Kill only sticky-related triggers
                    stickyTriggers.forEach(trigger => trigger.kill());
                    
                    const startPoint = window.innerWidth >= 992 ? 100 : 120;
                    stickyElements.forEach(element => {
                        gsap.to(element, {
                            scrollTrigger: {
                                trigger: element,
                                start: `top ${startPoint}`,
                                end: `bottom ${startPoint}`,
                                pin: true,
                                scrub: 1,
                            },
                        });
                    });
                }
            }
        }
        
        // Initialize sticky sidebar only if we're on a team detail page
        // Check if we're on a team detail page by looking for tj-sticky elements
        if (document.querySelectorAll(".tj-sticky").length > 0) {
            initStickySidebar();
        }
        
        // ============ Text Animation (SplitText) ============
        if (typeof SplitText !== 'undefined') {
            const animatedTextElements = document.querySelectorAll(".text-anim");
            
            if (animatedTextElements.length > 0) {
                let staggerAmount = 0.03,
                    translateXValue = 20,
                    delayValue = 0.1,
                    easeType = "power2.out";

                animatedTextElements.forEach(element => {
                    let animationSplitText = new SplitText(element, { type: "chars, words" });
                    gsap.from(animationSplitText.chars, {
                        duration: 1,
                        delay: delayValue,
                        x: translateXValue,
                        autoAlpha: 0,
                        stagger: staggerAmount,
                        ease: easeType,
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                        },
                    });
                });
            }
        }

        // ============ Refresh ScrollTrigger on Window Resize ============
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                ScrollTrigger.refresh();
                // Only reinitialize sticky sidebar if we're on a team detail page
                if (document.querySelectorAll(".tj-sticky").length > 0) {
                    initStickySidebar();
                }
            }, 250);
        });

    });

})();

