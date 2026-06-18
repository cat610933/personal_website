# personal_website

這是一個免費、靜態的個人網站 starter。第一版使用純 HTML、CSS、JavaScript，不需要安裝套件，也不需要付費服務。

## 檔案結構

- `index.html`：網站主要內容與區塊
- `styles.css`：版面、顏色、響應式設計
- `script.js`：專案與發表資料、首頁視覺化 canvas
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
- 在 `script.js` 的 `projects` 陣列修改專案卡片。
- 在 `script.js` 的 `publications` 陣列修改論文與發表。
- 中英文切換文字主要在 `script.js` 的 `translations` 物件裡修改。
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
