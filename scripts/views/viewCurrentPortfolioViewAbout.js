(function(module){
  var portfolioView = {};
  var AboutMeView = {};
  var menuClick = {};

  menuClick.clickTheMenu = function(){
    $('.menu-icon-div').on('click', function(event){
      event.preventDefault();
      $('header-menu-ul').css('display', 'block');
    });
  };

  portfolioView.setTeasers = function() {
    $('.body-portfolio-item').hide();

    $('.read-on').on('click', function(event){
      console.log('clicked: ', $(this).text());
      event.preventDefault();
      if($(this).html() === 'Show More →'){
        $(this).parent().find('*').show();
        $(this).text('Show Less');
        console.log('I should show more now');
      } else {
        $(this).text('Show More →');
        $(this).siblings('.body-portfolio-item').hide();
        console.log('I should show less now');
      };
    });
  };

  portfolioView.renderIndexPage = function() {
    Piece.allPieces.forEach(function(article) {
      $('#home-top-third').append(article.toHtml('#portfolio-items-template'));
    });
    $('#blog-stats .words').text(Piece.numWordsAll());
    portfolioView.setTeasers();
  };

  AboutMeView.renderIndexPage = function() {
    AboutMe.allAboutMe.forEach(function(article) {
      $('#home-middle-third').append(article.toHtml('#about-items-template'));
    });
  };

  Piece.fetchAll(portfolioView.renderIndexPage);
  AboutMe.fetchAll(AboutMeView.renderIndexPage);
  module.portfolioView = portfolioView;
  module.AboutMeView = AboutMeView;
  module.menuClick = menuClick;
})(window);
