$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/members/:intOne/:intTwo/:intThree").then(data => {
    console.log(data);
    // fixed members.js get route to append data from api to our members page!
    const result = document.getElementById("result");
    data.results.map(item => {

      const bigDiv = document.createElement("div");
      bigDiv.classList.add("card");

      const img = document.createElement("img");
      img.classList.add("card-img-top");
      img.src = item.image;
      bigDiv.append(img);

      const littleDiv = document.createElement("div");
      littleDiv.classList.add("card-body");
      bigDiv.append(littleDiv);

      const title = document.createElement("h5");
      title.classList.add("card-title");
      const titleText = document.createTextNode(item.title_original);
      title.appendChild(titleText);
      littleDiv.append(title);

      const description = document.createElement("p");
      title.classList.add("card-text");
      const descText = document.createTextNode(item.description_highlighted);
      description.appendChild(descText);
      littleDiv.append(description);

      const button = document.createElement("a");
      button.classList.add("btn");
      button.classList.add("btn-primary");
      const target = document.createAttribute("target");
      target.value = "_blank";
      button.setAttributeNode(target);
      button.href = item.audio;
      const buttonText = document.createTextNode("Listen!");
      button.appendChild(buttonText);
      littleDiv.append(button);

      const button2 = document.createElement("a");
      button2.classList.add("btn");
      button2.classList.add("btn-primary");
      const target2 = document.createAttribute("target");
      target2.value = "_blank";
      button2.setAttributeNode(target2);
      button2.href = item.listennotes_url;
      button2.target = "_blank";
      const button2Text = document.createTextNode("Visit Site!");
      button2.appendChild(button2Text);
      littleDiv.append(button2);

      result.append(bigDiv);



      const newDiv = document.createElement("div");
      const addCard = document.createTextNode(item.audio + item.title_original + item.description_original + item.image);
      newDiv.appendChild(addCard);



      const node = document.createElement("a");
      const textNode = document.createTextNode(item.audio);
      const newElement = document.createElement("div");
      newElement.classList.add("holderdiv");
      node.appendChild(textNode);
      node.href = item.audio;

      // this is for making cards for the specific podcast with descriptions and img...
      const newTitle = document.createElement("h2");
      // This is for showing the title of the specific url
      const textTitle = document.createTextNode(item.title_original);
      newTitle.appendChild(textTitle);
      newElement.appendChild(newTitle);
      // const audio = `<p>${item[0].audio}</p>`;
      const br = document.createElement("br");
      node.appendChild(br);
      newElement.appendChild(node);
      const imgDiv = document.createElement("div");
      const newImg = document.createElement("img");

      newImg.src = item.image;
      imgDiv.appendChild(newImg);
      newElement.appendChild(imgDiv);

      const newDescrip = document.createElement("p");
      const description = document.createTextNode(item.description_original);
      newDescrip.appendChild(description);

      result.appendChild(newDescrip);

      newElement.appendChild(newDescrip);
      result.appendChild(newElement);






    });
  });
});
