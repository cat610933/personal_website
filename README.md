# personal_website

這是一個免費、靜態的個人網站 starter。第一版使用純 HTML、CSS、JavaScript，不需要安裝套件，也不需要付費服務。

## 檔案結構

- `index.html`：網站主要內容與區塊
- `styles.css`：版面、顏色、響應式設計
- `scripts/site-data.js`：中英文文案、專案、教學筆記、論文資料
- `scripts/main.js`：語言切換、卡片 render、首頁視覺化 canvas
- `tutorials/`：教學筆記與文章頁面
- `assets/`：之後放 code、圖片、公式等可被頁面 include 的檔案
- `codex可以讀的說明`：網站建置方向與給 Codex 的需求說明

## 本機預覽

最簡單的方式是直接用瀏覽器打開 `index.html`。

也可以在此資料夾執行：

```bash
python3 -m http.server 8080
```

然後開啟：

```text
http://localhost:8080
```

## 修改內容

常改的位置：

- 在 `index.html` 修改姓名、About、Experience、Research、Contact 文字。
- 在 `scripts/site-data.js` 的 `projects` 陣列修改專案卡片。
- 在 `scripts/site-data.js` 的 `tutorials` 陣列修改教學筆記卡片。卡片有 `href` 時，整張卡片會可以點。
- 在 `scripts/site-data.js` 的 `publications` 陣列修改論文與發表。
- 中英文切換文字主要在 `scripts/site-data.js` 的 `translations` 物件裡修改。
- 新增 tutorial 頁面時，建議放在 `tutorials/`，並在 `scripts/site-data.js` 的 `tutorials` 陣列加入連結。
- 可以從 `tutorials/_template.html` 複製一份，作為新 tutorial 頁面的固定模板。
- code、圖片、PDF、下載包、公式等素材可分別放在 `assets/code/`、`assets/images/`、`assets/pdfs/`、`assets/downloads/`、`assets/formulas/`。
- 首頁個人照放在 `assets/images/profile/profile.jpg`。
- 首頁小 icon 放在 `assets/images/icon/icon.png`。
- 如果要公開 email，可以在 `index.html` 的 Contact 區塊加入 `mailto:` 連結。
- 如果之後有 CV PDF，可以放到 repo 裡，例如 `assets/cv.pdf`，再把 CV 按鈕連到該檔案。

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
4. 如果要讓首頁 tutorial 卡片連到這頁，到 `scripts/site-data.js` 的 `tutorials` 陣列新增一筆：

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
