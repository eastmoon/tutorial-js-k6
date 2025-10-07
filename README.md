# JavaScript Library Grafana K6

## 執行

本專案使用的命令介面僅適用 Windows 環境且運行於 Docker 環境。

+ 進入開發模式

```
do dev
```

## 範例

本專案執行的範例：

+ ```k6 run test-api.js```：K6 對 API 測試範本

## K6 框架概念

Grafana k6 是一個開源、友善開發人員且可擴展的負載測試工具，其開發人員可利用 k6 完成以下用途：

+ 負載和效能測試 ( Load and performance testing )
+ 瀏覽器效能測試 ( Browser performance testing )
+ 效能和綜合監控 ( Performance and synthetic monitoring )
+ 性能測試自動化 ( Automation of performance tests )
+ 混沌與彈性測試 ( Chaos and resilience testing )
+ 基礎設施測試 ( Infrastructure testing )

### [K6 vs JMeter](https://grafana.com/blog/2021/01/27/k6-vs-jmeter-comparison/)

過往主流的負載測試工具為 JMeter，而本節簡述 JMeter 與 K6 特性與差異之處。

##### JMeter

+ GUI-based: JMeter offers a graphical user interface for designing and executing test plans, making it more accessible for testers without extensive coding experience.
+ Broad Protocol Support: It supports a wide range of protocols, including HTTP/S, FTP, JDBC, LDAP, SOAP/REST, and more, making it suitable for diverse testing scenarios.
+ Mature and Established: Being a long-standing tool, JMeter has a large community and extensive resources available for support and troubleshooting.
+ Distributed Testing: JMeter can be configured for distributed testing across multiple machines to simulate very high loads.
+ Resource Intensive: As a Java-based application, JMeter can be more resource-intensive, particularly during high-load scenarios, potentially requiring more powerful hardware or dedicated load generators.

##### K6

+ Code-centric: K6 uses JavaScript for writing test scripts, appealing to developers and teams with a strong coding background.
+ Lightweight and Efficient: Built with Go, K6 is designed for efficiency and lower resource consumption, making it well-suited for integration into CI/CD pipelines and testing on limited infrastructure.
+ Modern Features: K6 offers built-in metrics, real-time reporting, and a focus on modern development practices like "Infrastructure as Code."
+ API and Microservices Focus: While capable of testing various applications, K6 excels in performance testing of APIs and microservices due to its scripting capabilities and efficiency.
+ Growing Ecosystem: Supported by Grafana Labs, K6 benefits from a growing ecosystem and potential for future innovations in performance testing.

##### 差異

+ JMeter 使用者介面友善非程式開發者，K6 則可基於 JavaScript 運作友善於開發者設計自動化測試方向與流程。
+ JMeter 基於 Java 語言設計，有較廣大的開源資源來擴大服務，K6 基於 Go 語言設計，以輕量低資源運用為主軸
+ JMeter 可運用於不同的協議，K6 專注於 WebAPI 協議

### 測試項結構

Grafana K6 是一套用於負載測試的工具，其每個測試項本身即為一份測試腳本檔，但 K6 並不會管理這些腳本檔，因此若要選擇要執行的測試項或循環執行多個測試項則需要自行撰寫 Shell 處理。

而每個測試腳本檔，其結構如同範本 [test-api.js](./app/test-api.js)，其中最主要為三個部分：

+ 宣告函示庫
```
// 匯入 http 模組，來自 k6/http
import http from 'k6/http'
// 匯入 check，sleep 函數工具，來自 k6
import { check, sleep } from 'k6'
```
+ 宣告 K6 測試選項參數
```
// 設定 k6 測試選項
export const options = {
  // 設定此測試項要執行的次數
  iterations: 500,
  // 測試要開啟多少虛擬用戶 ( VUs、Virtual Users )
  vus: 5
};
```
+ 宣告 K6 測試須執行的函數
```
// 測試項啟動函數，在每個 UVs 執行前，僅執行一次的函數
export function setup() { ... }
// 每個虛擬用戶要反覆執行的函數
export default function () { ... }
// 測試項完成所有執行次數後，僅執行一次的函數
export function teardown(data) { ... }
```

在此需要注意，一個負載測試會考慮兩個參數：

1. 要執行次數 ( iterations ) 或執行時間 ( duration )
2. 要啟用多少個虛擬用戶 ( Virtual Users )

若為執行 1000 次數，且為 10 位虛擬用戶，則負載測試會用每位用戶執行 100 次來統計總執行時間。

若為執行 1000 毫秒，且為 10 位虛擬用戶，則負載測試會用每位用戶執行 1000 毫秒來統計總執行次數。

## 文獻

+ [Grafana k6](https://grafana.com/docs/k6)
    - [Write your first test](https://grafana.com/docs/k6/latest/get-started/write-your-first-test/)
    - [Running k6](https://grafana.com/docs/k6/latest/get-started/running-k6/)
    - [Results output](https://grafana.com/docs/k6/latest/get-started/results-output/)
    - Using k6
        + [HTTP Requests](https://grafana.com/docs/k6/latest/using-k6/http-requests/)
        + [Checks](https://grafana.com/docs/k6/latest/using-k6/checks/)
        + [Thresholds](https://grafana.com/docs/k6/latest/using-k6/thresholds/)
        + [Options](https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/)
        + [Test lifecycle](https://grafana.com/docs/k6/latest/using-k6/test-lifecycle/)
    - Testing guides
        + [Load test types](https://grafana.com/docs/k6/latest/testing-guides/test-types/)
+ 文獻
    - [讓開發人員如沐春風的壓力測試工具 - K6](https://blog.darkthread.net/blog/k6-load-testing/)
