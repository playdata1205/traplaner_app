const clientHostName = window.location.hostname;
let backendHostName;

if (clientHostName === 'localhost') {
  backendHostName = 'http://localhost:8181'; // 로컬 backend 서버 주소
} else if (clientHostName === 'traplan.site') {
  backendHostName = 'https://api.traplan.site'; // 배포 backend 서버 주소 추후 변경 필요
}

export const API_BASE_URL = backendHostName;
export const MEMBER = '/member-service';
export const TRAVELBOARD = '/travelboard-service';
export const TRAVELPLAN = '/travelplan-service';
export const MYPAGE = '/mypage-service';
export const MAIN = '/main-service';
