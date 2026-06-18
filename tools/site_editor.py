#!/usr/bin/env python3
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse
import base64
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "site-data.json"
TUTORIAL_DIR = ROOT / "tutorials"
ASSET_DIRS = {
    "code": ROOT / "assets" / "code",
    "downloads": ROOT / "assets" / "downloads",
    "formulas": ROOT / "assets" / "formulas",
    "images": ROOT / "assets" / "images",
    "pdfs": ROOT / "assets" / "pdfs",
}


def slugify(value):
    slug = re.sub(r"[^a-zA-Z0-9-]+", "-", value.strip().lower()).strip("-")
    return slug or "new-page"


def safe_relative_path(raw_path, allowed_roots):
    target = (ROOT / raw_path).resolve()
    for allowed_root in allowed_roots:
      allowed_root = allowed_root.resolve()
      if target == allowed_root or allowed_root in target.parents:
          return target
    raise ValueError("Path is outside editable folders")


def read_json():
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def write_json(data):
    DATA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def tutorial_template(title, meta, body):
    escaped_title = html.escape(title)
    escaped_meta = html.escape(meta)
    body_html = "".join(f"<p>{html.escape(paragraph)}</p>\n" for paragraph in body.split("\n\n") if paragraph.strip())
    if not body_html:
        body_html = "<p>Write your tutorial text here.</p>\n"

    return f"""<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{escaped_title} | Terry Chien</title>
    <link rel="stylesheet" href="../styles.css">
  </head>
  <body>
    <main class="article-shell">
      <nav class="article-nav" aria-label="Tutorial navigation">
        <a href="../index.html#tutorials">Back to tutorials</a>
        <a href="../index.html">Home</a>
      </nav>

      <header class="article-header">
        <p class="eyebrow">Tutorial</p>
        <h1>{escaped_title}</h1>
        <p class="article-meta">{escaped_meta}</p>
      </header>

      <article class="article-content">
        <section>
          <h2>Notes</h2>
          {body_html.rstrip()}
        </section>

        <section>
          <h2>PDF Preview</h2>
          <p>Place a PDF in <code>../assets/pdfs/</code>, then update this iframe path.</p>
          <iframe class="pdf-frame" src="../assets/pdfs/example.pdf" title="PDF preview"></iframe>
        </section>

        <section>
          <h2>Downloads</h2>
          <div class="resource-grid">
            <a class="resource-card" href="../assets/pdfs/example.pdf" download>
              <strong>Download PDF</strong>
              <span>Derivation or lecture note</span>
            </a>
            <a class="resource-card" href="../assets/code/example.py" download>
              <strong>Download code</strong>
              <span>Simulation file</span>
            </a>
          </div>
        </section>
      </article>
    </main>
  </body>
</html>
"""


EDITOR_HTML = r"""<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Site Editor | Terry Chien</title>
    <style>
      :root {
        --bg: #f7f7f3;
        --surface: #ffffff;
        --ink: #172026;
        --muted: #617078;
        --line: #d8ddd8;
        --accent: #1f6f68;
        --rose: #9a4f58;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--ink);
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans TC", sans-serif;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 18px 24px;
        border-bottom: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.82);
        position: sticky;
        top: 0;
        z-index: 2;
      }
      h1, h2, h3, p { margin-top: 0; }
      main {
        display: grid;
        grid-template-columns: 280px minmax(0, 1fr);
        min-height: calc(100vh - 70px);
      }
      aside {
        border-right: 1px solid var(--line);
        padding: 20px;
        background: rgba(255, 255, 255, 0.56);
      }
      section { padding: 24px; }
      button, input, textarea, select {
        font: inherit;
      }
      button {
        border: 1px solid var(--line);
        border-radius: 7px;
        padding: 9px 12px;
        background: var(--surface);
        color: var(--ink);
        cursor: pointer;
        font-weight: 750;
      }
      button.primary {
        border-color: var(--accent);
        background: var(--accent);
        color: white;
      }
      button.danger {
        color: var(--rose);
      }
      .panel {
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 18px;
        background: var(--surface);
        margin-bottom: 18px;
      }
      .tree button {
        display: block;
        width: 100%;
        margin-bottom: 8px;
        text-align: left;
      }
      label {
        display: grid;
        gap: 6px;
        margin-bottom: 12px;
        color: var(--muted);
        font-size: 0.9rem;
        font-weight: 750;
      }
      input, textarea, select {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 7px;
        padding: 10px;
        background: #fff;
        color: var(--ink);
      }
      textarea {
        min-height: 110px;
        resize: vertical;
      }
      .row {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }
      .file-list {
        display: grid;
        gap: 8px;
      }
      .file-item {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        border: 1px solid var(--line);
        border-radius: 7px;
        padding: 10px;
      }
      .status {
        color: var(--accent);
        font-weight: 750;
      }
      @media (max-width: 900px) {
        main { grid-template-columns: 1fr; }
        aside { border-right: 0; border-bottom: 1px solid var(--line); }
        .grid { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <header>
      <div>
        <h1>Site Editor</h1>
        <p class="status" id="status">Ready</p>
      </div>
      <div class="row">
        <button id="reload">Reload</button>
        <a href="/" target="_blank"><button>Open site</button></a>
      </div>
    </header>
    <main>
      <aside>
        <h2>Structure</h2>
        <div class="tree">
          <button data-tab="tutorials">Tutorial pages</button>
          <button data-tab="assets">Assets</button>
          <button data-tab="data">Raw site data</button>
        </div>
      </aside>
      <section>
        <div id="tutorialsTab">
          <div class="panel">
            <h2>Tutorial Pages</h2>
            <label>
              Select a tutorial
              <select id="tutorialSelect"></select>
            </label>
            <div class="grid">
              <label>Title zh <input id="titleZh"></label>
              <label>Title en <input id="titleEn"></label>
              <label>Meta zh <input id="metaZh"></label>
              <label>Meta en <input id="metaEn"></label>
            </div>
            <label>Description zh <textarea id="descZh"></textarea></label>
            <label>Description en <textarea id="descEn"></textarea></label>
            <label>Page path <input id="href"></label>
            <div class="row">
              <button class="primary" id="saveTutorial">Save tutorial card</button>
              <button class="danger" id="deleteTutorial">Delete tutorial</button>
            </div>
          </div>

          <div class="panel">
            <h2>Create New Tutorial</h2>
            <div class="grid">
              <label>Slug <input id="newSlug" placeholder="my-topic"></label>
              <label>Title <input id="newTitle" placeholder="My Topic"></label>
              <label>Meta <input id="newMeta" placeholder="Simulation / derivation"></label>
            </div>
            <label>Initial text <textarea id="newBody" placeholder="Write the opening text here."></textarea></label>
            <button class="primary" id="createTutorial">Create page from template</button>
          </div>
        </div>

        <div id="assetsTab" hidden>
          <div class="panel">
            <h2>Upload Asset</h2>
            <div class="grid">
              <label>
                Folder
                <select id="assetFolder">
                  <option value="pdfs">PDFs</option>
                  <option value="code">Code</option>
                  <option value="images">Images</option>
                  <option value="downloads">Downloads</option>
                  <option value="formulas">Formulas</option>
                </select>
              </label>
              <label>Choose file <input type="file" id="assetFile"></label>
            </div>
            <button class="primary" id="uploadAsset">Upload</button>
          </div>
          <div class="panel">
            <h2>Files</h2>
            <div class="file-list" id="fileList"></div>
          </div>
        </div>

        <div id="dataTab" hidden>
          <div class="panel">
            <h2>Raw Site Data</h2>
            <p>Edit carefully. This is the JSON that powers cards and translations.</p>
            <textarea id="rawData" style="min-height: 520px; font-family: ui-monospace, monospace;"></textarea>
            <button class="primary" id="saveRaw">Save raw JSON</button>
          </div>
        </div>
      </section>
    </main>

    <script>
      let siteData;
      let files;
      const $ = (id) => document.getElementById(id);

      function setStatus(message) {
        $("status").textContent = message;
      }

      async function api(path, options = {}) {
        const response = await fetch(path, {
          headers: { "Content-Type": "application/json", ...(options.headers || {}) },
          ...options,
        });
        if (!response.ok) throw new Error(await response.text());
        return response.headers.get("content-type")?.includes("application/json")
          ? response.json()
          : response.text();
      }

      function localize(value, lang) {
        return typeof value === "string" ? value : value?.[lang] || "";
      }

      function activeTutorial() {
        return siteData.tutorials[Number($("tutorialSelect").value)] || null;
      }

      function renderTutorialSelect() {
        $("tutorialSelect").innerHTML = siteData.tutorials
          .map((item, index) => `<option value="${index}">${localize(item.title, "en") || localize(item.title, "zh")}</option>`)
          .join("");
        renderTutorialForm();
      }

      function renderTutorialForm() {
        const item = activeTutorial();
        if (!item) return;
        $("titleZh").value = localize(item.title, "zh");
        $("titleEn").value = localize(item.title, "en");
        $("metaZh").value = localize(item.meta, "zh");
        $("metaEn").value = localize(item.meta, "en");
        $("descZh").value = localize(item.description, "zh");
        $("descEn").value = localize(item.description, "en");
        $("href").value = item.href || "";
      }

      function renderFiles() {
        $("fileList").innerHTML = files
          .map((file) => `
            <div class="file-item">
              <span>${file}</span>
              <button class="danger" data-delete-file="${file}">Delete</button>
            </div>
          `)
          .join("");
      }

      function renderRaw() {
        $("rawData").value = JSON.stringify(siteData, null, 2);
      }

      async function loadAll() {
        siteData = await api("/api/data");
        files = await api("/api/files");
        renderTutorialSelect();
        renderFiles();
        renderRaw();
        setStatus("Loaded");
      }

      async function saveData() {
        await api("/api/data", {
          method: "POST",
          body: JSON.stringify(siteData),
        });
        renderRaw();
        setStatus("Saved");
      }

      $("tutorialSelect").addEventListener("change", renderTutorialForm);
      $("reload").addEventListener("click", loadAll);

      document.querySelectorAll("[data-tab]").forEach((button) => {
        button.addEventListener("click", () => {
          ["tutorials", "assets", "data"].forEach((tab) => {
            $(`${tab}Tab`).hidden = tab !== button.dataset.tab;
          });
        });
      });

      $("saveTutorial").addEventListener("click", async () => {
        const item = activeTutorial();
        item.title = { zh: $("titleZh").value, en: $("titleEn").value };
        item.meta = { zh: $("metaZh").value, en: $("metaEn").value };
        item.description = { zh: $("descZh").value, en: $("descEn").value };
        item.href = $("href").value;
        await saveData();
        renderTutorialSelect();
      });

      $("deleteTutorial").addEventListener("click", async () => {
        const index = Number($("tutorialSelect").value);
        const item = activeTutorial();
        if (!item || !confirm(`Delete ${localize(item.title, "en")}?`)) return;
        siteData.tutorials.splice(index, 1);
        await api(`/api/page?path=${encodeURIComponent(item.href)}`, { method: "DELETE" });
        await saveData();
        await loadAll();
      });

      $("createTutorial").addEventListener("click", async () => {
        const payload = {
          slug: $("newSlug").value,
          title: $("newTitle").value,
          meta: $("newMeta").value,
          body: $("newBody").value,
        };
        const result = await api("/api/tutorial", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        siteData.tutorials.push(result.card);
        await saveData();
        $("newSlug").value = "";
        $("newTitle").value = "";
        $("newMeta").value = "";
        $("newBody").value = "";
        await loadAll();
      });

      $("uploadAsset").addEventListener("click", async () => {
        const file = $("assetFile").files[0];
        if (!file) return;
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
        await api("/api/asset", {
          method: "POST",
          body: JSON.stringify({
            folder: $("assetFolder").value,
            filename: file.name,
            dataUrl,
          }),
        });
        $("assetFile").value = "";
        files = await api("/api/files");
        renderFiles();
        setStatus("Uploaded");
      });

      $("fileList").addEventListener("click", async (event) => {
        const path = event.target.dataset.deleteFile;
        if (!path || !confirm(`Delete ${path}?`)) return;
        await api(`/api/asset?path=${encodeURIComponent(path)}`, { method: "DELETE" });
        files = await api("/api/files");
        renderFiles();
        setStatus("Deleted file");
      });

      $("saveRaw").addEventListener("click", async () => {
        siteData = JSON.parse($("rawData").value);
        await saveData();
        await loadAll();
      });

      loadAll().catch((error) => setStatus(error.message));
    </script>
  </body>
</html>
"""


class EditorHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_body_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8")
        return json.loads(raw or "{}")

    def send_editor(self, include_body=True):
        body = EDITOR_HTML.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if include_body:
            self.wfile.write(body)

    def do_HEAD(self):
        parsed = urlparse(self.path)
        if parsed.path == "/editor":
            self.send_editor(include_body=False)
            return
        super().do_HEAD()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/editor":
            self.send_editor()
            return
        if parsed.path == "/api/data":
            self.send_json(read_json())
            return
        if parsed.path == "/api/files":
            files = []
            for folder in ASSET_DIRS.values():
                if folder.exists():
                    for path in folder.rglob("*"):
                        if path.is_file() and path.name not in {".gitkeep", ".DS_Store"}:
                            files.append(str(path.relative_to(ROOT)))
            self.send_json(sorted(files))
            return
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        try:
            if parsed.path == "/api/data":
                write_json(self.read_body_json())
                self.send_json({"ok": True})
                return
            if parsed.path == "/api/tutorial":
                payload = self.read_body_json()
                slug = slugify(payload.get("slug") or payload.get("title") or "new-page")
                title = payload.get("title") or slug.replace("-", " ").title()
                meta = payload.get("meta") or "Tutorial"
                target = safe_relative_path(f"tutorials/{slug}.html", [TUTORIAL_DIR])
                if target.exists():
                    raise ValueError("Tutorial page already exists")
                target.write_text(tutorial_template(title, meta, payload.get("body", "")), encoding="utf-8")
                self.send_json({
                    "href": str(target.relative_to(ROOT)),
                    "card": {
                        "title": {"zh": title, "en": title},
                        "meta": {"zh": meta, "en": meta},
                        "description": {"zh": "新增的教學頁面。", "en": "New tutorial page."},
                        "href": str(target.relative_to(ROOT)),
                    },
                })
                return
            if parsed.path == "/api/asset":
                payload = self.read_body_json()
                folder_key = payload.get("folder")
                if folder_key not in ASSET_DIRS:
                    raise ValueError("Unknown asset folder")
                filename = Path(payload.get("filename", "")).name
                if not filename:
                    raise ValueError("Missing filename")
                header, encoded = payload.get("dataUrl", "").split(",", 1)
                target = safe_relative_path(str(ASSET_DIRS[folder_key].relative_to(ROOT) / filename), [ASSET_DIRS[folder_key]])
                target.write_bytes(base64.b64decode(encoded))
                self.send_json({"path": str(target.relative_to(ROOT))})
                return
        except Exception as error:
            self.send_json({"error": str(error)}, status=400)
            return
        self.send_error(404)

    def do_DELETE(self):
        parsed = urlparse(self.path)
        query = parse_qs(parsed.query)
        try:
            if parsed.path == "/api/page":
                raw_path = query.get("path", [""])[0]
                if not raw_path or raw_path == "tutorials/_template.html":
                    raise ValueError("Refusing to delete this page")
                target = safe_relative_path(raw_path, [TUTORIAL_DIR])
                if target.exists():
                    target.unlink()
                self.send_json({"ok": True})
                return
            if parsed.path == "/api/asset":
                raw_path = query.get("path", [""])[0]
                target = safe_relative_path(raw_path, list(ASSET_DIRS.values()))
                if target.exists():
                    target.unlink()
                self.send_json({"ok": True})
                return
        except Exception as error:
            self.send_json({"error": str(error)}, status=400)
            return
        self.send_error(404)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Local website editor")
    parser.add_argument("--port", type=int, default=8099)
    args = parser.parse_args()

    server = ThreadingHTTPServer(("127.0.0.1", args.port), EditorHandler)
    print(f"Site editor: http://127.0.0.1:{args.port}/editor")
    server.serve_forever()
