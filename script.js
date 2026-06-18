const translations = {
  zh: {
    "meta.description":
      "Cheng-Hsuan Chien 的個人網站，整理研究方向、專案、發表與聯絡資訊。",
    "nav.home": "回到首頁",
    "nav.label": "主要導覽",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.research": "Research",
    "nav.projects": "Projects",
    "nav.publications": "Publications",
    "nav.contact": "Contact",
    "language.label": "語言切換",
    "hero.eyebrow": "Personal academic portfolio",
    "hero.subtitle": "通訊工程與訊號處理碩士生",
    "hero.text":
      "這裡整理我的研究方向、專案紀錄、發表與經歷。網站以免費靜態架構維護，之後可以逐步加入 CV、論文頁面或部落格。",
    "hero.actionsLabel": "快速連結",
    "hero.visualLabel": "訊號處理視覺化",
    "about.eyebrow": "About",
    "about.title": "關於我",
    "about.body1":
      "我目前專注於通訊工程、訊號處理與陣列設計相關主題，並持續整理研究、模擬與工程實作中的筆記與成果。",
    "about.body2":
      "網站設計保持簡潔、可讀、容易維護，適合放在履歷、GitHub profile、論文 project page 或申請資料中。",
    "experience.eyebrow": "Experience",
    "experience.title": "經歷",
    "experience.timelineLabel": "經歷時間軸",
    "experience.mediatek.role": "5G PHY 通訊演算法實習生",
    "experience.mediatek.description":
      "參與 5G PHY 通訊演算法相關實作與分析，累積無線通訊系統與工程開發經驗。",
    "experience.project.description":
      "延續原子與分子物理相關研究主題，進行專題研究、文獻整理與實驗/理論分析。",
    "experience.intern.description":
      "於中研院原子與分子科學研究所參與暑期實習，接觸研究流程與量子/原子系統相關題目。",
    "research.eyebrow": "Research",
    "research.title": "研究方向",
    "research.sparse":
      "探索稀疏陣列配置、自由度與成像或估測效能之間的關係。",
    "research.signal": "整理通訊與陣列訊號處理中的模型、演算法與模擬工具。",
    "research.optimization":
      "以最佳化方法搜尋具備限制條件的陣列結構與效能指標。",
    "research.wireless": "建立無線通訊系統模擬與分析，連結理論與實驗結果。",
    "projects.eyebrow": "Projects",
    "projects.title": "專案",
    "publications.eyebrow": "Publications",
    "publications.title": "論文與發表",
    "contact.eyebrow": "Contact",
    "contact.title": "聯絡方式",
    "contact.body":
      "歡迎透過 GitHub 聯絡我。正式上線前，可以再補上 email、CV 連結與其他社群連結。",
    "footer.text":
      "Cheng-Hsuan Chien. 使用靜態 HTML、CSS 與 JavaScript 建置。",
  },
  en: {
    "meta.description":
      "Personal website of Cheng-Hsuan Chien, featuring research interests, projects, publications, and contact information.",
    "nav.home": "Back to home",
    "nav.label": "Primary navigation",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.research": "Research",
    "nav.projects": "Projects",
    "nav.publications": "Publications",
    "nav.contact": "Contact",
    "language.label": "Language switcher",
    "hero.eyebrow": "Personal academic portfolio",
    "hero.subtitle":
      "Master's student in Communication Engineering and Signal Processing.",
    "hero.text":
      "This site collects my research interests, project notes, publications, and experience. It is maintained as a free static website and can later grow into a CV, paper pages, or a blog.",
    "hero.actionsLabel": "Quick links",
    "hero.visualLabel": "Signal processing visualization",
    "about.eyebrow": "About",
    "about.title": "About Me",
    "about.body1":
      "I focus on communication engineering, signal processing, and array design, while documenting research notes, simulations, and engineering work.",
    "about.body2":
      "The site is designed to stay clean, readable, and easy to maintain for CVs, GitHub profiles, project pages, and application materials.",
    "experience.eyebrow": "Experience",
    "experience.title": "Experience",
    "experience.timelineLabel": "Experience timeline",
    "experience.mediatek.role": "5G PHY Communication Algorithm Intern",
    "experience.mediatek.description":
      "Worked on implementation and analysis related to 5G PHY communication algorithms, gaining experience in wireless systems and engineering development.",
    "experience.project.description":
      "Continued research work related to atomic and molecular physics, including literature review, project development, and theoretical or experimental analysis.",
    "experience.intern.description":
      "Participated in a summer research internship at IAMS, Academia Sinica, and worked on topics related to quantum and atomic systems.",
    "research.eyebrow": "Research",
    "research.title": "Research Interests",
    "research.sparse":
      "Exploring sparse array configurations and the relationship between degrees of freedom, imaging, and estimation performance.",
    "research.signal":
      "Studying models, algorithms, and simulation tools in communication and array signal processing.",
    "research.optimization":
      "Using optimization methods to search for constrained array structures and performance metrics.",
    "research.wireless":
      "Building wireless communication simulations and analysis that connect theory with experimental results.",
    "projects.eyebrow": "Projects",
    "projects.title": "Projects",
    "publications.eyebrow": "Publications",
    "publications.title": "Publications",
    "contact.eyebrow": "Contact",
    "contact.title": "Contact",
    "contact.body":
      "Feel free to reach out through GitHub. Email, CV, and additional social links can be added before the site is finalized.",
    "footer.text":
      "Cheng-Hsuan Chien. Built with static HTML, CSS, and JavaScript.",
  },
};

const projects = [
  {
    title: {
      zh: "Sparse array optimization",
      en: "Sparse array optimization",
    },
    meta: { zh: "Research project", en: "Research project" },
    description: {
      zh: "與稀疏陣列設計、模擬和效能評估相關的研究筆記與實作。",
      en: "Research notes and simulations related to sparse array design and performance evaluation.",
    },
    links: [{ label: "Code", href: "https://github.com/cat610933" }],
  },
  {
    title: {
      zh: "Wireless communication simulation",
      en: "Wireless communication simulation",
    },
    meta: { zh: "Wireless communications", en: "Wireless communications" },
    description: {
      zh: "通道模型、系統設定與通訊效能分析相關的模擬工作。",
      en: "Simulation work for channel modeling, system settings, and communication performance analysis.",
    },
  },
  {
    title: {
      zh: "MATLAB and Python tools",
      en: "MATLAB and Python tools",
    },
    meta: { zh: "Engineering utilities", en: "Engineering utilities" },
    description: {
      zh: "用於實驗、圖表與可重現分析的小型 scripts 和 notebooks。",
      en: "Small scripts and notebooks for experiments, figures, and reproducible analysis.",
    },
    links: [{ label: "GitHub", href: "https://github.com/cat610933" }],
  },
];

const publications = [
  {
    title:
      "Generating scalable graph states in an atom-nanophotonic interface",
    meta: "Quantum Science and Technology 9 (2), 025020 - 2024",
    description: "CH Chien, S Goswami, CC Wu, WS Hiew, YC Chen, HH Jen",
    links: [
      { label: "DOI", href: "https://doi.org/10.1088/2058-9565/ad33ad" },
      { label: "arXiv", href: "https://arxiv.org/abs/2310.03990" },
    ],
  },
  {
    title:
      "Efficient and high-fidelity entanglement in cavity QED without high cooperativity",
    meta: "Physical Review Letters 136, 050802 - 2026",
    description:
      "S Goswami, CH Chien, N Sinclair, B Grinkemeyer, S Bennetts, YC Chen, HH Jen",
    links: [
      { label: "DOI", href: "https://doi.org/10.1103/n9wg-k6q9" },
      { label: "arXiv", href: "https://arxiv.org/abs/2505.02702" },
    ],
  },
];

function createItemCard(item) {
  const article = document.createElement("article");
  article.className = "item-card";

  const content = document.createElement("div");

  const meta = document.createElement("div");
  meta.className = "item-meta";
  meta.textContent = localize(item.meta);

  const title = document.createElement("h3");
  title.textContent = localize(item.title);

  const description = document.createElement("p");
  description.textContent = localize(item.description);

  content.append(meta, title, description);
  article.append(content);

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

    article.append(links);
  }

  return article;
}

let currentLanguage = localStorage.getItem("preferredLanguage") || "zh";
if (!translations[currentLanguage]) currentLanguage = "zh";

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

function renderList(targetId, items) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.replaceChildren();
  items.forEach((item) => target.append(createItemCard(item)));
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
  localStorage.setItem("preferredLanguage", currentLanguage);
  translatePage();
  renderList("projectList", projects);
  renderList("publicationList", publications);
  drawSignalCanvas();
}

document.querySelectorAll(".language-option").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

document.getElementById("year").textContent = new Date().getFullYear();
setLanguage(currentLanguage);
