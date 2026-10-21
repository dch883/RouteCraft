/**
 * RouteCraft: Client-Side Single Page Application (SPA) Engine
 * Student: H.M.D.C. Herath | Reg: E2410120 | University of Moratuwa
 */

// Application State Management
const state = {
  allPlaces: [],
  categories: [],
  vibes: [],
  activities: [],
  selectedCategory: 'All',
  selectedVibe: '',
  selectedActivity: '',
  searchKeyword: '',
  sortOrder: 'distance',
  itinerary: [],
  currentMetrics: null,
  activeAdmin: null,
  currentUser: null
};

// DOM Elements
const elements = {
  placesGrid: document.getElementById('placesGrid'),
  resultsCount: document.getElementById('resultsCount'),
  searchInput: document.getElementById('searchInput'),
  categoryChips: document.getElementById('categoryChips'),
  vibeFilter: document.getElementById('vibeFilter'),
  activityFilter: document.getElementById('activityFilter'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  sortOrder: document.getElementById('sortOrder'),
  // Itinerary UI
  itineraryStopsList: document.getElementById('itineraryStopsList'),
  emptyItineraryState: document.getElementById('emptyItineraryState'),
  itineraryCountBadge: document.getElementById('itineraryCountBadge'),
  metricDistance: document.getElementById('metricDistance'),
  metricDuration: document.getElementById('metricDuration'),
  timeWarningBanner: document.getElementById('timeWarningBanner'),
  warningBannerText: document.getElementById('warningBannerText'),
  clearItineraryBtn: document.getElementById('clearItineraryBtn'),
  exportItineraryBtn: document.getElementById('exportItineraryBtn'),
  // Place Detail Modal
  placeDetailModal: document.getElementById('placeDetailModal'),
  closeDetailModalBtn: document.getElementById('closeDetailModalBtn'),
  modalPlaceImage: document.getElementById('modalPlaceImage'),
  modalPlaceTitle: document.getElementById('modalPlaceTitle'),
  modalCategoryBadge: document.getElementById('modalCategoryBadge'),
  modalDistanceBadge: document.getElementById('modalDistanceBadge'),
  modalPlaceDescription: document.getElementById('modalPlaceDescription'),
  modalHours: document.getElementById('modalHours'),
  modalEntrance: document.getElementById('modalEntrance'),
  modalParking: document.getElementById('modalParking'),
  modalContact: document.getElementById('modalContact'),
  modalDuration: document.getElementById('modalDuration'),
  modalTagsWrapper: document.getElementById('modalTagsWrapper'),
  modalMapsLink: document.getElementById('modalMapsLink'),
  modalAddToTripBtn: document.getElementById('modalAddToTripBtn'),
  // Auth Portal Modal
  authModal: document.getElementById('authModal'),
  authPortalBtn: document.getElementById('authPortalBtn'),
  authBtnLabel: document.getElementById('authBtnLabel'),
  closeAuthModalBtn: document.getElementById('closeAuthModalBtn'),
  authTabsNav: document.getElementById('authTabsNav'),
  authModalTitle: document.getElementById('authModalTitle'),
  authSessionStatus: document.getElementById('authSessionStatus'),
  tabUserLoginBtn: document.getElementById('tabUserLoginBtn'),
  tabUserRegisterBtn: document.getElementById('tabUserRegisterBtn'),
  tabAdminLoginBtn: document.getElementById('tabAdminLoginBtn'),
  tabUserLoginContent: document.getElementById('tabUserLoginContent'),
  tabUserRegisterContent: document.getElementById('tabUserRegisterContent'),
  tabAdminLoginContent: document.getElementById('tabAdminLoginContent'),
  adminDashboardView: document.getElementById('adminDashboardView'),
  // User Login Form
  userLoginForm: document.getElementById('userLoginForm'),
  userEmail: document.getElementById('userEmail'),
  userPassword: document.getElementById('userPassword'),
  userLoginError: document.getElementById('userLoginError'),
  // User Register Form
  userRegisterForm: document.getElementById('userRegisterForm'),
  regFullName: document.getElementById('regFullName'),
  regEmail: document.getElementById('regEmail'),
  regUserType: document.getElementById('regUserType'),
  regPassword: document.getElementById('regPassword'),
  regError: document.getElementById('regError'),
  regSuccess: document.getElementById('regSuccess'),
  // Admin Elements
  adminLoginForm: document.getElementById('adminLoginForm'),
  adminUsername: document.getElementById('adminUsername'),
  adminPassword: document.getElementById('adminPassword'),
  adminLoginError: document.getElementById('adminLoginError'),
  adminUserDisplayName: document.getElementById('adminUserDisplayName'),
  adminLogoutBtn: document.getElementById('adminLogoutBtn'),
  adminPlacesTableBody: document.getElementById('adminPlacesTableBody'),
  showAddPlaceFormBtn: document.getElementById('showAddPlaceFormBtn'),
  addPlaceFormContainer: document.getElementById('addPlaceFormContainer'),
  createPlaceForm: document.getElementById('createPlaceForm'),
  cancelAddPlaceBtn: document.getElementById('cancelAddPlaceBtn'),
  newPlaceCategory: document.getElementById('newPlaceCategory'),
  // Export Modal
  exportModal: document.getElementById('exportModal'),
  closeExportModalBtn: document.getElementById('closeExportModalBtn'),
  exportContentBox: document.getElementById('exportContentBox'),
  copyExportTextBtn: document.getElementById('copyExportTextBtn'),
  printItineraryBtn: document.getElementById('printItineraryBtn')
};

// Default fallback photo if link fails to load
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=600&auto=format&fit=crop&q=80';

// =============================================================================
// INITIALIZATION
// =============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  restoreSavedUserSession();
  await loadTaxonomies();
  await loadPlaces();
  restoreSavedItinerary();
});

// =============================================================================
// API DATA FETCHING
// =============================================================================

async function loadTaxonomies() {
  try {
    const res = await fetch('/api/taxonomies');
    const data = await res.json();
    if (data.success) {
      state.categories = data.categories;
      state.vibes = data.vibes;
      state.activities = data.activities;
      renderTaxonomyControls();
    }
  } catch (error) {
    console.error('[RouteCraft] Failed to load taxonomies:', error);
  }
}

async function loadPlaces() {
  try {
    elements.resultsCount.innerText = 'Updating catalog...';
    const params = new URLSearchParams();

    if (state.selectedCategory !== 'All') params.append('category', state.selectedCategory);
    if (state.searchKeyword) params.append('search', state.searchKeyword);
    if (state.selectedVibe) params.append('tag', state.selectedVibe);
    if (state.selectedActivity) params.append('tag', state.selectedActivity);

    const res = await fetch(`/api/places?${params.toString()}`);
    const result = await res.json();

    if (result.success) {
      state.allPlaces = result.data;
      sortAndRenderPlaces();
    }
  } catch (error) {
    console.error('[RouteCraft] Error fetching destinations:', error);
    elements.placesGrid.innerHTML = `<div class="empty-state"><p>Error connecting to backend server.</p></div>`;
  }
}

// =============================================================================
// UI RENDERING ENGINE (CARDS WITH WORKING PHOTOS)
// =============================================================================

function renderTaxonomyControls() {
  let chipsHtml = `<button class="filter-chip ${state.selectedCategory === 'All' ? 'active' : ''}" data-category="All">All Attractions</button>`;
  state.categories.forEach(cat => {
    chipsHtml += `<button class="filter-chip ${state.selectedCategory === cat.CategoryName ? 'active' : ''}" data-category="${cat.CategoryName}">${cat.CategoryName}</button>`;
  });
  elements.categoryChips.innerHTML = chipsHtml;

  elements.vibeFilter.innerHTML = `<option value="">Filter by Vibe (Atmosphere)</option>` +
    state.vibes.map(v => `<option value="${v.TagName}">${v.TagName}</option>`).join('');

  elements.activityFilter.innerHTML = `<option value="">Filter by Activity</option>` +
    state.activities.map(a => `<option value="${a.TagName}">${a.TagName}</option>`).join('');

  elements.newPlaceCategory.innerHTML = state.categories.map(c => 
    `<option value="${c.CategoryID}">${c.CategoryName}</option>`
  ).join('');
}

function sortAndRenderPlaces() {
  let places = [...state.allPlaces];

  if (state.sortOrder === 'distance') {
    places.sort((a, b) => parseFloat(a.DistanceFromCenter) - parseFloat(b.DistanceFromCenter));
  } else if (state.sortOrder === 'name') {
    places.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  elements.resultsCount.innerText = `Showing ${places.length} verified destination${places.length === 1 ? '' : 's'}`;

  if (places.length === 0) {
    elements.placesGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🔎</div>
        <p>No destinations match your criteria.</p>
        <span>Try adjusting your keyword, vibe, or category filters.</span>
      </div>`;
    return;
  }

  elements.placesGrid.innerHTML = places.map(p => {
    const isAdded = state.itinerary.includes(p.PlaceID);
    const pills = (p.tags || []).slice(0, 3).map(t => `<span class="pill-sm">${t.TagName}</span>`).join('');
    const photoUrl = p.ImageUrl && p.ImageUrl.trim() !== '' ? p.ImageUrl : FALLBACK_IMAGE;

    return `
      <article class="place-card">
        <div class="card-image-box">
          <img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(p.Name)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';">
          <div class="card-image-overlay">
            <span class="category-tag">${escapeHtml(p.CategoryName)}</span>
            <span class="card-distance-badge">${p.DistanceFromCenter} km</span>
          </div>
        </div>

        <div class="card-body">
          <h3 class="card-title">${escapeHtml(p.Name)}</h3>
          <p class="card-description">${escapeHtml(p.Description)}</p>
          <div class="card-pills">${pills}</div>
          <div class="card-footer">
            <button class="btn btn-outline btn-sm" onclick="openPlaceDetails(${p.PlaceID})">View Details</button>
            <button class="btn ${isAdded ? 'btn-secondary' : 'btn-primary'} btn-sm" 
              onclick="toggleItineraryStop(${p.PlaceID})" 
              id="btnTrip-${p.PlaceID}">
              ${isAdded ? '✓ Added' : '+ Add to Trip'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// =============================================================================
// ITINERARY WORKSPACE & METRICS ENGINE
// =============================================================================

function toggleItineraryStop(placeId) {
  const index = state.itinerary.indexOf(placeId);
  if (index === -1) {
    state.itinerary.push(placeId);
  } else {
    state.itinerary.splice(index, 1);
  }
  saveItineraryState();
  updateItineraryUI();
  sortAndRenderPlaces();
}

function moveItineraryItem(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= state.itinerary.length) return;

  const temp = state.itinerary[index];
  state.itinerary[index] = state.itinerary[targetIndex];
  state.itinerary[targetIndex] = temp;

  saveItineraryState();
  updateItineraryUI();
}

async function updateItineraryUI() {
  const count = state.itinerary.length;
  elements.itineraryCountBadge.innerText = `${count} stop${count === 1 ? '' : 's'}`;
  elements.clearItineraryBtn.disabled = count === 0;
  elements.exportItineraryBtn.disabled = count === 0;

  if (count === 0) {
    elements.itineraryStopsList.innerHTML = '';
    elements.itineraryStopsList.appendChild(elements.emptyItineraryState);
    elements.metricDistance.innerText = '0.00 km';
    elements.metricDuration.innerText = '0h 0m';
    elements.timeWarningBanner.classList.add('hidden');
    return;
  }

  try {
    const res = await fetch('/api/itinerary/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placeIds: state.itinerary })
    });
    const result = await res.json();

    if (result.success) {
      state.currentMetrics = result.metrics;
      const ordered = result.orderedPlaces;

      elements.itineraryStopsList.innerHTML = ordered.map((item, idx) => `
        <div class="itinerary-item">
          <div class="stop-info">
            <span class="stop-index">#${idx + 1}</span>
            <span class="stop-title" title="${escapeHtml(item.Name)}">${escapeHtml(item.Name)}</span>
            <span class="stop-sub">Dwell: ${item.EstVisitDurationMins}m | Ref Dist: ${item.DistanceFromCenter}km</span>
          </div>
          <div class="stop-controls">
            <button class="stop-btn" onclick="moveItineraryItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''} title="Move Up">▲</button>
            <button class="stop-btn" onclick="moveItineraryItem(${idx}, 1)" ${idx === ordered.length - 1 ? 'disabled' : ''} title="Move Down">▼</button>
            <button class="stop-btn delete" onclick="toggleItineraryStop(${item.PlaceID})" title="Remove Stop">&times;</button>
          </div>
        </div>
      `).join('');

      elements.metricDistance.innerText = `${result.metrics.totalDistanceKm} km`;
      elements.metricDuration.innerText = result.metrics.totalDurationFormatted;

      if (result.metrics.isOverScheduled) {
        elements.timeWarningBanner.classList.remove('hidden');
        elements.warningBannerText.innerText = result.metrics.warningBanner;
      } else {
        elements.timeWarningBanner.classList.add('hidden');
      }
    }
  } catch (error) {
    console.error('[RouteCraft] Error calculating route metrics:', error);
  }
}

// =============================================================================
// PLACE DETAIL MODAL (WITH PHOTO)
// =============================================================================

async function openPlaceDetails(placeId) {
  try {
    const res = await fetch(`/api/places/${placeId}`);
    const result = await res.json();
    if (!result.success) return;

    const p = result.data;
    const photoUrl = p.ImageUrl && p.ImageUrl.trim() !== '' ? p.ImageUrl : FALLBACK_IMAGE;

    elements.modalPlaceImage.src = photoUrl;
    elements.modalPlaceImage.onerror = () => { elements.modalPlaceImage.src = FALLBACK_IMAGE; };
    elements.modalPlaceTitle.innerText = p.Name;
    elements.modalCategoryBadge.innerText = p.CategoryName;
    elements.modalDistanceBadge.innerText = `${p.DistanceFromCenter} km from Kiniyama`;
    elements.modalPlaceDescription.innerText = p.Description;
    elements.modalHours.innerText = p.OpeningHours || '08:00 AM - 05:00 PM';
    elements.modalEntrance.innerText = p.EntranceFee || 'Free Admission';
    elements.modalParking.innerText = p.ParkingAvailable ? 'On-site Parking Available' : 'Street/Limited Parking';
    elements.modalContact.innerText = p.ContactInfo || 'Not Available';
    elements.modalDuration.innerText = `${p.EstVisitDurationMins} minutes`;

    elements.modalTagsWrapper.innerHTML = (p.tags || []).map(t => 
      `<span class="pill-sm">${t.TagName} (${t.TagType})</span>`
    ).join('') || '<span class="text-muted" style="font-size: 0.8rem;">No tags assigned.</span>';

    elements.modalMapsLink.href = p.GoogleMapsUrl || `https://maps.google.com/?q=${p.Latitude},${p.Longitude}`;

    const isAdded = state.itinerary.includes(p.PlaceID);
    elements.modalAddToTripBtn.innerText = isAdded ? 'Remove from Itinerary' : '+ Add to Itinerary';
    elements.modalAddToTripBtn.onclick = () => {
      toggleItineraryStop(p.PlaceID);
      openPlaceDetails(p.PlaceID);
    };

    elements.placeDetailModal.classList.remove('hidden');
  } catch (err) {
    console.error('[RouteCraft] Error opening place details:', err);
  }
}

// =============================================================================
// AUTHENTICATION PORTAL (USER LOGIN / REGISTER / ADMIN LOGIN)
// =============================================================================

function switchAuthTab(tabName) {
  [elements.tabUserLoginBtn, elements.tabUserRegisterBtn, elements.tabAdminLoginBtn].forEach(b => b.classList.remove('active'));
  [elements.tabUserLoginContent, elements.tabUserRegisterContent, elements.tabAdminLoginContent, elements.adminDashboardView].forEach(c => c.classList.add('hidden'));

  elements.authTabsNav.classList.remove('hidden');

  if (tabName === 'userLogin') {
    elements.tabUserLoginBtn.classList.add('active');
    elements.tabUserLoginContent.classList.remove('hidden');
    elements.authModalTitle.innerText = 'User Login';
  } else if (tabName === 'userRegister') {
    elements.tabUserRegisterBtn.classList.add('active');
    elements.tabUserRegisterContent.classList.remove('hidden');
    elements.authModalTitle.innerText = 'Create Traveler Account';
  } else if (tabName === 'adminLogin') {
    elements.tabAdminLoginBtn.classList.add('active');
    elements.tabAdminLoginContent.classList.remove('hidden');
    elements.authModalTitle.innerText = 'Admin Portal';
  } else if (tabName === 'adminDashboard') {
    elements.authTabsNav.classList.add('hidden');
    elements.adminDashboardView.classList.remove('hidden');
    elements.authModalTitle.innerText = 'Administrative Control Panel';
  }
}

function updateAuthButtonDisplay() {
  if (state.activeAdmin) {
    elements.authBtnLabel.innerText = `🔒 Admin (${state.activeAdmin.username})`;
  } else if (state.currentUser) {
    elements.authBtnLabel.innerText = `👤 ${state.currentUser.fullName}`;
  } else {
    elements.authBtnLabel.innerText = 'Login / Register';
  }
}

// User Login Submit
elements.userLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  elements.userLoginError.classList.add('hidden');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: elements.userEmail.value,
        password: elements.userPassword.value
      })
    });
    const data = await res.json();

    if (data.success) {
      state.currentUser = data.user;
      localStorage.setItem('routecraft_user', JSON.stringify(data.user));
      updateAuthButtonDisplay();
      elements.authModal.classList.add('hidden');
      alert(`Welcome back, ${data.user.fullName}!`);
    } else {
      elements.userLoginError.innerText = data.message || 'Login failed.';
      elements.userLoginError.classList.remove('hidden');
    }
  } catch (err) {
    elements.userLoginError.innerText = 'Network error during login.';
    elements.userLoginError.classList.remove('hidden');
  }
});

// User Register Submit
elements.userRegisterForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  elements.regError.classList.add('hidden');
  elements.regSuccess.classList.add('hidden');

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: elements.regFullName.value,
        email: elements.regEmail.value,
        userType: elements.regUserType.value,
        password: elements.regPassword.value
      })
    });
    const data = await res.json();

    if (data.success) {
      elements.regSuccess.innerText = data.message;
      elements.regSuccess.classList.remove('hidden');
      elements.userRegisterForm.reset();
      setTimeout(() => switchAuthTab('userLogin'), 1500);
    } else {
      elements.regError.innerText = data.message || 'Registration failed.';
      elements.regError.classList.remove('hidden');
    }
  } catch (err) {
    elements.regError.innerText = 'Network error during registration.';
    elements.regError.classList.remove('hidden');
  }
});

// Admin Login Submit
elements.adminLoginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  elements.adminLoginError.classList.add('hidden');

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: elements.adminUsername.value,
        password: elements.adminPassword.value
      })
    });
    const data = await res.json();

    if (data.success) {
      state.activeAdmin = data.admin;
      updateAuthButtonDisplay();
      elements.adminSessionStatus.innerText = 'Admin Session Active';
      elements.adminUserDisplayName.innerText = data.admin.username;
      switchAuthTab('adminDashboard');
      loadAdminPlaces();
    } else {
      elements.adminLoginError.innerText = data.message || 'Invalid credentials.';
      elements.adminLoginError.classList.remove('hidden');
    }
  } catch (err) {
    elements.adminLoginError.innerText = 'Network error during admin authentication.';
    elements.adminLoginError.classList.remove('hidden');
  }
});

elements.adminLogoutBtn.addEventListener('click', () => {
  state.activeAdmin = null;
  updateAuthButtonDisplay();
  switchAuthTab('userLogin');
});

// Load Admin Places Table
async function loadAdminPlaces() {
  try {
    const res = await fetch('/api/admin/places');
    const result = await res.json();
    if (result.success) {
      elements.adminPlacesTableBody.innerHTML = result.data.map(p => `
        <tr>
          <td>${p.PlaceID}</td>
          <td><strong>${escapeHtml(p.Name)}</strong></td>
          <td>${escapeHtml(p.CategoryName)}</td>
          <td>${p.DistanceFromCenter} km</td>
          <td>
            <span class="status-badge ${p.IsDeleted ? 'status-deleted' : 'status-active'}">
              ${p.IsDeleted ? 'Soft-Deleted' : 'Active'}
            </span>
          </td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="togglePlaceStatus(${p.PlaceID})">
              ${p.IsDeleted ? 'Restore' : 'Soft-Delete'}
            </button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('[RouteCraft Admin] Error loading places:', err);
  }
}

async function togglePlaceStatus(placeId) {
  try {
    const res = await fetch(`/api/admin/places/${placeId}/toggle-status`, { method: 'PUT' });
    const result = await res.json();
    if (result.success) {
      await loadAdminPlaces();
      await loadPlaces();
    }
  } catch (err) {
    console.error('[RouteCraft Admin] Status toggle error:', err);
  }
}

// Admin Create Place
elements.createPlaceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById('newPlaceName').value,
    categoryId: document.getElementById('newPlaceCategory').value,
    distanceFromCenter: document.getElementById('newPlaceDistance').value,
    latitude: document.getElementById('newPlaceLat').value,
    longitude: document.getElementById('newPlaceLon').value,
    estVisitDurationMins: document.getElementById('newPlaceDuration').value,
    description: document.getElementById('newPlaceDesc').value,
    googleMapsUrl: `https://maps.google.com/?q=${document.getElementById('newPlaceLat').value},${document.getElementById('newPlaceLon').value}`
  };

  const imgVal = document.getElementById('newPlaceImage').value;
  if (imgVal && imgVal.trim()) {
    payload.imageUrl = imgVal.trim();
  }

  try {
    const res = await fetch('/api/admin/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.success) {
      alert('Destination successfully registered!');
      elements.createPlaceForm.reset();
      elements.addPlaceFormContainer.classList.add('hidden');
      await loadAdminPlaces();
      await loadPlaces();
    } else {
      alert(data.message || 'Error creating destination.');
    }
  } catch (err) {
    alert('Network error registering destination.');
  }
});

// =============================================================================
// CLEAN ITINERARY PRINT / SAVE AS PDF GENERATOR (REQ-FUNC-11)
// =============================================================================

function generateExportSummary() {
  if (!state.currentMetrics || state.itinerary.length === 0) return;

  const m = state.currentMetrics;
  let text = `===========================================================\n`;
  text += `   ROUTECRAFT: REGIONAL DAY-TRIP ITINERARY SUMMARY\n`;
  text += `   Target Region: Kiniyama, Sri Lanka (25 km radius)\n`;
  text += `   Generated: ${new Date().toLocaleString()}\n`;
  if (state.currentUser) {
    text += `   Crafted for: ${state.currentUser.fullName} (${state.currentUser.userType})\n`;
  }
  text += `===========================================================\n\n`;

  text += `TOTAL METRICS:\n`;
  text += `• Total Stops: ${m.totalStops}\n`;
  text += `• Cumulative Road Distance: ${m.totalDistanceKm} km\n`;
  text += `• Total Day Duration: ${m.totalDurationFormatted} (${m.totalDurationMinutes} mins)\n`;
  text += `• Viability Status: ${m.isOverScheduled ? 'OVER-SCHEDULED (> 8.0 hrs)' : 'VIABLE SINGLE-DAY PLAN'}\n\n`;

  if (m.warningBanner) {
    text += `[NOTICE] ${m.warningBanner}\n\n`;
  }

  text += `VISIT SEQUENCE:\n`;
  const orderedPlaces = state.itinerary.map(id => state.allPlaces.find(p => p.PlaceID === id)).filter(Boolean);

  orderedPlaces.forEach((p, idx) => {
    text += `${idx + 1}. ${p.Name} (${p.CategoryName})\n`;
    text += `   - Distance from Kiniyama: ${p.DistanceFromCenter} km\n`;
    text += `   - Operating Hours: ${p.OpeningHours}\n`;
    text += `   - Expected Dwell Time: ${p.EstVisitDurationMins} minutes\n`;
    text += `   - Map Link: ${p.GoogleMapsUrl}\n\n`;
  });

  text += `===========================================================\n`;
  text += `Prepared via RouteCraft - Developed by H.M.D.C. Herath (E2410120)\n`;

  elements.exportContentBox.textContent = text;
  elements.exportModal.classList.remove('hidden');
}

/**
 * Creates an elegant, clean document window with ALL stops and triggers native print/PDF save.
 * Solves the issue of cropped text, scrollbars, and dark screen captures.
 */
function printItineraryDocument() {
  if (!state.currentMetrics || state.itinerary.length === 0) return;

  const m = state.currentMetrics;
  const orderedPlaces = state.itinerary.map(id => state.allPlaces.find(p => p.PlaceID === id)).filter(Boolean);

  let rowsHtml = '';
  orderedPlaces.forEach((p, idx) => {
    rowsHtml += `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 8px; font-weight: bold; color: #0b6bcb; vertical-align: top;">#${idx + 1}</td>
        <td style="padding: 10px 8px; vertical-align: top;">
          <strong style="font-size: 14px; color: #0f172a;">${escapeHtml(p.Name)}</strong>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
            <span style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(p.CategoryName)}</span>
            &nbsp;•&nbsp; ${p.DistanceFromCenter} km from Kiniyama
          </div>
          <div style="font-size: 11px; color: #475569; margin-top: 4px;">
            <strong>Hours:</strong> ${escapeHtml(p.OpeningHours)} &nbsp;|&nbsp; 
            <strong>Fee:</strong> ${escapeHtml(p.EntranceFee)}
          </div>
          <div style="font-size: 11px; margin-top: 4px;">
            <a href="${p.GoogleMapsUrl}" target="_blank" style="color: #0284c7; text-decoration: none;">📍 Open Google Maps Link</a>
          </div>
        </td>
        <td style="padding: 10px 8px; text-align: center; vertical-align: top; font-weight: 600; font-size: 13px;">
          ${p.EstVisitDurationMins} min
        </td>
      </tr>
    `;
  });

  const printHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>RouteCraft Itinerary - Kiniyama Day-Trip</title>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1e293b;
          margin: 0;
          padding: 24px;
          background: #fff;
        }
        .header {
          border-bottom: 2px solid #0b6bcb;
          padding-bottom: 12px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .header-title h1 {
          margin: 0;
          font-size: 22px;
          color: #0b6bcb;
        }
        .header-title p {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: #64748b;
        }
        .meta-info {
          text-align: right;
          font-size: 11px;
          color: #64748b;
        }
        .metrics-card {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .metric-box strong {
          display: block;
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
        }
        .metric-box span {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }
        .warning-box {
          background: #fffbeb;
          border: 1px solid #fcd34d;
          color: #92400e;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          margin-bottom: 16px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
        }
        th {
          background: #f1f5f9;
          text-align: left;
          padding: 8px;
          font-size: 11px;
          color: #475569;
          text-transform: uppercase;
          border-bottom: 2px solid #cbd5e1;
        }
        .footer {
          margin-top: 30px;
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
          font-size: 11px;
          color: #94a3b8;
          display: flex;
          justify-content: space-between;
        }
        @media print {
          body { padding: 0; }
          a { text-decoration: underline; color: #0b6bcb; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="header-title">
          <h1>🧭 RouteCraft: Regional Day-Trip Itinerary</h1>
          <p>Curated Day-Trip Plan for Kiniyama & Surroundings (25 km Scope)</p>
        </div>
        <div class="meta-info">
          <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
          <div>${state.currentUser ? `<strong>Traveler:</strong> ${escapeHtml(state.currentUser.fullName)}` : 'Guest Planner'}</div>
        </div>
      </div>

      <div class="metrics-card">
        <div class="metric-box">
          <strong>Total Stops</strong>
          <span>${m.totalStops} Locations</span>
        </div>
        <div class="metric-box">
          <strong>Road Distance</strong>
          <span>${m.totalDistanceKm} km</span>
        </div>
        <div class="metric-box">
          <strong>Est. Duration</strong>
          <span>${m.totalDurationFormatted}</span>
        </div>
        <div class="metric-box">
          <strong>Plan Status</strong>
          <span style="color: ${m.isOverScheduled ? '#dc2626' : '#16a34a'};">
            ${m.isOverScheduled ? 'Over-Scheduled' : 'Viable Plan'}
          </span>
        </div>
      </div>

      ${m.warningBanner ? `<div class="warning-box">⚠️ ${escapeHtml(m.warningBanner)}</div>` : ''}

      <table>
        <thead>
          <tr>
            <th style="width: 35px;">#</th>
            <th>Attraction Details & Directions</th>
            <th style="width: 90px; text-align: center;">Dwell Time</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div class="footer">
        <div>RouteCraft System • Prepared by H.M.D.C. Herath (E2410120) • University of Moratuwa</div>
        <div>Page 1 of 1</div>
      </div>

      <script>
        window.onload = function() {
          window.focus();
          window.print();
          window.onafterprint = function() { window.close(); };
        };
      <\/script>
    </body>
    </html>
  `;

  // Open in a dedicated, clean window and trigger print dialog
  const printWindow = window.open('', '_blank', 'width=850,height=900');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
  } else {
    // If popup was blocked by browser, fallback to direct print
    alert('Please allow popups for RouteCraft so the print window can open cleanly.');
  }
}

// =============================================================================
// EVENT LISTENERS & SETUP
// =============================================================================

function setupEventListeners() {
  let debounceTimer;
  elements.searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.searchKeyword = e.target.value;
      loadPlaces();
    }, 250);
  });

  elements.categoryChips.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-chip')) {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      state.selectedCategory = e.target.getAttribute('data-category');
      loadPlaces();
    }
  });

  elements.vibeFilter.addEventListener('change', (e) => {
    state.selectedVibe = e.target.value;
    loadPlaces();
  });

  elements.activityFilter.addEventListener('change', (e) => {
    state.selectedActivity = e.target.value;
    loadPlaces();
  });

  elements.resetFiltersBtn.addEventListener('click', () => {
    state.searchKeyword = '';
    state.selectedCategory = 'All';
    state.selectedVibe = '';
    state.selectedActivity = '';
    elements.searchInput.value = '';
    elements.vibeFilter.value = '';
    elements.activityFilter.value = '';
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    document.querySelector('.filter-chip[data-category="All"]').classList.add('active');
    loadPlaces();
  });

  elements.sortOrder.addEventListener('change', (e) => {
    state.sortOrder = e.target.value;
    sortAndRenderPlaces();
  });

  elements.clearItineraryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your current itinerary?')) {
      state.itinerary = [];
      saveItineraryState();
      updateItineraryUI();
      sortAndRenderPlaces();
    }
  });

  elements.exportItineraryBtn.addEventListener('click', generateExportSummary);

  // Modal Closers
  elements.closeDetailModalBtn.addEventListener('click', () => elements.placeDetailModal.classList.add('hidden'));
  elements.closeExportModalBtn.addEventListener('click', () => elements.exportModal.classList.add('hidden'));
  elements.closeAuthModalBtn.addEventListener('click', () => elements.authModal.classList.add('hidden'));

  // Auth Portal Button
  elements.authPortalBtn.addEventListener('click', () => {
    if (state.currentUser) {
      if (confirm(`You are logged in as ${state.currentUser.fullName}. Do you want to log out?`)) {
        state.currentUser = null;
        localStorage.removeItem('routecraft_user');
        updateAuthButtonDisplay();
      }
      return;
    }

    if (state.activeAdmin) {
      switchAuthTab('adminDashboard');
    } else {
      switchAuthTab('userLogin');
    }
    elements.authModal.classList.remove('hidden');
  });

  // Tab Switching
  elements.tabUserLoginBtn.addEventListener('click', () => switchAuthTab('userLogin'));
  elements.tabUserRegisterBtn.addEventListener('click', () => switchAuthTab('userRegister'));
  elements.tabAdminLoginBtn.addEventListener('click', () => switchAuthTab('adminLogin'));

  // Add Place form controls
  elements.showAddPlaceFormBtn.addEventListener('click', () => elements.addPlaceFormContainer.classList.toggle('hidden'));
  elements.cancelAddPlaceBtn.addEventListener('click', () => elements.addPlaceFormContainer.classList.add('hidden'));

  // Export Modal Actions
  elements.copyExportTextBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(elements.exportContentBox.textContent)
      .then(() => alert('Itinerary copied to clipboard!'))
      .catch(() => alert('Failed to copy text.'));
  });

  // NEW: Triggers the dedicated clean print document
  elements.printItineraryBtn.addEventListener('click', () => {
    printItineraryDocument();
  });
}

function saveItineraryState() {
  localStorage.setItem('routecraft_itinerary', JSON.stringify(state.itinerary));
}

function restoreSavedItinerary() {
  try {
    const saved = localStorage.getItem('routecraft_itinerary');
    if (saved) {
      state.itinerary = JSON.parse(saved);
      updateItineraryUI();
    }
  } catch (e) {
    console.warn('[RouteCraft] Could not restore saved session.');
  }
}

function restoreSavedUserSession() {
  try {
    const savedUser = localStorage.getItem('routecraft_user');
    if (savedUser) {
      state.currentUser = JSON.parse(savedUser);
      updateAuthButtonDisplay();
    }
  } catch (e) {
    console.warn('[RouteCraft] User session restore error.');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}