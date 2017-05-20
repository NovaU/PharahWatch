window.addEventListener('load', loadHandler);
var device;
var user;
var region;
var url;
function loadHandler() {
  document.getElementById("btnPC").addEventListener("click", buttonPCClicked);
  document.getElementById("btnPSN").addEventListener("click", buttonPSNClicked);
  document.getElementById("btnXBL").addEventListener("click", buttonXBLClicked);
  document.getElementById("btnEU").addEventListener("click", buttonEUClicked);
  document.getElementById("btnUS").addEventListener("click", buttonUSClicked);
  document.getElementById("btnKR").addEventListener("click", buttonKRClicked);
  document.getElementById("SignIn").addEventListener("click", buttonSignInClicked);
  getLocalStorage();
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
});
}
function buttonSignInClicked() {
  document.getElementById("SignIn").style.backgroundColor = "#9370DB";
  document.getElementById("SignIn").style.color = "white";
  loginScreen.style.display="none";
  profileScreen.style.display="block";
  user = document.getElementById("Search").value;
  saveLocalStorage();
  document.getElementById("Search").value = document.getElementById("Search").value.replace("#", "-");
  navigateToPage();
  getHtml();
  navigateBack();
}
function buttonPCClicked() {
    changePlaceholder("PC");
    setButtonColor("btnPC");
    device = "PC";
    document.getElementById("region").style.display="block";
}

function buttonPSNClicked() {
    changePlaceholder("PSN");
    setButtonColor("btnPSN");
    document.getElementById("region").style.display="none";
    device = "PSN";
}

function buttonXBLClicked() {
    changePlaceholder("XBL");
    setButtonColor("btnXBL");
    document.getElementById("region").style.display="none";
    device = "XBL";
}
function changePlaceholder(type){
  var placeholder = "Example: JohnDoe";
  if (type == "PC") {
    placeholder = "Example: JohnDoe#1234";
  }
  var Search = document.getElementById("Search");
  Search.placeholder = placeholder;
}
function setButtonColor(btn){
    document.getElementById("btnPC").style.backgroundColor = "white";
    document.getElementById("btnPSN").style.backgroundColor = "white";
    document.getElementById("btnXBL").style.backgroundColor = "white";
    document.getElementById("btnPC").style.color = "black";
    document.getElementById("btnPSN").style.color = "black";
    document.getElementById("btnXBL").style.color = "black";
    document.getElementById(btn).style.backgroundColor = "#9370DB";
    document.getElementById(btn).style.color = "white";
}

function buttonEUClicked() {
    setButtonColorB("btnEU");
    region = "EU";
}

function buttonUSClicked() {
    setButtonColorB("btnUS");
    region = "US";
}

function buttonKRClicked() {
    setButtonColorB("btnKR");
    region = "KR";
}

function setButtonColorB(btn){
  document.getElementById("btnEU").style.backgroundColor = "white";
  document.getElementById("btnUS").style.backgroundColor = "white";
  document.getElementById("btnKR").style.backgroundColor = "white";
  document.getElementById("btnEU").style.color = "black";
  document.getElementById("btnUS").style.color = "black";
  document.getElementById("btnKR").style.color = "black";
  document.getElementById(btn).style.backgroundColor = "#9370DB";
  document.getElementById(btn).style.color = "white";
}
function getLocalStorage(){
  if(localStorage.getItem('user1')){
    var userData = JSON.parse(localStorage.getItem('user1'));
    document.getElementById("Search").value = userData.user;
    document.getElementById('btn' + userData.device).click();
    document.getElementById('btn' + userData.region).click();
  }
}
function saveLocalStorage(){
  if(document.getElementById("checkbox").checked){
    var userData = {
      user: user,
      device: device,
      region: region
    }
    localStorage.setItem('user1', JSON.stringify(userData));
  }

}

function navigateToPage(){
  chrome.tabs.update({
     url: "https://playoverwatch.com/en-us/"
  });
}
function navigateBack(){
  chrome.tabs.update({
     url: url
  });
}
function getHtml(){
  user = document.getElementById("Search").value;
  var link = "https://playoverwatch.com/en-us/career/"
  if (device == "PC"){
    link = link + "pc" +  "/" + region.toLowerCase() +  "/" + user;
  } else {
    link = link + device.toLowerCase() +  "/" + user;
  }

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      getStats(xhr.responseText);
    }
  }
  xhr.open("GET", link, true);
  xhr.send();
}
function getStats(htmlText) {
  var startA = htmlText.indexOf('<td>Games Played</td><td>') + '<td>Games Played</td><td>'.length;
  var endA = htmlText.indexOf('</td>', startA);
  var gamesHtml = htmlText.substr(startA, endA - startA);
  var start = htmlText.indexOf('<div class="masthead-player">');
  var end = htmlText.indexOf('<p class="masthead-detail h4">');
  htmlText = htmlText.substr(start, end - start);

  var div1 = document.createElement( 'div1' );
  div1.innerHTML = htmlText;
  var div2 = document.createElement( 'div2' );
  div2.innerHTML = gamesHtml;
  var profileScreen = document.getElementById("profileScreen");
  profileScreen.appendChild(div1);
  profileScreen.appendChild(div2);
  document.body.style.width = (425 + (document.getElementsByClassName("header-masthead")[0].innerText.length - 4)*25) + "px";
  if(document.getElementsByClassName("u-align-center").length == 0){
    document.getElementById("lock").style.display="block";
  }

}
