/**
 * 本地測試伺服器
 * 模擬 Vercel 環境來測試 API
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// 載入環境變數
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002; // 使用不同的 port 避免衝突

// 中間件
app.use(express.json());
app.use(express.static(__dirname));

// 導入 API handler
import handler from './api/chat.js';

// API 路由
app.post('/api/chat', async (req, res) => {
    // 模擬 Vercel 的 request/response 格式
    const mockReq = {
        method: 'POST',
        body: req.body
    };
    
    const mockRes = {
        status: (code) => {
            res.status(code);
            return mockRes;
        },
        json: (data) => {
            res.json(data);
        }
    };
    
    await handler(mockReq, mockRes);
});

// 提供靜態檔案
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`\n✅ 本地測試伺服器已啟動!`);
    console.log(`🌐 請在瀏覽器開啟: http://localhost:${PORT}`);
    console.log(`🔑 API Key 已載入: ${process.env.GEMINI_API_KEY ? '是 ✓' : '否 ✗'}`);
    console.log(`\n按 Ctrl+C 停止伺服器\n`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} 已被佔用,請關閉其他程式或更改 port`);
    } else {
        console.error('❌ 伺服器啟動錯誤:', err);
    }
});
