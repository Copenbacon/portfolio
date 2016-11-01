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

Piece.allPieces = [];
AboutMe.allAboutMe = [];

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
  portfolioItems.sort(function(currentObject, nextObject) {
    return (new Date(nextObject.published)) - (new Date(currentObject.published));
  })
  .forEach(function(ele) {
    Piece.allPieces.push(new Piece(ele));
  });
};

Piece.fetchAll = function(){
  if (localStorage.portfolioPieces) {
    var parsedPieces = JSON.parse(localStorage.portfolioPieces);
    Piece.loadAll(parsedPieces);
    portfolioView.renderIndexPage();
  } else {
    $.getJSON('data/portfolioItems.json', function(portfolioPieces){
      Piece.loadAll(portfolioPieces);
      localStorage.setItem('portfolioPieces', JSON.stringify(portfolioPieces));
      portfolioView.renderIndexPage();
    });
  }
};

AboutMe.loadAll = function(aboutMeItems){
  aboutMeItems.forEach(function(ele) {
    AboutMe.allAboutMe.push(new AboutMe(ele));
  });
};

AboutMe.fetchAll = function() {
  if (localStorage.aboutMeItems){
    var parsedAboutMe = JSON.parse(localStorage.aboutMeItems);
    AboutMe.loadAll(parsedAboutMe);
    AboutMeView.renderIndexPage();
  } else {
    $.getJSON('data/aboutme.json', function(aboutMeItems){
      AboutMe.loadAll(aboutMeItems);
      localStorage.setItem('aboutMeItems', JSON.stringify(aboutMeItems));
      AboutMeView.renderIndexPage();
    });
  }
};
