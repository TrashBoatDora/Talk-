/**
 * 測試 Gemini API 並找出可用的模型
 */

import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testGeminiAPI() {
    console.log('🔍 測試 Gemini API...\n');
    
    // 測試不同的 API 版本和模型名稱
    const testsToRun = [
        {
            name: 'gemini-1.5-flash (v1)',
            url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`
        },
        {
            name: 'gemini-1.5-flash (v1beta)',
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`
        },
        {
            name: 'gemini-pro (v1)',
            url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`
        },
        {
            name: 'gemini-pro (v1beta)',
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`
        }
    ];
    
    const requestBody = {
        contents: [{
            parts: [{ text: "Say hello" }]
        }]
    };
    
    for (const test of testsToRun) {
        console.log(`\n📝 測試: ${test.name}`);
        console.log(`URL: ${test.url.replace(GEMINI_API_KEY, 'API_KEY_HIDDEN')}`);
        
        try {
            const response = await fetch(test.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            
            const data = await response.json();
            
            if (response.ok && data.candidates) {
                console.log(`✅ 成功! 回應: ${data.candidates[0].content.parts[0].text.substring(0, 50)}...`);
                console.log(`\n🎉 找到可用的配置:`);
                console.log(`   模型: ${test.name}`);
                return test;
            } else {
                console.log(`❌ 失敗: ${data.error?.message || '未知錯誤'}`);
            }
        } catch (error) {
            console.log(`❌ 錯誤: ${error.message}`);
        }
    }
    
    console.log('\n\n❌ 所有測試都失敗了');
    console.log('請檢查你的 API Key 是否正確');
}

testGeminiAPI();
