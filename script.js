


const Http = new XMLHttpRequest();
var url='http://api.qrserver.com/v1/create-qr-code/?data=hi!&size=100x100';
var input;
var warning = '<p>Please take a picture of the above QR code and click below to reset the system.</p>';
/*
Http.onreadystatechange = (e) => {
  console.log(Http.responseText);
  $("#result").html(Http.responseText);
}
*/

function formSubmit(){
  input = document.getElementById("lp").value;
  input = input.replace(/\s/g, ''); //remove space
  //valid input only

  url=`<img src="https://api.qrserver.com/v1/create-qr-code/?data=${input};size=1000x1000 " alt="" title="" />`;
  document.getElementById('returned').innerHTML = url;
  document.getElementById('warning').innerHTML = warning;

  //insert input into db

  console.log(url);
}
function reset(){
  input =""
  url="";
  document.getElementById('lp').value = '';
  document.getElementById('returned').innerHTML = url;
  document.getElementById('warning').innerHTML ="";
}

function decode(){
  console.log(qrcode.decode(document.getElementById('toDecode').value));
}
