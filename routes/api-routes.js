const axios = require("axios");
// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const bodyParser = require("body-parser");
const podcastAction = require("../models/podcast-action");

module.exports = function(app) {
  // parse application/x-www-form-urlencoded
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // parse application/json
  app.use(bodyParser.json());
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post(
    "/api/login",
    passport.authenticate("local", {
      successRedirect: "/members",
      failureRedirect: "/login"
    })
  );
  app.post("/api/signup", (req, res) => {
    console.log("hello");
    console.log(req.body);
    console.log(db.User);
    console.log(req.body.firstName);
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      intOne: req.body.intOne,
      intTwo: req.body.intTwo,
      intThree: req.body.intThree
    })
      .then(() => {
        res.redirect(307, "/members/:intOne/:intTwo/:intThree");
        //  console.log("from then", user.email);
        //    console.log(user.password);
      })
      .catch(err => {
        res.status(401).json(err);
        console.log(err);
        //console.log("from error", user.email);
        //console.log(user.password);
      });
  });
  app.get("/members/:intOne/:intTwo/:intThree", async (req, res) => {
    console.log(res);
    console.log("---------------------");
    console.log(req.user.intOne);
    console.log(req.user.intTwo);
    console.log(req.user.intThree);
    // const result = await db.User.findOne({ where: 9 });
    const arr = [];
    arr.push(req.user.intOne, req.user.intTwo, req.user.intThree);
    const get = item => axios({
      method: "GET",
      headers: { "X-ListenAPI-Key": "178f7b868c6e491392fce6436d12ac5a" }, // replace apicode with actual api key
      url:
          "https://listen-api.listennotes.com/api/v2/search?q=" +
          item +
          "&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0"
    }).then(async res => {
      return res.data.results;
    });
    const emptyArr = [];
    for (let i = 0; i < arr.length; i++) {
      const newResult = await get(arr[i]);
      emptyArr.push(...newResult);
    }
    // console.log(emptyArr);
    res.status(200).json({ results: emptyArr });
    // // console.log(result);
    // // console.log(req.params);

    // // res.render("home");
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/get-podcast-actions", async (req, res) => {
    //console.log('req.user', req.user);

    var podcastActions = await db.PodcastAction.findAll({
      where: {
        userId : req.user.id
      }
    });

    res.status(200).json({ results: podcastActions });
  });  


  app.post("/api/podcast-action", async (req, res) => {
    var id = req.body.id;
    var userId = req.user.id;
    var action = req.body.action;

    console.log('passport', passport);

    console.log('body', req.body);

    var podcastActions = await db.PodcastAction.findAll({
      where: {
        id: id,
        userId : userId
      }
    });

    console.log('podcastActions', podcastActions);

    var actionInt = 0;

    switch (action) {
      case "like":
        actionInt = 1;
        break;

      case "dislike":
        actionInt = 2;
        break;
    }

    if (podcastActions &&  podcastActions.length === 0) {
      await db.PodcastAction.create({
        id: id,
        userId: userId,
        action: actionInt
      });
    } else {
      await db.PodcastAction.update({ action: actionInt }, {
        where: {
          id: id,
          userId:userId
        }
      });
    }

    res.status(200).json({ results: 'ok' });
  });  

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

}