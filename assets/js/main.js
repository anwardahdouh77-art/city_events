
function validateContactForm(){
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const alertBox = document.getElementById('contactAlert');
  alertBox.innerHTML = '';
  alertBox.className = '';
  if(!name || !email || !message){
    alertBox.className = 'alert alert-danger mt-3';
    alertBox.innerText = 'يرجى تعبئة جميع الحقول.';
    return false;
  }
  const re = /^\S+@\S+\.\S+$/;
  if(!re.test(email)){
    alertBox.className = 'alert alert-danger mt-3';
    alertBox.innerText = 'صيغة البريد الإلكتروني غير صحيحة.';
    return false;
  }
  alertBox.className = 'alert alert-success mt-3';
  alertBox.innerText = 'تم إرسال رسالتك بنجاح. شكرًا لتواصلك.';
  document.getElementById('contactForm').reset();
  return false;
}
function filterByCategory(cat){
  const cards = document.querySelectorAll('.event-card');
  cards.forEach(c=>{
    if(cat==='الكل' || c.dataset.cat===cat){ c.style.display='block'; }
    else{ c.style.display='none'; }
  });
}
