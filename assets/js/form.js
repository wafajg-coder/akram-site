(function(){
  var form = document.getElementById('devis-form');
  if (!form) return;
  var merci = document.getElementById('merci');
  var erreur = document.getElementById('erreur');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    erreur.style.display = 'none';
    var data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function(response){
      if (response.ok) {
        form.style.display = 'none';
        merci.style.display = 'block';
        merci.scrollIntoView({behavior: 'smooth', block: 'center'});
      } else {
        throw new Error('Envoi refusé');
      }
    }).catch(function(){
      erreur.textContent = "Une erreur est survenue. Merci de réessayer ou de nous contacter directement à contact@metalpro-france.fr.";
      erreur.style.display = 'block';
    });
  });
})();
