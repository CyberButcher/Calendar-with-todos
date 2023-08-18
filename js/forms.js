document.addEventListener('DOMContentLoaded', function() {
    var login_form = document.querySelector('.login_form');
    var reg_form = document.querySelector('.reg_form');
    var reg_form_success = document.querySelector('.reg_form_success');
    var todos_form = document.getElementById('todos_form');
    var overlay = document.querySelector('.login_form_overlay');
    var signInBtn = document.getElementById('signinbtn');
    var signUpBtn = document.getElementById('signupbtn');
    var movebtn = document.querySelector('.button-move');
  
  
    function showModalHandler(event) {
      if(event.target === signInBtn){
        login_form.classList.add('show');
      } else if(event.target === signUpBtn){
        reg_form.classList.add('show');
      }
        overlay.classList.add('show');
    }
    
    function closeModalHandler() {
        login_form.classList.remove('show');
        reg_form.classList.remove('show');
        reg_form_success.classList.remove('show');
        overlay.classList.remove('show');
    }

    function overlayHandler(event) {
      if (event.target === overlay && (login_form.classList.contains('show') || reg_form.classList.contains('show'))) {
        closeModalHandler();
      }
    }

    function moveForms(){

      if (movebtn.classList.contains('right')){
        // $('.calendar').animate({
        //   //left: '-550px'!!
        // }, 500, function() {
        //   //base
        // });
        document.querySelector('.arrow').style.transform = 'rotate(225deg)';
        todos_form.style.cssText = 'visibility: visible; opacity: 1; transition: opacity 0.4s linear, visibility 0.4s linear; position: relative;';
        $('.button-move').animate({
          right: '0px'
          //right: '1100px'!!
          //right: '58%'
        }, 500, function() {
          movebtn.classList.remove('right');
          movebtn.classList.add('left');
        });
      }
      if (movebtn.classList.contains('left')){
        // $('.calendar').animate({
        //   //left: '0px'!!
        // }, 500, function() {
        //   //base
        // });
        document.querySelector('.arrow').style.transform = 'rotate(45deg)';
        todos_form.style.cssText = 'visibility: hidden; opacity: 0; transition: opacity 0.2s linear, visibility 0.2s linear; position: absolute;';
        $('.button-move').animate({
          right: '0px'
          //right: '550px'!!
          //right: '30%'
        }, 500, function() {
          movebtn.classList.remove('left');
          movebtn.classList.add('right');
        });
      }
    }
  
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeModalHandler();
      }
    });
    document.addEventListener('click', function(event) {
      if (event.target === signInBtn || event.target === signUpBtn) {
        showModalHandler(event);
      } else if (event.target.classList.contains('close')) {
        closeModalHandler(event);
      } else if (event.target === overlay) {
        overlayHandler(event);
      } else if (event.target.closest('.button-move') === movebtn) {
        moveForms();
      }
    });

});
  