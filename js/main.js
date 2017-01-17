function getRecipeJson() {
  var apiKey = "your-api-key-here";
  var RecipeId = 196149;
  var url = "https://api2.bigoven.com/recipe/" + RecipeId + "?api_key=" + apiKey;
  $.ajax({
      type: "GET",
      dataType: 'json',
      cache: false,
      url: url,
      success: function (data) {
          //console.log(data);
          $("#RecipeTitle").html(data.Title);
          $("#instructions").html(data.Instructions);
      }
  });
}
getRecipeJson();
