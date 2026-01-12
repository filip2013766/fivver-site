(function(){
  emailjs.init("pf1GNT6gXkAi2OVd0"); // Account → Public Key
})();

document.getElementById("jobForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_godrift",
    "template_07uaxtk",
    this
  ).then(
    function() {
      alert("Prijava je uspešno poslata!");
      document.getElementById("jobForm").reset();
    },
    function(error) {
      alert("Greška: " + error.text);
    }
  );
});
