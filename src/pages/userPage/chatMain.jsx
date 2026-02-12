import React, { useEffect } from 'react'




const ChatMain = () => {
    const makeScript=(page,integrity,crossorigin)=>{
        const script = document.createElement('script');
        script.src = page; 
        script.async = true;
        script.autoload=false;
        document.body.appendChild(script);
        return script
    }
    const makeCSS = (href, integrity, crossorigin) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      if (integrity) link.integrity = integrity;
      if (crossorigin) link.crossOrigin = crossorigin;
      link.type = 'text/css';
      link.referrerPolicy = 'no-referrer'; // optional
      document.head.appendChild(link);
      return link;
    };
    let maincss=makeCSS('/resources/css/main.css')
    useEffect(() => {
     
        const jqueryScript=makeScript('https://code.jquery.com/jquery-3.7.1.js',"sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=",'anonymous')
        let mainScript=null;
        jqueryScript.onload=()=>{
            const kakaoScript=makeScript('https://dapi.kakao.com/v2/maps/sdk.js?appkey=30d2c08f659481120615deb138fc40a2&autoload=false&libraries=services,clusterer')
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
          document.body.removeChild(maincss);
        };
      }, []);



     return(
   
    <div className="chat-bot normal">
    <header>
      <a href="#" className="logo-box">
        <img src="/resources/img/char.png" className="char" alt=""/>
        <img src="/resources/img/logo.svg" className="logo" alt=""/>
        <span>올림픽공원스포츠센터챗봇</span>
      </a>
      
      <div className="btn-wrap">
        <div className="word-changer">
          <button className="word-change-btn">더 크게</button>
        </div>
        <button className="menu-btn"></button>
      </div>
    </header>
    <div className="content-box">
      <div className="left-menu">
        <div className="in-box">
          <div className="btn-wrap end">
            <div className="menu-close-btn"></div>
          </div>
          <button className="add-btn">채팅</button>
          <div className="chat-history">
            <h3>대화 기록</h3>
            
            <div className="history-item">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="chat-box"></div>
        <div className="chat-input">
          <div className="related-word">
            <ul id="related-question">
            </ul>
          </div>
          <label>
            <input type="text" id="sendMessage" placeholder="질문을 입력해 주세요."/>
          </label>
          <button className="send-btn"></button>
        </div>
      </div>
    </div>
    <footer>
      <span>㈜아이이에이</span> ｜ <span>대표이사 : 최중배</span> ｜ <span>서울 송파구 법원로8길 8 문정역2차 SK V1 910호</span> ｜ <span>사업자등록번호 : 315-81-37674</span> ｜ <span>대표전화 : 02-6269-0630</span>
      <span>Copyright © IEA. All Rights Reserved.</span>
    </footer>

    {/* <!-- 만족도 조사 --> */}
    <div className="popup satisfaction">
      <div className="popup-box">
        <div className="pop-head">
          <h3>만족도 조사</h3>
          <button className="close-btn" onClick={()=>window.evalInsert(5)}></button>
        </div>
        <div className="pop-body">
          <h4>스포츠센터 챗봇의 만족도를 선택해주세요.</h4>
          <div className="rating-wrap">
            <div className="rating-box">
              <button onClick={()=>window.btnPoint(1)} className="rate-btn"></button>
              <button onClick={()=>window.btnPoint(2)} className="rate-btn"></button>
              <button onClick={()=>window.btnPoint(3)} className="rate-btn"></button>
              <button onClick={()=>window.btnPoint(4)} className="rate-btn"></button>
              <button onClick={()=>window.btnPoint(5)} className="rate-btn"></button>
            </div>
            <div className="rating-info"></div>
          </div>

          <div className="survey-box">
            <div className="top">
              <h5>불편을 느끼신 항목을 알려주시면 <br className="mob" /> 다음 서비스엔 꼭 좋아요를 받아 볼게요.</h5>
              <p>폭언, 욕설, 성희롱 등 아픈 말은 참아주세요.</p>
            </div>
            <div className="textarea">
              <label>
                <textarea id="comment" placeholder="의견을 입력해주세요. (최대 500자)" maxLength={500}></textarea>
              </label>
            </div>
          </div>
        </div>
        <div className="pop-foot">
          <button id='evalEnd' disabled  className="confirm-btn">설문완료</button>
        </div>
      </div>
    </div>

    {/* <!-- 만족도 조사 응답 --> */}
    <div className="popup satisfaction-confirmed">
      <div className="popup-box">
        <div className="pop-body">
          <div className="char"><img src="/resources/img/char.png" alt=""/></div>
          <h4>만족도 설문조사에 응해주셔서 감사합니다.</h4>
        </div>
        <div className="pop-foot">
          <button className="confirm-btn">확인</button>
        </div>
      </div>
    </div>
  </div>
 
    )
}
export default ChatMain