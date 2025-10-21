# 📁 專案結構 (Project Structure)

```
AI-Talk/
│
├── 📄 index.html              # 主要 HTML 檔案
│                              # - 聊天視窗容器
│                              # - 錄音按鈕
│                              # - 狀態列
│
├── 🎨 style.css               # 樣式表
│                              # - 現代聊天介面設計
│                              # - 使用者/AI 訊息樣式
│                              # - 響應式設計
│                              # - 動畫效果
│
├── ⚙️ script.js               # 前端 JavaScript
│                              # - Web Speech API 整合
│                              # - 語音轉文字 (STT)
│                              # - 文字轉語音 (TTS)
│                              # - 後端 API 呼叫
│                              # - UI 更新邏輯
│
├── 📁 api/                    # Serverless 函數資料夾
│   └── 💻 chat.js             # 後端 API (Node.js)
│                              # - 安全的 API 金鑰處理
│                              # - Google Gemini API 代理
│                              # - 錯誤處理
│
├── 📋 package.json            # Node.js 專案配置
│                              # - 專案資訊
│                              # - 開發腳本
│
├── ⚙️ vercel.json             # Vercel 部署配置
│                              # - 建置設定
│                              # - 路由規則
│
├── 🔒 .gitignore              # Git 忽略清單
│                              # - 忽略 node_modules
│                              # - 忽略 .env 檔案
│                              # - 忽略部署快取
│
├── 📝 .env.example            # 環境變數範例
│                              # - API 金鑰模板
│
├── 📖 README.md               # 專案說明文件
│                              # - 功能介紹
│                              # - 技術棧
│                              # - 安裝指南
│
├── 🚀 DEPLOYMENT.md           # 詳細部署指南
│                              # - Vercel 部署步驟
│                              # - Netlify 部署步驟
│                              # - 環境變數設定
│                              # - 常見問題排解
│
├── ⚡ QUICKSTART.md           # 快速啟動指南
│                              # - 本地測試方法
│                              # - 快速部署摘要
│
└── 📋 PROJECT_STRUCTURE.md    # 本檔案
                               # - 專案架構說明
```

---

## 🔄 資料流程 (Data Flow)

```
1️⃣ 使用者點擊 "Speak" 按鈕
    ↓
2️⃣ 瀏覽器開始錄音 (Web Speech API)
    ↓
3️⃣ 語音轉換為文字
    ↓
4️⃣ 顯示在聊天視窗（藍色使用者訊息）
    ↓
5️⃣ 發送 POST 請求到 /api/chat
    ↓
6️⃣ 後端從環境變數讀取 API 金鑰
    ↓
7️⃣ 後端呼叫 Google Gemini API
    ↓
8️⃣ AI 生成回應
    ↓
9️⃣ 回應返回前端
    ↓
🔟 顯示在聊天視窗（灰色 AI 訊息）
    ↓
1️⃣1️⃣ 使用 TTS 朗讀回應
```

---

## 🛠️ 技術架構 (Technical Architecture)

### Frontend (前端)
- **HTML5**: 結構
- **CSS3**: 樣式與動畫
- **Vanilla JavaScript**: 核心邏輯
- **Web Speech API**: 
  - `SpeechRecognition` - 語音轉文字
  - `SpeechSynthesis` - 文字轉語音

### Backend (後端)
- **Node.js**: 執行環境
- **Serverless Function**: 無伺服器架構
- **Fetch API**: HTTP 請求

### APIs & Services
- **Google Gemini API**: AI 對話生成
- **Vercel/Netlify**: 託管與部署

---

## 🔐 安全性設計 (Security Design)

### ❌ 不安全的做法（本地測試）
```javascript
// API 金鑰暴露在前端！
const API_KEY = 'your-api-key';
fetch(`https://api.google.com?key=${API_KEY}`);
```

### ✅ 安全的做法（生產環境）
```javascript
// 前端：只呼叫自己的後端
fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ prompt: text })
});

// 後端：API 金鑰安全存放
const API_KEY = process.env.GEMINI_API_KEY;
```

---

## 📊 檔案大小概覽

| 檔案 | 行數 | 用途 |
|------|------|------|
| index.html | ~30 | HTML 結構 |
| style.css | ~150 | 樣式設計 |
| script.js | ~150 | 前端邏輯 |
| api/chat.js | ~100 | 後端 API |
| **總計** | **~430** | **完整應用** |

---

## 🎯 核心功能模組

### 1. 語音辨識模組 (STT Module)
- 檔案: `script.js`
- 函數: `recognition.onresult()`
- 功能: 捕捉語音並轉換為文字

### 2. 文字轉語音模組 (TTS Module)
- 檔案: `script.js`
- 函數: `speak(text)`
- 功能: 將文字轉換為語音輸出

### 3. UI 管理模組 (UI Module)
- 檔案: `script.js`
- 函數: `addMessage(sender, text)`
- 功能: 動態更新聊天介面

### 4. API 通訊模組 (API Module)
- 前端: `script.js` → `getAIResponse()`
- 後端: `api/chat.js` → `handler()`
- 功能: 安全地與 AI 服務通訊

---

## 🚀 部署選項比較

| 特性 | Vercel | Netlify |
|------|--------|---------|
| 部署速度 | ⚡ 極快 | ⚡ 極快 |
| Serverless 函數 | ✅ 原生支援 | ✅ 原生支援 |
| 環境變數 | ✅ 簡單設定 | ✅ 簡單設定 |
| 自訂網域 | ✅ 免費 | ✅ 免費 |
| 建議指數 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 📚 延伸功能建議

### 階段 1 (基礎完成) ✅
- [x] 語音輸入
- [x] AI 回應
- [x] 語音輸出
- [x] 聊天介面

### 階段 2 (可能的擴充)
- [ ] 對話歷史記錄
- [ ] 多種 AI 角色選擇
- [ ] 語言難度設定
- [ ] 文法糾正功能
- [ ] 發音評分
- [ ] 匯出對話記錄

### 階段 3 (進階功能)
- [ ] 使用者帳戶系統
- [ ] 進度追蹤
- [ ] 主題式對話練習
- [ ] 多語言支援
- [ ] 行動 App 版本

---

## 💡 最佳實踐

1. **環境變數**: 永遠使用環境變數存放敏感資訊
2. **錯誤處理**: 在前後端都實作完整的錯誤處理
3. **使用者體驗**: 提供即時狀態回饋
4. **效能**: 使用 Serverless 架構減少伺服器成本
5. **安全性**: API 金鑰絕不暴露在前端

---

**專案完成！準備部署！** 🎉
