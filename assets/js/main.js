var noOfSlides;
var slides = document.getElementsByClassName("Slides");
var slideIndex = 1;
var currentslide;

let timer;
var showSlides = function () {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  currentslide = slides[slideIndex - 1];
  slides[slideIndex - 1].style.display = "block";
}
//Basic Template initialise ends

//Observation Tab scroll
$(document).on('click', '#downScroller', function () {
  $('#contentsName').css('top', '-177px')
  $('#upScroller').css('display', 'block')
});

$(document).on('click', '#upScroller', function () {
  $('#contentsName').css('top', '33px')
});


//File close Func
$(document).on('click', '#closeBtn', function () {
  window.close();
});

//Worksheet Func starts
$('#workSheetDiv').on('click', function () {
  $('#file-input').trigger('click');
});
function OpenWord() {
  var mylink = document.getElementById("MyLink");
  mylink.setAttribute("href", "assets/docs/oscillations_word.doc");
  mylink.click();
}
//Worksheet Func ends

$(document).ready(function () {
  showSlides(slideIndex);
});

var procedCount = 1;
$('.prevProcd').on('click', function () {
  if (procedCount > 2) {
    procedCount--;
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
  } else {
    procedCount = 1;
    $('.prevProcd').css({ 'opacity': '0.5', 'pointer-events': 'none' });
  }
  $('.procedSteps').css('display', 'none');
  $('.procedSteps' + procedCount).css('display', 'block');
  $('.procdNum').text(procedCount + ")");
});
$('.nextProcd').on('click', function () {
  if (procedCount < 6) {
    procedCount++;
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
  } else {
    procedCount = 7;
    $('.nextProcd').css({ 'opacity': '0.5', 'pointer-events': 'none' });
  }
  $('.procedSteps').css('display', 'none');
  $('.procedSteps' + procedCount).css('display', 'block');
  $('.procdNum').text(procedCount + ")");
});

$('.closeProcd').on('mouseover', function () {
  $('.closeProcd').addClass('closeProcdAfter');
  $('.closeProcd').removeClass('closeProcdBefore');
  $('.closeProcd').attr('src', 'assets/images/closeProd.gif').css('cursor', 'pointer');
});
$('.closeProcd').on('mouseout', function () {
  $('.closeProcd').addClass('closeProcdBefore');
  $('.closeProcd').removeClass('closeProcdAfter');
  $('.closeProcd').attr('src', 'assets/images/closeUp.png');
});

$('.procdClick').on('mouseover', function () {
  $('.procdClick').attr('src', 'assets/images/procdHover.gif');
  $('.procdClick').css('cursor', 'pointer');
});
$('.procdClick').on('mouseout', function () {
  $('.procdClick').attr('src', 'assets/images/procdClick.png');
});

$('.procdClick').on('click', function () {
  $(this).css('display', 'none');
  $('.procdAnim').attr('src', 'assets/images/procedure.gif').css('display', 'block');
  setTimeout(() => {
    $('.mainProcdiv').css('display', 'block');
  }, 3800);
});

$('.closeProcd').on('click', function () {
  $('.mainProcdiv').css('display', 'none');
  $('.procdAnim').attr('src', 'assets/images/closeProcdiv.gif').css('display', 'block');
  setTimeout(() => {
    $('.procdClick').css('display', 'block');
    $('.procdAnim').css('display', 'none');
  }, 1900);
});

$('.closeProcd').on('mouseover', function () {
  $('.closeProcdTxt').css('display', 'block');
});

$('.closeProcd').on('mouseout', function () {
  $('.closeProcdTxt').css('display', 'none');
});

$('.showObj').on('mouseover', function () {
  $(this).attr('src', 'assets/images/showObj.gif').css('cursor', 'pointer');
  $('.contentContainer, .tableContainer, .mainstand, .graphTempVsTime, .threshold, .timerDiv').css('opacity', '0.3');
  if (procedCount == 1) {
    
  }
  if (procedCount == 2 || procedCount == 4) {
    $(".standContainer .opacburner").show().css('opacity', '1');
  }
  if (procedCount == 3) {
    $(".standContainer .opactermometer").show().css('opacity', '1');
  }
  if (procedCount == 6) {
    $(".standContainer .opactermometer").show().css('opacity', '1');
  }
});

$('.showObj').on('mouseout', function () {
  $(this).attr('src', 'assets/images/showObjM.gif');
  $('.contentContainer, .tableContainer,.mainstand, .graphTempVsTime, .threshold, .timerDiv').css('opacity', '1');
  $(".standContainer .opacburner").hide().css('opacity', '1');
  $(".standContainer .opactermometer").hide().css('opacity', '1');
});
$('.resetDiv').on('click', function () {
  
});



