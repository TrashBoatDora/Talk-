# 🚀 快速啟動指南 (Quick Start Guide)

## 本地測試版本（不安全 - 僅供學習）

如果您只想快速測試應用程式，可以使用此方法。**警告：API 金鑰會暴露在前端！**

### 步驟：

1. **獲取 Gemini API 金鑰**
   - 前往 https://makersuite.google.com/app/apikey
   - 建立並複製您的 API 金鑰

2. **建立測試版本的 script.js**
   
   在 `script.js` 中，找到這一行：
   ```javascript
   async function getAIResponse(promptText) {
       statusElement.textContent = 'AI is thinking...';
       
       try {
           // Make API call to our OWN backend endpoint
           const response = await fetch('/api/chat', {
   ```
   
   將整個 `getAIResponse` 函數替換為：
   ```javascript
   async function getAIResponse(promptText) {
       statusElement.textContent = 'AI is thinking...';
       
       // ⚠️ 不安全！僅供測試！
       const GEMINI_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
       const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
       
       const requestBody = {
           contents: [{
               parts: [{
                   text: `You are a helpful English conversation partner. The user said: "${promptText}". Please respond naturally and help them practice English. Keep your response conversational and concise (2-3 sentences maximum).`
               }]
           }]
       };
       
       try {
           const response = await fetch(apiUrl, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(requestBody)
           });
           
           if (!response.ok) throw new Error(`API Error: ${response.status}`);
           
           const data = await response.json();
           const aiText = data.candidates[0].content.parts[0].text;
           
           addMessage('AI', aiText);
           speak(aiText);
           
       } catch (error) {
           console.error('Error:', error);
           const errorMessage = 'Sorry, I encountered an error. Please check your API key.';
           addMessage('AI', errorMessage);
           statusElement.textContent = 'Error: ' + error.message;
           setTimeout(() => {
               statusElement.textContent = 'Click the button to speak';
           }, 3000);
       }
   }
   ```

3. **開啟 index.html**
   - 直接在瀏覽器中開啟 `index.html` 檔案
   - 或使用 VS Code 的 Live Server 擴充功能

4. **開始測試！**
   - 點擊 "Speak" 按鈕
   - 允許麥克風權限
   - 開始說英語

---

## 生產環境部署（安全版本）

請參閱 [DEPLOYMENT.md](./DEPLOYMENT.md) 以獲取完整的安全部署指南。

### 快速摘要：

1. **推送到 GitHub**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/ai-english-chat.git
   git push -u origin main
   ```

2. **部署到 Vercel**
   - 前往 https://vercel.com/new
   - 匯入您的 GitHub 倉庫
   - 點擊 Deploy

3. **設定環境變數**
   - Settings → Environment Variables
   - 新增 `GEMINI_API_KEY` = 您的 API 金鑰
   - 儲存並重新部署

4. **完成！** 🎉

---

## 瀏覽器建議

✅ **最佳體驗：**
- Google Chrome (推薦)
- Microsoft Edge (推薦)

⚠️ **有限支援：**
- Safari (語音辨識支援有限)
- Firefox (不支援語音辨識)

---

## 需要幫助？

查看詳細文件：
- [README.md](./README.md) - 專案概述
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 完整部署指南

---

**記住：永遠不要將含有 API 金鑰的程式碼提交到 Git！** 🔒
