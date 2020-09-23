$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/members/:intOne/:intTwo/:intThree").then(data => {
      console.log(data);
    const result = document.getElementById("result");
    data.results.map(item => {
      console.log(item.audio);
      const node = document.createElement("a");
      const textNode = document.createTextNode(item.audio);
      node.appendChild(textNode);
      // const audio = `<p>${item[0].audio}</p>`;
      node.href = item.audio;
      const br = document.createElement("br");
      node.appendChild(br);
      result.appendChild(node);
    });
  });
  // $("button").on("click", event => {
  //   event.preventDefault();
  //   const int = $("#interest")
  //     .val()
  //     .trim()
  //     .toLowerCase();
  //   console.log(int);
  //   $.ajax({
  //     type: "POST",
  //     url: "/profile",
  //     interstOne: int
  //   });
  // });
});
