
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

(function(){
  // ===== ترجمات مبدئية: أضف/عدّل المفاتيح حسب الحاجة =====
  const translations = {
    ar: {
      "site.title": "دليل فعاليات المدينة",
      "nav.home": "الرئيسية",
      "nav.events": "الفعاليات",
      "nav.about": "عن الدليل",
      "nav.contact": "اتصل بنا",
      "hero.title": "اكتشف فعاليات مدينتك",
      "hero.subtitle": "تعرّف على أحدث الفعاليات المحلية",
      "button.contact": "تواصل معنا",
      // أضف مفاتيح إضافية كما سنشرح أدناه...
    },
    en: {
      "site.title": "City Events Guide",
      "nav.home": "Home",
      "nav.events": "Events",
      "nav.about": "About",
      "nav.contact": "Contact",
      "hero.title": "Discover events in your city",
      "hero.subtitle": "Find the latest local events",
      "button.contact": "Contact Us",
      // Add more keys...
    }
  };

  // عناصر الأعلام — تأكد أن هذه الـ IDs موجودة في HTML (سأشرح أين تضيفها)
  const flagAr = document.getElementById('flag-ar');
  const flagEn = document.getElementById('flag-en');

  // language persisted in localStorage (default = 'ar')
  const savedLang = localStorage.getItem('site_lang') || 'ar';

  // apply saved language on load
  applyLanguage(savedLang);

  // event listeners (only if elements exist)
  if(flagAr) flagAr.addEventListener('click', () => { localStorage.setItem('site_lang','ar'); applyLanguage('ar'); });
  if(flagEn) flagEn.addEventListener('click', () => { localStorage.setItem('site_lang','en'); applyLanguage('en'); });

  // Main function: find elements with data-translate and replace text
  function applyLanguage(lang){
    // set html lang and direction
    document.documentElement.lang = (lang === 'ar') ? 'ar' : 'en';
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // change text for elements that have data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if(!key) return;
      const dict = translations[lang];
      if(!dict) return;
      // Inputs & textareas -> change placeholder if key exists, else change value for buttons/inputs
      const tag = el.tagName.toLowerCase();
      if(tag === 'input' || tag === 'textarea'){
        if(dict[key]) el.placeholder = dict[key];
      } else if(tag === 'img'){
        // لو أردت تغيير صور حسب اللغة، ضع src في data-src-ar / data-src-en
        const src = el.getAttribute(`data-src-${lang}`);
        if(src) el.src = src;
      } else {
        if(dict[key]) el.textContent = dict[key];
      }
    });

    // (اختياري) تحديث عناصر title/alt المساعدة
    document.querySelectorAll('[data-title]').forEach(el=>{
      const key = el.getAttribute('data-title');
      const dict = translations[lang];
      if(dict && dict[key]) el.title = dict[key];
    });
  }

  // expose for debugging/testing
  window._siteTranslations = translations;
  window._applyLanguage = applyLanguage;
})();

