let point=0;
function btnPoint(value){
  point=value;
}
$(function(){
  companyText=new URL(window.location.href).searchParams.get("company")?new URL(window.location.href).searchParams.get("company"):'올림픽스포츠센터';
  //쿠키 값 가져오기
  function get_cookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
  }
  let api_base=location.pathname!=='/'?location.origin+":8080"+location.pathname:location.origin+":8080";

  //평가 보내기
  function evalInsert(){
    let data=JSON.parse(get_cookie('evalList'));
    //회사이름 가져오기
    let company=new URL(window.location.href).searchParams.get("company")?new URL(window.location.href).searchParams.get("company"):'올림픽스포츠센터';
    let comment=document.querySelector(`#comment`).value;
    fetch(api_base.replace("/window","")+`/insertEval`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        company:company,
        data:data,
        session_id:get_cookie(company+"session_id")?get_cookie(company+"session_id"):"",
        point:point,
        comment:comment
      }),
    });
    evalList=[];
    document.cookie = `evalList=${JSON.stringify(evalList)}; path=/; `;
  }
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

  $(document).on("click", ".satisfaction .confirm-btn", function(){
    $(".satisfaction-confirmed").addClass("active");
    //평가점수 로그
    evalInsert()
    if(companyText !== "올림픽스포츠센터"){
      $(".satisfaction-confirmed img").attr("src", `/resources/images/char${companyText}.png`);
    }
  });

  $(document).on("click", ".satisfaction-confirmed .confirm-btn", function(){
    window.close();
  });
});