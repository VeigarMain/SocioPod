$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.post("/api/get-podcast-actions", {}).then(podcastActions=> {
    console.log('podcastActions', podcastActions);
  
    $.get("/members/:intOne/:intTwo/:intThree").then(data => {
        console.log(data);
  
        // fixed members.js get route to append data from api to our members page!
        const result = document.getElementById("result");
        data.results.map(item => {
  
          var pathname = window.location.pathname
  
          var show = true;
  
          const pa = podcastActions.results.filter(p => p.id === item.id);
  
          console.log('pa', pa);
  
          var action = 0;
  
          if (pa && pa.length > 0) {
            action = pa[0].action;
          }
  
          if (pathname.indexOf('favorites') !== -1) {
            show = (action === 1);
          }
  
          if (show) {
            const bigDiv = document.createElement("div");
            bigDiv.classList.add("card");
            bigDiv.classList.add("border-dark");
            bigDiv.classList.add("mb-3");
  
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
            description.classList.add("card-text");
            const descText = document.createTextNode(item.description_original);
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
            button2.classList.add("btn-warning");
            const target2 = document.createAttribute("target");
            target2.value = "_blank";
            button2.setAttributeNode(target2);
            button2.href = item.listennotes_url;
            button2.target = "_blank";
            const button2Text = document.createTextNode("Visit Site!");
            button2.appendChild(button2Text);
            littleDiv.append(button2);
  
            
            const button3 = document.createElement("a");
            
            button3.classList.add("btn");
            button3.classList.add("btn-success");
  
            if (action === 1)
              button3.classList.add("pressed-button");
  
            const button3Text = document.createTextNode("Like!");
            button3.appendChild(button3Text);
            littleDiv.append(button3);
            button3.classList.add("onclick");
            button3.onclick = function() {
              if (button3.classList.contains('pressed-button')) {
                button3.classList.remove('pressed-button');
                button4.classList.remove('pressed-button');
              }
              else {
                button3.classList.add('pressed-button');
                button4.classList.remove('pressed-button');
              }
  
              $.post("/api/podcast-action", { 
                id : item.id,
                action:'like'
              }).then(data => {
              });
            }
  
            const button4 = document.createElement("a");
            button4.classList.add("btn");
            button4.classList.add("btn-danger");
  
            if (action === 2)
              button4.classList.add("pressed-button");
  
            const button4Text = document.createTextNode("Dislike!");
            button4.appendChild(button4Text);
            littleDiv.append(button4);
            button4.onclick = function() {
              if (button4.classList.contains('pressed-button')) {
                button3.classList.remove('pressed-button');
                button4.classList.remove('pressed-button');
              }
              else {
                button3.classList.remove('pressed-button');
                button4.classList.add('pressed-button');
              }
  
              $.post("/api/podcast-action", { 
                id : item.id,
                action:'dislike'
              }).then(data => {
              });
            }
  
            result.append(bigDiv);
          }
        });
      })
    });
  });
  