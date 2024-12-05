let backendHostName;
let clientHostName = window.location.hostname;

if (clientHostName === 'localhost') {
  backendHostName = 'http://localhost:8181'; // 로컬 backend 서버 주소
} else if (clientHostName === 'traplaner.site') {
  backendHostName = 'https://api.host.com:8181'; // 배포 backend 서버 주소
}

export const API_BASE_URL = backendHostName;
export const MEMBER = '/member-service';
export const TRAVELBOARD = '/travelboard-service';
export const TRAVELPLAN = '/travelplan-service';
export const MYPAGE = '/mypage-service';
export const MAIN = '/main-service';
