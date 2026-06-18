const projects = [
  {
    title: "Sparse array optimization",
    meta: "Research project",
    description:
      "Research notes and simulations related to sparse array design and performance evaluation.",
    links: [{ label: "Code", href: "https://github.com/cat610933" }],
  },
  {
    title: "Wireless communication simulation",
    meta: "Wireless communications",
    description:
      "Simulation work for channel modeling, system settings, and communication performance analysis.",
  },
  {
    title: "MATLAB and Python tools",
    meta: "Engineering utilities",
    description:
      "Small scripts and notebooks for experiments, figures, and reproducible analysis.",
    links: [{ label: "GitHub", href: "https://github.com/cat610933" }],
  },
];

const publications = [
  {
    title:
      "Atomic excitation delocalization at the clean to disordered interface in a chirally-coupled atomic array",
    meta: "Physical Review Research 6 (1), 013159 - 2024",
    description:
      "CC Wu, KT Lin, I Handayana, CH Chien, S Goswami, GD Lin, YC Chen, ...",
  },
  {
    title:
      "Generating scalable graph states in an atom-nanophotonic interface",
    meta: "Quantum Science and Technology 9 (2), 025020 - 2024",
    description: "CH Chien, S Goswami, CC Wu, WS Hiew, YC Chen, HH Jen",
  },
];

function createItemCard(item) {
  const article = document.createElement("article");
  article.className = "item-card";

  const content = document.createElement("div");

  const meta = document.createElement("div");
  meta.className = "item-meta";
  meta.textContent = item.meta;

  const title = document.createElement("h3");
  title.textContent = item.title;

  const description = document.createElement("p");
  description.textContent = item.description;

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

function renderList(targetId, items) {
  const target = document.getElementById(targetId);
  if (!target) return;
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
  context.fillText("Sparse array / signal model", 48, 52);
  context.fillStyle = "#5f6b73";
  context.font = "500 14px system-ui, sans-serif";
  context.fillText("Replace this visual with your own figure later.", 48, 78);
}

renderList("projectList", projects);
renderList("publicationList", publications);
document.getElementById("year").textContent = new Date().getFullYear();
drawSignalCanvas();
