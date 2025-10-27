// Main JS: small helpers for accessibility, masks and validation
document.addEventListener('DOMContentLoaded', function(){
  // Footer year
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Menu toggle for small screens
  var btn = document.getElementById('menu-toggle');
  var nav = document.getElementById('primary-navigation');
  if(btn && nav){
    btn.addEventListener('click', function(){
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? '' : 'block';
    });
  }

  // Input masks (simple, unobtrusive)
  function mask(o, f){
    var v = o.value.replace(/\D/g,'');
    o.value = f(v);
  }
  function cpfMask(v){
    v = v.slice(0,11);
    return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, function(_,a,b,c,d){
      return a + (b?'.'+b:'') + (c?'.'+c:'') + (d?'-'+d:'');
    });
  }
  function phoneMask(v){
    v = v.slice(0,11);
    if(v.length<=10) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, function(_,a,b,c){return '('+a+') '+b+(c?'-'+c:'')});
    return v.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, function(_,a,b,c,d){return '('+a+') '+b+' '+c+(d?'-'+d:'')});
  }
  function cepMask(v){
    v = v.slice(0,8);
    return v.replace(/(\d{5})(\d{0,3})/, function(_,a,b){return a + (b?'-'+b:'')});
  }

  var cpf = document.getElementById('cpf');
  if(cpf) cpf.addEventListener('input', function(){ mask(cpf, cpfMask); });

  var tel = document.getElementById('telefone');
  if(tel) tel.addEventListener('input', function(){ mask(tel, phoneMask); });

  var cep = document.getElementById('cep');
  if(cep) cep.addEventListener('input', function(){ mask(cep, cepMask); });

  // Form submission: example client-side check with accessible status
  var form = document.getElementById('form-cadastro');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.reportValidity();
        var st = document.getElementById('form-status');
        if(st) st.textContent = 'Há campos inválidos. Por favor verifique.';
        return;
      }
      // Simulate sending
      var st = document.getElementById('form-status');
      if(st) st.textContent = 'Enviando...';
      setTimeout(function(){
        form.reset();
        if(st) st.textContent = 'Cadastro enviado com sucesso. Obrigado!';
      }, 700);
    }, false);
  }
});
