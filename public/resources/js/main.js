// api 호출 관련
// api_base: API 호출의 기본 URL 설정
//   - 루트 경로가 아닌 경우 현재 경로 사용
//   - 루트 경로인 경우 location.origin 사용
let api_base=location.pathname!=='/'?location.origin+":8080"+location.pathname:location.origin+":8080";

/*
 * 업체별 스타일 설정
 * - 각 업체별로 다른 스타일과 이미지를 적용하기 위한 설정
 * - companyText: 업체명을 저장하는 변수
 * - companyImgNames: 업체별 이미지 이름을 저장하는 변수
 * - chatCon: 채팅 연결 URL
 */
const chatBot = document.querySelector(".chat-bot");
const logoBox = document.querySelector(".logo-box");
const title = document.querySelector("title");
const ChatBotHeaderChar = document.querySelector(".chat-bot > header a .char")
const favicon = document.querySelector("link[rel='icon']");
let companyText = "올림픽스포츠센터";
let companyImgNames = "";
let chatCon=`https://o8z36.channel.io/home`;
let evalList=[];
document.cookie = `evalList=${encodeURIComponent(JSON.stringify(evalList))}; path=/; `;
if(location.href.split("?")[1] && location.href.split("?")[1].split("=")[1]){
  companyText = decodeURI(location.href.split("?")[1].split("=")[1]);
}

/*
 * 업체별 스타일 변경 함수
 * @param {string} companyText - 변경할 업체명
 * 
 * 해당 업체에 맞는 스타일과 이미지를 적용합니다.
 * 각 업체별로 다른 채팅 연결 URL과 이미지를 설정합니다.
 */
function companyChanger(companyText){
  let name = "";
  if(companyText === "올림픽수영장"){
    name = "_swim";
    chatCon='https://olympicswimmimngpool.channel.io/home'
  }else if(companyText === "테니스장"){
    name = "_tennis";
    chatCon='https://9v3q1.channel.io/home'
  }else if(companyText === "축구장"){
    name = "_soccer";
    chatCon='https://vdo3q.channel.io/home'
  }else if(companyText === "일산스포츠센터"){
    name = "_ilsan";
    chatCon='https://63zx2.channel.io/home'
  }else if(companyText === "분당스포츠센터"){
    name = "_bundang";
    chatCon='https://n1p7v.channel.io/home'
  }

  chatBot.classList.add(name.split("_")[1]);
  companyImgNames = name;
  logoBox.href = location.href;
  ChatBotHeaderChar.attributes[2].value = ChatBotHeaderChar.attributes[2].value.replace("char.png", `char${companyImgNames}.png`);
  favicon.href = `/resources/img/char${companyImgNames}.png`;
  title.innerHTML = `${companyText} 챗봇`;
}
companyChanger(companyText);

/*
 * 뷰포트 높이 설정
 * - 브라우저의 실제 뷰포트 높이를 계산하여 CSS 변수에 설정
 * - 화면 크기 변경 시 자동으로 업데이트됨
 */
function adjustHeight() {
  const viewportHeight = window.innerHeight; // 실제 사용 가능한 높이
  document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`);
}

// 호출 및 이벤트 리스너 등록
adjustHeight();
window.addEventListener('resize', adjustHeight);

/*
 * 메뉴 기능
 * - 메뉴 버튼 클릭 시 왼쪽 메뉴 표시/숨김
 * - 화면 크기 950px 이상일 때 자동으로 메뉴 숨김
 * - 모바일 화면에서는 메뉴가 보이지 않도록 설정
 */
const menuBtn = document.querySelector(".menu-btn");
const leftMenu = document.querySelector(".left-menu");
menuBtn.addEventListener("click", () => {
  leftMenu.classList.add("active");
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("left-menu")) {
    leftMenu.classList.remove("active");
  }
});
window.addEventListener("resize", () => {
  if(window.innerWidth > 950){
    leftMenu.classList.remove("active");
  }else{
    leftMenu.style.display = "none";
    setTimeout(() => {
      leftMenu.style.display = "block";
    }, 300);
  }
});

// 연관 검색어 클릭
async function wordSend(value) {
  await chatSend(value);
  sendMessage.focus();
}

/*
 * 채팅 기능
 * - 채팅 입력과 전송 기능 구현
 * - 서버와의 통신 처리
 * - 응답 데이터 처리 및 표시
 * - 버튼과 링크 처리
 * - 이미지와 지도 표시 기능
 */
const chatInputBox = document.querySelector(".chat-input");
const sendMessage = document.querySelector("#sendMessage");
const sendBtn = document.querySelector(".send-btn");
const chatBox = document.querySelector(".chat-box");
let isMake = false;

/*
 * 채팅 전송 함수
 * @param {string} value - 사용자가 입력한 메시지
 * 
 * 1. 메시지 전송 준비
 * 2. 서버와의 통신 처리
 * 3. 응답 데이터 처리
 * 4. 화면에 메시지 표시
 * 5. 버튼과 링크 처리
 * 6. 이미지와 지도 표시
 */
async function chatSend(value) {
  // 평가 기록 위한 데이터
  evalList=JSON.parse(decodeURIComponent(get_cookie('evalList')))
  let evalJson = {};
  let myAnswer = {};
  chatInputBox.classList.add("loading");
  sendMessage.blur();
  const forbiddenRegex = /^[!@#$%^&*()_+={}\[\]|\\:"'<>,.?/~]+$/;
  const forbiddenRegexD = /[!@#$%^&*()_+={}\[\]|\\:"'<>,.?/~]/g;
  const time = new Date().toLocaleTimeString();
  const timeSet = time.substring(0, time.length - 3);

  const response = await fetch(`${api_base}/getChat`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_num: chatRoom,
      name: value.split("**")[0].replace(forbiddenRegexD, ''),
      company: company,
      session_id: jsession
    }),
  });

  // 평가 기록 위한 데이터 삽입
  evalJson.name = value.split("**")[0];
  // 자세히 보기 같은 특별한 단어들 처리
  if (value.indexOf("**") > -1) {
    value = value.split("**")[1];
  }
  let myQuestion = {type: "right", time: timeSet, content: value};
  let res = await response.text();
  res = JSON.parse(res);

  if (forbiddenRegex.test(value.split("**")[0])) {
    res = [];
  }

  let buttons = [];
  let mapjson = {check: false};
  let imgURL;
  historyData.forEach((e) => {
    // 데이터가 있을때 // 채팅방번호 같은거 찾기
    if (e.chatRoom === chatRoom) {
      // 채팅방 이름 바꾸기
      e.name = value;

      if (res.length > 0) {
        // 데이터 있을때
        // 버튼 정보 만들기
        let button = {};
        res.forEach((be) => {
          if (be.btn_type) {
            // type link = 웹링크 전화걸기 text=대화연결
            if (be.btn_type === '대화연결') {
              button.type = 'text';
              button.href = be.btn_name.split("**")[1] ? be.btn_name.split("**")[1] : be.btn_name.split("**")[0];
            } else if (be.btn_type === '전화걸기') {
              button.type = 'link';
              button.href = "tel:" + be.btn_name.split("**")[1];
            } else if (be.btn_type === '웹링크') {
              button.type = 'link';
              button.href = be.btn_name.split("**")[1] ? be.btn_name.split("**")[1] : "http://www.naver.com";
            } else if (be.btn_type === '이미지') {
              imgURL = be.btn_name.split("**")[1] ? be.btn_name.split("**")[1] : "http://www.naver.com";
            } else if (be.btn_type === '지도') {
              // item.mapData.id, item.mapData.markText, item.mapData.la, item.mapData.lo
              mapjson.check = true;
              mapjson.id = generateUUID();
              mapjson.markText = be.btn_name.split("**")[0];
              mapjson.la = be.btn_name.split("**")[1].split(',')[0];
              mapjson.lo = be.btn_name.split("**")[1].split(',')[1];
              mapjson.roadView = be.btn_name.split("**")[1].split(',')[2];
            }
            if (be.btn_type !== '지도' && be.btn_type !== '이미지') {
              button.btnName = be.btn_name.split("**")[0];
              buttons.push(JSON.parse(JSON.stringify(button)));
            }
          }
        });

        // 내 질문 넣기
        e.characterData.push({type: "right", time: timeSet, content: value});
        // 채팅방에 넣을 json 만들기
        let json = {type: "left", time: timeSet};
        json.content = res[0].answer;
        // 평가 기록 위한 데이터 삽입
        evalJson.answer = res[0].answer;
        // 버튼 데이터 넣기
        if (buttons.length > 0) json.buttons = buttons.slice();
        // map 데이터 넣기
        if (mapjson.check) {
          json.mapData = JSON.parse(JSON.stringify(mapjson));
        }
        if (imgURL) {
          json.imgURL = imgURL;
        }
        e.characterData.push(JSON.parse(JSON.stringify(json)));
        myAnswer = JSON.parse(JSON.stringify(json));
      } else {
        // 데이터 없을때
        // 내 질문 넣기
        e.characterData.push({type: "right", time: timeSet, content: value});
        // 응답값 넣기
        e.characterData.push({
          type: "left",
          time: timeSet,
          content: '죄송합니다. 질문을 이해하지 못했어요.\n' +
              '\'강좌\', \'주차\', \'약도\' 등 간단한 키워드로 다시 한번 말씀해 주시거나 \'채팅 상담 연결\'을 이용해 주세요',
          buttons: [{type: 'link', href: chatCon, btnName: '채팅 상담사 연결'}]
        });
        myAnswer = {
          type: "left",
          time: timeSet,
          content: '죄송합니다. 질문을 이해하지 못했어요.\n' +
              '\'강좌\', \'주차\', \'약도\' 등 간단한 키워드로 다시 한번 말씀해 주시거나 \'채팅 상담 연결\'을 이용해 주세요',
          buttons: [{type: 'link', href: chatCon, btnName: '채팅 상담사 연결'}]
        };
        evalJson.answer = '죄송합니다. 질문을 이해하지 못했어요.\n' +
            '\'강좌\', \'주차\', \'약도\' 등 간단한 키워드로 다시 한번 말씀해 주시거나 \'채팅 상담 연결\'을 이용해 주세요';
      }
    }
  });

  chatInput = true;
  // 이전 타이머 취소
  while (isMake) {
    clearTimeout(autoCompleteTimer);
    clearTimeout(typingTimer);
    document.querySelector('#related-question').innerHTML = '';
    await sleep(200);
  }
  // 끝났을때 한번 더 클리어
  clearTimeout(autoCompleteTimer);
  clearTimeout(typingTimer);
  document.querySelector('#related-question').innerHTML = '';
  createChat(companyText);
  sendMessage.value = "";
  evalList.push(JSON.parse(JSON.stringify(evalJson)));
  document.cookie = `evalList=${encodeURIComponent(JSON.stringify(evalList))}; path=/; `;
  fetch(`${api_base}/insertHistory`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      history: JSON.stringify(myQuestion),
      company: company,
      session_id: jsession,
      chat_num: chatRoom
    }),
  }).then(res => {
    fetch(`${api_base}/insertHistory`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        history: JSON.stringify(myAnswer),
        company: company,
        session_id: jsession,
        chat_num: chatRoom
      }),
    });
  });

  sendBtn.classList.remove("active");
}

sendMessage.addEventListener("input", async (e) => {

  if (e.target.value.length > 0) {
    sendBtn.classList.add("active");
  } else {
    sendBtn.classList.remove("active");
  }
});

let chatCount = 0;
sendMessage.addEventListener("keydown", async (e) => {
  if (e.target.value.length > 0 && e.keyCode === 13) {
    await chatSend(e.target.value);
    e.target.value = "";
    sendMessage.focus();
    chatCount++;

    if(chatCount === 3){
      $(".satisfaction").addClass("active");
      chatCount = 0;
    }
  }
});

sendBtn.addEventListener("click", async () => {
  if (sendMessage.value !== "") {
    await chatSend(sendMessage.value);
    sendMessage.focus();
    chatCount++;

    if(chatCount === 3){
      $(".satisfaction").addClass("active");
      chatCount = 0;
    }
  }
});

/* 채팅 내용 출력 */
const chatHead =
    `
  <div class="chat-head">
    <div class="char"><img src="/resources/img/char${companyImgNames}.png" alt=""></div>
    <div class="quick-btn-box">
      <h3 class="question">자주 묻는 질문</h3>
      <div class="quick-btn-item">
        <button onclick="chatSend('종목 및 강사안내')">
          <img src="/resources/img/icon/quick${companyImgNames}_01.svg" alt="">
          종목 및 강사안내
        </button>
        <button onclick="chatSend('강습 등록 방법')">
          <img src="/resources/img/icon/quick${companyImgNames}_02.svg" alt="">
          강습 등록 방법
        </button>
        <button onclick="chatSend('센터 이용 안내')">
          <img src="/resources/img/icon/quick${companyImgNames}_03.svg" alt="">
          센터 이용 안내
        </button>
        <button onclick="chatSend('할인·환불·연기·변경')">
          <img src="/resources/img/icon/quick${companyImgNames}_04.svg" alt="">
          할인·환불·연기·변경
        </button>
        <button onclick="chatSend('주말 및 공휴일 이용문의')">
          <img src="/resources/img/icon/quick${companyImgNames}_05.svg" alt="">
          주말 및 공휴일 이용문의
        </button>
        <button onclick="chatSend('오시는 길')">
          <img src="/resources/img/icon/quick${companyImgNames}_06.svg" alt="">
          오시는 길
        </button>
      </div>
    </div>
  </div>
  `;

const historyBox = document.querySelector(".history-item > ul");
let historyData =[];

/* 첫 로딩 */
/*document.addEventListener("DOMContentLoaded", () => {
  createChat(companyText);
});*/
/* 채팅 입력 시 및 버튼 클릭 시에만 스크롤 내려가게 하는 변수 */
let chatInput = false;
const createChat = (companyText) => {

  const companyName = document.querySelector(".logo-box span");

  companyName.innerHTML = companyText + "챗봇";

  historyBox.innerHTML ='';
  for(let i = historyData.length; i > 0; i--){
    historyBox.innerHTML +=
        `
      <li id="${historyData[i-1].chatRoom}" ${historyData[i-1].active ? `class="active"` : ""}>
        <p id="history${i}">${historyData[i-1].name}</p>
        <button class="remove-btn"></button>
      </li>
      `

    if(historyData[i-1].active){
      chatBox.innerHTML = chatHead;
      historyData[i-1].characterData.forEach((item) => {

        chatBox.innerHTML +=
            `
          <div class="chats ${item.type}">
            ${item.type === "left" ? `<div class="icon"><img src="/resources/img/char${companyImgNames}.png" alt=""></div>` : ``}
            <div class="balloon" ${item.mapData ? `id="map${item.mapData.id}header"` : ``}>
              ${item.imgURL ? `<img src="/resources/img/${item.imgURL}.png" alt="">` : ""}
         
              ${item.content ? `<p>${item.content}</p>` : ""}
              ${item.buttons ? `<div class="btn-wrap">` : ""}
              ${item.buttons ? item.buttons.map((btn) => {
              if(btn.type === "text"){
                return `<button onclick="chatSend('${btn.href}**${btn.btnName}');" class="btn ${btn.type}">${btn.btnName}</button>`
              }else if(btn.type === "link"){
                return `<a target="_blank" href="${btn.href}" class="btn ${btn.type}">${btn.btnName}</a>`
              }
            }).join('') : ""}
              ${item.buttons ? `</div>` : ""}
            </div>
            ${item.outBtn ? `<a href="#" class="btn chat-connect">${item.outBtn}</a>` : ""}
            <div class="time">${item.time}</div>
          </div>
          `;
        if(item.mapData){
          showAddressOnMap(item.mapData.id, item.mapData.markText, item.mapData.la, item.mapData.lo,item.mapData.roadView);
        }
      });
    }
  }

  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: chatInput ? "smooth" : "auto",
  });
  chatInput = false;

  chatInputBox.classList.remove("loading");
  // sendMessage.focus();
};

/*
 * 채팅 추가 버튼 기능
 * - 새로운 채팅방 생성
 * - 채팅방 목록 관리
 * - 채팅방 선택 기능
 */
const chatAddBtn = document.querySelector(".add-btn");
const chats = document.querySelectorAll(".chat-box .chats");

chatAddBtn.addEventListener("click", async () => {
  // 채팅방 번호 생성
  chatRoom = historyData.length+generateUUID();
  // 초기 시간 설정
  const inIttime = new Date().toLocaleTimeString();
  const intIttimeSet = inIttime.substring(0, inIttime.length - 3);
  const historyBox = document.querySelector(".history-item > ul");
  let response = await fetch(`${api_base}/getChat`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_num: 'inittest',
      name: '인트로',
      company: company,
      session_id: jsession
    }),
  })
  let e= await response.text()
  let buttons = [];
  let button = {};
  let mapjson = {};
  JSON.parse(e).forEach((be) => {
    if (be.btn_type) {
      // type link = 웹링크 전화걸기 text=대화연결
      if (be.btn_type === '대화연결') {
        button.type = 'text';
        button.href = be.btn_name.split("**")[1] ? be.btn_name.split("**")[1] : be.btn_name.split("**")[0]
      } else if (be.btn_type === '전화걸기') {
        button.type = 'link';
        button.href = "tel:" + be.btn_name.split("**")[1]
      } else if (be.btn_type === '웹링크') {
        button.type = 'link';
        button.href = be.btn_name.split("**")[1] ? be.btn_name.split("**")[1] : "http://www.naver.com"
      } else if (be.btn_type === '지도') {
        // item.mapData.id, item.mapData.markText, item.mapData.la, item.mapData.lo
        mapjson.check = true;
        mapjson.id = generateUUID();
        mapjson.markText = be.btn_name.split("**")[0];
        mapjson.la = be.btn_name.split("**")[1].split(',')[0];
        mapjson.lo = be.btn_name.split("**")[1].split(',')[1];
        mapjson.roadView = be.btn_name.split("**")[1].split(',')[2];
      }
      if (be.btn_type !== '지도') {
        button.btnName = be.btn_name.split("**")[0];
        buttons.push(JSON.parse(JSON.stringify(button)))
      }
    }


  })
  // 초기에 데이터 뿌리기
  const newList =
      {
        name: "새로운 대화", active: true, chatRoom: chatRoom,
        characterData: [
          {
            type: "left",
            content: JSON.parse(e)[0].answer,
            time: intIttimeSet,
            mapData: mapjson.check ? mapjson : null,
            buttons: buttons
          },
        ]
      }
  fetch(`${api_base}/insertHistory`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      history: JSON.stringify({
        type: "left",
        content: JSON.parse(e)[0].answer,
        time: intIttimeSet,
        mapData: mapjson.check ? mapjson : null,
        buttons: buttons
      }),
      company:company,
      session_id:jsession,
      chat_num:chatRoom
    }),
  })







  historyBox.innerHTML = "";
  historyData.forEach((item) => {
    if (item.active) {
      item.active = false;
    }
  })

  historyData.push(newList);
  createChat(companyText);
});

/* 대화 기록 변경 */
$(function(){
  let href = location.href.split("://")[1];

  if(href !== "chatbot.ksponco.ieabot.com" && href !== "chatbot.ksponco.ieabot.com/" && href !== "localhost/"){
    $("footer").hide();
    $(".chat-bot .content-box").css("height", "100%");
  }

  $(document).on("click", ".history-item li > p", function(e){
    const historyText = historyBox.querySelector("ul > li > p");
    const item = e.target.closest("li");
    if (!item) return;

    const historyItems = historyBox.querySelectorAll("li");
    historyItems.forEach((history) => {
      history.classList.remove("active")
    });
    item.classList.add("active");


    // index 구하고 반대로 정렬
    const index = historyItems.length - 1 - Array.from(historyItems).indexOf(item);

    for (let i = historyData.length; i > 0; i--) {
      if (historyData[i - 1].active) {
        historyData[i - 1].active = false;
      }
      if (i - 1 === index) {
        historyData[i - 1].active = true;
      }
    }
    historyBox.innerHTML = "";
    historyData.forEach(e => {
      if (e.active === true) {
        chatRoom = e.chatRoom;
      }
    })
    createChat(companyText);
  });

  $(document).on("click", ".history-item li > button", async function () {
    let index = $(this).closest("li").index();
    const delId=$(this).closest("li")[0].id;
    let isActive=false;
    historyData.forEach((e) => {
      if (e.chatRoom === delId) {
        isActive = e.active; // 삭제할 요소의 active 값
      }
    });

    if (confirm("해당 대화를 삭제하시겠습니까?")) {
      // 대화 필터링하여 삭제 처리
      historyData = historyData.filter((e) => e.chatRoom !== delId);

      // 삭제된 active가 true였을 경우, 첫 번째 남아있는 항목에 active 적용
      if (isActive) {
        if (historyData.length > 0) {
          historyData[historyData.length-1].active = true; // 첫 번째 남아있는 대화에 active 설정
        }
      }




      await fetch(`${api_base}/deleteChatRooom`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          chat_num:chatRoom,
          company: company,
          session_id: jsession
        }),
      });
      alert("대화가 삭제되었습니다.");
      createChat(companyText);
    }
  });

  $(document).on("click", ".rating-box .rate-btn", function(){
    const i = $(this).index();
    const text = ["1점 매우불만족", "2점 불만족", "3점 보통", "4점 만족", "5점 매우만족"];

    $(this).parent().find("> .rate-btn").removeClass("active");
    $(this).addClass("active");
    $(this).parent().next().text(text[i]);
    if(i < 2){
      $(this).closest(".pop-body").find(".survey-box").addClass("active");
      if($(this).closest(".popup-box").find(".survey-box textarea")[0].value.length > 0){
        $(this).closest(".popup-box").find(".pop-foot .confirm-btn").attr("disabled", false);
      }else{
        $(this).closest(".popup-box").find(".pop-foot .confirm-btn").attr("disabled", true);
      }
    }else{
      $(this).closest(".pop-body").find(".survey-box").removeClass("active");
      $(this).closest(".popup-box").find(".pop-foot .confirm-btn").attr("disabled", false);
    }
  });

  $(document).on("input", ".survey-box textarea", function(e){
    const value = e.target.value;
    if(value.length > 0){
      $(this).closest(".popup-box").find(".pop-foot .confirm-btn").attr("disabled", false);
    }else{
      $(this).closest(".popup-box").find(".pop-foot .confirm-btn").attr("disabled", true);
    }
  });

  $(document).on("click", ".popup .close-btn", function(){
    $(this).closest(".popup").removeClass("active");
  });
  $(document).on("click", "#evalEnd", function(){
    evalInsert();
  });

  $(document).on("click", ".satisfaction .confirm-btn", function(){
    $(this).closest(".popup").removeClass("active");
    $(".satisfaction-confirmed").addClass("active");

    let name = "";
    if(companyText === "올림픽수영장"){
      name = "_swim";
      chatCon='https://olympicswimmimngpool.channel.io/home'
    }else if(companyText === "테니스장"){
      name = "_tennis";
      chatCon='https://9v3q1.channel.io/home'
    }else if(companyText === "축구장"){
      name = "_soccer";
      chatCon='https://vdo3q.channel.io/home'
    }else if(companyText === "일산스포츠센터"){
      name = "_ilsan";
      chatCon='https://63zx2.channel.io/home'
    }else if(companyText === "분당스포츠센터"){
      name = "_bundang";
      chatCon='https://n1p7v.channel.io/home'
    }
    $(".satisfaction-confirmed img").attr("src", `/resources/img/char${name}.png`);
  });

  $(document).on("click", ".satisfaction-confirmed .confirm-btn", function(){
    $(this).closest(".popup").removeClass("active");
  });

  $(document).on("click", ".btn.link", function(){
    chatCount=0;
    setTimeout(() => {
      window.open(api_base.replace(":8080","")+"/window?company="+company, "_blank", "width=800, height=500");
    }, 500);
  });

  $(document).on("click", ".btn.text", function(){
    chatCount++;
    if(chatCount === 3){
      $(".satisfaction").addClass("active");
      chatCount = 0;
    }
  });

  $(document).on("click", ".menu-close-btn", function(){
    $(this).closest(".left-menu").removeClass("active");
  });
});

const wordChanger = document.querySelector(".word-change-btn");
wordChanger.addEventListener("click", () => {
  const chatBot = document.querySelector(".chat-bot");
  if(chatBot.classList.contains("normal")){
    chatBot.classList.remove("normal");
    chatBot.classList.add("big");
    wordChanger.innerHTML = "보통";
  }else if(chatBot.classList.contains("big")){
    chatBot.classList.remove("big");
    chatBot.classList.add("small");
    wordChanger.innerHTML = "크게";
  }else{
    chatBot.classList.remove("small");
    chatBot.classList.add("normal");
    wordChanger.innerHTML = "더 크게";
  }
});

/*
 * 카카오 맵 기능
 * - 지도 표시 및 관리
 * - 마커 표시
 * - 주소 검색
 * - 로드뷰 표시
 */
function showAddressOnMap(markerId, markerText, la, lo, roadView) {
  // 지도 컨테이너 요소 생성
  const mapContainers = document.createElement("div");
  mapContainers.classList.add("chats", "left");

  // 지도 HTML 구성
  mapContainers.innerHTML = `
        <div class="map-wrap">
            <div id="map${markerId}" style="width:100%; height:300px;"></div> 
            <div id="map${markerId}footer">
              <div class="btn-wrap">
                <a class="btn location">로드뷰</a>
                <a class="btn milestone">길찾기</a>
                <a class="btn expand">지도크게보기</a>
              </div>
            </div>
        </div>
    `;

  // 해당 ID의 헤더 요소를 찾은 후 mapContainers 추가
  const headerElement = document.querySelector(`#map${markerId}header`);
  if (headerElement) {
    headerElement.prepend(mapContainers);
  } else {
    console.error(`헤더 요소 #map${markerId}header를 찾을 수 없습니다.`);
    return;
  }

  // 새로운 지도 div가 추가되었으므로, 비동기 처리로 실행
  setTimeout(() => {
    var mapContainer = document.getElementById(`map${markerId}`);

    if (!mapContainer) {
      console.error(`지도를 표시할 div (#map${markerId})를 찾을 수 없습니다.`);
      return;
    }

    // 지도 옵션 설정
    var mapOption = {
      center: new kakao.maps.LatLng(la, lo),
      level: 3
    };

    // 지도 생성
    var map = new kakao.maps.Map(mapContainer, mapOption);

    // 마커 생성
    var marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(la, lo)
    });

    // 인포윈도우 표시
    var infowindow = new kakao.maps.InfoWindow({
      content: `<div class="marker">${markerText}</div>`
    });

    infowindow.open(map, marker);

    // 지도 중심 이동
    map.setCenter(new kakao.maps.LatLng(la, lo));

    // 줌 컨트롤 추가
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 길찾기 및 로드뷰 링크 설정
    let jido = `https://map.kakao.com/link/map/${markerText},${la},${lo}`;
    let road = `https://map.kakao.com/link/to/${markerText},${la},${lo}`;
    let view = `https://map.kakao.com/link/roadview/${roadView}`;

    document.querySelector(`#map${markerId}footer .btn-wrap .milestone`).href = road;
    document.querySelector(`#map${markerId}footer .btn-wrap .milestone`).target = "_blank";
    document.querySelector(`#map${markerId}footer .btn-wrap .expand`).href = jido;
    document.querySelector(`#map${markerId}footer .btn-wrap .expand`).target = "_blank";
    document.querySelector(`#map${markerId}footer .btn-wrap .location`).href = view;
    document.querySelector(`#map${markerId}footer .btn-wrap .location`).target = "_blank";
  }, 100); // DOM 업데이트를 기다리기 위해 setTimeout 사용
}
let point=0;
function btnPoint(value){
  point=value;
}

function evalInsert(closePoint){

  let data=JSON.parse(decodeURIComponent(get_cookie('evalList')));
  let comment=document.querySelector(`#comment`).value;

  fetch(`${api_base}/insertEval`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      company:company,
      data:data,
      session_id:jsession,
      comment:comment,
      point:closePoint ? closePoint : point
    }),
  });
  evalList=[];
  document.cookie = `evalList=${encodeURIComponent(JSON.stringify(evalList))}; path=/; `;
}
/* 채팅 초기 데이터 작업 */
// 쿠키값 가져오기
function get_cookie(name) {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value? value[2] : null;
}
// uuid생성
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
  );
}
//세션 아이디 생성
let chatRoom=null;
//완전 처음 들어왔을때
//회사이름 초기 설정
let company=new URL(window.location.href).searchParams.get("company")?new URL(window.location.href).searchParams.get("company"):'올림픽스포츠센터';


//쿠키에 세션값 있는지 확인
let jsession=get_cookie(encodeURIComponent(company)+"session_id");

if(jsession===null){
  //완전 처음
  //초기 시간 설정
  const inIttime = new Date().toLocaleTimeString();
  const intIttimeSet = inIttime.substring(0, inIttime.length - 3);
  //jsession 생성
  jsession=generateUUID();
  //chatRoom설정
  chatRoom="0"+generateUUID();
//채팅방 문자 뿌려주는 json
  historyData = [

  ];
  fetch(`${api_base}/getChat`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_num: 'inittest',
      name: '인트로',
      company:company,
      session_id:jsession
    }),
  }).then((response)=>{
    response.text().then(e=>{
      let buttons=[];
      let button={};
      let mapjson={};
      JSON.parse(e).forEach((be)=>{
        if(be.btn_type){
          //type link = 웹링크 전화걸기 text=대화연결
          if(be.btn_type==='대화연결'){
            button.type='text';
            button.href=be.btn_name.split("**")[1]?be.btn_name.split("**")[1]:be.btn_name.split("**")[0]
          }else if(be.btn_type==='전화걸기'){
            button.type='link';
            button.href="tel:"+be.btn_name.split("**")[1]
          }else if(be.btn_type==='웹링크'){
            button.type='link';
            button.href=be.btn_name.split("**")[1]?be.btn_name.split("**")[1]:"http://www.naver.com"
          }else if(be.btn_type==='지도'){
            //item.mapData.id, item.mapData.markText, item.mapData.la, item.mapData.lo
            mapjson.check=true;
            mapjson.id=generateUUID();
            mapjson.markText=be.btn_name.split("**")[0];
            mapjson.la=be.btn_name.split("**")[1].split(',')[0];
            mapjson.lo=be.btn_name.split("**")[1].split(',')[1];
            mapjson.roadView=be.btn_name.split("**")[1].split(',')[2];
          }
          if(be.btn_type!=='지도'){
            button.btnName=be.btn_name.split("**")[0];
            buttons.push(JSON.parse(JSON.stringify(button)))
          }
        }


      })
      //초기에 데이터 뿌리기
      historyData = [
        { name: "새로운 대화", active: true,chatRoom:chatRoom,
          characterData: [
            { type: "left", content: JSON.parse(e)[0].answer, time: intIttimeSet,mapData:  mapjson.check?mapjson:null,buttons:buttons },
          ]
        },]
      createChat(companyText);
      //쿠키 저장
      document.cookie = `${encodeURIComponent(company)}session_id=${jsession}; path=/; `;
      //초기데이터 저장
      fetch(`${api_base}/insertHistory`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          history: JSON.stringify(historyData[0].characterData[0]),
          company:company,
          session_id:jsession,
          chat_num:chatRoom
        }),
      })
    })
  })

}else{
  //세션 아이디가 있음 이미 들어온적 있음
  fetch(`${api_base}/selectChatSingle`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      company:company,
      session_id:jsession
    }),
  }).then((initData)=>{
    initData.text().then((init)=>{
      if(JSON.parse(init).length===0||JSON.parse(init)[0].characterData.length===0){
        //길이가 0이면 애초에 처음 들어온거처럼 처리
        //완전 처음
        //초기 시간 설정
        const inIttime = new Date().toLocaleTimeString();
        const intIttimeSet = inIttime.substring(0, inIttime.length - 3);
        //chatRoom설정
        chatRoom="0"+generateUUID();
        //초기에 데이터 뿌리기
        fetch(`${api_base}/getChat`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            chat_num: 'inittest',
            name: '인트로',
            company:company,
            session_id:jsession
          }),
        }).then((response)=>{
          response.text().then(e=>{
            let buttons=[];
            let button={};
            let mapjson={};
            JSON.parse(e).forEach((be)=>{
              if(be.btn_type){
                //type link = 웹링크 전화걸기 text=대화연결
                if(be.btn_type==='대화연결'){
                  button.type='text';
                  button.href=be.btn_name.split("**")[1]?be.btn_name.split("**")[1]:be.btn_name.split("**")[0]
                }else if(be.btn_type==='전화걸기'){
                  button.type='link';
                  button.href="tel:"+be.btn_name.split("**")[1]
                }else if(be.btn_type==='웹링크'){
                  button.type='link';
                  button.href=be.btn_name.split("**")[1]?be.btn_name.split("**")[1]:"http://www.naver.com"
                }else if(be.btn_type==='지도'){
                  //item.mapData.id, item.mapData.markText, item.mapData.la, item.mapData.lo
                  mapjson.check=true;
                  mapjson.id=generateUUID();
                  mapjson.markText=be.btn_name.split("**")[0];
                  mapjson.la=be.btn_name.split("**")[1].split(',')[0];
                  mapjson.lo=be.btn_name.split("**")[1].split(',')[1];
                  mapjson.roadView=be.btn_name.split("**")[1].split(',')[2];
                }
                if(be.btn_type!=='지도'){
                  button.btnName=be.btn_name.split("**")[0];
                  buttons.push(JSON.parse(JSON.stringify(button)))
                }
              }


            })
            //초기에 데이터 뿌리기
            historyData = [
              { name: "새로운 대화", active: true,chatRoom:chatRoom,
                characterData: [
                  { type: "left", content: JSON.parse(e)[0].answer, time: intIttimeSet,mapData:  mapjson.check?mapjson:null,buttons:buttons },
                ]
              },]
            createChat(companyText);
            //쿠키 저장
            document.cookie = `${encodeURIComponent(company)}session_id=${jsession}; path=/; `;
            //초기데이터 저장
            fetch(`${api_base}/insertHistory`, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                history: JSON.stringify(historyData[0].characterData[0]),
                company:company,
                session_id:jsession,
                chat_num:chatRoom
              }),
            })
          })
        })
      }else{
        historyData=JSON.parse(init);
      }

      historyData.forEach(e=>{
        if(e.active===true){
          chatRoom=e.chatRoom;
        }
      })

      createChat(companyText);

    })
  })
}

//연관 질문 가져오기 - 최적화된 타이밍 적용
let autoCompleteTimer = null;
let typingTimer = null;
let lastTypingTime = 0;
//툭수 문자 있는지 확인
function containsSpecialChars(str) {
  const regex = /["\\¹₁*_$‘'\n]|<[^>]*>/g; // 특정 특수문자 및 HTML 태그 확인
  return regex.test(str);
}
//두글자 이상인지 확인
function checkMinLength(str) {
  const koreanRegex = /[가-힣]/g;   // 한글 완성형 감지
  const englishRegex = /[a-zA-Z]/g; // 영어 알파벳 감지
  const numberRegex = /[0-9]/g;     // 숫자 감지

  const koreanMatches = str.match(koreanRegex) || [];
  const englishMatches = str.match(englishRegex) || [];
  const numberMatches = str.match(numberRegex) || [];

  const totalCount = koreanMatches.length + englishMatches.length + numberMatches.length;

  return totalCount >= 1;
}
sendMessage.addEventListener('input', async function(e) {
  const currentTime = Date.now();
  const timeSinceLastType = currentTime - lastTypingTime;
  lastTypingTime = currentTime;
  //특별한 입력 확인
  if(containsSpecialChars( e.target.value.trim())){
    e.target.value= e.target.value.trim()
        .replaceAll(/["\\¹₁*_$‘'\n]/g, '') // 지정한 특수문자 제거
        .replaceAll(/<[^>]*>/g, '');
    //오류 팝업
    alert("입력하신 특수 문자는 사용하실 수 없습니다.")
  }

  // 입력값이 없으면 제안 숨기기 두글자 넘는지확인
  if (!e.target.value.trim() || !checkMinLength(e.target.value.trim())) {
    // 이전 타이머 취소
    clearTimeout(autoCompleteTimer);
    clearTimeout(typingTimer);
    document.querySelector('#related-question').innerHTML = '';
    return;
  }

  // 이전 타이머 취소
  clearTimeout(autoCompleteTimer);
  clearTimeout(typingTimer);

  // 타이핑 패턴에 따른 타이밍 조정
  let delay = 300; // 기본 지연 시간 300ms

  // 빠르게 타이핑하는 경우 (100ms 이내 입력) 약간 더 기다림
  if (timeSinceLastType < 100) {
    delay = 400; // 타이핑 중일 때는 약간 더 길게 기다림
  }


  // 타이핑이 잠시 멈춘 경우 빠르게 표시 (타이핑 일시정지 감지)
  typingTimer = setTimeout(async () => {
    await fetchSuggestions(e.target.value);
  }, 500); // 0.5초 동안 타이핑이 없으면 즉시 표시

  // 일반적인 타이밍 (디바운스)
  autoCompleteTimer = setTimeout(async () => {
    await fetchSuggestions(e.target.value);
  }, delay);

  chatInput = true;
});
//시간 멈추기
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}





// 연관 질문 가져오는 함수
async function fetchSuggestions(query) {
  //툭수 문자 제거
  query= query.replaceAll(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ一-龯 ]/g, "");
  if(query.trim()===''||query.trim()===null){document.querySelector('#related-question').innerHTML='';return;}
  isMake=true;
  try {
    let word = JSON.parse(await (await fetch(`${api_base}/getSelect`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: query,
        company: company,
        session_id: jsession
      }),
    })).text()).slice(0,5);

    let wordLi=` `;
    //html로 가공
    word.forEach((el)=>{
      el.htmlname=el.name.replaceAll(query,`<span style='color:#2A54C3;'>${query}</span>`)
      wordLi+=`<li onclick="wordSend('${el.name}')">${el.htmlname}</li>`
    })
    document.querySelector('#related-question').innerHTML=wordLi;
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
  isMake=false;
}