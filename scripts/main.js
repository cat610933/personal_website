const storageKey = "preferredLanguage";

let translations;
let projects;
let tutorials;
let publications;
let currentLanguage = "zh";

function getStoredLanguage() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function storeLanguage(language) {
  try {
    localStorage.setItem(storageKey, language);
  } catch {
    // Language switching should still work when storage is unavailable.
  }
}

function localize(value) {
  if (typeof value === "string") return value;
  return value[currentLanguage] || value.en || value.zh || "";
}

function translatePage() {
  const dictionary = translations[currentLanguage];
  document.documentElement.lang = currentLanguage === "zh" ? "zh-Hant" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = dictionary[key] || element.textContent;
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attribute, key] = pair.split(":");
      if (attribute && key && dictionary[key]) {
        element.setAttribute(attribute, dictionary[key]);
      }
    });
  });

  document.querySelectorAll(".language-option").forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function createItemCard(item) {
  const card = document.createElement(item.href ? "a" : "article");
  card.className = item.href ? "item-card item-card-link" : "item-card";

  if (item.href) {
    card.href = item.href;
  }

  const content = document.createElement("div");

  const meta = document.createElement("div");
  meta.className = "item-meta";
  meta.textContent = localize(item.meta);

  const title = document.createElement("h3");
  title.textContent = localize(item.title);

  const description = document.createElement("p");
  description.textContent = localize(item.description);

  content.append(meta, title, description);
  card.append(content);

  if (item.links?.length) {
    const links = document.createElement("div");
    links.className = "item-links";

    item.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (link.href.startsWith("http")) {
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
      }
      links.append(anchor);
    });

    card.append(links);
  } else if (item.href) {
    const cue = document.createElement("span");
    cue.className = "item-cue";
    cue.textContent = currentLanguage === "zh" ? "閱讀" : "Read";
    card.append(cue);
  }

  return card;
}

function renderList(targetId, items) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.replaceChildren();
  items.forEach((item) => target.append(createItemCard(item)));
}

function setupImageFallbacks() {
  document.querySelectorAll("[data-image-fallback]").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        const fallback = document.createElement("div");
        fallback.className = `${image.className} image-fallback`;
        fallback.textContent = image.dataset.imageFallback;
        fallback.setAttribute("aria-hidden", image.getAttribute("aria-hidden") || "false");
        image.replaceWith(fallback);
      },
      { once: true },
    );
  });
}

function drawSignalCanvas() {
  const canvas = document.getElementById("signalCanvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerY = height * 0.52;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#f8fbf7";
  context.fillRect(0, 0, width, height);

  for (let x = 52; x < width; x += 72) {
    context.beginPath();
    context.moveTo(x, 48);
    context.lineTo(x, height - 48);
    context.strokeStyle = "rgba(31, 111, 104, 0.1)";
    context.lineWidth = 1;
    context.stroke();
  }

  for (let y = 56; y < height; y += 64) {
    context.beginPath();
    context.moveTo(44, y);
    context.lineTo(width - 44, y);
    context.strokeStyle = "rgba(20, 63, 95, 0.08)";
    context.lineWidth = 1;
    context.stroke();
  }

  const colors = ["#1f6f68", "#143f5f", "#b9852b"];
  colors.forEach((color, index) => {
    context.beginPath();
    for (let x = 38; x <= width - 38; x += 5) {
      const phase = index * 0.82;
      const amplitude = 42 - index * 9;
      const y =
        centerY +
        Math.sin(x / (34 + index * 10) + phase) * amplitude +
        Math.cos(x / (72 - index * 8)) * 16;
      if (x === 38) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.strokeStyle = color;
    context.globalAlpha = index === 0 ? 0.9 : 0.58;
    context.lineWidth = 3 - index * 0.45;
    context.stroke();
  });

  context.globalAlpha = 1;
  const sensors = [92, 148, 238, 350, 474, 592, 646];
  sensors.forEach((x, index) => {
    const y = height - 88 - (index % 2) * 18;
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = index % 3 === 0 ? "#9a4f58" : "#1f6f68";
    context.fill();
    context.beginPath();
    context.arc(x, y, 24, 0, Math.PI * 2);
    context.strokeStyle = "rgba(31, 111, 104, 0.18)";
    context.lineWidth = 2;
    context.stroke();
  });

  context.fillStyle = "#172026";
  context.font = "700 18px system-ui, sans-serif";
  context.fillText(
    currentLanguage === "zh" ? "稀疏陣列 / 訊號模型" : "Sparse array / signal model",
    48,
    52,
  );
  context.fillStyle = "#5f6b73";
  context.font = "500 14px system-ui, sans-serif";
  context.fillText(
    currentLanguage === "zh"
      ? "之後可以替換成自己的研究圖。"
      : "Replace this visual with your own figure later.",
    48,
    78,
  );
}

function setLanguage(language) {
  if (!translations[language]) return;
  currentLanguage = language;
  storeLanguage(currentLanguage);
  translatePage();
  renderList("projectList", projects);
  renderList("tutorialList", tutorials);
  renderList("publicationList", publications);
  drawSignalCanvas();
}

async function initSite() {
  await window.loadSiteData();
  ({ translations, projects, tutorials, publications } = window.siteData);

  currentLanguage = getStoredLanguage() || "zh";
  if (!translations[currentLanguage]) currentLanguage = "zh";

  document.querySelectorAll(".language-option").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  setupImageFallbacks();
  document.getElementById("year").textContent = new Date().getFullYear();
  setLanguage(currentLanguage);
}

initSite().catch((error) => {
  console.error(error);
  const main = document.querySelector("main");
  if (main) {
    main.insertAdjacentHTML(
      "afterbegin",
      '<p class="load-error">Unable to load site data. Run <code>make preview</code> instead of opening the file directly.</p>',
    );
  }
});
