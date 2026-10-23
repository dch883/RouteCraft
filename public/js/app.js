/**
 * RouteCraft: Client-Side Single Page Application (SPA) Engine
 */

// I18N DICTIONARY (IDEA 5)
const i18n = {
  en: {
    brandSubtitle: "Kiniyama Regional Day-Planner",
    navExplore: "Explore & Plan",
    navSavedTrips: "My Saved Trips",
    navAdminConsole: "Admin Console",
    searchPlaceholder: "Search attractions, heritage sites, nature...",
    allAttractions: "All Attractions",
    filterByVibe: "Filter by Vibe (Atmosphere)",
    filterByActivity: "Filter by Activity",
    btnReset: "Reset",
    itineraryTitle: "Your Single-Day Itinerary",
    itineraryDesc: "Assemble up to 10 stops within the 25 km Kiniyama zone.",
    btnViewRouteMap: "View Route Map",
    btnOptimizeSequence: "Optimize Sequence",
    warningTitle: "Over-Scheduled Warning",
    emptyItinerary: "No places added yet.",
    emptyItineraryHint: "Select '+ Add to Trip' on any destination card to begin crafting your route.",
    metricRoadDistance: "Estimated Road Distance:",
    metricDuration: "Cumulative Duration:",
    metricAdmission: "Estimated Admission Cost:",
    freeAdmission: "Free Admission",
    metricsSubtext: "Includes dwell time, rural transit (~35 km/h), & ticket fees.",
    btnClear: "Clear",
    btnSaveTrip: "Save Trip",
    btnExport: "Export",
    disclaimerTitle: "Guidance Disclaimer:",
    disclaimerText: "Distances and transit durations are Haversine-computed estimations intended strictly for day-trip guidance.",
    directoryTitle: "Destinations within 25 km of Kiniyama",
    sortBy: "Sort by:",
    sortDistance: "Distance from Center (Nearest)",
    sortName: "Alphabetical (A - Z)",
    btnViewDetails: "View Details",
    btnAddTrip: "+ Add to Trip",
    btnAdded: "✓ Added",
    btnRemoveTrip: "Remove from Itinerary",
    savedTripsHeading: "My Saved Day-Trip Itineraries",
    savedTripsSubtitle: "Review, reload, or print previously assembled trips for the Kiniyama region.",
    btnReturnPlanner: "← Return to Trip Planner",
    noSavedTrips: "No saved trips found.",
    noSavedTripsHint: "Craft a day-trip in the planner and click '💾 Save Trip' to store it in your account.",
    tabPhotos: "Photos",
    tabInAppMap: "In-App Map",
    btnOpenGoogleMaps: "Open External Google Maps (Directions)",
    aboutDestination: "About this Destination",
    travelTipsTitle: "Travel Tips & Visitor Etiquette",
    attrHours: "Operating Hours",
    attrEntrance: "Entrance Fee",
    attrParking: "Parking Availability",
    attrContact: "Contact Info",
    attrDuration: "Recommended Duration",
    attrScope: "Scope Status",
    scopeVerified: "Verified ≤ 25 km Zone",
    tagsTitle: "Vibe & Activity Tags",
    btnClose: "Close",
    badgeRouteMap: "Interactive Day-Trip Route",
    routeMapHeading: "Full Itinerary Journey Map",
    routeMapNote: "Stops are ordered sequentially. Dashed lines connect consecutive attractions.",
    btnCloseMap: "Close Map",
    tabUserLogin: "User Login",
    tabRegister: "Register",
    tabAdminPortal: "Admin Portal",
    loginInstruction: "Log in to save day trips and access trip history.",
    labelEmail: "Email Address",
    labelPassword: "Password",
    labelPasswordMin: "Password * (Min 6 characters)",
    labelFullName: "Full Name *",
    labelUserCategory: "User Category",
    labelAdminUsername: "Admin Username",
    btnSignIn: "Sign In",
    btnSignInAdmin: "Sign In as Administrator",
    btnCreateAccount: "Create Account",
    registerInstruction: "Create your traveler profile for planning trips around Kiniyama.",
    adminInstruction: "System Administrators only. Enter your credentials.",
    saveItineraryHeading: "Save Itinerary",
    labelTripTitle: "Trip Name / Title",
    btnConfirmSave: "Confirm & Save",
    exportHeading: "Day-Trip Itinerary Summary",
    btnCopyClipboard: "Copy to Clipboard",
    btnPrintPdf: "Print / Save as PDF",
    btnLoginRegister: "Login / Register",
    btnLogout: "Logout"
  },
  si: {
    brandSubtitle: "කිනියම ප්‍රාදේශීය එක්දින චාරිකා සැලසුම්කරු",
    navExplore: "ගවේෂණය සහ සැලසුම",
    navSavedTrips: "මගේ චාරිකා",
    navAdminConsole: "පරිපාලක පුවරුව",
    searchPlaceholder: "ආකර්ෂණීය ස්ථාන, උරුමයන් සොයන්න...",
    allAttractions: "සියලු ආකර්ෂණ",
    filterByVibe: "පරිසර ස්වභාවය අනුව තෝරන්න",
    filterByActivity: "ක්‍රියාකාරකම අනුව තෝරන්න",
    btnReset: "යළි පිහිටුවන්න",
    itineraryTitle: "ඔබගේ දින සැලසුම",
    itineraryDesc: "කිනියම සිට කි.මී. 25 සීමාව තුළ ස්ථාන 10ක් දක්වා තෝරාගන්න.",
    btnViewRouteMap: "මාර්ග සිතියම බලන්න",
    btnOptimizeSequence: "අනුපිළිවෙල ප්‍රශස්ත කරන්න",
    warningTitle: "කාලසීමාව ඉක්මවීමේ අනතුරු ඇඟවීම",
    emptyItinerary: "තවමත් කිසිදු ස්ථානයක් එක්කර නොමැත.",
    emptyItineraryHint: "ඔබේ චාරිකාව ආරම්භ කිරීමට ඕනෑම ස්ථානයක '+ චාරිකාවට එක්කරන්න' ඔබන්න.",
    metricRoadDistance: "ඇස්තමේන්තුගත දුර:",
    metricDuration: "මුළු ගතවන කාලය:",
    metricAdmission: "ඇස්තමේන්තුගත ඇතුල්වීමේ ගාස්තු:",
    freeAdmission: "නොමිලේ",
    metricsSubtext: "නැරඹුම් කාලය, ගමන් කාලය (~35 km/h) සහ ප්‍රවේශ පත්‍ර ගාස්තු ඇතුළත් වේ.",
    btnClear: "ඉවත් කරන්න",
    btnSaveTrip: "චාරිකාව සුරකින්න",
    btnExport: "අපනයනය",
    disclaimerTitle: "මාර්ගෝපදේශ වගකීම් ප්‍රකාශය:",
    disclaimerText: "දුර සහ ගමන් කාලයන් හෙවර්සයින් ගණනය කිරීම් වන අතර සැලසුම් මඟපෙන්වීම සඳහා පමණක් අදහස් කෙරේ.",
    directoryTitle: "කිනියම සිට කි.මී. 25 සීමාවේ ආකර්ෂණීය ස්ථාන",
    sortBy: "අනුපිළිවෙල:",
    sortDistance: "කිනියම සිට ආසන්නතම ස්ථාන",
    sortName: "අකාරාදී පිළිවෙල (A - Z)",
    btnViewDetails: "විස්තර බලන්න",
    btnAddTrip: "+ චාරිකාවට එක්කරන්න",
    btnAdded: "✓ එක්කර ඇත",
    btnRemoveTrip: "චාරිකාවෙන් ඉවත් කරන්න",
    savedTripsHeading: "මගේ සුරැකි එක්දින චාරිකා",
    savedTripsSubtitle: "කිනියම කලාපය සඳහා ඔබ මීට පෙර සුරැකි චාරිකා සමාලෝචනය කරන්න හෝ මුද්‍රණය කරන්න.",
    btnReturnPlanner: "← සැලසුම්කරු වෙත ආපසු",
    noSavedTrips: "සුරැකි චාරිකා හමු නොවීය.",
    noSavedTripsHint: "සැලසුම්කරු තුළ චාරිකාවක් සකස් කර එය මෙහි තබා ගැනීමට '💾 චාරිකාව සුරකින්න' ක්ලික් කරන්න.",
    tabPhotos: "ඡායාරූප",
    tabInAppMap: "සිතියම",
    btnOpenGoogleMaps: "ගූගල් සිතියමෙන් මාර්ගය බලන්න",
    aboutDestination: "මෙම ස්ථානය පිළිබඳව",
    travelTipsTitle: "සංචාරක උපදෙස් සහ චාරිත්‍ර වාරිත්‍ර",
    attrHours: "විවෘත වේලාවන්",
    attrEntrance: "ඇතුල්වීමේ ගාස්තුව",
    attrParking: "වාහන නැවැත්වීමේ පහසුකම්",
    attrContact: "සම්බන්ධතා තොරතුරු",
    attrDuration: "නිර්දේශිත කාලය",
    attrScope: "කලාපීය තත්ත්වය",
    scopeVerified: "කි.මී. 25 කලාපය තහවුරු කර ඇත",
    tagsTitle: "ටැග් සහ වර්ගීකරණයන්",
    btnClose: "වසන්න",
    badgeRouteMap: "සක්‍රීය චාරිකා සිතියම",
    routeMapHeading: "සම්පූර්ණ චාරිකා මාර්ග සිතියම",
    routeMapNote: "ස්ථාන අනුක්‍රමිකව සකසා ඇත. කඩ ඉරි මඟින් ගමන් මාර්ගය දක්වයි.",
    btnCloseMap: "සිතියම වසන්න",
    tabUserLogin: "පරිශීලක පිවිසුම",
    tabRegister: "ලියාපදිංචි වන්න",
    tabAdminPortal: "පරිපාලක ද්වාරය",
    loginInstruction: "චාරිකා සුරැකීමට සහ ඉතිහාසය බැලීමට ඔබගේ ගිණුමට ලොග් වන්න.",
    labelEmail: "විද්‍යුත් තැපැල් ලිපිනය",
    labelPassword: "මුරපදය",
    labelPasswordMin: "මුරපදය * (අවම අකුරු 6ක්)",
    labelFullName: "සම්පූර්ණ නම *",
    labelUserCategory: "පරිශීලක කාණ්ඩය",
    labelAdminUsername: "පරිපාලක නම",
    btnSignIn: "ඇතුල් වන්න",
    btnSignInAdmin: "පරිපාලක ලෙස ඇතුල් වන්න",
    btnCreateAccount: "ගිණුම සාදන්න",
    registerInstruction: "කිනියම වටා චාරිකා සැලසුම් කිරීම සඳහා ඔබගේ ගිණුම සාදාගන්න.",
    adminInstruction: "බලයලත් පද්ධති පරිපාලකයින් පමණි.",
    saveItineraryHeading: "චාරිකාව සුරකින්න",
    labelTripTitle: "චාරිකාවේ නම / මාතෘකාව",
    btnConfirmSave: "තහවුරු කර සුරකින්න",
    exportHeading: "එක්දින චාරිකා සාරාංශය",
    btnCopyClipboard: "පිටපත් කරගන්න",
    btnPrintPdf: "මුද්‍රණය / PDF සුරකින්න",
    btnLoginRegister: "පිවිසෙන්න / ලියාපදිංචි වන්න",
    btnLogout: "පිටවන්න"
  },
  ta: {
    brandSubtitle: "கினியம பிராந்திய ஒருநாள் பயணத் திட்டமிடுநர்",
    navExplore: "ஆராய்ந்து திட்டமிடு",
    navSavedTrips: "எனது பயணங்கள்",
    navAdminConsole: "நிர்வாக பலகை",
    searchPlaceholder: "சுற்றுலா தலங்கள், பாரம்பரியங்களை தேடுங்கள்...",
    allAttractions: "அனைத்து இடங்களும்",
    filterByVibe: "சூழல் சூழலின் அடிப்படையில்",
    filterByActivity: "செயல்பாட்டின் அடிப்படையில்",
    btnReset: "மீட்டமை",
    itineraryTitle: "உங்கள் ஒருநாள் பயணத் திட்டம்",
    itineraryDesc: "கினியம பகுதியில் 25 கி.மீ எல்லைக்குள் 10 இடங்கள் வரை தேர்ந்தெடுக்கவும்.",
    btnViewRouteMap: "பாதை வரைபடம்",
    btnOptimizeSequence: "வரிசையை சீரமைக்க",
    warningTitle: "அதிகப்படியான நேர எச்சரிக்கை",
    emptyItinerary: "இன்னும் இடங்கள் சேர்க்கப்படவில்லை.",
    emptyItineraryHint: "உங்கள் பயணத்தைத் தொடங்க ஏதேனும் இட அட்டையில் '+ பயணத்தில் சேர்' என்பதை அழுத்தவும்.",
    metricRoadDistance: "மதிப்பிடப்பட்ட தூரம்:",
    metricDuration: "மொத்த பயண நேரம்:",
    metricAdmission: "நுழைவுக்கட்டண செலவு:",
    freeAdmission: "இலவச அனுமதி",
    metricsSubtext: "பார்வை நேரம், வாகன பயண நேரம் (~35 km/h) மற்றும் டிக்கெட் கட்டணங்கள் அடங்கும்.",
    btnClear: "அழிக்க",
    btnSaveTrip: "பயணத்தை சேமிக்க",
    btnExport: "ஏற்றுமதி",
    disclaimerTitle: "வழிகாட்டுதல் பொறுப்புத்துறப்பு:",
    disclaimerText: "தூரங்கள் மற்றும் பயண நேரங்கள் கணிப்புகள் மட்டுமே; திட்டமிடல் வழிகாட்டலுக்கு மட்டுமே.",
    directoryTitle: "கினியமவிலிருந்து 25 கி.மீ எல்லைக்குள் உள்ள இடங்கள்",
    sortBy: "வரிசைப்படுத்து:",
    sortDistance: "அருகிலுள்ள இடங்கள்",
    sortName: "அகரவரிசை (A - Z)",
    btnViewDetails: "விவரங்களை காண்க",
    btnAddTrip: "+ பயணத்தில் சேர்",
    btnAdded: "✓ சேர்க்கப்பட்டது",
    btnRemoveTrip: "பயணத்திலிருந்து நீக்கு",
    savedTripsHeading: "எனது சேமித்த ஒருநாள் பயணங்கள்",
    savedTripsSubtitle: "முன்பு திட்டமிடப்பட்ட பயணங்களை மதிப்பாய்வு செய்யவும் அல்லது அச்சிடவும்.",
    btnReturnPlanner: "← திட்டமிடுபவருக்குத் திரும்பு",
    noSavedTrips: "சேமிக்கப்பட்ட பயணங்கள் எதுவும் இல்லை.",
    noSavedTripsHint: "திட்டமிடுபவரில் ஒரு பயணத்தை உருவாக்கி அதை சேமிக்க '💾 பயணத்தை சேமிக்க' என்பதைக் கிளிக் செய்யவும்.",
    tabPhotos: "புகைப்படங்கள்",
    tabInAppMap: "வரைபடம்",
    btnOpenGoogleMaps: "கூகிள் வரைபடத்தில் திசைகள்",
    aboutDestination: "இந்த இடத்தைப் பற்றி",
    travelTipsTitle: "பயணக் குறிப்புகள் மற்றும் ஆசாரங்கள்",
    attrHours: "திறக்கும் நேரம்",
    attrEntrance: "நுழைவு கட்டணம்",
    attrParking: "வாகனம் நிறுத்துமிடம்",
    attrContact: "தொடர்பு தகவல்",
    attrDuration: "பரிந்துரைக்கப்பட்ட நேரம்",
    attrScope: "பிராந்திய நிலை",
    scopeVerified: "25 கி.மீ எல்லை சரிபார்க்கப்பட்டது",
    tagsTitle: "குறிச்சொற்கள்",
    btnClose: "மூடு",
    badgeRouteMap: "ஊடாடும் பயணப் பாதை",
    routeMapHeading: "முழுமையான பயணப் பாதை வரைபடம்",
    routeMapNote: "இடங்கள் தொடர்ச்சியாக வரிசைப்படுத்தப்பட்டுள்ளன. கோடுகள் பயணப் பாதையைக் காட்டுகின்றன.",
    btnCloseMap: "வரைபடத்தை மூடு",
    tabUserLogin: "பயனர் உள்நுழைவு",
    tabRegister: "பதிவு செய்க",
    tabAdminPortal: "நிர்வாகி தளம்",
    loginInstruction: "பயணங்களைச் சேமிக்க உங்கள் கணக்கில் உள்நுழையவும்.",
    labelEmail: "மின்னஞ்சல் முகவரி",
    labelPassword: "கடவுச்சொல்",
    labelPasswordMin: "கடவுச்சொல் * (குறைந்தது 6 எழுத்துக்கள்)",
    labelFullName: "முழு பெயர் *",
    labelUserCategory: "பயனர் வகை",
    labelAdminUsername: "நிர்வாகி பெயர்",
    btnSignIn: "உள்நுழைக",
    btnSignInAdmin: "நிர்வாகியாக உள்நுழைக",
    btnCreateAccount: "கணக்கை உருவாக்கவும்",
    registerInstruction: "கினியம பயணங்களைத் திட்டமிட உங்கள் கணக்கை உருவாக்கவும்.",
    adminInstruction: "அங்கீகரிக்கப்பட்ட கணினி நிர்வாகிகள் மட்டுமே.",
    saveItineraryHeading: "பயணத்தை சேமிக்க",
    labelTripTitle: "பயணத்தின் பெயர் / தலைப்பு",
    btnConfirmSave: "உறுதிசெய்து சேமிக்கவும்",
    exportHeading: "ஒருநாள் பயணச் சுருக்கம்",
    btnCopyClipboard: "நகலெடுக்கவும்",
    btnPrintPdf: "அச்சிடுக / PDF ஆக சேமிக்க",
    btnLoginRegister: "உள்நுழைக / பதிவுசெய்க",
    btnLogout: "வெளியேறு"
  }
};

const placeTranslations = {
  1: { si: "ශ්‍රී අංගුලිමාල මහා සෑ විහාරය", ta: "ஸ்ரீ அங்குலிமால மகா சே விகாரை" },
  2: { si: "පඬුවස්නුවර රජ මහා විහාරය", ta: "பண்டுவஸ்நுவர ராஜ மகா விகாரை" },
  3: { si: "මුන්නේශ්වරම් කෝවිල", ta: "முன்னேஸ்வரம் சிவன் கோவில்" },
  4: { si: "පඬුවස්නුවර පුරාවිද්‍යා කෞතුකාගාරය", ta: "பண்டுவஸ்நுவர தொல்பொருள் அருங்காட்சியகம்" },
  5: { si: "හලාවත කලපුව සහ කඩොලාන පරිසරය", ta: "சிலாபம் களப்பு மற்றும் கண்டல் காடுகள்" },
  6: { si: "පඬුවස්නුවර පුරාණ රාජධානිය", ta: "பண்டுவஸ்நுவர புராதன இராச்சியம்" },
  7: { si: "ආනවිලුන්දාව පක්ෂි අභයභූමිය", ta: "ஆனவிலுந்தாவ பறவைகள் சரணாலயம்" },
  8: { si: "කඩිගාව පාලම සහ දැදුරු ඔය නිම්නය", ta: "கடிகாவ பாலம் மற்றும் தெதுரு ஓயா பள்ளத்தாக்கு" },
  9: { si: "හලාවත වෙරළ උද්‍යානය", ta: "சிலாபம் கடற்கரை பூங்கா" },
  10: { si: "හෙට්ටිපොල හරිත උද්‍යානය", ta: "ஹெட்டிபொல பசுமைப் பூங்கா" },
  11: { si: "වයඹ විශ්වවිද්‍යාල වැව උද්‍යානය", ta: "வயம்ப பல்கலைக்கழக ஏரிப் பூங்கா" },
  12: { si: "ආනවිලුන්දාව තෙත්බිම් සංරක්ෂණ කලාපය", ta: "ஆனவிலுந்தாவ சதுப்புநில பாதுகாப்பு மண்டலம்" },
  13: { si: "වයි ග්‍රෝ කඳවුර දුම්මලසූරිය", ta: "வை குரோ முகாம் தும்மலசூரிய" },
  14: { si: "තිස්සව රජ මහා විහාරය", ta: "திஸ்ஸவ ரஜமகா விகாரை" },
  15: { si: "පාද වැව පුරාණ ජලාශය", ta: "பாத வாவி புராதன நீர்த்தேக்கம்" }
};

const categoryTranslations = {
  "Religious & Spiritual": { si: "ආගමික හා ආධ්‍යාත්මික", ta: "மத மற்றும் ஆன்மீகம்" },
  "Historical & Archaeological": { si: "ඓතිහාසික හා පුරාවිද්‍යා", ta: "வரலாற்று மற்றும் தொல்பொருள்" },
  "Eco-tourism & Nature": { si: "පරිසර හා ස්වභාවධර්මය", ta: "சூழல் மற்றும் இயற்கை" },
  "Coastal & Leisure": { si: "වෙරළබඩ හා විවේකී", ta: "கடற்கரை மற்றும் பொழுதுபோக்கு" },
  "Community & Education": { si: "ප්‍රජා හා අධ්‍යාපනික", ta: "சமூக மற்றும் கல்வி" }
};

// APPLICATION STATE
const state = {
  currentLang: localStorage.getItem('routecraft_lang') || 'en',
  currentView: 'explore',
  allPlaces: [],
  adminPlaces: [],
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
  currentUser: null,
  userSavedTrips: [],
  currentCarouselImages: [],
  currentCarouselIndex: 0,
  leafletModalMap: null,
  leafletModalMarker: null,
  leafletRouteMap: null,
  routePolylineLayer: null,
  routeMarkersGroup: null
};

const elements = {
  // Views & Navigation
  viewExplore: document.getElementById('viewExplore'),
  viewSavedTrips: document.getElementById('viewSavedTrips'),
  viewAdminConsole: document.getElementById('viewAdminConsole'),
  tabViewExplore: document.getElementById('tabViewExplore'),
  tabViewSavedTrips: document.getElementById('tabViewSavedTrips'),
  tabViewAdmin: document.getElementById('tabViewAdmin'),
  brandHomeBtn: document.getElementById('brandHomeBtn'),
  savedTripsCountBadge: document.getElementById('savedTripsCountBadge'),
  userProfileBadge: document.getElementById('userProfileBadge'),
  userBadgeLabel: document.getElementById('userBadgeLabel'),
  logoutUserBtn: document.getElementById('logoutUserBtn'),
  // Weather Badge
  kiniyamaWeatherPill: document.getElementById('kiniyamaWeatherPill'),
  weatherIcon: document.getElementById('weatherIcon'),
  weatherText: document.getElementById('weatherText'),
  // Catalog & Filters
  placesGrid: document.getElementById('placesGrid'),
  resultsCount: document.getElementById('resultsCount'),
  searchInput: document.getElementById('searchInput'),
  categoryChips: document.getElementById('categoryChips'),
  vibeFilter: document.getElementById('vibeFilter'),
  activityFilter: document.getElementById('activityFilter'),
  resetFiltersBtn: document.getElementById('resetFiltersBtn'),
  sortOrder: document.getElementById('sortOrder'),
  // Itinerary UI & Actions
  btnViewRouteMap: document.getElementById('btnViewRouteMap'),
  btnOptimizeRoute: document.getElementById('btnOptimizeRoute'),
  itineraryStopsList: document.getElementById('itineraryStopsList'),
  emptyItineraryState: document.getElementById('emptyItineraryState'),
  itineraryCountBadge: document.getElementById('itineraryCountBadge'),
  metricDistance: document.getElementById('metricDistance'),
  metricDuration: document.getElementById('metricDuration'),
  metricBudget: document.getElementById('metricBudget'),
  timeWarningBanner: document.getElementById('timeWarningBanner'),
  warningBannerText: document.getElementById('warningBannerText'),
  clearItineraryBtn: document.getElementById('clearItineraryBtn'),
  saveTripToAccountBtn: document.getElementById('saveTripToAccountBtn'),
  exportItineraryBtn: document.getElementById('exportItineraryBtn'),
  // Place Detail Modal
  placeDetailModal: document.getElementById('placeDetailModal'),
  closeDetailModalBtn: document.getElementById('closeDetailModalBtn'),
  modalCloseActionBtn: document.getElementById('modalCloseActionBtn'),
  btnShowPhotos: document.getElementById('btnShowPhotos'),
  btnShowMap: document.getElementById('btnShowMap'),
  modalPhotoContainer: document.getElementById('modalPhotoContainer'),
  modalMapContainer: document.getElementById('modalMapContainer'),
  modalInteractiveMap: document.getElementById('modalInteractiveMap'),
  modalPlaceImage: document.getElementById('modalPlaceImage'),
  carouselPrevBtn: document.getElementById('carouselPrevBtn'),
  carouselNextBtn: document.getElementById('carouselNextBtn'),
  carouselCounterBadge: document.getElementById('carouselCounterBadge'),
  modalPlaceTitle: document.getElementById('modalPlaceTitle'),
  modalCategoryBadge: document.getElementById('modalCategoryBadge'),
  modalDistanceBadge: document.getElementById('modalDistanceBadge'),
  modalPlaceDescription: document.getElementById('modalPlaceDescription'),
  modalTravelTips: document.getElementById('modalTravelTips'),
  modalHours: document.getElementById('modalHours'),
  modalEntrance: document.getElementById('modalEntrance'),
  modalParking: document.getElementById('modalParking'),
  modalContact: document.getElementById('modalContact'),
  modalDuration: document.getElementById('modalDuration'),
  modalTagsWrapper: document.getElementById('modalTagsWrapper'),
  modalMapsLink: document.getElementById('modalMapsLink'),
  modalAddToTripBtn: document.getElementById('modalAddToTripBtn'),
  // Full Route Map Modal
  routeMapModal: document.getElementById('routeMapModal'),
  closeRouteMapModalBtn: document.getElementById('closeRouteMapModalBtn'),
  closeRouteMapFooterBtn: document.getElementById('closeRouteMapFooterBtn'),
  routeMapCanvas: document.getElementById('routeMapCanvas'),
  routeMapMetricsBadge: document.getElementById('routeMapMetricsBadge'),
  // Auth Modal
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
  // User Form
  userLoginForm: document.getElementById('userLoginForm'),
  userEmail: document.getElementById('userEmail'),
  userPassword: document.getElementById('userPassword'),
  userLoginError: document.getElementById('userLoginError'),
  userRegisterForm: document.getElementById('userRegisterForm'),
  regFullName: document.getElementById('regFullName'),
  regEmail: document.getElementById('regEmail'),
  regUserType: document.getElementById('regUserType'),
  regPassword: document.getElementById('regPassword'),
  regError: document.getElementById('regError'),
  regSuccess: document.getElementById('regSuccess'),
  // Admin Login
  adminLoginForm: document.getElementById('adminLoginForm'),
  adminUsername: document.getElementById('adminUsername'),
  adminPassword: document.getElementById('adminPassword'),
  adminLoginError: document.getElementById('adminLoginError'),
  // Admin Console View & Form Controls
  adminConsoleUser: document.getElementById('adminConsoleUser'),
  adminConsoleNewPlaceBtn: document.getElementById('adminConsoleNewPlaceBtn'),
  adminTabPlaces: document.getElementById('adminTabPlaces'),
  adminTabUsers: document.getElementById('adminTabUsers'),
  adminTabManageUsers: document.getElementById('adminTabManageUsers'),
  adminSectionPlaces: document.getElementById('adminSectionPlaces'),
  adminSectionUsers: document.getElementById('adminSectionUsers'),
  adminSectionManageUsers: document.getElementById('adminSectionManageUsers'),
  adminAddPlaceCard: document.getElementById('adminAddPlaceCard'),
  adminPlaceFormHeading: document.getElementById('adminPlaceFormHeading'),
  adminSavePlaceForm: document.getElementById('adminSavePlaceForm'),
  adminEditPlaceId: document.getElementById('adminEditPlaceId'),
  adminCancelPlaceBtn: document.getElementById('adminCancelPlaceBtn'),
  admPlaceCategory: document.getElementById('admPlaceCategory'),
  admPlaceMapsUrl: document.getElementById('admPlaceMapsUrl'),
  admPlaceParking: document.getElementById('admPlaceParking'),
  admPlaceContact: document.getElementById('admPlaceContact'),
  admTagsCheckboxContainer: document.getElementById('admTagsCheckboxContainer'),
  admNewTagName: document.getElementById('admNewTagName'),
  admNewTagType: document.getElementById('admNewTagType'),
  btnAddNewTagToForm: document.getElementById('btnAddNewTagToForm'),
  adminConsolePlacesBody: document.getElementById('adminConsolePlacesBody'),
  adminCreateAdminForm: document.getElementById('adminCreateAdminForm'),
  adminConsoleUsersBody: document.getElementById('adminConsoleUsersBody'),
  adminConsoleManageUsersBody: document.getElementById('adminConsoleManageUsersBody'),
  // Admin Password Modal
  adminPasswordModal: document.getElementById('adminPasswordModal'),
  closeAdminPasswordModalBtn: document.getElementById('closeAdminPasswordModalBtn'),
  adminChangePasswordForm: document.getElementById('adminChangePasswordForm'),
  changePasswordUserId: document.getElementById('changePasswordUserId'),
  changePasswordTargetName: document.getElementById('changePasswordTargetName'),
  newAdminAssignedPassword: document.getElementById('newAdminAssignedPassword'),
  // Saved Trips View
  savedTripsGrid: document.getElementById('savedTripsGrid'),
  saveTripModal: document.getElementById('saveTripModal'),
  closeSaveTripModalBtn: document.getElementById('closeSaveTripModalBtn'),
  saveTripForm: document.getElementById('saveTripForm'),
  saveTripTitleInput: document.getElementById('saveTripTitleInput'),
  // Export Modal
  exportModal: document.getElementById('exportModal'),
  closeExportModalBtn: document.getElementById('closeExportModalBtn'),
  exportContentBox: document.getElementById('exportContentBox'),
  copyExportTextBtn: document.getElementById('copyExportTextBtn'),
  printItineraryBtn: document.getElementById('printItineraryBtn')
};

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=600&auto=format&fit=crop&q=80';

// I18N HELPERS
function getTranslation(key) {
  const lang = state.currentLang;
  return (i18n[lang] && i18n[lang][key]) ? i18n[lang][key] : (i18n['en'][key] || key);
}

function getLocalizedPlaceName(place) {
  const lang = state.currentLang;
  if (lang !== 'en' && placeTranslations[place.PlaceID] && placeTranslations[place.PlaceID][lang]) {
    return placeTranslations[place.PlaceID][lang];
  }
  return place.Name;
}

function getLocalizedCategoryName(catName) {
  const lang = state.currentLang;
  if (lang !== 'en' && categoryTranslations[catName] && categoryTranslations[catName][lang]) {
    return categoryTranslations[catName][lang];
  }
  return catName;
}

function applyLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('routecraft_lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = getTranslation(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = getTranslation(key);
  });

  renderTaxonomyControls();
  sortAndRenderPlaces();
  updateItineraryUI();
  fetchLiveKiniyamaWeather();
  updateAuthButtonDisplay();
}

function clearCredentialsFromForms() {
  if (elements.adminLoginForm) elements.adminLoginForm.reset();
  if (elements.userLoginForm) elements.userLoginForm.reset();
  if (elements.userRegisterForm) elements.userRegisterForm.reset();

  if (elements.adminUsername) elements.adminUsername.value = '';
  if (elements.adminPassword) elements.adminPassword.value = '';
  if (elements.userEmail) elements.userEmail.value = '';
  if (elements.userPassword) elements.userPassword.value = '';
  if (elements.regFullName) elements.regFullName.value = '';
  if (elements.regEmail) elements.regEmail.value = '';
  if (elements.regPassword) elements.regPassword.value = '';

  if (elements.adminLoginError) elements.adminLoginError.classList.add('hidden');
  if (elements.userLoginError) elements.userLoginError.classList.add('hidden');
  if (elements.regError) elements.regError.classList.add('hidden');
  if (elements.regSuccess) elements.regSuccess.classList.add('hidden');
}

// LIVE WEATHER ENGINE FOR KINIYAMA (7°39'36.8"N 80°00'17.9"E)
async function fetchLiveKiniyamaWeather() {
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=7.660222&longitude=80.004972&current_weather=true');
    const data = await res.json();

    if (data && data.current_weather) {
      const temp = Math.round(data.current_weather.temperature);
      const code = data.current_weather.weathercode;

      let icon = '☀️';
      let desc = 'Clear';

      if (code === 1 || code === 2 || code === 3) {
        icon = '⛅';
        desc = state.currentLang === 'si' ? 'අර්ධ වළාකුළු' : (state.currentLang === 'ta' ? 'பகுதி மேகமூட்டம்' : 'Partly Cloudy');
      } else if (code >= 45 && code <= 48) {
        icon = '🌫️';
        desc = state.currentLang === 'si' ? 'මීදුම සහිත' : (state.currentLang === 'ta' ? 'பனிமூட்டம்' : 'Misty');
      } else if (code >= 51 && code <= 67) {
        icon = '🌧️';
        desc = state.currentLang === 'si' ? 'වැසි සහිත' : (state.currentLang === 'ta' ? 'மழை' : 'Showers');
      } else if (code >= 80 && code <= 82) {
        icon = '⛈️';
        desc = state.currentLang === 'si' ? 'ධාරානිපාත වැසි' : (state.currentLang === 'ta' ? 'கனமழை' : 'Rain');
      } else if (code >= 95) {
        icon = '⚡';
        desc = state.currentLang === 'si' ? 'ගිගුරුම් සහිත' : (state.currentLang === 'ta' ? 'இடியுடன் கூடிய' : 'Thunderstorms');
      } else {
        desc = state.currentLang === 'si' ? 'පැහැදිලි අහස' : (state.currentLang === 'ta' ? 'தெளிவான வானம்' : 'Clear');
      }

      elements.weatherIcon.innerText = icon;
      const titlePrefix = state.currentLang === 'si' ? 'කිනියම' : (state.currentLang === 'ta' ? 'கினியம' : 'Kiniyama');
      elements.weatherText.innerText = `${titlePrefix}: ${temp}°C | ${desc}`;
    }
  } catch (err) {
    const titlePrefix = state.currentLang === 'si' ? 'කිනියම' : (state.currentLang === 'ta' ? 'கினியம' : 'Kiniyama');
    elements.weatherText.innerText = `${titlePrefix}: 28°C | Clear`;
  }
}

// INITIALIZATION
document.addEventListener('DOMContentLoaded', async () => {
  setupEventListeners();
  clearCredentialsFromForms();
  restoreSavedUserSession();
  restoreSavedAdminSession();
  await loadTaxonomies();
  await loadPlaces();
  restoreSavedItinerary();
  applyLanguage(state.currentLang);
});

// SPA VIEW ROUTING
function switchView(viewName) {
  state.currentView = viewName;

  elements.tabViewExplore.classList.toggle('active', viewName === 'explore');
  elements.tabViewSavedTrips.classList.toggle('active', viewName === 'savedTrips');
  elements.tabViewAdmin.classList.toggle('active', viewName === 'adminConsole');

  elements.viewExplore.classList.toggle('hidden', viewName !== 'explore');
  elements.viewSavedTrips.classList.toggle('hidden', viewName !== 'savedTrips');
  elements.viewAdminConsole.classList.toggle('hidden', viewName !== 'adminConsole');

  if (viewName === 'savedTrips') {
    loadUserSavedTrips();
  } else if (viewName === 'adminConsole') {
    loadAdminPlaces();
  }
}

// DATA FETCHING & TAXONOMIES
async function loadTaxonomies() {
  try {
    const res = await fetch('/api/taxonomies');
    const data = await res.json();
    if (data.success) {
      state.categories = data.categories;
      state.vibes = data.vibes;
      state.activities = data.activities;
      renderTaxonomyControls();
      renderAdminTagsSelection();
    }
  } catch (error) {
    console.error('[RouteCraft] Failed to load taxonomies:', error);
  }
}

// SAFE CATALOG FETCHER: SENDS DISTINCT VIBE & ACTIVITY PARAMS TO PREVENT 500 CRASH
async function loadPlaces() {
  try {
    elements.resultsCount.innerText = 'Updating catalog...';
    const params = new URLSearchParams();

    if (state.selectedCategory !== 'All') params.append('category', state.selectedCategory);
    if (state.searchKeyword && state.searchKeyword.trim() !== '') params.append('search', state.searchKeyword.trim());
    if (state.selectedVibe && state.selectedVibe.trim() !== '') params.append('vibe', state.selectedVibe.trim());
    if (state.selectedActivity && state.selectedActivity.trim() !== '') params.append('activity', state.selectedActivity.trim());

    const res = await fetch(`/api/places?${params.toString()}`);
    const result = await res.json();

    if (result.success) {
      state.allPlaces = result.data;
      sortAndRenderPlaces();
    } else {
      elements.resultsCount.innerText = '0 destinations found';
      elements.placesGrid.innerHTML = `<div class="empty-state"><p>${result.message || 'Error loading places.'}</p></div>`;
    }
  } catch (error) {
    console.error('[RouteCraft] Error fetching destinations:', error);
    elements.resultsCount.innerText = 'Error loading destinations';
    elements.placesGrid.innerHTML = `<div class="empty-state"><p>Error connecting to backend server.</p></div>`;
  }
}

function renderTaxonomyControls() {
  const allLabel = getTranslation('allAttractions');
  let chipsHtml = `<button class="filter-chip ${state.selectedCategory === 'All' ? 'active' : ''}" data-category="All">${allLabel}</button>`;

  state.categories.forEach(cat => {
    const localizedName = getLocalizedCategoryName(cat.CategoryName);
    chipsHtml += `<button class="filter-chip ${state.selectedCategory === cat.CategoryName ? 'active' : ''}" data-category="${cat.CategoryName}">${localizedName}</button>`;
  });
  elements.categoryChips.innerHTML = chipsHtml;

  elements.vibeFilter.innerHTML = `<option value="">${getTranslation('filterByVibe')}</option>` +
    state.vibes.map(v => `<option value="${v.TagName}" ${state.selectedVibe === v.TagName ? 'selected' : ''}>${v.TagName}</option>`).join('');

  elements.activityFilter.innerHTML = `<option value="">${getTranslation('filterByActivity')}</option>` +
    state.activities.map(a => `<option value="${a.TagName}" ${state.selectedActivity === a.TagName ? 'selected' : ''}>${a.TagName}</option>`).join('');

  elements.admPlaceCategory.innerHTML = state.categories.map(c => 
    `<option value="${c.CategoryID}">${c.CategoryName}</option>`
  ).join('');
}

function renderAdminTagsSelection(selectedTagIds = []) {
  if (!elements.admTagsCheckboxContainer) return;

  const allTags = [...state.vibes, ...state.activities];
  if (allTags.length === 0) {
    elements.admTagsCheckboxContainer.innerHTML = `<span class="text-muted" style="font-size:0.8rem;">No tags available. Add a new tag below.</span>`;
    return;
  }

  elements.admTagsCheckboxContainer.innerHTML = allTags.map(tag => {
    const isChecked = selectedTagIds.includes(tag.TagID);
    return `
      <label class="tag-selector-pill">
        <input type="checkbox" name="adminPlaceTags" value="${tag.TagID}" ${isChecked ? 'checked' : ''}>
        <span>${escapeHtml(tag.TagName)} <small style="color:#64748b;">(${tag.TagType})</small></span>
      </label>
    `;
  }).join('');
}

function sortAndRenderPlaces() {
  let places = [...state.allPlaces];

  if (state.sortOrder === 'distance') {
    places.sort((a, b) => parseFloat(a.DistanceFromCenter) - parseFloat(b.DistanceFromCenter));
  } else if (state.sortOrder === 'name') {
    places.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  const countText = state.currentLang === 'si'
    ? `ස්ථාන ${places.length}ක් පෙන්වයි`
    : (state.currentLang === 'ta' ? `${places.length} இடங்கள் காட்டப்படுகின்றன` : `Showing ${places.length} verified destinations`);
  elements.resultsCount.innerText = countText;

  if (places.length === 0) {
    elements.placesGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🔎</div>
        <p>${state.currentLang === 'si' ? 'ස්ථාන හමු නොවීය.' : (state.currentLang === 'ta' ? 'இடங்கள் எதுவும் கிடைக்கவில்லை.' : 'No destinations match your criteria.')}</p>
        <span>${state.currentLang === 'si' ? 'වෙනත් සෙවුම් පද හෝ පෙරහන් භාවිතා කර බලන්න.' : 'Try adjusting your keyword, vibe, or category filters.'}</span>
      </div>`;
    return;
  }

  elements.placesGrid.innerHTML = places.map(p => {
    const isAdded = state.itinerary.includes(p.PlaceID);
    const pills = (p.tags || []).slice(0, 3).map(t => `<span class="pill-sm">${escapeHtml(t.TagName)}</span>`).join('');
    const photoUrl = (p.photos && p.photos.length > 0) ? p.photos[0] : (p.ImageUrl || FALLBACK_IMAGE);
    const localizedTitle = getLocalizedPlaceName(p);
    const localizedCategory = getLocalizedCategoryName(p.CategoryName);

    return `
      <article class="place-card">
        <div class="card-image-box">
          <img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(localizedTitle)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';">
          <div class="card-image-overlay">
            <span class="category-tag">${escapeHtml(localizedCategory)}</span>
            <span class="card-distance-badge">${p.DistanceFromCenter} km</span>
          </div>
        </div>

        <div class="card-body">
          <h3 class="card-title">${escapeHtml(localizedTitle)}</h3>
          <p class="card-description">${escapeHtml(p.Description)}</p>
          <div class="card-pills">${pills}</div>
          <div class="card-footer">
            <button class="btn btn-outline btn-sm" onclick="openPlaceDetails(${p.PlaceID})">${getTranslation('btnViewDetails')}</button>
            <button class="btn ${isAdded ? 'btn-secondary' : 'btn-primary'} btn-sm" 
              onclick="toggleItineraryStop(${p.PlaceID})" 
              id="btnTrip-${p.PlaceID}">
              ${isAdded ? getTranslation('btnAdded') : getTranslation('btnAddTrip')}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ITINERARY WORKSPACE & METRICS
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
  const stopsSuffix = state.currentLang === 'si' ? 'නැවතුම්' : (state.currentLang === 'ta' ? 'இடங்கள்' : 'stops');
  elements.itineraryCountBadge.innerText = `${count} ${stopsSuffix}`;
  elements.clearItineraryBtn.disabled = count === 0;
  elements.saveTripToAccountBtn.disabled = count === 0;
  elements.exportItineraryBtn.disabled = count === 0;
  elements.btnViewRouteMap.disabled = count === 0;
  elements.btnOptimizeRoute.disabled = count <= 2;

  if (count === 0) {
    elements.itineraryStopsList.innerHTML = '';
    elements.itineraryStopsList.appendChild(elements.emptyItineraryState);
    elements.metricDistance.innerText = '0.00 km';
    elements.metricDuration.innerText = '0h 0m';
    elements.metricBudget.innerText = getTranslation('freeAdmission');
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

      elements.itineraryStopsList.innerHTML = ordered.map((item, idx) => {
        const localizedTitle = getLocalizedPlaceName(item);
        return `
          <div class="itinerary-item">
            <div class="stop-info">
              <span class="stop-index">#${idx + 1}</span>
              <span class="stop-title" title="${escapeHtml(localizedTitle)}">${escapeHtml(localizedTitle)}</span>
              <span class="stop-sub">${item.EstVisitDurationMins}m | ${item.DistanceFromCenter}km | ${item.EntranceFee || 'Free'}</span>
            </div>
            <div class="stop-controls">
              <button class="stop-btn" onclick="moveItineraryItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''} title="Move Up">▲</button>
              <button class="stop-btn" onclick="moveItineraryItem(${idx}, 1)" ${idx === ordered.length - 1 ? 'disabled' : ''} title="Move Down">▼</button>
              <button class="stop-btn delete" onclick="toggleItineraryStop(${item.PlaceID})" title="Remove Stop">&times;</button>
            </div>
          </div>
        `;
      }).join('');

      elements.metricDistance.innerText = `${result.metrics.totalDistanceKm} km`;
      elements.metricDuration.innerText = result.metrics.totalDurationFormatted;
      elements.metricBudget.innerText = result.metrics.totalBudgetLKR > 0 ? `LKR ${result.metrics.totalBudgetLKR}` : getTranslation('freeAdmission');

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

// ROUTE OPTIMIZATION HANDLER
async function triggerRouteOptimization() {
  if (state.itinerary.length <= 2) return;

  try {
    elements.btnOptimizeRoute.disabled = true;

    const res = await fetch('/api/itinerary/optimize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placeIds: state.itinerary })
    });
    const data = await res.json();

    if (data.success) {
      state.itinerary = data.optimizedPlaceIds;
      saveItineraryState();
      await updateItineraryUI();

      if (data.distanceSavedKm > 0) {
        const alertMsg = state.currentLang === 'si'
          ? `මාර්ග අනුපිළිවෙල සාර්ථකව ප්‍රශස්ත කරන ලදී! ගමන් දුර කි.මී. ${data.distanceSavedKm} කින් අඩු විය.`
          : (state.currentLang === 'ta' ? `பயண வரிசை வெற்றிகரமாக சீரமைக்கப்பட்டது! ${data.distanceSavedKm} கி.மீ மிச்சப்படுத்தப்பட்டது.` : `Route successfully optimized! Reduced road distance by ${data.distanceSavedKm} km.`);
        alert(alertMsg);
      } else {
        alert(state.currentLang === 'si' ? 'ඔබගේ වත්මන් මාර්ගය දැනටමත් ප්‍රශස්ත මට්ටමේ පවතී!' : 'Your current sequence is already travel-optimized!');
      }
    }
  } catch (err) {
    alert('Could not optimize route order.');
  } finally {
    elements.btnOptimizeRoute.disabled = state.itinerary.length <= 2;
  }
}

// FULL ROUTE MAP RENDERING
function openRouteMapModal() {
  if (state.itinerary.length === 0) return;

  elements.routeMapMetricsBadge.innerText = `${state.currentMetrics.totalStops} stops | ${state.currentMetrics.totalDistanceKm} km`;
  elements.routeMapModal.classList.remove('hidden');

  setTimeout(() => renderConnectedRouteMap(), 150);
}

function renderConnectedRouteMap() {
  const container = elements.routeMapCanvas;
  if (!container) return;

  const orderedPlaces = state.itinerary.map(id => state.allPlaces.find(p => p.PlaceID === id)).filter(Boolean);
  if (orderedPlaces.length === 0) return;

  if (!state.leafletRouteMap) {
    state.leafletRouteMap = L.map(container);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(state.leafletRouteMap);

    state.routeMarkersGroup = L.featureGroup().addTo(state.leafletRouteMap);
  } else {
    state.routeMarkersGroup.clearLayers();
    if (state.routePolylineLayer) {
      state.leafletRouteMap.removeLayer(state.routePolylineLayer);
    }
  }

  const latLngs = [];

  orderedPlaces.forEach((p, idx) => {
    const lat = parseFloat(p.Latitude);
    const lon = parseFloat(p.Longitude);

    if (!isNaN(lat) && !isNaN(lon)) {
      const pt = [lat, lon];
      latLngs.push(pt);

      const customIcon = L.divIcon({
        className: 'route-map-marker',
        html: `<span>${idx + 1}</span>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const localizedTitle = getLocalizedPlaceName(p);
      const marker = L.marker(pt, { icon: customIcon }).bindPopup(`
        <strong>#${idx + 1}: ${escapeHtml(localizedTitle)}</strong><br>
        <small>${p.DistanceFromCenter} km • ${p.EstVisitDurationMins}m</small>
      `);
      state.routeMarkersGroup.addLayer(marker);
    }
  });

  if (latLngs.length >= 2) {
    state.routePolylineLayer = L.polyline(latLngs, {
      color: '#0b6bcb',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.85
    }).addTo(state.leafletRouteMap);
  }

  state.leafletRouteMap.invalidateSize();

  if (latLngs.length > 0) {
    state.leafletRouteMap.fitBounds(state.routeMarkersGroup.getBounds(), { padding: [50, 50] });
  }
}

// PLACE DETAIL MODAL
function showModalMedia(type) {
  if (type === 'photos') {
    elements.btnShowPhotos.classList.add('active');
    elements.btnShowMap.classList.remove('active');
    elements.modalPhotoContainer.classList.remove('hidden');
    elements.modalMapContainer.classList.add('hidden');
  } else if (type === 'map') {
    elements.btnShowMap.classList.add('active');
    elements.btnShowPhotos.classList.remove('active');
    elements.modalMapContainer.classList.remove('hidden');
    elements.modalPhotoContainer.classList.add('hidden');

    if (state.leafletModalMap) {
      setTimeout(() => state.leafletModalMap.invalidateSize(), 150);
    }
  }
}

function initializeOrUpdateLeafletMap(lat, lon, placeName) {
  const mapElement = elements.modalInteractiveMap;
  if (!mapElement) return;

  if (!state.leafletModalMap) {
    state.leafletModalMap = L.map(mapElement).setView([lat, lon], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(state.leafletModalMap);

    state.leafletModalMarker = L.marker([lat, lon]).addTo(state.leafletModalMap)
      .bindPopup(`<strong>${escapeHtml(placeName)}</strong>`).openPopup();
  } else {
    state.leafletModalMap.setView([lat, lon], 14);
    if (state.leafletModalMarker) {
      state.leafletModalMarker.setLatLng([lat, lon])
        .setPopupContent(`<strong>${escapeHtml(placeName)}</strong>`).openPopup();
    }
  }
}

function updateCarouselView() {
  const images = state.currentCarouselImages;
  const idx = state.currentCarouselIndex;

  elements.modalPlaceImage.style.opacity = '0.3';
  setTimeout(() => {
    elements.modalPlaceImage.src = images[idx] || FALLBACK_IMAGE;
    elements.modalPlaceImage.onerror = () => {
      elements.modalPlaceImage.src = images[0] || FALLBACK_IMAGE;
    };
    elements.modalPlaceImage.style.opacity = '1';
  }, 100);

  elements.carouselCounterBadge.innerText = `${idx + 1} / ${images.length}`;
  const hasMultiple = images.length > 1;
  elements.carouselPrevBtn.style.display = hasMultiple ? 'flex' : 'none';
  elements.carouselNextBtn.style.display = hasMultiple ? 'flex' : 'none';
}

async function openPlaceDetails(placeId) {
  try {
    const res = await fetch(`/api/places/${placeId}`);
    const result = await res.json();
    if (!result.success) return;

    const p = result.data;
    state.currentCarouselImages = (p.photos && p.photos.length > 0) ? p.photos : [p.ImageUrl || FALLBACK_IMAGE];
    state.currentCarouselIndex = 0;
    updateCarouselView();

    showModalMedia('photos');

    const localizedTitle = getLocalizedPlaceName(p);
    const localizedCategory = getLocalizedCategoryName(p.CategoryName);

    const lat = parseFloat(p.Latitude);
    const lon = parseFloat(p.Longitude);
    const hasCoordinates = !isNaN(lat) && !isNaN(lon) && (lat !== 0 || lon !== 0);

    if (hasCoordinates) {
      elements.btnShowMap.style.display = 'block';
      initializeOrUpdateLeafletMap(lat, lon, localizedTitle);
    } else {
      elements.btnShowMap.style.display = 'none';
    }

    elements.modalPlaceTitle.innerText = localizedTitle;
    elements.modalCategoryBadge.innerText = localizedCategory;
    elements.modalDistanceBadge.innerText = `${p.DistanceFromCenter} km from Kiniyama`;
    elements.modalPlaceDescription.innerText = p.Description;
    elements.modalTravelTips.innerText = p.TravelTips || 'Standard travel guidelines apply; wear comfortable footwear and observe local customs.';
    elements.modalHours.innerText = p.OpeningHours || '08:00 AM - 05:00 PM';
    elements.modalEntrance.innerText = p.EntranceFee || getTranslation('freeAdmission');

    elements.modalParking.innerText = (p.ParkingAvailable === 1 || p.ParkingAvailable === true) 
      ? 'On-site Parking Available' 
      : 'Street / Limited Parking';
    elements.modalContact.innerText = p.ContactInfo || 'Not Available';

    elements.modalDuration.innerText = `${p.EstVisitDurationMins} minutes`;

    elements.modalTagsWrapper.innerHTML = (p.tags || []).map(t => 
      `<span class="pill-sm">${escapeHtml(t.TagName)} (${t.TagType})</span>`
    ).join('') || '<span class="text-muted" style="font-size: 0.8rem;">No tags assigned.</span>';

    elements.modalMapsLink.href = p.GoogleMapsUrl || `https://maps.google.com/?q=${lat},${lon}`;

    const isAdded = state.itinerary.includes(p.PlaceID);
    elements.modalAddToTripBtn.innerText = isAdded ? getTranslation('btnRemoveTrip') : getTranslation('btnAddTrip');
    elements.modalAddToTripBtn.onclick = () => {
      toggleItineraryStop(p.PlaceID);
      openPlaceDetails(p.PlaceID);
    };

    elements.placeDetailModal.classList.remove('hidden');
  } catch (err) {
    console.error('[RouteCraft] Error opening place details:', err);
  }
}

function nextCarouselPhoto() {
  const len = state.currentCarouselImages.length;
  if (len <= 1) return;
  state.currentCarouselIndex = (state.currentCarouselIndex + 1) % len;
  updateCarouselView();
}

function prevCarouselPhoto() {
  const len = state.currentCarouselImages.length;
  if (len <= 1) return;
  state.currentCarouselIndex = (state.currentCarouselIndex - 1 + len) % len;
  updateCarouselView();
}

// AUTHENTICATION & LOGIN
function switchAuthTab(tabName) {
  clearCredentialsFromForms();

  [elements.tabUserLoginBtn, elements.tabUserRegisterBtn, elements.tabAdminLoginBtn].forEach(b => b.classList.remove('active'));
  [elements.tabUserLoginContent, elements.tabUserRegisterContent, elements.tabAdminLoginContent].forEach(c => c.classList.add('hidden'));

  if (tabName === 'userLogin') {
    elements.tabUserLoginBtn.classList.add('active');
    elements.tabUserLoginContent.classList.remove('hidden');
    elements.authModalTitle.innerText = getTranslation('tabUserLogin');
  } else if (tabName === 'userRegister') {
    elements.tabUserRegisterBtn.classList.add('active');
    elements.tabUserRegisterContent.classList.remove('hidden');
    elements.authModalTitle.innerText = getTranslation('btnCreateAccount');
  } else if (tabName === 'adminLogin') {
    elements.tabAdminLoginBtn.classList.add('active');
    elements.tabAdminLoginContent.classList.remove('hidden');
    elements.authModalTitle.innerText = getTranslation('tabAdminPortal');
  }
}

function updateAuthButtonDisplay() {
  if (state.activeAdmin) {
    elements.tabViewAdmin.classList.remove('hidden');
    elements.authPortalBtn.classList.add('hidden');
    elements.userProfileBadge.classList.remove('hidden');
    elements.userBadgeLabel.innerText = `🔒 Admin: ${state.activeAdmin.username}`;
    elements.adminConsoleUser.innerText = state.activeAdmin.username;
  } else if (state.currentUser) {
    elements.tabViewAdmin.classList.add('hidden');
    elements.authPortalBtn.classList.add('hidden');
    elements.userProfileBadge.classList.remove('hidden');
    elements.userBadgeLabel.innerText = `👤 ${state.currentUser.fullName}`;
    loadUserSavedTrips();
  } else {
    elements.tabViewAdmin.classList.add('hidden');
    elements.authPortalBtn.classList.remove('hidden');
    elements.userProfileBadge.classList.add('hidden');
    elements.authBtnLabel.innerText = getTranslation('btnLoginRegister');
  }
}

// Admin Login Form
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
      localStorage.setItem('routecraft_admin', JSON.stringify(data.admin));
      clearCredentialsFromForms();
      updateAuthButtonDisplay();
      elements.authModal.classList.add('hidden');
      switchView('adminConsole');
    } else {
      elements.adminLoginError.innerText = data.message || 'Invalid credentials.';
      elements.adminLoginError.classList.remove('hidden');
    }
  } catch (err) {
    elements.adminLoginError.innerText = 'Network error during admin authentication.';
    elements.adminLoginError.classList.remove('hidden');
  }
});

// User Login Form
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
      clearCredentialsFromForms();
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

// User Register Form
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
      clearCredentialsFromForms();
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

// LOGOUT
elements.logoutUserBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to log out?')) {
    state.currentUser = null;
    state.activeAdmin = null;
    localStorage.removeItem('routecraft_user');
    localStorage.removeItem('routecraft_admin');

    state.itinerary = [];
    localStorage.removeItem('routecraft_itinerary');
    updateItineraryUI();
    sortAndRenderPlaces();

    state.userSavedTrips = [];
    if (elements.savedTripsCountBadge) {
      elements.savedTripsCountBadge.innerText = '0';
    }
    renderSavedTrips([]);

    clearCredentialsFromForms();
    updateAuthButtonDisplay();
    switchView('explore');
  }
});

// SAVED TRIPS MANAGEMENT
async function loadUserSavedTrips() {
  if (!state.currentUser) {
    state.userSavedTrips = [];
    if (elements.savedTripsCountBadge) elements.savedTripsCountBadge.innerText = '0';
    renderSavedTrips([]);
    return;
  }

  try {
    const res = await fetch(`/api/itinerary/user/${state.currentUser.userId}`);
    const result = await res.json();

    if (result.success) {
      state.userSavedTrips = result.data;
      if (elements.savedTripsCountBadge) {
        elements.savedTripsCountBadge.innerText = result.count;
      }
      renderSavedTrips(result.data);
    }
  } catch (err) {
    console.error('[RouteCraft] Error loading saved trips:', err);
  }
}

function renderSavedTrips(trips) {
  if (!trips || trips.length === 0) {
    elements.savedTripsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🧳</div>
        <p>${getTranslation('noSavedTrips')}</p>
        <span>${getTranslation('noSavedTripsHint')}</span>
      </div>`;
    return;
  }

  elements.savedTripsGrid.innerHTML = trips.map(t => {
    let placeIds = [];
    try { placeIds = typeof t.PlaceIDs === 'string' ? JSON.parse(t.PlaceIDs) : t.PlaceIDs; } catch(e) {}
    
    const stopNames = placeIds.map(id => {
      const p = state.allPlaces.find(item => item.PlaceID === id);
      return p ? getLocalizedPlaceName(p) : `Place #${id}`;
    }).join(' ➔ ');

    const hours = Math.floor(t.TotalDurationMinutes / 60);
    const mins = t.TotalDurationMinutes % 60;
    const durFormatted = `${hours}h ${mins}m`;

    return `
      <div class="saved-trip-card">
        <div class="saved-trip-header">
          <div>
            <h3 class="saved-trip-title">${escapeHtml(t.Title)}</h3>
            <span class="saved-trip-date">${new Date(t.CreatedAt).toLocaleDateString()}</span>
          </div>
          <span class="status-badge ${t.IsOverScheduled ? 'status-deleted' : 'status-active'}">
            ${t.IsOverScheduled ? 'Over-Scheduled' : 'Viable Plan'}
          </span>
        </div>

        <div class="saved-trip-metrics">
          <div><strong>Stops:</strong> ${placeIds.length}</div>
          <div><strong>Distance:</strong> ${t.TotalDistanceKm} km</div>
          <div><strong>Duration:</strong> ${durFormatted}</div>
        </div>

        <div class="saved-trip-stops-preview">
          <strong>Route:</strong> ${escapeHtml(stopNames)}
        </div>

        <div class="saved-trip-actions">
          <button class="btn btn-primary btn-sm" onclick="loadTripIntoBuilder(${JSON.stringify(placeIds).replace(/"/g, '&quot;')})">
            🔄 ${state.currentLang === 'si' ? 'නැවත අරඹන්න' : (state.currentLang === 'ta' ? 'திட்டமிடு' : 'Load into Planner')}
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteSavedTrip(${t.ItineraryID})">${getTranslation('btnClear')}</button>
        </div>
      </div>
    `;
  }).join('');
}

function loadTripIntoBuilder(placeIds) {
  state.itinerary = placeIds;
  saveItineraryState();
  updateItineraryUI();
  sortAndRenderPlaces();
  switchView('explore');
  alert('Trip itinerary loaded into the planning workspace!');
}

async function deleteSavedTrip(itineraryId) {
  if (!confirm('Are you sure you want to delete this saved trip?')) return;

  try {
    const res = await fetch(`/api/itinerary/${itineraryId}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      loadUserSavedTrips();
    }
  } catch (err) {
    alert('Error deleting trip.');
  }
}

elements.saveTripToAccountBtn.addEventListener('click', () => {
  if (!state.currentUser) {
    alert('Please log in as a traveler to save trips to your profile.');
    switchAuthTab('userLogin');
    elements.authModal.classList.remove('hidden');
    return;
  }
  elements.saveTripModal.classList.remove('hidden');
});

elements.saveTripForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = elements.saveTripTitleInput.value.trim();

  try {
    const res = await fetch('/api/itinerary/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: state.currentUser.userId,
        title: title || 'My Kiniyama Day Trip',
        placeIds: state.itinerary
      })
    });
    const data = await res.json();

    if (data.success) {
      alert('Trip saved successfully to your account!');
      elements.saveTripModal.classList.add('hidden');
      elements.saveTripForm.reset();
      loadUserSavedTrips();
    } else {
      alert(data.message || 'Failed to save trip.');
    }
  } catch (err) {
    alert('Network error saving trip.');
  }
});

// ADMIN CONSOLE
elements.adminTabPlaces.addEventListener('click', () => {
  elements.adminTabPlaces.classList.add('active');
  elements.adminTabUsers.classList.remove('active');
  elements.adminTabManageUsers.classList.remove('active');
  elements.adminSectionPlaces.classList.remove('hidden');
  elements.adminSectionUsers.classList.add('hidden');
  elements.adminSectionManageUsers.classList.add('hidden');
});

elements.adminTabUsers.addEventListener('click', () => {
  elements.adminTabUsers.classList.add('active');
  elements.adminTabPlaces.classList.remove('active');
  elements.adminTabManageUsers.classList.remove('active');
  elements.adminSectionUsers.classList.remove('hidden');
  elements.adminSectionPlaces.classList.add('hidden');
  elements.adminSectionManageUsers.classList.add('hidden');
  loadAdminUsers();
});

elements.adminTabManageUsers.addEventListener('click', () => {
  elements.adminTabManageUsers.classList.add('active');
  elements.adminTabPlaces.classList.remove('active');
  elements.adminTabUsers.classList.remove('active');
  elements.adminSectionManageUsers.classList.remove('hidden');
  elements.adminSectionPlaces.classList.add('hidden');
  elements.adminSectionUsers.classList.add('hidden');
  loadRegisteredUsers();
});

elements.adminConsoleNewPlaceBtn.addEventListener('click', () => {
  elements.adminSavePlaceForm.reset();
  elements.adminEditPlaceId.value = '';
  document.getElementById('admPlaceTravelTips').value = '';
  elements.admPlaceMapsUrl.value = '';
  elements.admPlaceParking.value = '1';
  elements.admPlaceContact.value = '';
  renderAdminTagsSelection([]);
  elements.adminPlaceFormHeading.innerText = 'Add New Destination (Max 25 km Scope)';
  elements.adminAddPlaceCard.classList.toggle('hidden');
  elements.adminAddPlaceCard.scrollIntoView({ behavior: 'smooth' });
});

elements.adminCancelPlaceBtn.addEventListener('click', () => {
  elements.adminAddPlaceCard.classList.add('hidden');
});

// CREATE NEW TAG IN ADMIN FORM & AUTOMATICALLY UPDATE HOMEPAGE FILTERS
elements.btnAddNewTagToForm.addEventListener('click', async () => {
  const tagName = elements.admNewTagName.value.trim();
  const tagType = elements.admNewTagType.value;

  if (!tagName) {
    alert('Please enter a tag name.');
    return;
  }

  try {
    const res = await fetch('/api/admin/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tagName, tagType })
    });
    const data = await res.json();

    if (data.success) {
      alert(`Tag '${data.tag.TagName}' created and added to filters!`);
      elements.admNewTagName.value = '';

      await loadTaxonomies();

      const checkbox = document.querySelector(`input[name="adminPlaceTags"][value="${data.tag.TagID}"]`);
      if (checkbox) checkbox.checked = true;
    } else {
      alert(data.message || 'Failed to create tag.');
    }
  } catch (err) {
    alert('Network error creating tag.');
  }
});

async function loadAdminPlaces() {
  try {
    const res = await fetch('/api/admin/places');
    const result = await res.json();

    if (result.success) {
      state.adminPlaces = result.data;
      elements.adminConsolePlacesBody.innerHTML = result.data.map(p => `
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
            <button class="btn btn-outline btn-sm" onclick="openAdminEditPlace(${p.PlaceID})">Edit</button>
            <button class="btn btn-outline btn-sm" onclick="togglePlaceStatus(${p.PlaceID})">
              ${p.IsDeleted ? 'Restore' : 'Soft-Delete'}
            </button>
            <button class="btn btn-danger btn-sm" onclick="deletePlaceForever(${p.PlaceID})">Delete</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('[RouteCraft Admin] Error loading places:', err);
  }
}

function openAdminEditPlace(placeId) {
  const p = state.adminPlaces.find(item => item.PlaceID === placeId);
  if (!p) return;

  elements.adminEditPlaceId.value = p.PlaceID;
  elements.adminPlaceFormHeading.innerText = `Edit Destination: ${p.Name}`;
  document.getElementById('admPlaceName').value = p.Name;
  document.getElementById('admPlaceCategory').value = p.CategoryID;
  document.getElementById('admPlaceDistance').value = p.DistanceFromCenter;
  document.getElementById('admPlaceDuration').value = p.EstVisitDurationMins;
  document.getElementById('admPlaceLat').value = p.Latitude || '';
  document.getElementById('admPlaceLon').value = p.Longitude || '';
  elements.admPlaceMapsUrl.value = p.GoogleMapsUrl || '';
  document.getElementById('admPlaceHours').value = p.OpeningHours || '08:00 AM - 05:00 PM';
  document.getElementById('admPlaceFee').value = p.EntranceFee || 'Free Admission';

  elements.admPlaceParking.value = (p.ParkingAvailable === 1 || p.ParkingAvailable === true) ? '1' : '0';
  elements.admPlaceContact.value = p.ContactInfo || '';

  document.getElementById('admPlaceImage').value = p.ImageUrl || '';
  document.getElementById('admPlaceDesc').value = p.Description;
  document.getElementById('admPlaceTravelTips').value = p.TravelTips || '';

  const currentTagIds = (p.tags || []).map(t => t.TagID);
  renderAdminTagsSelection(currentTagIds);

  elements.adminAddPlaceCard.classList.remove('hidden');
  elements.adminAddPlaceCard.scrollIntoView({ behavior: 'smooth' });
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

async function deletePlaceForever(placeId) {
  if (!confirm(`Permanently delete place #${placeId}? This action cannot be undone.`)) return;

  try {
    const res = await fetch(`/api/admin/places/${placeId}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      alert('Place permanently deleted.');
      await loadAdminPlaces();
      await loadPlaces();
    }
  } catch (err) {
    alert('Network error deleting record.');
  }
}

elements.adminSavePlaceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const editId = elements.adminEditPlaceId.value;
  const isEditing = editId && editId.trim() !== '';

  const checkedBoxes = document.querySelectorAll('input[name="adminPlaceTags"]:checked');
  const tagIds = Array.from(checkedBoxes).map(cb => parseInt(cb.value, 10));

  const payload = {
    name: document.getElementById('admPlaceName').value,
    categoryId: document.getElementById('admPlaceCategory').value,
    distanceFromCenter: document.getElementById('admPlaceDistance').value,
    estVisitDurationMins: document.getElementById('admPlaceDuration').value,
    latitude: document.getElementById('admPlaceLat').value,
    longitude: document.getElementById('admPlaceLon').value,
    googleMapsUrl: elements.admPlaceMapsUrl.value.trim(),
    openingHours: document.getElementById('admPlaceHours').value,
    entranceFee: document.getElementById('admPlaceFee').value,
    parkingAvailable: elements.admPlaceParking.value === '1' ? 1 : 0,
    contactInfo: elements.admPlaceContact.value.trim() || 'Not Available',
    imageUrl: document.getElementById('admPlaceImage').value,
    description: document.getElementById('admPlaceDesc').value,
    travelTips: document.getElementById('admPlaceTravelTips').value,
    tagIds: tagIds
  };

  const endpoint = isEditing ? `/api/admin/places/${editId}` : '/api/admin/places';
  const method = isEditing ? 'PUT' : 'POST';

  try {
    const res = await fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.success) {
      alert(isEditing ? 'Destination updated successfully!' : 'Destination created successfully!');
      elements.adminSavePlaceForm.reset();
      elements.adminEditPlaceId.value = '';
      elements.adminAddPlaceCard.classList.add('hidden');
      await loadAdminPlaces();
      await loadPlaces();
      await loadTaxonomies();
    } else {
      alert(data.message || 'Operation failed.');
    }
  } catch (err) {
    alert('Network error submitting place.');
  }
});

// Admin Accounts Table
async function loadAdminUsers() {
  try {
    const res = await fetch('/api/admin/list');
    const result = await res.json();
    if (result.success) {
      elements.adminConsoleUsersBody.innerHTML = result.data.map(a => `
        <tr>
          <td>${a.AdminID}</td>
          <td><strong>${escapeHtml(a.Username)}</strong></td>
          <td>${escapeHtml(a.FullName)}</td>
          <td>${escapeHtml(a.Email)}</td>
          <td>${a.LastLogin ? new Date(a.LastLogin).toLocaleString() : 'Never logged in'}</td>
          <td>
            ${a.AdminID === 1 
              ? '<span class="status-badge status-active">Master Admin</span>' 
              : `<button class="btn btn-danger btn-sm" onclick="deleteAdminAccount(${a.AdminID}, '${escapeHtml(a.Username)}')">Delete</button>`
            }
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('[RouteCraft Admin] Error loading administrators:', err);
  }
}

async function deleteAdminAccount(adminId, username) {
  if (!confirm(`Are you sure you want to delete administrator account '${username}'?`)) return;

  try {
    const res = await fetch(`/api/admin/admins/${adminId}`, { method: 'DELETE' });
    const data = await res.json();

    if (data.success) {
      alert(data.message);
      loadAdminUsers();
    } else {
      alert(data.message || 'Failed to delete administrator.');
    }
  } catch (err) {
    alert('Network error deleting administrator.');
  }
}

elements.adminCreateAdminForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    username: document.getElementById('admNewUsername').value,
    fullName: document.getElementById('admNewFullName').value,
    email: document.getElementById('admNewEmail').value,
    password: document.getElementById('admNewPassword').value
  };

  try {
    const res = await fetch('/api/admin/create-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.success) {
      alert(data.message);
      elements.adminCreateAdminForm.reset();
      loadAdminUsers();
    } else {
      alert(data.message || 'Error creating administrator.');
    }
  } catch (err) {
    alert('Network error creating administrator.');
  }
});

// Registered Users Table Management
async function loadRegisteredUsers() {
  try {
    const res = await fetch('/api/admin/users');
    const result = await res.json();

    if (result.success) {
      if (result.data.length === 0) {
        elements.adminConsoleManageUsersBody.innerHTML = `
          <tr>
            <td colspan="6" class="text-center text-muted" style="padding: 1.5rem;">No registered tourist accounts found.</td>
          </tr>`;
        return;
      }

      elements.adminConsoleManageUsersBody.innerHTML = result.data.map(u => `
        <tr>
          <td>${u.UserID}</td>
          <td><strong>${escapeHtml(u.FullName)}</strong></td>
          <td>${escapeHtml(u.Email)}</td>
          <td><span class="category-tag">${escapeHtml(u.UserType)}</span></td>
          <td>${new Date(u.CreatedAt).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="openChangePasswordModal(${u.UserID}, '${escapeHtml(u.FullName)}')">Change Password</button>
            <button class="btn btn-danger btn-sm" onclick="deleteUserAccount(${u.UserID}, '${escapeHtml(u.FullName)}')">Delete User</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('[RouteCraft Admin] Error loading registered users:', err);
  }
}

function openChangePasswordModal(userId, fullName) {
  elements.changePasswordUserId.value = userId;
  elements.changePasswordTargetName.innerText = `Enter a new password for traveler: ${fullName}`;
  elements.newAdminAssignedPassword.value = '';
  elements.adminPasswordModal.classList.remove('hidden');
}

elements.adminChangePasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userId = elements.changePasswordUserId.value;
  const newPassword = elements.newAdminAssignedPassword.value;

  try {
    const res = await fetch(`/api/admin/users/${userId}/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword })
    });
    const data = await res.json();

    if (data.success) {
      alert(data.message);
      elements.adminPasswordModal.classList.add('hidden');
      elements.adminChangePasswordForm.reset();
    } else {
      alert(data.message || 'Failed to update user password.');
    }
  } catch (err) {
    alert('Network error updating password.');
  }
});

async function deleteUserAccount(userId, fullName) {
  if (!confirm(`Are you sure you want to delete ${fullName}'s account? This will permanently erase their profile and all their saved day-trip plans.`)) {
    return;
  }

  try {
    const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    const data = await res.json();

    if (data.success) {
      alert(data.message);
      loadRegisteredUsers();
    } else {
      alert(data.message || 'Failed to delete user.');
    }
  } catch (err) {
    alert('Network error deleting user account.');
  }
}

// EXPORT & CLEAN PRINT SUMMARY
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
  text += `• Estimated Admission Budget: ${m.totalBudgetFormatted}\n`;
  text += `• Viability Status: ${m.isOverScheduled ? 'OVER-SCHEDULED (> 8.0 hrs)' : 'VIABLE SINGLE-DAY PLAN'}\n\n`;

  if (m.warningBanner) {
    text += `[NOTICE] ${m.warningBanner}\n\n`;
  }

  text += `VISIT SEQUENCE:\n`;
  const orderedPlaces = state.itinerary.map(id => state.allPlaces.find(p => p.PlaceID === id)).filter(Boolean);

  orderedPlaces.forEach((p, idx) => {
    const localizedTitle = getLocalizedPlaceName(p);
    const localizedCategory = getLocalizedCategoryName(p.CategoryName);
    text += `${idx + 1}. ${localizedTitle} (${localizedCategory})\n`;
    text += `   - Distance from Kiniyama: ${p.DistanceFromCenter} km\n`;
    text += `   - Operating Hours: ${p.OpeningHours}\n`;
    text += `   - Entrance Fee: ${p.EntranceFee || getTranslation('freeAdmission')}\n`;
    text += `   - Parking: ${p.ParkingAvailable ? 'On-site Parking' : 'Street/Limited Parking'}\n`;
    text += `   - Contact: ${p.ContactInfo || 'Not Available'}\n`;
    text += `   - Expected Dwell Time: ${p.EstVisitDurationMins} minutes\n`;
    text += `   - Map Link: ${p.GoogleMapsUrl}\n`;
    if (p.TravelTips) {
      text += `   - Travel Tips: ${p.TravelTips}\n`;
    }
    text += `\n`;
  });

  text += `===========================================================\n`;
  text += `Prepared via RouteCraft - Developed by H.M.D.C. Herath (E2410120)\n`;

  elements.exportContentBox.textContent = text;
  elements.exportModal.classList.remove('hidden');
}

function printItineraryDocument() {
  if (!state.currentMetrics || state.itinerary.length === 0) return;

  const m = state.currentMetrics;
  const orderedPlaces = state.itinerary.map(id => state.allPlaces.find(p => p.PlaceID === id)).filter(Boolean);

  let rowsHtml = '';
  orderedPlaces.forEach((p, idx) => {
    const localizedTitle = getLocalizedPlaceName(p);
    const localizedCategory = getLocalizedCategoryName(p.CategoryName);

    rowsHtml += `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 8px; font-weight: bold; color: #0b6bcb; vertical-align: top;">#${idx + 1}</td>
        <td style="padding: 10px 8px; vertical-align: top;">
          <strong style="font-size: 14px; color: #0f172a;">${escapeHtml(localizedTitle)}</strong>
          <div style="font-size: 11px; color: #64748b; margin-top: 2px;">
            <span style="background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(localizedCategory)}</span>
            &nbsp;•&nbsp; ${p.DistanceFromCenter} km from Kiniyama
          </div>
          <div style="font-size: 11px; color: #475569; margin-top: 4px;">
            <strong>Hours:</strong> ${escapeHtml(p.OpeningHours)} &nbsp;|&nbsp; 
            <strong>Fee:</strong> ${escapeHtml(p.EntranceFee)} &nbsp;|&nbsp;
            <strong>Parking:</strong> ${p.ParkingAvailable ? 'Available' : 'Limited'}
          </div>
          ${p.ContactInfo && p.ContactInfo !== 'Not Available' ? `
            <div style="font-size: 11px; color: #475569; margin-top: 2px;">
              <strong>Contact:</strong> ${escapeHtml(p.ContactInfo)}
            </div>
          ` : ''}
          ${p.TravelTips ? `
            <div style="font-size: 11px; color: #166534; background: #f0fdf4; padding: 4px 8px; border-radius: 4px; margin-top: 4px;">
              <strong>💡 Travel Tip:</strong> ${escapeHtml(p.TravelTips)}
            </div>
          ` : ''}
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
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; padding: 24px; }
        .header { border-bottom: 2px solid #0b6bcb; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; }
        .header h1 { margin: 0; font-size: 20px; color: #0b6bcb; }
        .metrics-card { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f1f5f9; text-align: left; padding: 8px; font-size: 11px; }
        .footer { margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 8px; font-size: 11px; color: #94a3b8; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h1>🧭 RouteCraft: Regional Day-Trip Itinerary</h1>
          <p>Curated Day-Trip Plan for Kiniyama & Surroundings (25 km Scope)</p>
        </div>
        <div style="text-align: right; font-size: 11px;">
          <div>Date: ${new Date().toLocaleDateString()}</div>
          <div>${state.currentUser ? `Traveler: ${escapeHtml(state.currentUser.fullName)}` : 'Guest Planner'}</div>
        </div>
      </div>
      <div class="metrics-card">
        <div><strong>Total Stops:</strong><br>${m.totalStops} Locations</div>
        <div><strong>Road Distance:</strong><br>${m.totalDistanceKm} km</div>
        <div><strong>Est. Duration:</strong><br>${m.totalDurationFormatted}</div>
        <div><strong>Admission Budget:</strong><br>${m.totalBudgetFormatted}</div>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 35px;">#</th>
            <th>Attraction Details & Directions</th>
            <th style="width: 90px; text-align: center;">Dwell Time</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <div class="footer">RouteCraft System • Prepared by H.M.D.C. Herath (E2410120) • University of Moratuwa</div>
      <script>
        window.onload = function() { window.focus(); window.print(); window.onafterprint = function() { window.close(); }; };
      <\/script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=850,height=900');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
  }
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  elements.brandHomeBtn.addEventListener('click', () => switchView('explore'));
  elements.tabViewExplore.addEventListener('click', () => switchView('explore'));
  elements.tabViewSavedTrips.addEventListener('click', () => switchView('savedTrips'));
  elements.tabViewAdmin.addEventListener('click', () => switchView('adminConsole'));

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      applyLanguage(selectedLang);
    });
  });

  elements.btnViewRouteMap.addEventListener('click', openRouteMapModal);
  elements.btnOptimizeRoute.addEventListener('click', triggerRouteOptimization);

  elements.btnShowPhotos.addEventListener('click', () => showModalMedia('photos'));
  elements.btnShowMap.addEventListener('click', () => showModalMedia('map'));

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

  elements.carouselPrevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    prevCarouselPhoto();
  });

  elements.carouselNextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nextCarouselPhoto();
  });

  // Modal Closers
  elements.closeDetailModalBtn.addEventListener('click', () => elements.placeDetailModal.classList.add('hidden'));
  elements.modalCloseActionBtn.addEventListener('click', () => elements.placeDetailModal.classList.add('hidden'));
  elements.closeRouteMapModalBtn.addEventListener('click', () => elements.routeMapModal.classList.add('hidden'));
  elements.closeRouteMapFooterBtn.addEventListener('click', () => elements.routeMapModal.classList.add('hidden'));
  elements.closeExportModalBtn.addEventListener('click', () => elements.exportModal.classList.add('hidden'));
  elements.closeAuthModalBtn.addEventListener('click', () => {
    elements.authModal.classList.add('hidden');
    clearCredentialsFromForms();
  });
  elements.closeSaveTripModalBtn.addEventListener('click', () => elements.saveTripModal.classList.add('hidden'));
  elements.closeAdminPasswordModalBtn.addEventListener('click', () => elements.adminPasswordModal.classList.add('hidden'));

  elements.authPortalBtn.addEventListener('click', () => {
    switchAuthTab('userLogin');
    elements.authModal.classList.remove('hidden');
  });

  elements.tabUserLoginBtn.addEventListener('click', () => switchAuthTab('userLogin'));
  elements.tabUserRegisterBtn.addEventListener('click', () => switchAuthTab('userRegister'));
  elements.tabAdminLoginBtn.addEventListener('click', () => switchAuthTab('adminLogin'));

  elements.copyExportTextBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(elements.exportContentBox.textContent)
      .then(() => alert('Itinerary copied to clipboard!'))
      .catch(() => alert('Failed to copy text.'));
  });

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

function restoreSavedAdminSession() {
  try {
    const savedAdmin = localStorage.getItem('routecraft_admin');
    if (savedAdmin) {
      state.activeAdmin = JSON.parse(savedAdmin);
      updateAuthButtonDisplay();
    }
  } catch (e) {
    console.warn('[RouteCraft] Admin session restore error.');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}