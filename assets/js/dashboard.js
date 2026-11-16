/* ==========================================================================
   VERDANT BUSINESS SERVICES - DASHBOARD CONTROLLER
   Full Client Workspace Logic, Navigation Tabs, Demo Uploads & Persistent Profile
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Load Current User Session ---
  const currentUser = window.VerdantAuth ? window.VerdantAuth.getUser() : null;
  const userNameDisplays = document.querySelectorAll('#userNameDisplay, .sidebar-user-name');
  const userBusinessDisplays = document.querySelectorAll('#userBusinessDisplay, .sidebar-user-biz');
  const userInitialsElements = document.querySelectorAll('#userInitials, .sidebar-user-avatar');
  const welcomeHeading = document.querySelector('#welcomeHeading');

  if (currentUser) {
    userNameDisplays.forEach((el) => { el.textContent = currentUser.name || 'Client'; });
    userBusinessDisplays.forEach((el) => { el.textContent = currentUser.business || 'Entity Enterprise'; });
    if (welcomeHeading) welcomeHeading.textContent = `WELCOME BACK, ${currentUser.name ? currentUser.name.toUpperCase() : 'CLIENT'}.`;
    userInitialsElements.forEach((el) => {
      const parts = (currentUser.name || 'Client').trim().split(' ');
      el.textContent = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0].slice(0, 2).toUpperCase();
    });

    // Populate Profile Fields if present
    const profName = document.querySelector('#profileFullName');
    const profEmail = document.querySelector('#profileEmail');
    const profPhone = document.querySelector('#profilePhone');
    const profBusiness = document.querySelector('#profileBusiness');
    const profType = document.querySelector('#profileBusinessType');

    if (profName) profName.value = currentUser.name || '';
    if (profEmail) profEmail.value = currentUser.email || '';
    if (profPhone) profPhone.value = currentUser.phone || '';
    if (profBusiness) profBusiness.value = currentUser.business || '';
    if (profType) profType.value = currentUser.businessType || 'Private Limited Company';
  }

  // --- 2. Sidebar Navigation Tabs ---
  const navItems = document.querySelectorAll('.dash-nav-item[data-tab]');
  const panes = document.querySelectorAll('.dash-pane');
  const pageTitle = document.querySelector('#dashPageTitle');

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const targetTab = item.getAttribute('data-tab');

      navItems.forEach((nav) => nav.classList.remove('active'));
      item.classList.add('active');

      panes.forEach((pane) => {
        if (pane.id === `tab-${targetTab}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });

      if (pageTitle) {
        pageTitle.textContent = item.querySelector('.nav-label')?.textContent || 'Overview';
      }

      // Scroll workspace to top on tab switch
      const dashMain = document.querySelector('.dash-main');
      if (dashMain) {
        dashMain.scrollTop = 0;
      }

      // Close mobile drawer on item select
      const sidebar = document.querySelector('.dash-sidebar');
      if (sidebar && window.innerWidth <= 900) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Mobile Sidebar Toggle & Close
  const mobileToggle = document.querySelector('#dashMobileToggle');
  const sidebar = document.querySelector('.dash-sidebar');
  const closeSidebarBtn = document.querySelector('#dashSidebarClose');
  const sidebarUserCard = document.querySelector('#dashSidebarUser');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

  if (sidebarUserCard) {
    sidebarUserCard.addEventListener('click', () => {
      const settingsTab = document.querySelector('.dash-nav-item[data-tab="settings"]');
      if (settingsTab) settingsTab.click();
    });
  }

  // --- 3. Logout Action ---
  const logoutBtn = document.querySelector('#dashLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.VerdantAuth && typeof window.VerdantAuth.logout === 'function') {
        window.VerdantAuth.logout();
      } else {
        try {
          localStorage.removeItem('verdant_user_session');
        } catch (err) {}
        window.location.href = 'index.html';
      }
    });
  }

  // --- 4. Document Centre Demo Upload ---
  const dropzone = document.querySelector('#docDropzone');
  const fileInput = document.querySelector('#docFileInput');
  const docsTableBody = document.querySelector('#uploadedDocsTable tbody');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      files.forEach((file) => {
        const row = document.createElement('tr');
        const dateStr = new Date().toISOString().split('T')[0];
        row.innerHTML = `
          <td><strong>${file.name}</strong></td>
          <td>Director KYC / Supporting</td>
          <td>${(file.size / 1024).toFixed(1)} KB</td>
          <td>${dateStr}</td>
          <td><span class="status-pill warning"><span class="pill-dot"></span>Under Review</span></td>
          <td><button class="btn btn-secondary btn-sm" onclick="alert('Viewing simulated file: ${file.name}')">Preview</button></td>
        `;
        if (docsTableBody) {
          docsTableBody.prepend(row);
        }
      });

      if (window.showToast) {
        window.showToast(`Successfully uploaded ${files.length} document(s) for verification.`, 'success');
      } else {
        alert(`Successfully uploaded ${files.length} document(s) for verification.`);
      }
      fileInput.value = '';
    });
  }

  // --- 5. Profile Form Save ---
  const profileForm = document.querySelector('#profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedUser = {
        name: document.querySelector('#profileFullName')?.value.trim() || '',
        email: document.querySelector('#profileEmail')?.value.trim() || '',
        phone: document.querySelector('#profilePhone')?.value.trim() || '',
        business: document.querySelector('#profileBusiness')?.value.trim() || '',
        businessType: document.querySelector('#profileBusinessType')?.value || 'Private Limited Company',
        joined: currentUser ? currentUser.joined : new Date().toISOString().split('T')[0]
      };

      localStorage.setItem('verdant_user_session', JSON.stringify(updatedUser));
      userNameDisplays.forEach((el) => { el.textContent = updatedUser.name; });
      userBusinessDisplays.forEach((el) => { el.textContent = updatedUser.business; });
      userInitialsElements.forEach((el) => {
        const parts = (updatedUser.name || 'Client').trim().split(' ');
        el.textContent = parts.length > 1 ? `${parts[0][0]}${parts[1][0]}` : parts[0].slice(0, 2).toUpperCase();
      });
      if (welcomeHeading) welcomeHeading.textContent = `WELCOME BACK, ${updatedUser.name.toUpperCase()}.`;

      if (window.showToast) {
        window.showToast('Profile and business preferences updated successfully.', 'success');
      } else {
        alert('Profile updated successfully.');
      }
    });
  }

  // --- 6. Application Search & Filter ---
  const searchInput = document.querySelector('#appSearchInput');
  const statusFilter = document.querySelector('#appStatusFilter');
  const appRows = document.querySelectorAll('#applicationsTable tbody tr');

  function filterApplications() {
    const q = (searchInput?.value || '').toLowerCase();
    const st = (statusFilter?.value || 'all').toLowerCase();

    appRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      const statusText = row.querySelector('.status-pill')?.textContent.toLowerCase() || '';
      const matchesSearch = text.includes(q);
      const matchesStatus = st === 'all' || statusText.includes(st);

      if (matchesSearch && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterApplications);
  if (statusFilter) statusFilter.addEventListener('change', filterApplications);

  // --- 7. Compliance Calendar Filter Interaction ---
  const calFilterBtns = document.querySelectorAll('.cal-filter-btn');
  calFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      calFilterBtns.forEach((b) => b.classList.remove('btn-primary'));
      calFilterBtns.forEach((b) => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');
      const cat = btn.getAttribute('data-cal-filter');
      const eventCards = document.querySelectorAll('.cal-event-card');
      eventCards.forEach((c) => {
        if (cat === 'all' || c.getAttribute('data-category') === cat) {
          c.style.display = 'flex';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });
});

