/* ==========================================================================
   VERDANT BUSINESS SERVICES - AUTHENTICATION CONTROLLER
   Standalone Auth (Login, Register, Forgot Password) & Session Management
   ========================================================================== */

(function () {
  'use strict';

  const SESSION_KEY = 'verdant_user_session';
  const USERS_DB_KEY = 'verdant_users_db';

  // Demo user database initialization
  function getUsersDB() {
    try {
      const data = localStorage.getItem(USERS_DB_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveUsersDB(db) {
    try {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
    } catch (e) {
      console.error('Could not save users to localStorage', e);
    }
  }

  // Pre-seed a default demo client if empty
  (function initDemoUser() {
    const db = getUsersDB();
    if (db.length === 0) {
      db.push({
        name: 'Alexander Wright',
        email: 'alexander@verdantcorp.com',
        phone: '+91 98765 43210',
        business: 'Apex Dynamics Technologies Pvt Ltd',
        businessType: 'Private Limited Company',
        joined: '2024-01-15'
      });
      saveUsersDB(db);
    }
  })();

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Password Visibility Toggle
    document.querySelectorAll('.password-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        if (input && (input.type === 'password' || input.type === 'text')) {
          const isPassword = input.type === 'password';
          input.type = isPassword ? 'text' : 'password';
          btn.innerHTML = isPassword
            ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
            : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
        }
      });
    });

    // 2. Login Form Handler
    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('#email')?.value.trim();
        const password = loginForm.querySelector('#password')?.value;
        const rememberMe = loginForm.querySelector('#rememberMe')?.checked;

        if (!email || !password) {
          alert('Please enter both your email address and password.');
          return;
        }

        const db = getUsersDB();
        const matched = db.find((u) => u.email.toLowerCase() === email.toLowerCase());

        const sessionUser = matched || {
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email: email,
          phone: '+91 98765 00000',
          business: 'Registered Startup Entity Pvt Ltd',
          businessType: 'Private Limited Company',
          joined: new Date().toISOString().split('T')[0]
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
        if (rememberMe) {
          localStorage.setItem('verdant_remembered_email', email);
        } else {
          localStorage.removeItem('verdant_remembered_email');
        }

        window.location.href = 'dashboard.html';
      });

      // Pre-fill remembered email
      const remembered = localStorage.getItem('verdant_remembered_email');
      const emailInput = loginForm.querySelector('#email');
      if (remembered && emailInput) {
        emailInput.value = remembered;
        const rememberCheck = loginForm.querySelector('#rememberMe');
        if (rememberCheck) rememberCheck.checked = true;
      }
    }

    // 3. Register Form Handler
    const registerForm = document.querySelector('#registerForm');
    if (registerForm) {
      const passwordField = registerForm.querySelector('#password');
      const strengthBar = registerForm.querySelector('#strengthBar');

      if (passwordField && strengthBar) {
        passwordField.addEventListener('input', () => {
          const val = passwordField.value;
          let strength = 0;
          if (val.length >= 6) strength += 25;
          if (val.length >= 8) strength += 25;
          if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength += 25;
          if (/[^A-Za-z0-9]/.test(val)) strength += 25;

          strengthBar.style.width = `${strength}%`;
          strengthBar.style.backgroundColor =
            strength < 50 ? '#EF4444' : strength < 75 ? '#F59E0B' : '#10B981';
        });
      }

      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = registerForm.querySelector('#fullName')?.value.trim();
        const email = registerForm.querySelector('#email')?.value.trim();
        const phone = registerForm.querySelector('#phone')?.value.trim();
        const business = registerForm.querySelector('#businessName')?.value.trim() || 'My Business Enterprise';
        const password = registerForm.querySelector('#password')?.value;
        const confirmPassword = registerForm.querySelector('#confirmPassword')?.value;
        const terms = registerForm.querySelector('#termsAgreement')?.checked;

        if (!terms) {
          alert('You must accept the Terms & Conditions and Privacy Policy.');
          return;
        }

        if (password !== confirmPassword) {
          alert('Passwords do not match. Please re-enter carefully.');
          return;
        }

        const newUser = {
          name: fullName,
          email: email,
          phone: phone,
          business: business,
          businessType: 'Private Limited (Pending Filing)',
          joined: new Date().toISOString().split('T')[0]
        };

        const db = getUsersDB();
        db.push(newUser);
        saveUsersDB(db);

        localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
        window.location.href = 'dashboard.html';
      });
    }

    // 4. Forgot Password Handler
    const forgotForm = document.querySelector('#forgotPasswordForm');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = forgotForm.querySelector('#email')?.value.trim();
        const alertBox = document.querySelector('#forgotSuccessMsg');
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.innerHTML = `
            <strong>Simulated Reset Link Sent:</strong> An illustrative password recovery instruction link has been dispatched to <em>${email}</em> for demonstration purposes.
          `;
        }
      });
    }
  });

  // Global Session Manager
  window.VerdantAuth = {
    getUser: () => {
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },
    logout: () => {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = 'index.html';
    }
  };
})();

