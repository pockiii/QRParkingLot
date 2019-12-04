/*
QR reader js provided by:
https://gist.github.com/dvergeylen/a256deb3182b8a863238fcc0704aecb9
*/
var string_builder;
var result;
var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
   navigator.mediaDevices.getUserMedia({video: true})
 .then(function(stream) {
   video.srcObject = stream;
 })
 .catch(function(err0r) {
   console.log("Something went wrong!");
 });
}
window.onload =  function() {
  navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false }).then(function(stream) {
    var video = document.getElementById("video-preview");
    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    video.play();
    setTimeout(tick, 100);
  })
  .catch(function(err) {
    console.log(err); //User probably refused to grant access
  });
};
function tick() {
  var video                   = document.getElementById("video-preview");
  var qrCanvasElement         = document.getElementById("qr-canvas");
  var qrCanvas                = qrCanvasElement.getContext("2d");
  var width, height;

  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    qrCanvasElement.height  = video.videoHeight;
    qrCanvasElement.width   = video.videoWidth;
    qrCanvas.drawImage(video, 0, 0, qrCanvasElement.width, qrCanvasElement.height);
    try {
      result = qrcode.decode().split(';')[0]; //decoded QR code
      displayQR(result);
      console.log(result);

    } catch(e) {    }
  }

  /* If no QR could be decoded from image copied in canvas */
  if (!video.classList.contains("hidden"))
    setTimeout(tick, 100);
}

function displayQR(result){
  //push result to archive table
  $.ajax({
          type:"GET",
          url: 'php/lp_get.php',
          data: { var_lp: result },
          success: function ( result )  {
              console.log("hello: " + result);
              dateParser(result);

          }
      });

}

function dateParser(data){
  var arr = data.split(' ');
  var d1 = new Date(arr[3]+", "+arr[4]);
  var d2 = new Date(arr[1]+", "+arr[2]);
  var d3 = Math.abs(d1 - d2  ) / 36e5;
  console.log(Math.abs(d1 - d2  ) / 36e5); //calculates total hours, number after decimal represents fraction of an hour
  if(d3>2){
    string_builder = "You have stayed from "+d2+" to "+d1+", unfortunately this is more than the free allowance. Please head to the ticket office to pay for a ticket.";
  } else {
    string_builder = "Thank you for visiting! We hope you come back soon!"
  }
  if(isNaN(parseFloat(d3))){
    string_builder = "Error, invalid QR code";
  }
  console.log(string_builder);
  document.getElementById('result').innerHTML = string_builder;

}
