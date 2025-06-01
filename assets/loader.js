document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  if (!loader) return; // Only bail if truly not present

  // Function to show the loader
  function showLoader() {
    loader.classList.remove("hidden");
  }

  // Function to hide the loader
  function hideLoader() {
    loader.classList.add("hidden");
  }

  // Auto-hide when the entire page has loaded
  window.addEventListener("load", hideLoader);

  // Show loader on non-anchor link clicks
  document.addEventListener("click", function (e) {
    const target = e.target.closest("a");
    if (target && target.href && !target.href.includes("#") && !target.target) {
      showLoader();
    }
  });

  // Hook into fetch calls for AJAX
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
});
