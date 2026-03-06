/* ============================================
   Volt Electric — Electrician Template JS
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     Placeholder defaults
     ------------------------------------------ */
  var DEFAULTS = {
    name: 'Volt Electric',
    phone: '5125550187',
    email: 'info@voltelectric.com',
    street: '2841 Thunder Road',
    city: 'Austin',
    state: 'TX',
    zip: '78701'
  };

  /* ------------------------------------------
     Demo system — decode base64url d parameter
     ------------------------------------------ */
  function decodeDemo(str) {
    try {
      var binary = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch (e) {
      return null;
    }
  }

  function formatPhone(raw) {
    var digits = raw.replace(/\D/g, '');
    if (digits.length === 11 && digits[0] === '1') digits = digits.slice(1);
    if (digits.length === 10) {
      return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
    }
    return raw;
  }

  function phoneHref(raw) {
    var digits = raw.replace(/\D/g, '');
    if (digits.length === 10) digits = '1' + digits;
    return 'tel:+' + digits;
  }

  function mapsHref(data) {
    var parts = [];
    if (data.street) parts.push(data.street);
    if (data.city) parts.push(data.city);
    if (data.state) parts.push(data.state);
    if (data.zip) parts.push(data.zip);
    return 'https://www.google.com/maps/search/' + encodeURIComponent(parts.join(', '));
  }

  function replaceText(root, oldVal, newVal) {
    if (!oldVal || !newVal || oldVal === newVal) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.indexOf(oldVal) !== -1) {
        node.nodeValue = node.nodeValue.split(oldVal).join(newVal);
      }
    }
  }

  function applyDemo(data) {
    var d = {};
    for (var key in DEFAULTS) {
      d[key] = (data && data[key]) ? data[key] : DEFAULTS[key];
    }

    var formattedPhone = formatPhone(d.phone);
    var defaultFormattedPhone = formatPhone(DEFAULTS.phone);
    var telLink = phoneHref(d.phone);

    // Replace visible text
    replaceText(document.body, DEFAULTS.name, d.name);
    replaceText(document.body, defaultFormattedPhone, formattedPhone);
    replaceText(document.body, DEFAULTS.email, d.email);
    replaceText(document.body, DEFAULTS.street, d.street);

    // Replace city, state, zip carefully (they appear in compound strings)
    if (d.city !== DEFAULTS.city || d.state !== DEFAULTS.state || d.zip !== DEFAULTS.zip) {
      replaceText(document.body, DEFAULTS.city + ', ' + DEFAULTS.state + ' ' + DEFAULTS.zip,
        d.city + ', ' + d.state + ' ' + d.zip);
      replaceText(document.body, DEFAULTS.city + ', ' + DEFAULTS.state,
        d.city + ', ' + d.state);
    }

    // Update title
    document.title = document.title.split(DEFAULTS.name).join(d.name);
    if (d.city !== DEFAULTS.city) {
      document.title = document.title.split(DEFAULTS.city).join(d.city);
    }

    // Update meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      var content = metaDesc.getAttribute('content');
      content = content.split(DEFAULTS.name).join(d.name);
      if (d.city !== DEFAULTS.city) content = content.split(DEFAULTS.city).join(d.city);
      metaDesc.setAttribute('content', content);
    }

    // Update OG tags
    var ogTags = {
      'og:title': function (v) { return v.split(DEFAULTS.name).join(d.name).split(DEFAULTS.city).join(d.city); },
      'og:description': function (v) { return v.split(DEFAULTS.name).join(d.name).split(DEFAULTS.city).join(d.city); },
      'og:site_name': function (v) { return v.split(DEFAULTS.name).join(d.name); }
    };
    for (var prop in ogTags) {
      var el = document.querySelector('meta[property="' + prop + '"]');
      if (el) el.setAttribute('content', ogTags[prop](el.getAttribute('content')));
    }

    // Update JSON-LD
    var ldScript = document.querySelector('script[type="application/ld+json"]');
    if (ldScript) {
      try {
        var ld = JSON.parse(ldScript.textContent);
        ld.name = d.name;
        ld.telephone = '+' + (d.phone.replace(/\D/g, '').length === 10 ? '1' : '') + d.phone.replace(/\D/g, '');
        if (ld.address) {
          ld.address.streetAddress = d.street;
          ld.address.addressLocality = d.city;
          ld.address.addressRegion = d.state;
          ld.address.postalCode = d.zip;
        }
        ldScript.textContent = JSON.stringify(ld, null, 2);
      } catch (e) { /* silent */ }
    }

    // Update tel: hrefs
    var defaultTel = phoneHref(DEFAULTS.phone);
    document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
      if (a.getAttribute('href') === defaultTel) {
        a.setAttribute('href', telLink);
      }
    });

    // Update mailto: hrefs
    var defaultMailto = 'mailto:' + DEFAULTS.email;
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      if (a.getAttribute('href') === defaultMailto) {
        a.setAttribute('href', 'mailto:' + d.email);
      }
    });

    // Update maps links
    var defaultMaps = mapsHref(DEFAULTS);
    document.querySelectorAll('a[href*="google.com/maps"]').forEach(function (a) {
      if (a.getAttribute('href') === defaultMaps) {
        a.setAttribute('href', mapsHref(d));
      }
    });
  }

  /* ------------------------------------------
     Link rewriting — append d parameter
     ------------------------------------------ */
  function rewriteLinks(dParam) {
    if (!dParam) return;
    var links = document.querySelectorAll('a[href]');
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      // Skip fragment-only, external, tel, mailto, maps links
      if (!href ||
          href.charAt(0) === '#' ||
          href.indexOf('://') !== -1 ||
          href.indexOf('tel:') === 0 ||
          href.indexOf('mailto:') === 0) return;

      // Internal page link
      var separator = href.indexOf('?') !== -1 ? '&' : '?';
      a.setAttribute('href', href + separator + 'd=' + dParam);
    });
  }

  /* ------------------------------------------
     Initialize demo system
     ------------------------------------------ */
  var urlParams = new URLSearchParams(window.location.search);
  var dParam = urlParams.get('d');
  var demoData = null;

  if (dParam) {
    demoData = decodeDemo(dParam);
  }

  if (demoData) {
    applyDemo(demoData);
    rewriteLinks(dParam);
  }

  /* ------------------------------------------
     Mobile Navigation Toggle
     ------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('is-open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  /* ------------------------------------------
     Scroll-Triggered Fade-In Animations
     ------------------------------------------ */
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    var fadeEls = document.querySelectorAll('.fade-in');

    if (fadeEls.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var parent = entry.target.parentElement;
              var siblings = parent
                ? Array.from(parent.querySelectorAll(':scope > .fade-in'))
                : [];
              var siblingIndex = siblings.indexOf(entry.target);
              var delay = siblingIndex >= 0 ? siblingIndex * 100 : 0;

              setTimeout(function () {
                entry.target.classList.add('is-visible');
              }, delay);

              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );

      fadeEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  /* ------------------------------------------
     Demo Modal — timed close button
     ------------------------------------------ */
  var demoOverlay = document.getElementById('demo-overlay');
  var demoClose = document.getElementById('demo-close');

  if (demoOverlay && demoClose) {
    var remaining = 3;
    demoClose.textContent = 'Close (' + remaining + ')';

    var countdown = setInterval(function () {
      remaining--;
      if (remaining > 0) {
        demoClose.textContent = 'Close (' + remaining + ')';
      } else {
        clearInterval(countdown);
        demoClose.textContent = 'Close';
        demoClose.disabled = false;
      }
    }, 1000);

    demoClose.addEventListener('click', function () {
      demoOverlay.classList.add('is-hidden');
    });
  }

  /* ------------------------------------------
     Contact Form (Demo — disabled submission)
     ------------------------------------------ */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      var statusEl = document.getElementById('form-status');

      if (!submitBtn || !statusEl) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(function () {
        contactForm.style.display = 'none';
        statusEl.className = 'form-status success';
        statusEl.textContent =
          "Thanks for reaching out! We'll get back to you within 24 hours.";
        statusEl.style.display = 'block';
      }, 1200);
    });
  }
})();
