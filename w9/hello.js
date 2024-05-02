// 'http' 모듈을 가져와 웹 서버를 만들 수 있는 기능을 활용합니다.
const http = require('http');

// HTTP 서버를 생성하고 요청을 처리하는 함수를 정의합니다.
const server = http.createServer((req, res) => {

    // 응답 상태 코드를 200(OK)으로 설정하고 콘텐츠 유형을 'text/plain'으로 설정합니다.
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // 응답 본문에 "Hello this is our first node.js application" 문자열을 씁니다.
    res.write("Hello this is our first node.js application");

    // 응답을 완료합니다.
    res.end();
});

// 서버가 실행될 포트 번호를 8001로 설정합니다.
const port = 8001;

// 서버를 시작하고 지정된 포트에서 요청을 수락하도록 합니다.
server.listen(port);

// 서버가 지정된 포트에서 실행 중임을 나타내는 메시지를 콘솔에 기록합니다.
console.log(`Server is running on port ${port}`);
