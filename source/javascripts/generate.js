var items;
var ww = $(window).width();
var newHeadline = [];
var headlineStore = [];
var stringStore = [];
var maxHeadline = 10;
var minHeadline = 6;
var x = 0;


$.ajax({
    type: 'GET',
    url: 'http://content.guardianapis.com/world?show-editors-picks=true&show-fields=body&api-key=' + key,
  }).done(function(data){
    items = data;
    createHeadline();
  }).fail(function(error){
    throwError();
});


function throwError() {
  console.log("Couldn't get data");
}


function emptyArrays() {
  x = 0;
  newHeadline = [];
  headlineStore = [];
}


function random(min, max) {
  var rand = Math.floor(Math.random() * (max - min + 1)) + min;
  return rand;
}


function createHeadline() {

  var dataLength = items.response.editorsPicks.length;
  var titles;
  var split;

  for (i = 0; i < dataLength; i++) {
    titles = items.response.editorsPicks[i].webTitle;
    split = titles.split(" ");
    headlineStore.push(split);
  }

  // create a flat array with one word from each webTitle
  var newArray = [].concat.apply([], headlineStore);

  // 10 is temp
  for (i = 0; i < maxHeadline; i++) {
    var x = random(newArray.length, 0);
    var word = newArray[x];

    if (stringStore.indexOf(word) > -1) {
      x = random(newArray.length, 0);
      word = newArray[x];
    }

    stringStore.push(word);
  }

  var wordCount = random(minHeadline, maxHeadline);

  // add on the last headline attached to array
  for (i = stringStore.length; i > (stringStore.length - wordCount); i--) {
     newHeadline.push(stringStore[i]);
  }

  // insert into DOM, add + replace any unwanted characters here
  var headline = newHeadline.join(" ").replace(/[`‘~!@#’—$%^'&-*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  var content = headline.toUpperCase();

  animate(content);
  emptyArrays();

}



function animate(el) {

  $('body').append('<div class = "headline">' + el + '</div>');
  var contentWidth = $('.headline').width();
  var dest = 0 - contentWidth;

  $('.headline').velocity({ left: dest }, "linear", 11000, function(){
    $(this).remove();
    createHeadline();
  });

}
