$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/members/:intOne/:intTwo/:intThree").then(data => {
    console.log(data);
    // fixed members.js get route to append data from api to our members page!
    const result = document.getElementById("result");
    data.results.map(item => {
      const node = document.createElement("a");
      const textNode = document.createTextNode(item.audio);
      node.appendChild(textNode);
      node.href = item.audio;
       
      // This is for showing the title of the specific url
      const newTitle = document.createElement("p");
      const textTitle = document.createTextNode(item.title_original);
      newTitle.appendChild(textTitle);
      result.appendChild(newTitle);
      // const audio = `<p>${item[0].audio}</p>`;
      const br = document.createElement("br");
      node.appendChild(br);
      result.appendChild(node);
      const imgDiv = document.createElement("div");
      const newImg = document.createElement("img");
      
      newImg.src = item.image;
      imgDiv.appendChild(newImg);
      result.appendChild(imgDiv);

      const newDescrip = document.createElement("p");
      const description = document.createTextNode(item.description_original);
      newDescrip.appendChild(description);
      result.appendChild(newDescrip);
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
