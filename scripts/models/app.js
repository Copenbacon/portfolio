(function(module) {
  function Piece(arg) {
    for (key in arg) {
      this[key] = arg[key];
    }
  }

  function AboutMe(arg) {
    for (key in arg) {
      this[key] = arg[key];
    }
  }

  Piece.prototype.toHtml = function(source){
    var templateRender = Handlebars.compile($(source).text());
    this.daysAgo = parseInt((new Date() - new Date(this.published)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.published ? 'published about  ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);
    return templateRender(this);
  };

  AboutMe.prototype.toHtml = function (source) {
    var templateRender = Handlebars.compile($(source).text());
    return templateRender(this);
  };

  Piece.loadAll = function(portfolioItems) {
    Piece.allPieces = portfolioItems.sort(function(currentObject, nextObject) {
      return (new Date(nextObject.published)) - (new Date(currentObject.published));
    })
    .map(function(ele) {
      return new Piece(ele);
    });
  };

  Piece.fetchAll = function(next){
    if (localStorage.portfolioPieces) {
      $.ajax({
        type: 'HEAD',
        url: 'data/portfolioItems.json',
        success: function(data, message, xhr){
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag){
            Piece.getAll(next);
          } else {
            Piece.loadAll(JSON.parse(localStorage.portfolioPieces));
            next();
          }
        }
      });
    } else {
      Piece.getAll(next);
    }
  };

  Piece.getAll = function(next){
    $.getJSON('data/portfolioItems.json', function(responseData, message, xhr){
      localStorage.eTag = xhr.getResponseHeader('eTag');
      Piece.loadAll(responseData);
      localStorage.portfolioPieces = JSON.stringify(responseData);
      next();
    });
  };

  AboutMe.loadAll = function(aboutMeItems){
    AboutMe.allAboutMe = aboutMeItems.map(function(ele) {
      return new AboutMe(ele);
    });
  };

  AboutMe.fetchAll = function(next){
    if (localStorage.aboutMeItems) {
      $.ajax({
        type: 'HEAD',
        url: 'data/aboutme.json',
        success: function(data, message, xhr){
          var eTag2 = xhr.getResponseHeader('eTag2');
          if (!localStorage.eTag2 || eTag !== localStorage.eTag2){
            AboutMe.getAll(next);
          } else {
            AboutMe.loadAll(JSON.parse(localStorage.aboutMeItems));
            next();
          }
        }
      });
    } else {
      AboutMe.getAll(next);
    }
  };

  AboutMe.getAll = function(next) {
    $.getJSON('/data/aboutme.json', function(responseData, message, xhr) {
      localStorage.eTag = xhr.getResponseHeader('eTag2');
      AboutMe.loadAll(responseData);
      localStorage.aboutMeItems = JSON.stringify(responseData);
      next();
    });
  };

  Piece.numWordsAll = function() {
    return Piece.allPieces.map(function(piece) {
      return piece.body.split(' ').length;
    })
    .reduce(function(cur, next, idx, array) {
      return cur + next;
    });
  };

  $('body').on('click', function(){
    $('.header-menu-ul').css({
      'display': 'none',
      'position': 'fixed',
      'width': '100%'
    });
  });

  $('.header-menu').on('click', function(){
    $('.header-menu-ul').css({
      'display': 'block',
      'list-style-type': 'none'
    });
  });

  module.Piece = Piece;
  module.AboutMe = AboutMe;
})(window);
