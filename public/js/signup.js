$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const firstInput = $("input#first-input");
  const lastInput = $("input#last-input");
  const intOne = $("input#firstInt");
  const intTwo = $("input#twoInt");
  const intThree = $("input#threeInt");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      firstname: firstInput.val().trim(),
      lastname: lastInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      intOne: intOne.val().trim(),
      intTwo: intTwo.val().trim(),
      intThree: intThree.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(
    firstname,
    lastname,
    email,
    password,
    intOne,
    intTwo,
    intThree
  ) {
    $.post("/api/signup", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      intOne: intOne,
      intTwo: intTwo,
      intThree: intThree
    })
      .then(res => {
        console.log(res);
        // window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
