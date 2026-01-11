(function(){
  emailjs.init("pf1GNT6gXkAi2OVd0"); // Account → Public Key
})();

document.getElementById("jobForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm(
    "TVOJ_SERVICE_ID",
    "TVOJ_TEMPLATE_ID",
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
