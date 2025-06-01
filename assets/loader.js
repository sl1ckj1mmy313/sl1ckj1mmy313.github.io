document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  function showLoader() {
    loader.classList.remove("hidden");
  }

  function hideLoader() {
    loader.classList.add("hidden");
  }

  window.addEventListener("load", hideLoader);

  document.addEventListener("click", function (e) {
    const target = e.target.closest("a");
    if (target && target.href && !target.href.includes("#") && !target.target) {
      showLoader();
    }
  });

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
