# TRAPLAN
<br/>


### 📢 서비스 개요

---

#### 본 프로젝트는 여행 계획을 작성하는 데 도움을 주고,
#### 다른 유저들과 여행 후기를 공유할 수 있는 소셜네트워킹 여행 플랜 웹 어플리케이션입니다.


<br>

TRAPLAN은 "TRAVEL"과 "PLAN"의 합성어로, 여행할 때 필요한 정보를 관리합니다.

여행 일정과 목적지, 예산, 바우처정보 등을 한 곳에 모아 다이어리처럼 관리할 수 있습니다.

여행 정보 및 후기는 다른 유저들과 공유할 수 있습니다.

공유하고 싶은 여행 정보 및 후기만 공유할수도 있습니다.

### TRAPLAN의 회원이 되어 여행 계획을 공유해보실래요? 😉


<br><br>

### 👋 팀원

---

| 이름        | 담당                      | GITHUB                         |
|-----------|-------------------------|--------------------------------|
| 👩‍💻 이진규 | PM, FRONT, BACK | https://github.com/bildno     |
| 👨‍💻 김민지 | FRONT, BACK, UI/UX     | https://github.com/sup226 |
| 👨‍💻 전상윤 | FRONT, BACK     | https://github.com/CodeName-maru |
| 👩‍💻 정재훈 | FRONT, BACK     | https://github.com/jh080724    |

<br><br>



## TRAPLAN BackEnd Repository
<p>
 https://github.com/bildno/traplaner_back.git
</p>

<br><br>

## TRAPLAN_Front

 #### 본  프로젝트는  여행  플랜  웹  어플리케이션 TRAPLAN을 MSA 구조로 Refactoring 한 FrontEnd 프로젝트임임
<br><br>

### 🔨 기술 스택
---
#### 🛠️ FrontEnd
<p align="left">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="Java" height="25"/>
</p>

#### 📀 DB
<p align="left">
   <img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" alt="IntelliJ IDEA" height="25"/>
  <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" alt="IntelliJ IDEA" height="25"/>
</p>

#### ✂️ Tool
<p align="left">
  <img src="https://img.shields.io/badge/VS%20Code%20Insiders-35b393.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" height="25"/>
</p>

#### ⭐️ etc
<p align="left">
  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git" height="25"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white" alt="GitHub" height="25"/>
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=Postman&logoColor=white" alt="Postman" height="25"/>
  <img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white" alt="Postman" height="25"/>
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white" height="25"/>
  <img src="https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white" height="25"/>
</p>

### CI/CD
<p>
    <img src="https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white" height="25"/>
    <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" height="25"/>
</p>

### Hosting
<img src="https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white" height="25"/>



<br><br>

### 🎯 주요 기능


   
### 📄 회원가입 & 로그인
- 회원은 일반, 카카오 계정을 통해 회원가입 및 로그인이 가능합니다.
- 비밀번호를 잊은 회원은 이메일 인증을 통해 [비밀번호 변경] 할 수 있습니다.

<br><br><br>
<img src="https://github.com/user-attachments/assets/44a2ae3c-23bf-47b4-9f6a-4cb0362beac4"/>


### 📄 메인페이지
- 좋아요를 가장 많이 받은 게시글 4개를 보여줍니다.
- 나의 여행 계획을 작성하는 버튼이 있습니다.
- 나의 지난 여행에 바로 접근할 수 있습니다.
 
<img src="https://github.com/user-attachments/assets/e2032dc5-a591-4d94-9d68-fa89b67f4c78"/>


### 📄 여행계획페이지
- 달력을 통해 전체 여행 기간을 설정할 수 있습니다.
- 여행의 이름을 작성할 수 있습니다.
- 일정일별로 여정을 추가하고 삭제할 수 있습니다. (시간, 여정 이름, 장소 이름, 장소 주소, 예산, 예약바우처 파일)
- 장소 주소는 구글맵API를 통해 장소를 조회하는 즉시 위치를 오른쪽 지도에서 눈으로 확인할 수 있습니다.
- 예산은 자동으로 계산되어 여행 기간동안의 총예산을 확인할 수 있습니다.

<img src="https://github.com/user-attachments/assets/a2900bb5-536e-48c2-a8c8-9978690039b9"/>


### 📄 마이페이지
1. 나의 일정
    - 달력에서 나의 전체 여행 일정을 쉽게 확인할 수 있습니다.
2. 나의 여행
    - 갈 여행과 다녀온 여행 정보들을 한 화면에서 통합 관리할 수 있다.
    - 게시글 작성, 게시여부, 삭제를 할 수 있습니다.
3. 내 게시물
    - 나의 여행에서 게시여부를 선택한 게시물만 모아서 볼 수 있습니다.
    - 제목을 누르면 해당 게시물로 이동합니다.
4. 좋아요한 게시물
    - 게시판에 있는 게시물 중 좋아요를 누른 게시물만 모아서 볼 수 있습니다.
    - 제목을 누르면 해당 게시물로 이동합니다.
5. 계정관리
    - 나의 비밀번호 및 닉네임을 변경할 수 있습니다.
      <br><br>



### 🕘 개발 기간 (10일)
2024-10-21 ~ 2024-10-30

### 🕘 배포 단위 기간 (5일)
2024-12-05 ~ 2024-12-09


<br><br>

