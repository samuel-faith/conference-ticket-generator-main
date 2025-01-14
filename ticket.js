$("form").submit(function(e) {
    e.preventDefault();

    var fullName = $("#full-name").value;
    var email = $("#email").value;

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);

    window.location.href = "./success.html";
})

var fullName = localStorage.getItem("fullName");
var email = localStorage.getItem("email");

if (fullName && email) {
    $(".header1 h1").textContent = 'Congrats, $("fullName")! Your ticket is ready.'
    $(".header1 p").textContent = 'We have emailed your ticket to $("email") and will send updates in the run up to the event.'
}

localStorage.clear();