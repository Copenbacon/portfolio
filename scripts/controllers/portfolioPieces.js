(function(module) {
  var portfolioController = {};

  portfolioController.reveal = function() {
    $('.contentBtn-content').hide();
    $('#home-top-third').fadeIn();
    $('header-menu-ul').hide();
    $('#blog-stats').hide();
    console.log('portfolio controller ran');
  };

  module.portfolioController = portfolioController;
})(window);
