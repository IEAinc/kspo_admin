import React, { useEffect } from 'react'
import '../resources/css/main.css'



const ChatMain = () => {
    const makeScript=(page,integrity,crossorigin)=>{
        const script = document.createElement('script');
        script.src = page; 
        script.async = true;
        script.autoload=false;
        document.body.appendChild(script);
        return script
    }
    useEffect(() => {
     
        const jqueryScript=makeScript('https://code.jquery.com/jquery-3.7.1.js',"sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=",'anonymous')
           console.log("here")
        let mainScript=null;
        jqueryScript.onload=()=>{
            const kakaoScript=makeScript('https://dapi.kakao.com/v2/maps/sdk.js?appkey=609927986cdcea5222434ab71d1271b0&autoload=false&libraries=services,clusterer')
            kakaoScript.onload = () => {
         
                window.kakao.maps.load(() => {
                    mainScript=makeScript('/resources/js/main.js')
                });
             
            };

        }
       
        return () => {
          // 페이지에서 벗어날 때 스크립트 제거
          document.body.removeChild(mainScript);
          document.body.removeChild(jqueryScript);
          document.body.removeChild(kakaoScript);
        };
      }, []);



     return(
   
    <div class="chat-bot normal">
    <header>
      <a href="#" class="logo-box">
        <img src="/src/pages/userPage/resources/img/char.png" class="char" alt=""/>
        <img src="/src/pages/userPage/resources/img/logo.svg" class="logo" alt=""/>
        <span>올림픽공원스포츠센터챗봇</span>
      </a>
      
      <div class="btn-wrap">
        <div class="word-changer">
          <button class="word-change-btn">더 크게</button>
        </div>
        <button class="menu-btn"></button>
      </div>
    </header>
    <div class="content-box">
      <div class="left-menu">
        <div class="in-box">
          <div class="btn-wrap end">
            <div class="menu-close-btn"></div>
          </div>
          <button class="add-btn">채팅</button>
          <div class="chat-history">
            <h3>대화 기록</h3>
            
            <div class="history-item">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="chat-box"></div>
        <div class="chat-input">
          <div class="related-word">
            <ul id="related-question">
            </ul>
          </div>
          <label>
            <input type="text" id="sendMessage" placeholder="질문을 입력해 주세요."/>
          </label>
          <button class="send-btn"></button>
        </div>
      </div>
    </div>
    <footer>
      <span>㈜아이이에이</span> ｜ <span>대표이사 : 최중배</span> ｜ <span>서울 송파구 법원로8길 8 문정역2차 SK V1 910호</span> ｜ <span>사업자등록번호 : 315-81-37674</span> ｜ <span>대표전화 : 02-6269-0630</span>
      <span>Copyright © IEA. All Rights Reserved.</span>
    </footer>

    {/* <!-- 만족도 조사 --> */}
    <div class="popup satisfaction">
      <div class="popup-box">
        <div class="pop-head">
          <h3>만족도 조사</h3>
          <button class="close-btn" onClick={()=>window.evalInsert(5)}></button>
        </div>
        <div class="pop-body">
          <h4>스포츠센터 챗봇의 만족도를 선택해주세요.</h4>
          <div class="rating-wrap">
            <div class="rating-box">
              <button onClick={()=>window.btnPoint(1)} class="rate-btn"></button>
              <button onClick={()=>window.btnPoint(2)} class="rate-btn"></button>
              <button onClick={()=>window.btnPoint(3)} class="rate-btn"></button>
              <button onClick={()=>window.btnPoint(4)} class="rate-btn"></button>
              <button onClick={()=>window.btnPoint(5)} class="rate-btn"></button>
            </div>
            <div class="rating-info"></div>
          </div>

          <div class="survey-box">
            <div class="top">
              <h5>불편을 느끼신 항목을 알려주시면 <br class="mob" /> 다음 서비스엔 꼭 좋아요를 받아 볼게요.</h5>
              <p>폭언, 욕설, 성희롱 등 아픈 말은 참아주세요.</p>
            </div>
            <div class="textarea">
              <label>
                <textarea id="comment" placeholder="의견을 입력해주세요. (최대 500자)" maxlength="500"></textarea>
              </label>
            </div>
          </div>
        </div>
        <div class="pop-foot">
          <button id='evalEnd' disabled  class="confirm-btn">설문완료</button>
        </div>
      </div>
    </div>

    {/* <!-- 만족도 조사 응답 --> */}
    <div class="popup satisfaction-confirmed">
      <div class="popup-box">
        <div class="pop-body">
          <div class="char"><img src="/src/pages/userPage/resources/img/char.png" alt=""/></div>
          <h4>만족도 설문조사에 응해주셔서 감사합니다.</h4>
        </div>
        <div class="pop-foot">
          <button class="confirm-btn">확인</button>
        </div>
      </div>
    </div>
  </div>
 
    )
}
export default ChatMain