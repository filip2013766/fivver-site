(function(){
  emailjs.init("pf1GNT6gXkAi2OVd0"); // tvoj public key
})();

document.getElementById("jobForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = this;

  // 1️⃣ Pripremamo podatke iz forme
  const formData = {
    full_name: sanitizeInput(form.name.value),
    reply_to: sanitizeInput(form.email.value),
    position: sanitizeInput(form.position.value),
    hours: sanitizeInput(form.hours.value),
    salary: sanitizeInput(form.salary.value),
    payment_method: sanitizeInput(form.payment.value),
    message: sanitizeInput(form.message.value)
  };

  // 2️⃣ Proveravamo da li je sve popunjeno
  const allFilled = Object.values(formData).every(value => value !== "");

  // 3️⃣ Šaljemo mail sebi
  emailjs.send("service_godrift", "template_07uaxtk", formData)
    .then(function(response) {
      console.log("Mail poslat sa svim podacima!", response.status);

      // 4️⃣ Automatski reply korisniku sa randomizovanom porukom
      sendAutoReply(formData, allFilled);

      alert("Prijava je uspešno poslana!");
      form.reset();
    }, function(error) {
      alert("Greška pri slanju maila: " + error.text);
      console.error(error);
    });
});

// Funkcija za sanitizaciju inputa
function sanitizeInput(input) {
  return input.trim().replace(/<\/?[^>]+(>|$)/g, ""); // uklanja HTML tagove
}

// Funkcija za automatski reply korisniku
function sendAutoReply(formData, allFilled) {
  // 1000+ varijanti poruka (primer, mogu se dodavati još)
  const successMessages = [
    `Dobar dan ${formData.full_name}, vaša prijava je uspešno primljena! Taskove ćete dobijati svake srede i ponedeljka.`,
    `Pozdrav ${formData.full_name}! Verifikacija je završena i primljeni ste u tim. Detalji za zadatke stižu uskoro.`,
    `Hej ${formData.full_name}, dobrodošli! Vaša prijava je prihvaćena i sve ide dalje po planu.`,
    // ... dodaj još varijanti do 1000
  ];

  const errorMessages = [
    `Dobar dan, čini se da niste popunili sve podatke. Molimo vas da popunite formu i pokušate ponovo.`,
    `Vaša prijava nije kompletna. Proverite da li ste uneli sve tražene informacije.`,
    `Hej! Nismo primili sve informacije. Popunite formu ispravno i pošaljite ponovo.`,
    // ... dodaj još varijanti do 1000
  ];

  // Biramo nasumičnu poruku
  const randomMessage = allFilled
    ? successMessages[Math.floor(Math.random() * successMessages.length)]
    : errorMessages[Math.floor(Math.random() * errorMessages.length)];

  // Šaljemo automatski reply
  emailjs.send("service_vrtw03f", "template_5z4l1k5", {
    name: formData.full_name || "Korisnik",
    email: formData.reply_to,
    message: randomMessage
  })
  .then(function(response) {
    console.log("Automatski reply poslat korisniku!", response.status);
  })
  .catch(function(error) {
    console.error("Greška pri slanju reply-a:", error);
  });
}

