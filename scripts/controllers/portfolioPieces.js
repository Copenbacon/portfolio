(function(module) {
  var portfolioController = {};

  portfolioController.reveal = function() {
    $('.contentBtn-content').hide();
    $('#home-top-third').fadeIn();
    console.log('portfolio controller ran');
  };

  module.portfolioController = portfolioController;
})(window);
