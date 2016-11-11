(function(module) {
  var repoController = {
    index: function() {
      $('.contentBtn-content').hide();
      $('#blog-stats').hide();
      $('#home-bottom-third').fadeIn();
      $('header-menu-ul').hide();
    }
  };

  module.repoController = repoController;
})(window);
