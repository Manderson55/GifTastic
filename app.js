$(document).ready(function(){
 
    var topics = ["dresses", "skirts", "women's pants", "blouses", "baby onesies", "wedding gowns"];
   
 //   var clothes = $(this).att("data-name");
 //       alert("you clicked " + topics );
 
      // Function for displaying the buttons
 

    function renderButtons() {
  
        $("#clothesView").empty();

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
        isEven(i);

        if (isIndexEven){
            var a = $("<button>");
            a.addClass("topics btn btn-primary");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#clothesView").append(a);
         } else {
              var a = $("<button>");
              a.addClass("topics btn btn-warning");
              a.attr("data-name", topics[i]);
              a.text(topics[i]);
              $("#clothesView").append(a);
            }
        }
    }
      // This function handles events where one button is clicked
    $("#addClothes").on("click", function(event) {
        event.preventDefault();
        var clothesAdd = $("#clothesInput").val().trim();
        if (clothesAdd === "") {
          alert ("you need to input a new item!");
        } else {
        topics.push(clothesAdd);
        $("#clothesForm").get(0).reset();
        renderButtons();
        }
      });

      // Calling the renderButtons function to display the intial buttons
    renderButtons();

   $("button").on("click", function() {

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
         for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var itemImage = $("<img>");
            itemImage.attr("src", results[i].images.fixed_height_small_still.url);
            gifDiv.prepend(p);
            gifDiv.prepend(itemImage);
            $("#gifs-appear-here").append(gifDiv);
         }
      });

    }); // end button on click function



}); //end document ready