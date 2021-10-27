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
  InitBrowserAttribute();
  InitOSAttribute();
  isMobile.InitDeviceAttribute();
  showSlides(slideIndex);
  SpringOscillationChart.init([{ "x": 0, "y": 0 }]);
  $(".calculatePopup").draggable({
    containment: "document",
    cursor: "move",
    drag: function (event, ui) {
      var scaleval = Number($("#bk6ch15ss2").attr("data-scaley"))
      ui.position.top = ui.position.top / scaleval
      ui.position.left = ui.position.left / scaleval
    }
  })
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
  if (procedCount < 4) {
    procedCount++;
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
  } else {
    procedCount = 5;
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

$('.procdClick, .procopentxt').on('mouseover', function () {
  $('.procdClick').attr('src', 'assets/images/procdHover.gif');
  $('.procdClick').css('cursor', 'pointer');
  $(".procopentxt").addClass("show")
});
$('.procdClick, .procopentxt').on('mouseout', function () {
  $('.procdClick').attr('src', 'assets/images/procdClick.png');
  $(".procopentxt").removeClass("show")
});

$('.procdClick,.procopentxt').on('click', function () {
  $('.procdClick').css('display', 'none');
  $(".procopentxt").removeClass("show")
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
  $('.springholder, .springWrapper, .springWeight, .graphDisplacementVsTime, table tr td, .stopDiv, .calculateDiv, .resetDiv').css('opacity', '0.3');
  if (procedCount == 1) {
    $(".springWeight").css('opacity', '1');
    $("td.section_mass").css('opacity', '1');
  }
  if (procedCount == 2) {
    $("td.section_sc").css('opacity', '1');
    $("td.section_damp").css('opacity', '1');
  }
  if (procedCount == 3) {
    $(".springWeight").css('opacity', '1');
  }
  if (procedCount == 4) {
    $(".springWrapper").css('opacity', '1');
    $(".springWeight").css('opacity', '1');
    $(".graphDisplacementVsTime").css('opacity', '1');
  }
  if (procedCount == 5) {
    $(".stopDiv").css('opacity', '1');
  }
});

$('.showObj').on('mouseout', function () {
  $(this).attr('src', 'assets/images/showObjM.gif');
  $('.springholder, .springWrapper, .springWeight, .graphDisplacementVsTime, table tr td, .stopDiv, .calculateDiv, .resetDiv').css('opacity', '1');
});

$('.resetDiv').on('click', function () {
  myMass = 0.5;
  myElasticity = 3;
  myConstant = 3;
  myDamping = 0;
  ResetOscillation();
  $("#sliderMass").val(0.5).css({ "background-size": "44.44% 100%" })
  $(".inputMass").text(0.5);

  $("#sliderSpringConstant").val(3).css({ "background-size": "50% 100%" })
  $(".inputSpringConstant").text(3)

  $("#sliderDamping").val(0).css({ "background-size": "0 100%" });
  $(".inputDamping").text(0);

  $(".inputTimePeriod").text("")
  $(".springWeight").draggable('enable')

  $(".resetDiv").hide();
  $(".stopDiv").hide();

  ResetPopupValues();
  RunningOscillation = false;
});
function ResetOscillation() {
  StopOscillation();
  myStartTime = new Date().getTime();
  t = 0;
  k = 0;
  fade = true;
  fade2 = true;
  timeMultiple = 0;
  Xvalue = 0;
  Xvalue2 = 15;
  myAmplitude = 0;
  SpringOscillationChart.clearSeriesData();
  if (Xvalue * 10 == 0) {
    $(".x-axis-minlimit").text("00")
  }
  else {
    $(".x-axis-minlimit").text(Xvalue * 10)
  }

  $(".x-axis-maxlimit").text(Xvalue2 * 10)
}
$('.stopDiv').on('click', function () {
  $(".resetDiv").show();
  $(".stopDiv").hide();
  StopOscillation();
  RunningOscillation = false;
});
function StopOscillation() {
  clearInterval(springAnnimInterval);
  springAnnimInterval = 0;

  $(".springWrapper").css({ "height": 200 })
  $(".springWrapper").css({ "height": 200 })
  $(".springWeight").css({ "top": 232 })
}

var RunningOscillation = false;
$(".calculateDiv").on('click', function () {
  $(".calculatePopup").show();
  if (RunningOscillation) {
    DisplayValuesInCalcPopup();
  }
});
function DisplayValuesInCalcPopup() {
  $(".txtamplitude").text(Math.abs(Number(toTrunc(myAmplitude / 2.10, 3))))
  $(".txtmass").text(myMass)
  $(".txtspringconst").text($("#sliderSpringConstant").val())
  var tplocal = toTrunc((2 * Math.PI) * Math.sqrt((myMass / myElasticity)), 2);
  $(".txttimeperiod").text(tplocal)
}
function ResetPopupValues() {
  $(".txtamplitude").text(Math.abs(Number(toTrunc(myAmplitude / 2.10, 3))))
  $(".txtmass").text(myMass)
  $(".txtspringconst").text($("#sliderSpringConstant").val())
  $(".txttimeperiod").text("")
}

$(".popupcloseIcon").on('click', function () {
  $(".calculatePopup").hide();
})
var springOscillationPaused = false;
$(".springWeight").on('mousedown', function () {
  //var displacementMass = $(".springWeight").position().top - weightInitialTop
  if (springAnnimInterval > 0) {
    clearInterval(springAnnimInterval);
    springAnnimInterval = 0;
    springOscillationPaused = true
  }
  var weightTop = Number(document.getElementById('springWeightDiv').style.top.replace("px", ""))
  var displacementMass = weightTop - weightInitialTop
  myAmplitude = displacementMass;
  var lval = Math.abs(Number(toTrunc((displacementMass / 2.10), 3)))
  $(".weightDispText").text(lval + "cm").show();
});
$(".springWeight").on('mouseup', function () {
  $(".weightDispText").hide();
  //SpringOscillationChart.update({ x: 0, y: myAmplitude / 2.10 * -1 })
  //springAnnimInterval = setInterval(OnSpringAnnimation, 100)
  if (springOscillationPaused) {
    SpringOscillationChart.clearSeriesData();
    RunningOscillation = true;
    DisplayValuesInCalcPopup();
    StartOscillation($(".springWeight").position().top)
  }
  springOscillationPaused = false;

});


const rangeInputs = document.querySelectorAll('input[type="range"]')
//const numberInput = document.querySelector('input[type="number"]')

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  }
  const min = target.min
  const max = target.max
  const val = target.value
  const name = target.name
  if (name == "mass") {myMass = val; $(".inputMass").text(val);}
  if (name == "springconstant") {myElasticity = val; $(".inputSpringConstant").text(val);}
  if (name == "damping"){myDamping = val; $(".inputDamping").text(val);}

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
  if (RunningOscillation) {
    DisplayValuesInCalcPopup();
  }
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

var weightInitialTop = 232;
var springOrigHeight = 200;
var displacementMass = 0;

$(".springWeight").draggable({
  axis: "y",
  cursor: "move",
  drag: function (event, ui) {
    //console.log(ui.position.top + ", " + Math.min(112, ui.position.top))
    //console.log(ui.position.top + ", " + Math.min(352, ui.position.top))
    springOscillationPaused = false;
    clearInterval(springAnnimInterval);
    springAnnimInterval = 0;
    var scaleval = Number($("#bk6ch15ss2").attr("data-scaley"))
    ui.position.top = ui.position.top / scaleval
    if (ui.position.top < Math.max(106, ui.position.top)) {
      ui.position.top = Math.max(106, ui.position.top);
      //$(".springWeight").css({"top":ui.position.top})
    }
    if (ui.position.top > Math.min(358, ui.position.top)) {
      ui.position.top = Math.min(358, ui.position.top);
    }

    //displacementMass = ui.position.top;
    //var weightTop = Number(document.getElementById('springWeightDiv').style.top.replace("px",""))
    displacementMass = (ui.position.top - weightInitialTop)
    myAmplitude = displacementMass;
    //
    $(".weightDispText").text(Math.abs(Number(toTrunc((displacementMass / 2.10), 3))) + "" + "cm").show();
    //
    //Display_mc.Amp_txt.text = (displacementMass/2);
    //
    //trace("displacementMass = "+displacementMass);
    $(".springWrapper").css({ "height": springOrigHeight + (displacementMass) })
  },
  start: function (event, ui) {
    //$(this).addClass('my_class');
    //setTimeout(function(){ $(".springWeight").css({"top": "232px"})},0)
    //$(".weightDispText").text("0cm").show();
    //StopOscillation();
    //ResetOscillation();
  },
  stop: function (event, ui) {
    SpringOscillationChart.clearSeriesData();
    RunningOscillation = true;
    DisplayValuesInCalcPopup();
    StartOscillation(ui.position.top)
  }
});

function StartOscillation(weightTopPos) {
  springOscillationPaused = false;
  //$(this).removeClass('my_class');
  Xvalue = 0;
  Xvalue2 = 15;
  myAmplitude = (weightTopPos - weightInitialTop);
  //myStartTime = getTimer();
  myStartTime = new Date().getTime();
  timeMultiple = 0;

  //NM: hide drag label
  $(".weightDispText").text("0cm").hide()
  //$(this).draggable('disable')
  $(".stopDiv").show();
  //console.log(myAmplitude);
  SpringOscillationChart.update({ x: 0, y: myAmplitude / 2.10 * -1 })
  springAnnimInterval = setInterval(OnSpringAnnimation, 100)
}


var myMass = 0.5;
var myElasticity = 3;
var myConstant = 3;
//var w;
var myDamping = 0;
var myStartTime = new Date().getTime();
var t = 0;
var k = 0;
var fade = true;
var fade2 = true;
var timeMultiple = 0;
var Xvalue = 0;
var Xvalue2 = 15;
var myAmplitude = 0;
var springAnnimInterval = 0;



function OnSpringAnnimation() {
  //debugger;
  //trace("value="+cVolml_mc.m1);
  myMass = Number($("#sliderMass").val());
  myElasticity = Number($("#sliderSpringConstant").val());
  $(".inputTimePeriod").text(toTrunc((2 * Math.PI) * Math.sqrt((myMass / myElasticity)), 1));
  //
  //_root.TimePeriod_txt.text = Display_mc.timeperiod_txt.text;
  //
  //myDamping = T1_mc.T1;
  myDamping = Number($("#sliderDamping").val());
  //position = Mass_mc.block_mc._y;
  //var position = $(".springWeight").position().top - weightInitialTop
  var weightTop = Number(document.getElementById('springWeightDiv').style.top.replace("px", ""))
  var position = weightTop - weightInitialTop
  myConstant = Math.sqrt(myElasticity / myMass);
  tmilli = (new Date().getTime() - myStartTime)
  t = tmilli / 1000;
  var tPlot = tmilli - (timeMultiple * 15000);
  if (tPlot > 15000) {
    //graph_num.num1.text = graph_num.num1+30;
    //graph_num.num2.text = graph_num.num2+30;
    Xvalue = Xvalue + 15;
    Xvalue2 = Xvalue2 + 15;
    //NM: Note below line
    //graph_num.num1.text = "(" + Xvalue + "," + 0 + ")";
    //graph_num.num2.text = "(" + Xvalue2 + "," + 0 + ")";
    $(".x-axis-minlimit").text(Xvalue * 10)
    $(".x-axis-maxlimit").text(Xvalue2 * 10)
    timeMultiple++
    //k = 0;
    fade = true;
    //graph_mc.clear();
    SpringOscillationChart.clearSeriesData();
    tPlot = tmilli - (timeMultiple * 15000);
    //trace("kavlue="+k);
  }
  //trace("Time = " + t);

  var w = myConstant * t;
  var Dis = (myAmplitude * Math.cos(w)) * (Math.exp(-myDamping * t));
  //console.log("Dis" + Dis)
  //Mass_mc.block_mc._y = Dis;
  $(".springWeight").css({ "top": weightInitialTop + Dis })
  //displacementMass = Mass_mc.block_mc._y;
  //displacementMass = $(".springWeight").position().top;
  //displacementMass = ($(".springWeight").position().top - weightInitialTop)
  //trace("displacementMass = " + displacementMass);
  //spring_mc._height = (massAnchor + displacementMass) - offsetY;
  $(".springWrapper").css({ "height": springOrigHeight + Dis })
  //spring_mc._height = 200+Mass_mc.block_mc._y;
  //console.log((tPlot / 1000) + ", " + Number(Dis.toFixed(2)) / 2)
  SpringOscillationChart.update({ x: (tPlot / 1000), y: (Number(Dis.toFixed(2)) / 2.10) * -1 })

  //if (k < 300) {
  //DrawLine(position, tPlot / 50, Dis);
  //trace(tPlot);
  //k++;
  //trace("kavlue="+k);
  //}
}

function toTrunc(value, n) {
  x = (value.toString() + ".0").split(".");
  return parseFloat(x[0] + "." + x[1].substr(0, n));
}



