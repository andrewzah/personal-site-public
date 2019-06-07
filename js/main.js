function getRandomInt(max) {
  min = 0;
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function ReLoadImages(){
  $("[data-lazyload]").each(function (index, element) {
        var img = new Image();
        img.src = $(element).data("lazyload");
        if (typeof $(element).data("image-classname" !== "undefined"))
            img.className = $(element).data("image-classname");
        $(element).append(img);
    });
}

$(document).ready(function() {
  $("img[async-src]").each(function(index) {
    $(this).attr("src", $(this).attr("async-src"));
  });

  $.getJSON("/quotes/quotes.json", function(json) {
    var quotes = json.quotes;

    if (document.title == 'Quotes I like | AZ') {
      var collator = new Intl.Collator('en',
        { numeric: true, sensitivity: 'base' });
      
      quotes = quotes.sort(function(a,b) {
        return collator.compare(a.author, b.author);
      });

      quotes.forEach(function(quote) {
        var quoteText = $("<p class='quote-text'></p>").text(quote.quote);
        var quoteSource = quote.source;
        var quoteAuthor = "";

        if (quote.author){
          quoteAuthor = "— " + quote.author;
        }
        if (quote.source) {
          quoteAuthor = quoteAuthor + ", "
        }

        $('#quotes').append(
          $("<div class='quote'/>").append(
            quoteText,
            $("<div/>").append(
              $("<span class='quote-author'/>").text(quoteAuthor),
              $("<span class='quote-source'/>").append(
                $("<i/>").text(quoteSource)
              )
            )
          )
        );
      });
    } else {
      var length = quotes.length;
      var quote = quotes[getRandomInt(length)];

      $('#random-quote-quote').text(quote.quote);

      var author = "— " + quote.author
      if (quote.source) {
        $('#random-quote-author').text(author + ", ");
        $('#random-quote-source').text(quote.source);
      } else {
        $('#random-quote-author').text(author);
      }
    }
  })
  .fail(function() {
    console.log("Error loading json file–is there a json syntax issue?");
  });
});

