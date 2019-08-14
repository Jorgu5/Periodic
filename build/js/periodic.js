$(function () {
  $.ajax({
    url: "https://api.myjson.com/bins/17cc3n",
    success: function (content) {
      let a = [];
      $.each(content, function (i, obj) {
        $(".periodic").append(`<div class="periodic__tile" data-id="${obj.id}">
            <div class="periodic__top">
                <span class="periodic__top_element periodic__id">${obj.id}</span>
                <span class="periodic__top_element periodic__short" contenteditable="true">${obj.cat}</span>
            </div>
            <div class="periodic__name" contenteditable="true">
                <span>${obj.name_short}</span>
            </div>
            <div class="periodic__bottom" contenteditable="true">
                <p>${obj.name}</p>
            </div>
      </div>`);
        document.addEventListener("keydown", function (event) {
          var esc = event.which == 27,
              nl = event.which == 13,
              el = event.target,
              input = el.nodeName != "INPUT" && el.nodeName != "TEXTAREA",
              data = {};

          if (input) {
            if (esc) {
              // restore state
              document.execCommand("undo");
              el.blur();
            } else if (nl) {
              // save
              data[el.getAttribute("data-id")] = el.innerHTML; // we could send an ajax request to update the field

              /*
              $.ajax({
                url: window.location.toString(),
                data: data,
                type: 'post'
              });
              */

              log(JSON.stringify(data));
              el.blur();
              event.preventDefault();
            }
          }
        }, true); // Periodic Colors

        var arrNumbers = Number(obj.id);
        a.push(arrNumbers);
      });
      let b = $(".periodic > .periodic__tile");

      for (var j = 0; j < b.length; j += 10) {
        b.slice(j, j + 10).wrapAll("<div class='periodic__grid'></div>");
      }

      var periodicTile = $(".periodic__tile");
      periodicTile.click(function () {
        $(this).addClass("periodic__tile_active");
      });
      periodicTile.on("focusout", function () {
        $(this).removeClass("periodic__tile_active");
      });
    }
  });
});
$(document).ready(function () {
  var greenArray = [1, 2, 3, 4, 11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34];
  var yellowArray = [5, 6, 7, 15, 16, 17, 25, 26, 27, 35, 36, 37, 41, 42, 42, 43, 44, 45, 46, 47, 51, 52, 53, 54, 55, 56, 57, 61, 62, 63, 64, 65, 66, 67];
  var redArray = [8, 9, 18, 19, 28, 29, 38, 39, 48, 49, 58, 59, 68, 69, 71, 72, 73, 74, 75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 66, 67];
  var primaryArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 99, 98, 97, 96, 95, 94, 93, 92, 91];
  setTimeout(function () {
    var periodicGrid = $(".periodic__grid");

    for (var a = 0; a < greenArray.length; a += 1) {
      periodicGrid.find('[data-id="' + greenArray[a] + '"]').addClass("periodic__tile_green");
    }

    for (var b = 0; b < yellowArray.length; b += 1) {
      periodicGrid.find('[data-id="' + yellowArray[b] + '"]').addClass("periodic__tile_yellow");
    }

    for (var c = 0; c < redArray.length; c += 1) {
      periodicGrid.find('[data-id="' + redArray[c] + '"]').addClass("periodic__tile_red");
    }

    for (var d = 0; d < primaryArray.length; d += 1) {
      periodicGrid.find('[data-id="' + primaryArray[d] + '"]').addClass("periodic__tile_primary");
    }
  }, 1000);
});