$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
  $("button").on("click", function (event) {
    event.preventDefault();
    const one = "apple"
    $.ajax({
      type: "POST",
      url: "/profile",
      interstOne: one
    })
  })
});
