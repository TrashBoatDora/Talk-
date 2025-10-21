# 部署指南 (Deployment Guide)

本指南將引導您將 AI English Conversation Practice App 部署到雲端平台。

## 📋 前置需求

在開始之前，請確保您已準備好：

1. ✅ [GitHub 帳戶](https://github.com/signup)
2. ✅ [Vercel 帳戶](https://vercel.com/signup) 或 [Netlify 帳戶](https://app.netlify.com/signup)
3. ✅ [Google Gemini API 金鑰](https://makersuite.google.com/app/apikey)

---

## 🚀 選項 A: 部署到 Vercel (推薦)

### 步驟 1: 將專案推送到 GitHub

1. 開啟 PowerShell 或終端機，導航到專案目錄：
   ```powershell
   cd d:\ReturnCS\MyCodes\AI-Talk
   ```

2. 初始化 Git 倉庫：
   ```powershell
   git init
   ```

3. 加入所有檔案：
   ```powershell
   git add .
   ```

4. 提交變更：
   ```powershell
   git commit -m "Initial commit: AI English Conversation Practice App"
   ```

5. 在 GitHub 上創建新倉庫：
   - 前往 https://github.com/new
   - 輸入倉庫名稱（例如：`ai-english-chat`）
   - 選擇 Public 或 Private
   - **不要** 勾選 "Initialize this repository with a README"
   - 點擊 "Create repository"

6. 連接到遠端倉庫並推送：
   ```powershell
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ai-english-chat.git
   git push -u origin main
   ```
   
   > 💡 將 `YOUR_USERNAME` 替換為您的 GitHub 使用者名稱

### 步驟 2: 匯入專案到 Vercel

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)

2. 點擊 **"Add New..."** → **"Project"**

3. 從清單中選擇您的 GitHub 倉庫

4. Vercel 會自動偵測設定，保持預設值

5. 點擊 **"Deploy"**

### 步驟 3: 設定環境變數 ⚠️ 最重要的步驟！

1. 部署完成後，前往專案的 Dashboard

2. 點擊頂部的 **"Settings"** 標籤

3. 在左側選單中選擇 **"Environment Variables"**

4. 新增環境變數：
   - **Name (名稱)**: `GEMINI_API_KEY`
   - **Value (值)**: 貼上您的 Google Gemini API 金鑰
   - **Environment (環境)**: 勾選所有選項（Production, Preview, Development）

5. 點擊 **"Save"**

### 步驟 4: 重新部署以套用環境變數

1. 點擊頂部的 **"Deployments"** 標籤

2. 找到最新的部署

3. 點擊右側的 **"..."** 按鈕

4. 選擇 **"Redeploy"**

5. 確認重新部署

### 步驟 5: 測試您的應用程式 🎉

1. 部署完成後，點擊 **"Visit"** 按鈕

2. 允許瀏覽器存取麥克風

3. 點擊 "Speak" 按鈕並開始對話！

---

## 🌐 選項 B: 部署到 Netlify

### 步驟 1: 將專案推送到 GitHub

（與上述 Vercel 的步驟 1 相同）

### 步驟 2: 匯入專案到 Netlify

1. 前往 [Netlify Dashboard](https://app.netlify.com/)

2. 點擊 **"Add new site"** → **"Import an existing project"**

3. 選擇 **"GitHub"** 並授權 Netlify 存取

4. 選擇您的倉庫

5. 保持預設的建置設定

6. 點擊 **"Deploy site"**

### 步驟 3: 設定環境變數

1. 前往 **"Site settings"**

2. 在左側選單選擇 **"Environment variables"** → **"Environment variables"**

3. 點擊 **"Add a variable"** → **"Add a single variable"**

4. 輸入：
   - **Key (鍵)**: `GEMINI_API_KEY`
   - **Value (值)**: 您的 Google Gemini API 金鑰

5. 選擇所有環境範圍（All scopes）

6. 點擊 **"Create variable"**

### 步驟 4: 重新部署

1. 前往 **"Deploys"** 標籤

2. 點擊 **"Trigger deploy"** 下拉選單

3. 選擇 **"Clear cache and deploy site"**

### 步驟 5: 測試您的應用程式 🎉

1. 點擊部署完成後的網址

2. 開始使用！

---

## 🔑 如何獲取 Google Gemini API 金鑰

1. 前往 [Google AI Studio](https://makersuite.google.com/app/apikey)

2. 使用您的 Google 帳戶登入

3. 點擊 **"Create API Key"**

4. 選擇或建立一個 Google Cloud 專案

5. 複製生成的 API 金鑰

6. **重要**: 將此金鑰保存在安全的地方，不要分享給任何人！

---

## 🔧 本地測試（可選）

如果您想在部署前進行本地測試：

1. 安裝 Vercel CLI：
   ```powershell
   npm install -g vercel
   ```

2. 在專案根目錄建立 `.env` 檔案：
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. 執行開發伺服器：
   ```powershell
   vercel dev
   ```

4. 開啟瀏覽器前往 `http://localhost:3000`

---

## ✅ 檢查清單

部署前請確認：

- [ ] 已將程式碼推送到 GitHub
- [ ] 已在 Vercel/Netlify 上部署專案
- [ ] 已設定 `GEMINI_API_KEY` 環境變數
- [ ] 已重新部署以套用環境變數
- [ ] 已測試應用程式（語音輸入和 AI 回應都正常運作）
- [ ] `.env` 檔案已加入 `.gitignore`（不要將 API 金鑰推送到 Git！）

---

## 🐛 常見問題排解

### 問題：AI 無法回應

**解決方法：**
- 檢查是否正確設定 `GEMINI_API_KEY` 環境變數
- 確認 API 金鑰是有效的
- 檢查 Vercel/Netlify 的函式日誌以查看錯誤訊息

### 問題：麥克風無法運作

**解決方法：**
- 確保使用 Chrome 或 Edge 瀏覽器
- 允許瀏覽器存取麥克風權限
- 檢查您的網站是否使用 HTTPS（本地開發使用 localhost 也可以）

### 問題：語音辨識不支援

**解決方法：**
- Web Speech API 在 Safari 和 Firefox 上支援有限
- 建議使用最新版本的 Chrome 或 Edge

---

## 📚 其他資源

- [Vercel 文件](https://vercel.com/docs)
- [Netlify 文件](https://docs.netlify.com/)
- [Google Gemini API 文件](https://ai.google.dev/docs)
- [Web Speech API 文件](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## 🎊 完成！

恭喜！您的 AI English Conversation Practice App 已成功部署。現在您可以隨時隨地練習英語對話了！

如有任何問題，請查看專案的 README.md 或開啟 GitHub Issue。
