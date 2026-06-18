# personal_website

這是一個免費、靜態的個人網站 starter。第一版使用純 HTML、CSS、JavaScript，不需要安裝套件，也不需要付費服務。

## 檔案結構

- `index.html`：網站主要內容與區塊
- `styles.css`：版面、顏色、響應式設計
- `scripts/site-data.js`：中英文文案、專案、教學筆記、論文資料
- `scripts/main.js`：語言切換、卡片 render、首頁視覺化 canvas
- `data/site-data.json`：網站實際使用的資料；本機 editor 會修改這個檔案
- `tools/site_editor.py`：本機網站管理 GUI
- `tutorials/`：教學筆記與文章頁面
- `projects/`：專案頁面
- `assets/`：之後放 code、圖片、公式等可被頁面 include 的檔案
- `codex可以讀的說明`：網站建置方向與給 Codex 的需求說明

## 本機預覽

最簡單的方式是直接用瀏覽器打開 `index.html`。

建議在此資料夾執行：

```bash
make preview
```

它會自動開啟 `http://localhost:8080`。

## 本機 GUI 編輯器

如果不想直接改底層 HTML / JSON，可以執行：

```bash
make editor
```

它會自動開啟：

```text
http://localhost:8099/editor
```

目前 GUI 支援：

- 查看網站結構
- 新增/刪除 project 頁面
- 編輯 project 首頁卡片文字、內頁連結與 GitHub 連結
- 新增 tutorial 頁面
- 編輯 tutorial 首頁卡片文字、內頁連結與 GitHub 連結
- 刪除 tutorial 頁面
- 上傳 PDF、code、圖片、公式素材、下載包
- 刪除已上傳素材
- 直接編輯 raw `data/site-data.json`

停止 GUI 時，在終端機按 `Ctrl+C`。

## 修改內容

常改的位置：

- 在 `index.html` 修改姓名、About、Experience、Research、Contact 文字。
- 在 GUI 裡修改 tutorial 是最簡單的方式。
- 如果手動改資料，請改 `data/site-data.json`。
- `projects`、`tutorials`、`publications`、`translations` 都在 `data/site-data.json`。
- 新增 project 頁面時，建議放在 `projects/`，並在 `data/site-data.json` 的 `projects` 陣列加入連結。
- 新增 tutorial 頁面時，建議放在 `tutorials/`，並在 `data/site-data.json` 的 `tutorials` 陣列加入連結。
- 可以從 `tutorials/_template.html` 複製一份，作為新 tutorial 頁面的固定模板。
- code、圖片、PDF、下載包、公式等素材可分別放在 `assets/code/`、`assets/images/`、`assets/pdfs/`、`assets/downloads/`、`assets/formulas/`。
- 首頁個人照放在 `assets/images/profile/profile.jpg`。
- 首頁小 icon 放在 `assets/images/icon/icon.png`。
- CV PDF 放在 `assets/cv/cv.pdf`，放進去後首頁 CV 按鈕會自動啟用。
- 如果要公開 email，可以在 `index.html` 的 Contact 區塊加入 `mailto:` 連結。
- 如果之後有 CV PDF，請放到 `assets/cv/cv.pdf`。

## 免費上線方式：GitHub Pages

這個 repo 已經連到 GitHub remote：

```text
https://github.com/cat610933/personal_website.git
```

部署步驟：

1. 把修改推到 GitHub。

```bash
git add .
git commit -m "Initial personal website"
git push origin main
```

2. 到 GitHub repo 頁面。
3. 進入 `Settings`。
4. 左側選 `Pages`。
5. 在 `Build and deployment` 裡選：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. 按 `Save`。

GitHub Pages 建置完成後，網址通常會是：

```text
https://cat610933.github.io/personal_website/
```

如果 repo 改名成 `cat610933.github.io`，網址會變成：

```text
https://cat610933.github.io/
```

## 免費方案注意事項

- 不買網域也可以上線；GitHub Pages 會提供免費 `github.io` 網址。
- 自訂網域通常需要付費購買。
- 這版沒有後端、資料庫、寄信表單，所以部署與維護成本最低。
- Contact 先使用 `mailto:` 連結，完全免費。

## 首頁圖片

目前首頁已經預留兩個圖片位置：

```text
assets/images/profile/profile.jpg
assets/images/icon/icon.png
```

建議：

- `profile.jpg`：使用正方形圖片，至少 `600 x 600`，網站會自動裁成圓形。
- `icon.png`：使用正方形圖片，建議透明背景 PNG，至少 `256 x 256`，會顯示在左上角名字旁邊。
- 檔名要完全一樣；如果換檔名，要同步改 `index.html` 裡的 `src`。
- 圖片還沒放進去時，網站會顯示簡單 placeholder，不會破圖。

## Tutorial 頁面模板

新增可放文字、PDF 預覽、下載資源的頁面時：

1. 複製 `tutorials/_template.html`。
2. 改名，例如 `tutorials/my-topic.html`。
3. 在新檔裡修改標題、文字、PDF iframe 的 `src`、下載連結。
4. 如果要讓首頁 tutorial 卡片連到這頁，到 `data/site-data.json` 的 `tutorials` 陣列新增一筆：

```js
{
  title: { zh: "我的主題", en: "My Topic" },
  meta: { zh: "Simulation / derivation", en: "Simulation / derivation" },
  description: {
    zh: "這裡放中文簡介。",
    en: "Short English summary.",
  },
  href: "tutorials/my-topic.html",
}
```

PDF 可以放在：

```text
assets/pdfs/my-note.pdf
```

然後在頁面中使用：

```html
<iframe class="pdf-frame" src="../assets/pdfs/my-note.pdf" title="PDF preview"></iframe>
```

Project 頁面也使用同樣邏輯。可以從 `projects/_template.html` 複製，或直接用 `make editor` 在 GUI 裡新增。Project / Tutorial 卡片都支援可選的 GitHub 連結；沒有填 GitHub 也可以正常顯示。

## CV

把 CV PDF 放成這個固定檔名：

```text
assets/cv/cv.pdf
```

放好後：

- 首頁的 `CV` 按鈕會自動啟用。
- `cv.html` 會直接在頁面中預覽 PDF。
- `cv.html` 也有 Download CV 連結。

也可以用 `make editor` 上傳到 `CV` 資料夾。若檔名不是 `cv.pdf`，請改名成 `cv.pdf`，首頁按鈕才會自動偵測。
