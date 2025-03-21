// Express 모듈을 가져옵니다.
const express = require('express');

// Express 애플리케이션을 생성합니다.
const app = express();

app.use(express.json());

app.get('/swag', (req, res) => {
  res.send('get swag');
});

app.get('/swag/:pserson', (req, res) => {
  res.send(req.params.pserson);
});

app.post('/swag', (req, res) => {
  res.send(req.body);
});

// 서버가 수신 대기할 포트 번호를 설정합니다.
const PORT = 3000;

// 서버를 지정된 포트에서 실행합니다.
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
