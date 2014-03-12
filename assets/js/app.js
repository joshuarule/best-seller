
// converts text to lowercase, removes dashes, & replaces spaces with dashes
function handleize(x) {
  return x.replace(/\s+/g, '-').replace(/[^a-zA-Z-]/g, '').toLowerCase();
}

// converts to lowercase
function toLowerCase(string){
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

//converts 1st letter in each word to toUpperCase
function toTitleCase(str){
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// converts title from uppercase to Title Case
function convertTitle(string) {
  string = toLowerCase(string);
  string = toTitleCase(string);
  return string;
}

// set heights of li to height of largest in the row
equalheight = function(container){

  console.log("bang");

var currentTallest = 0,
  currentRowStart = 0,
  rowDivs = new Array(),
  $el,
  topPosition = 0;

  $(container).each(function() {

  $el = $(this);
  $($el).height('auto')
  topPostion = $el.position().top;

  if (currentRowStart != topPostion) {
    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
      rowDivs[currentDiv].height(currentTallest);
    }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
    } else {
      rowDivs.push($el);
      currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
    for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
    }
  });
}

// sets initial results
var selection = handleize("Combined Print and E-Book Fiction");

// populates select options by pulling list names
$.ajax({
  type:     "GET",
  url:      'http://api.nytimes.com/svc/books/v3/lists/names.jsonp?callback=foo&api-key=df18c19df02bec07cf184dba193e6d29%3A17%3A68861996',
  dataType: "jsonp",
  success: function(data){
    var i, l, listName, displayName;
    list = data.results;
    i = 0;
    l = list.length;
    for (i; i < l; i+=1) {
      //capture display name
      displayName = list[i].display_name;
      // convert display name
      listName = handleize(list[i].list_name);
      // add to select
      $("#category").append("<option value='"+ listName + "'>"+displayName+"</option>");
    };
  }
});

// populates books based on list name change from select
var populate = function(selection) {

  $.ajax({
    type:     "GET",
    url:      'http://api.nytimes.com/svc/books/v3/lists/' + selection + '.jsonp?callback=foo&api-key=df18c19df02bec07cf184dba193e6d29:17:68861996',
    dataType: "jsonp",
    success: function(data){
      var contents = $(".booklist");
      var book, bookList, bookRank, bookImage, bookTitle, amazon, bookDetail, i, l;
      contents.empty();

      bookList = data.results.books;
      l = bookList.length;
      i = 0;

      // loop through books and add to list
      for (i; i < l; i+=1) {
        bookTitle = bookList[i].title;
        bookTitle = convertTitle(bookTitle);
        bookRank = bookList[i].rank;
        bookImage = bookList[i].book_image;
        amazon = "http://www.amazon.com/gp/product/" + bookList[i].primary_isbn10;
        bookDetail = bookList[i].description;

        $(".booklist").append(
          "<li>" +
            "<span class='rank'>"+bookRank+"</span>" +
            "<img class='book-image' style='background-image: url("+bookImage+")'>" +
            "<div class='info'>" +
              "<h2>" + bookTitle + "</h2>" +
              "<p class='details'>"+bookDetail+"</p>" + 
              "<a class='purchase' href='"+amazon+"' target='_blank'>Amazon</a>" +
            "</div>" +
            "<div class='cf'></div>" +
          "</li>"
        );
      };
      equalheight('.booklist li');
    }

  });

  

}

$(document).ready(function() {

  populate(selection); // initializes data


  $(window).resize(function(){
    equalheight('.booklist li');
  });

  // on select change re populate
  $("#category").change(function(e){
    selection = this.options[this.selectedIndex].value;
    populate(selection);
  });

});