// Express 모듈을 가져옵니다.
const express = require('express');

// Express 애플리케이션을 생성합니다.
const app = express();

// 루트 경로 ('/')에 GET 요청이 들어오면 실행될 핸들러를 정의합니다.
app.get('/', (req, res) => {
  // 클라이언트에게 'Hello, World!'라는 응답을 보냅니다.
  res.send('Hello, World!\n');
});

// 서버가 수신 대기할 포트 번호를 설정합니다.
const PORT = 3000;

// 서버를 지정된 포트에서 실행합니다.
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
