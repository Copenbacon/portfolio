(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.contentBtn-content').hide();
    $('#home-middle-third').fadeIn();
    $('#blog-stats').hide();
    console.log('about controller ran');
  };

  module.aboutController = aboutController;
})(window);
