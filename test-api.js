/**
 * 測試腳本 - 驗證 API 是否正常工作
 * 運行方式: node test-api.js
 */

async function testAPI() {
    console.log('🧪 開始測試 API...\n');
    
    const testPrompt = "Hello, how are you?";
    console.log(`📤 發送測試訊息: "${testPrompt}"`);
    
    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                prompt: testPrompt 
            })
        });
        
        console.log(`📊 回應狀態: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ 錯誤:', errorText);
            return;
        }
        
        const data = await response.json();
        console.log('\n✅ API 回應成功!');
        console.log('📥 回應內容:');
        console.log(JSON.stringify(data, null, 2));
        
        if (data.success && data.response) {
            console.log('\n💬 AI 回覆:', data.response);
            console.log('\n✅ 測試通過! API 運作正常 🎉');
        } else {
            console.log('\n⚠️ 回應格式不符預期');
        }
        
    } catch (error) {
        console.error('❌ 測試失敗:', error.message);
        console.error(error);
    }
}

// 執行測試
testAPI();
