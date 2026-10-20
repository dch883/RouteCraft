/**
 * RouteCraft: Client-Side Single Page Application (SPA) Engine
 * 
 * Student: H.M.D.C. Herath
 * Registration Number: E2410120
 * Institution: University of Moratuwa
 * 
 * Implements: REQ-FUNC-01 to REQ-FUNC-18 & Haversine Metric Integration
 */

// Application State Management
const state = {
  allPlaces: [],
  filteredPlaces: [],
  categories: [],
  vibes: [],
  activities: [],
  selectedCategory: 'All',
  selectedVibe: '',
  selectedActivity: '',
  searchKeyword: '',
  sortOrder: 'distance',
  itinerary: [], // Array of Place IDs [1, 6, 4]
  currentMetrics: null,
  activeAdmin: null
};

// DOM Element References
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
  // Admin Portal Modal
  adminModal: document.getElementById('adminModal'),
  adminLoginBtn: document.getElementById('adminLoginBtn'),
  closeAdminModalBtn: document.getElementById('closeAdminModalBtn'),
  adminLoginFormView: document.getElementById('adminLoginFormView'),
  adminDashboardView: document.getElementById('adminDashboardView'),
  adminLoginForm: document.getElementById('adminLoginForm'),
  adminUsername: document.getElementById('adminUsername'),
  adminPassword: document.getElementById('adminPassword'),
  adminLoginError: document.getElementById('adminLoginError'),
  adminSessionStatus: document.getElementById('adminSessionStatus'),
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

// =============================================================================
// INITIALIZATION
// =============================================================================
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  await loadTaxonomies();
  await loadPlaces();
  restoreSavedItinerary();
});

// =============================================================================
// API DATA FETCHING
// =============================================================================

/**
 * Loads taxonomies (categories, vibes, activities)
 */
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

/**
 * Fetches destination catalog matching active filters (REQ-FUNC-01 - 05)
 */
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
// UI RENDERING ENGINE
// =============================================================================

function renderTaxonomyControls() {
  // 1. Render Category Filter Chips
  let chipsHtml = `<button class="filter-chip ${state.selectedCategory === 'All' ? 'active' : ''}" data-category="All">All Attractions</button>`;
  state.categories.forEach(cat => {
    chipsHtml += `<button class="filter-chip ${state.selectedCategory === cat.CategoryName ? 'active' : ''}" data-category="${cat.CategoryName}">${cat.CategoryName}</button>`;
  });
  elements.categoryChips.innerHTML = chipsHtml;

  // 2. Populate Dropdowns
  elements.vibeFilter.innerHTML = `<option value="">Filter by Vibe (Atmosphere)</option>` +
    state.vibes.map(v => `<option value="${v.TagName}">${v.TagName}</option>`).join('');

  elements.activityFilter.innerHTML = `<option value="">Filter by Activity</option>` +
    state.activities.map(a => `<option value="${a.TagName}">${a.TagName}</option>`).join('');

  // 3. Category Select in Admin Form
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

    return `
      <article class="place-card">
        <div class="card-body">
          <div class="card-top">
            <span class="category-tag">${escapeHtml(p.CategoryName)}</span>
            <span class="distance-badge">${p.DistanceFromCenter} km</span>
          </div>
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
// ITINERARY WORKSPACE & CALCULATION ENGINE (SRS Feature 2)
// =============================================================================

function toggleItineraryStop(placeId) {
  const index = state.itinerary.indexOf(placeId);
  if (index === -1) {
    // REQ-FUNC-06: Add stop
    state.itinerary.push(placeId);
  } else {
    // Remove stop
    state.itinerary.splice(index, 1);
  }
  saveItineraryState();
  updateItineraryUI();
  sortAndRenderPlaces();
}

function moveItineraryItem(index, direction) {
  // REQ-FUNC-07: Custom sequence reordering
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

  // Request Route Metrics from Backend (REQ-FUNC-08, 09, 10 & Diagram 3)
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

      // Render Reorderable Stops
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

      // Update Metric Values
      elements.metricDistance.innerText = `${result.metrics.totalDistanceKm} km`;
      elements.metricDuration.innerText = result.metrics.totalDurationFormatted;

      // REQ-FUNC-10: 8-Hour Over-Scheduled Warning Banner
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
// PLACE DETAIL MODAL (SRS Figure 4 & REQ-FUNC-02)
// =============================================================================

async function openPlaceDetails(placeId) {
  try {
    const res = await fetch(`/api/places/${placeId}`);
    const result = await res.json();
    if (!result.success) return;

    const p = result.data;
    elements.modalPlaceTitle.innerText = p.Name;
    elements.modalCategoryBadge.innerText = p.CategoryName;
    elements.modalDistanceBadge.innerText = `${p.DistanceFromCenter} km from Kiniyama`;
    elements.modalPlaceDescription.innerText = p.Description;
    elements.modalHours.innerText = p.OpeningHours || '08:00 AM - 05:00 PM';
    elements.modalEntrance.innerText = p.EntranceFee || 'Free Admission';
    elements.modalParking.innerText = p.ParkingAvailable ? 'On-site Parking Available' : 'Street/Limited Parking';
    elements.modalContact.innerText = p.ContactInfo || 'Not Available';
    elements.modalDuration.innerText = `${p.EstVisitDurationMins} minutes`;

    // Render Tag Pills
    elements.modalTagsWrapper.innerHTML = (p.tags || []).map(t => 
      `<span class="pill-sm">${t.TagName} (${t.TagType})</span>`
    ).join('') || '<span class="text-muted" style="font-size: 0.8rem;">No tags assigned.</span>';

    // External Maps URL (REQ-FUNC-14)
    elements.modalMapsLink.href = p.GoogleMapsUrl || `https://maps.google.com/?q=${p.Latitude},${p.Longitude}`;

    // Add to Itinerary Button handler
    const isAdded = state.itinerary.includes(p.PlaceID);
    elements.modalAddToTripBtn.innerText = isAdded ? 'Remove from Itinerary' : '+ Add to Itinerary';
    elements.modalAddToTripBtn.onclick = () => {
      toggleItineraryStop(p.PlaceID);
      openPlaceDetails(p.PlaceID); // Refresh modal button state
    };

    elements.placeDetailModal.classList.remove('hidden');
  } catch (err) {
    console.error('[RouteCraft] Error opening place details:', err);
  }
}

// =============================================================================
// ADMINISTRATIVE CONTROLS (SRS Figure 5, REQ-FUNC-15 to REQ-FUNC-18)
// =============================================================================

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
      await loadPlaces(); // Synchronize public catalog
    }
  } catch (err) {
    console.error('[RouteCraft Admin] Status toggle error:', err);
  }
}

// =============================================================================
// EXPORT SUMMARY GENERATOR (REQ-FUNC-11)
// =============================================================================

function generateExportSummary() {
  if (!state.currentMetrics || state.itinerary.length === 0) return;

  const m = state.currentMetrics;
  let text = `===========================================================\n`;
  text += `   ROUTECRAFT: REGIONAL DAY-TRIP ITINERARY SUMMARY\n`;
  text += `   Target Region: Kiniyama, Sri Lanka (25 km radius)\n`;
  text += `   Generated: ${new Date().toLocaleString()}\n`;
  text += `===========================================================\n\n`;

  text += `TOTAL METRICS:\n`;
  text += `• Total Stops: ${m.totalStops}\n`;
  text += `• Cumulative Distance: ${m.totalDistanceKm} km\n`;
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
  text += `Prepared via RouteCraft - Designed by H.M.D.C. Herath (E2410120)\n`;

  elements.exportContentBox.textContent = text;
  elements.exportModal.classList.remove('hidden');
}

// =============================================================================
// EVENT LISTENERS & HELPERS
// =============================================================================

function setupEventListeners() {
  // Search Input with Debounce
  let debounceTimer;
  elements.searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.searchKeyword = e.target.value;
      loadPlaces();
    }, 250);
  });

  // Category Filter Chips
  elements.categoryChips.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-chip')) {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      e.target.classList.add('active');
      state.selectedCategory = e.target.getAttribute('data-category');
      loadPlaces();
    }
  });

  // Dropdown Filters
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

  // Sorting
  elements.sortOrder.addEventListener('change', (e) => {
    state.sortOrder = e.target.value;
    sortAndRenderPlaces();
  });

  // Itinerary Controls
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
  elements.closeAdminModalBtn.addEventListener('click', () => elements.adminModal.classList.add('hidden'));

  // Admin Portal Triggers
  elements.adminLoginBtn.addEventListener('click', () => {
    elements.adminModal.classList.remove('hidden');
    if (!state.activeAdmin) {
      elements.adminLoginFormView.classList.remove('hidden');
      elements.adminDashboardView.classList.add('hidden');
    }
  });

  // Admin Login Submission
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
        elements.adminSessionStatus.innerText = 'Authenticated Session';
        elements.adminUserDisplayName.innerText = data.admin.username;
        elements.adminLoginFormView.classList.add('hidden');
        elements.adminDashboardView.classList.remove('hidden');
        loadAdminPlaces();
      } else {
        elements.adminLoginError.innerText = data.message || 'Invalid credentials.';
        elements.adminLoginError.classList.remove('hidden');
      }
    } catch (err) {
      elements.adminLoginError.innerText = 'Network error during authentication.';
      elements.adminLoginError.classList.remove('hidden');
    }
  });

  // Admin Logout
  elements.adminLogoutBtn.addEventListener('click', () => {
    state.activeAdmin = null;
    elements.adminSessionStatus.innerText = 'Authentication Required';
    elements.adminLoginFormView.classList.remove('hidden');
    elements.adminDashboardView.classList.add('hidden');
    elements.adminUsername.value = '';
    elements.adminPassword.value = '';
  });

  // Show/Hide Add Place Form
  elements.showAddPlaceFormBtn.addEventListener('click', () => elements.addPlaceFormContainer.classList.toggle('hidden'));
  elements.cancelAddPlaceBtn.addEventListener('click', () => elements.addPlaceFormContainer.classList.add('hidden'));

  // Create Place Submit (REQ-FUNC-16, 17)
  elements.createPlaceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById('newPlaceName').value,
      categoryId: document.getElementById('newPlaceCategory').value,
      distanceFromCenter: document.getElementById('newPlaceDistance').value,
      latitude: document.getElementById('newPlaceLat').value,
      longitude: document.getElementById('newPlaceLon').value,
      estVisitDurationMins: document.getElementById('newPlaceDuration').value,
      description: document.getElementById('newPlaceDesc').value
    };

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

  // Export Modal Actions
  elements.copyExportTextBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(elements.exportContentBox.textContent)
      .then(() => alert('Itinerary copied to clipboard!'))
      .catch(() => alert('Failed to copy text.'));
  });

  elements.printItineraryBtn.addEventListener('click', () => {
    window.print();
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

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}