import React, { useEffect } from 'react'




const ChatWindow = () => {
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
    useEffect(() => {
     
        const jqueryScript=makeScript('https://code.jquery.com/jquery-3.7.1.js',"sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=",'anonymous')
        let windowScript;
        jqueryScript.onload=()=>{
          windowScript=makeScript('/resources/js/window.js')
        }
        let maincss=makeCSS('/resources/css/main.css')
        return () => {
          // 페이지에서 벗어날 때 스크립트 제거
          document.body.removeChild(windowScript);
          document.body.removeChild(jqueryScript);
          document.body.removeChild(maincss);
        };
      }, []);



     return(
        <>
        <div class="popup window-popup satisfaction">
        <div class="popup-box">
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
            <button class="confirm-btn" disabled>설문완료</button>
          </div>
        </div>
      </div>
    
      <div class="popup satisfaction-confirmed">
        <div class="popup-box">
          <div class="pop-body">
            <div class="char"><img src="/resources/img/char.png" alt=""/></div>
            <h4>만족도 설문조사에 응해주셔서 감사합니다.</h4>
          </div>
          <div class="pop-foot">
            <button class="confirm-btn">완료</button>
          </div>
        </div>
      </div>
    

      </>
    )
}
export default ChatWindow