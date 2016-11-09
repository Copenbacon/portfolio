(function(module) {
  var repoController = {
    index: function() {
      // $('#home-bottom-third').fadeIn().siblings('section').hide();
      $('.contentBtn-content').hide();
      $('#blog-stats').hide();
      $('#home-bottom-third').fadeIn();
    }
  };

  module.repoController = repoController;
})(window);
