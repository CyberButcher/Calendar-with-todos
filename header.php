<header>
    <h1>Calendar</h1>
    <nav>
        <div style="display:none;" class="header_auth"><input id="signinbtn" type="button" value="signIn"> <input id="signupbtn" type="button" value="signUp"></div>
        <div style="display:none;" class="header_profile"><div class="username"><?=$_SESSION['user']['name'] ?? 'Guest'?></div> <br> <input id="exitbtn" type="button" value="Exit"> <div class="userID" style="visibility: hidden; position:absolute"><?=$_SESSION['user']['id']?></div></div>
    </nav>

</header>