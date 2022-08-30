(function iife(Drupal) {
  'use strict';
  Drupal.behaviors.whdDropdown = {
    attach: function (context, settings) {
      // Remove no-js since JS is indeed executing.
      document.documentElement.classList.remove('no-js');

      // Find our toggle button.
      var mainNav = document.querySelector('.main-nav');
      var mainNavToggle = document.querySelector('.main-nav button[aria-expanded]');
      var mainNavContents = document.querySelector('.main-nav__contents');
      var mainNavLinks = document.querySelector('.main-nav__contents a');

      // Assign event listener to allow toggling.
      mainNavToggle.addEventListener('click', function (ev) {
        // Manage state of our toggle button.
        var pressed = mainNavToggle.getAttribute('aria-expanded') === 'true';
        mainNavToggle.setAttribute('aria-expanded', String(!pressed));

        // Toggle display of main-nav
        mainNav.classList.toggle('is--expanded');
        mainNavContents.setAttribute('aria-hidden', String(pressed));
      });

      // Clicking a link should shut the nav.
      mainNavLinks.addEventListener('click', function (ev) {
        mainNav.classList.remove('is--expanded');
        mainNavToggle.setAttribute('aria-expanded', String(false));
        mainNavContents.setAttribute('aria-hidden', String(true));
      });
    }
  };
})(Drupal);
;
(function iife(Drupal) {
  'use strict';
  Drupal.behaviors.frontPage = {
    attach: function (context, settings) {
      var currentPath = window.location.pathname;
      var currentLang = drupalSettings.language;
      var mainNavLinks = document.querySelectorAll('.main-nav__contents a');
      var heroButton = document.querySelector('.hero__cta a');
      var resourcesButton = document.querySelector('.video__cta a');
      // Set up smooth-scrolling for Hamburger nav.
      //
      // First, check for prefers-reduced-motion and only continue if the media
      // query resolves to false.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches === false) {

        for (const target of mainNavLinks) {
          target.addEventListener("click", smoothScroll);
        }

        if(heroButton) {
          heroButton.addEventListener("click", smoothScroll);
        }

        if (resourcesButton) {
          resourcesButton.addEventListener("click", smoothScroll);
        }

        function smoothScroll(ev) {
          // Only if homepage, prevent default so main menu on internal pages
          // returns to the homepage.
          if (currentPath == '/' || currentPath == `/${currentLang}`) {
            ev.preventDefault();
          }

          const href = '#' + (this).getAttribute('href').split('#')[1];
          document.querySelector(href).scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    }
  }
})(Drupal);
;
