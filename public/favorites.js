const nodes = new vis.DataSet([
  { label: "Pop" },
  { label: "Alternative" },
  { label: "Rock" },
  { label: "Jazz" },
  { label: "Hits" },
  { label: "Dance" },
  { label: "Metal" },
  { label: "Experimental" },
  { label: "Rap" },
  { label: "Electronic" }
]);
const edges = new vis.DataSet();

const container = document.getElementById("bubbles");
const data = {
  nodes: nodes,
  edges: edges
};

const options = {
  nodes: {
    borderWidth: 0,
    shape: "circle",
    color: {
      background: "purple",
      highlight: { background: "#F92C55", border: "#F92C55" }
    },
    font: { color: "#fff" }
  },
  physics: {
    stabilization: false,
    minVelocity: 0.01,
    solver: "repulsion",
    repulsion: {
      nodeDistance: 50
    }
  }
};
const network = new vis.Network(container, data, options);

// Events
network.on("click", e => {
  if (e.nodes.length) {
    const node = nodes.get(e.nodes[0]);
    // Do something
    nodes.update(node);
    console.log("hello");
    // const axios = require("axios");
    // const arr = ["politics", "movies", "food"];
    // const get = item => axios({
    //     method: "GET",
    //     headers: { "X-ListenAPI-Key": "178f7b868c6e491392fce6436d12ac5a" }, // replace apicode with actual api key
    //     url:
    //       "https://listen-api.listennotes.com/api/v2/search?q=" +
    //       item +
    //       "&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0"
    //   }).then(res => {
    //     for (let i = 0; i < res.data.results.length; i++) {
    //       console.log("------------------------------------");
    //       console.log(res.data.results[i].title_original);
    //       console.log(res.data.results[i].image);
    //       console.log(res.data.results[i].id);
    //       console.log(res.data.results[i].listennotes_url);
    //     }
    //   });
    // //  arr.forEach(item, get(item))
    // for (let i = 0; i < arr.length; i++) {
    //   get(arr[i]);
  }
});

container.on("mouse-wheel", event => {
  // prevents zooming with the mouse-wheel event
  event.stopPropagation();
});
