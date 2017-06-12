$(document).ready(function(){
 
    var topics = ["rings", "flowers", "cars", "gardens", "castles", "wedding gowns"];
   
    // Function for displaying the buttons
    function renderButtons() {
  
        $("#topicsView").empty();

        for (var i = 0; i < topics.length; i++) {
            var isIndexEven = true; 
            console.log(isIndexEven); 
            function isEven(value) {
               if (value%2 == 0)  {
                  isIndexEven = true;
               }else{
                  isIndexEven= false;
               }
              } 
        isEven(i); //calling isEven function to display different color buttons
                   //if the index is odd or even 

        if (isIndexEven){
            var a = $("<button>");
            a.addClass("topics btn btn-primary");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#topicsView").append(a);
            $("#topicsView").append(" ");
         } else {
              var a = $("<button>");
              a.addClass("topics btn btn-success");
              a.attr("data-name", topics[i]);
              a.text(topics[i]);
              $("#topicsView").append(a);
              $("#topicsView").append(" ");
            }
        }
    }// end render buttons

      // This function handles events where one button is clicked
    $("#addTopic").on("click", function(event) {
        event.preventDefault();
        var topicsAdd = $("#topicsInput").val().trim();
        if (topicsAdd === "") {
          alert ("you need to input a new item!");
        } else {
          topics.push(topicsAdd);
          $("#topicsForm").get(0).reset();
          renderButtons();
        }
      });

   // Calling the renderButtons function to display the intial buttons
   renderButtons();

   $("button").on("click", function() {
      event.preventDefault();
          $("gifs-appear-here").empty(); //clears the previous gifs   

       var itemSelected = $(this).attr("data-name");
       var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        itemSelected + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
         url: queryURL,
         method: "GET"
      })
     .done(function(response) {
        console.log(response);
   
         var results = response.data; //store all the arrays in an array called results
         var topicSelected = $("<h3>").text(itemSelected);
         $("#gifs-appear-here").append(topicSelected); //printing button Selected
         for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var itemImage = $("<img>").attr({
                "src": results[i].images.fixed_height_small_still.url,
                "class":"showImage",
                "data-state":"still",
                "data-still": results[i].images.fixed_height_small_still.url,
                "data-animate": results[i].images.fixed_height_small.url
                 });
            gifDiv.prepend(p);
            gifDiv.prepend(itemImage);
            $("#gifs-appear-here").append(gifDiv);
            $("#gifs-appear-here").append(" ");
         }

         // this is were we check the image state when the user clicks on the image
          $(".showImage").on("click", function() {
              console.log ("inside image click function");
              var state = $(this).attr("data-state");
              console.log(this, "clicked image is " + state);
              if (state === "still") {
                  console.log ("image is still, change to animate");
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
           
              } else {
                  console.log ("image is animated, change to still");             
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
              }
         
            }); //end gif onclick function to animate

      }); // end of done function response

    }); // end button on click function

}); //end document ready