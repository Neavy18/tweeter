$(document).ready(function() {

  $('#tweet-text').on('input', function() {
    let counterValue = 140 - this.value.length;
    const counter = $(this).siblings().children(".counter");
    counter.html(counterValue); 
    /* If the text area is left empty */
    if (counterValue < 0) {
      $("output").addClass("error");
    } else {
      $("output").removeClass("error");
    }
  });

});