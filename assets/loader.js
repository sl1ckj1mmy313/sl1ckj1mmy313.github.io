const loader = document.getElementById("loader");
if (!loader) return; // Exit if loader not found


function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// Auto-hide when page is initially loaded
window.addEventListener("load", () => {
  hideLoader();
});

// Optional: Show loader on all link clicks (non-anchor)
document.addEventListener("click", function (e) {
  const target = e.target.closest("a");
  if (target && target.href && !target.href.includes("#") && !target.target) {
    showLoader();
  }
});

// Optional: Hook into fetch calls (for SPA / AJAX)
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    showLoader();
    const response = await originalFetch(...args);
    hideLoader();
    return response;
  } catch (error) {
    hideLoader();
    throw error;
  }
};
