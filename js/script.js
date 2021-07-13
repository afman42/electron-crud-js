var $ = require('jquery');
require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('popper.js');
require('bootstrap/dist/js/bootstrap.min.js');
var current_page = 1;
var records_per_page = 3;

window.prevPage = function ()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

window.nextPage = function ()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

window.changePage = function(page)
{
    var btn_next = $("#btn_next");
    var btn_prev = $("#btn_prev");
    var listing_table = document.getElementById("kotak");
    var page_span = $("#page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
      var content = "<table class='table'>"
      content += '<tr>' + 
        '<td>No</td>'+
        '<td>Title</td>'+
        '<td>Body</td>'+
        '</tr>';
        
      for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < json.length; i++) {
        localStorage.setItem("lengthjson", json.length);

          const element =  json[i];
          console.log(element.title);
        content += '<tr>' +
        '<td>' +  i + '</td>'+
        '<td>' +  element.title + '</td>'+
        '<td>' +  element.body + '</td>'+
        '</tr>';

      }
      content += "</table>"
      $('#kotak').html(content);
  });
    
    page_span.html(page + "/" + numPages());

    if (page == 1) {
        btn_prev.css("visibility","hidden");
        // style.visibility = "";
    } else {
        btn_prev.css("visibility","visible");
        // btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.css("visibility","hidden");
        // btn_next.style.visibility = "hidden";
    } else {
        btn_next.css("visibility","visible");
        // btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    var lengthjson = localStorage.getItem('lengthjson');
    
    return Math.ceil(lengthjson / records_per_page);
}

window.onload = function() {
    changePage(1);
};