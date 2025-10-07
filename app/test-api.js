// Import libraries

// 匯入 http 模組，來自 k6/http
import http from 'k6/http'
// 匯入 check，sleep 函數工具，來自 k6
import { check, sleep } from 'k6'

// Declare variable

// 設定 k6 測試選項
export const options = {
  // 設定此測試項要執行的次數
  iterations: 500,
  // 測試要開啟多少虛擬用戶 ( VUs、Virtual Users )
  vus: 5
};

// Declare function

// 1. 全域變數，每當 k6 運行時皆會執行，例如啟動 VUs、執行 setup 或 teardown 函數
console.log("Initial testcase global variable.")

// 2. 測試項啟動函數，在每個 UVs 執行前，僅執行一次的函數
export function setup() {
    console.log("Setup testcase")
}
// 3. 每個虛擬用戶要反覆執行的函數
export default function () {
  let res = http.get('http://nginx/value/')

  check(res, { 'success': (r) => r.status === 200 })

  sleep(0.3)
}
// 4. 測試項完成所有執行次數後，僅執行一次的函數
export function teardown(data) {
    console.log("Teardown testcase")
}
