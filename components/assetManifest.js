// // Only preload above-the-fold critical assets.
// // Off-screen images (art, projects, footer, etc.) load naturally when the section scrolls into view.
// // The .glb 3D model is excluded — Three.js/R3F handles it lazily with its own loading state.
// const images = [
//     '/assets/X Logo.png',
//     '/assets/Shadow.png',
// ];

// const fetchables = [];

// // Single consolidated font request — covers every weight/family used site-wide.
// // Deduplicated from what were previously 5 overlapping Google Fonts requests.
// const fonts = [
//     'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Fira+Code:wght@400;500&family=Outfit:wght@300;400;500;600;700;800;900&family=Poppins:wght@600;700;800&family=Syne:wght@700;800&display=swap',
// ];

// const assetManifest = {
//     images,
//     fetchables,
//     fonts,
// };

// export default assetManifest;
// Minimal list of critical above-the-fold assets.
const images = [
    '/assets/X Logo.png',
    '/assets/Shadow.png',
    '/robot-optimized.glb',
];

const fetchables = [];

const assetManifest = {
    images,
    fetchables,
};

export default assetManifest;