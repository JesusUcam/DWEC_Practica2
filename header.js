$(window).scroll(function() {
  var sc = $(window).scrollTop()
  if (sc > 100) {
    $("#header-scroll").addClass("small")
  } else {
    $("#header-scroll").removeClass("small")
  }
});