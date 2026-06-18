window.loadSiteData = async function loadSiteData() {
  const response = await fetch("data/site-data.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Unable to load site data: ${response.status}`);
  }
  window.siteData = await response.json();
  return window.siteData;
};
