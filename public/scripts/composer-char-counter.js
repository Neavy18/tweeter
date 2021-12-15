$(document).ready(function() {

  $('#tweet-text').on('input', function(){
    
    let counterValue = 140 - this.value.length
    console.log(counterValue)
    const counter = $(this).siblings().children(".counter") 
    counter.html(counterValue);
    
    if(counterValue < 0){
     $("output").addClass("error")
    } else {$("output").removeClass("error")}
  });

});