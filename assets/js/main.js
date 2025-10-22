
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

// 🌍 Language & Theme Switcher Logic

// === تبديل الوضع الليلي ===
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
}

// === تبديل اللغة ===
const flagAR = document.getElementById('flag-ar');
const flagEN = document.getElementById('flag-en');

// النصوص القابلة للترجمة
const translations = {
  ar: {
    "Home": "الرئيسية",
    "About": "من نحن",
    "Contact": "اتصل بنا",
    "Events": "الفعاليات",
    "Read More": "اقرأ المزيد",
  },
  en: {
    "الرئيسية": "Home",
    "من نحن": "About",
    "اتصل بنا": "Contact",
    "الفعاليات": "Events",
    "اقرأ المزيد": "Read More",
  }
};

// دالة تبديل اللغة
function switchLanguage(lang) {
  document.querySelectorAll('*').forEach(el => {
    if (translations[lang][el.textContent]) {
      el.textContent = translations[lang][el.textContent];
    }
  });
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

if (flagAR && flagEN) {
  flagAR.addEventListener('click', () => switchLanguage('ar'));
  flagEN.addEventListener('click', () => switchLanguage('en'));
}
