// Global content storage
let contentData = {};
let currentLanguage = 'en'; // Default language

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load initial content in English
    loadContent('en');
    setupLanguageToggle();
});

/**
 * Setup language toggle event listener
 */
function setupLanguageToggle() {
    const langToggle = document.getElementById('langToggle');
    
    langToggle.addEventListener('change', function() {
        const newLang = this.checked ? 'az' : 'en';
        currentLanguage = newLang;
        loadContent(newLang);
    });
}

/**
 * Fetch content from API and update page
 * @param {string} lang - Language code ('az' or 'en')
 */
function loadContent(lang) {
    fetch(`/api/content?lang=${lang}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            contentData = data;
            updatePageContent();
            updatePageDirection(lang);
        })
        .catch(error => {
            console.error('Error loading content:', error);
            // Fallback to default content if API fails
            loadFallbackContent(lang);
        });
}

/**
 * Load fallback content in case API is unavailable
 */
function loadFallbackContent(lang) {
    console.warn('Using fallback content. API may be unavailable.');
    // This ensures the app still works even if the backend is down
    const fallbackContent = getFallbackContent(lang);
    contentData = fallbackContent;
    updatePageContent();
    updatePageDirection(lang);
}

/**
 * Get fallback content
 */
function getFallbackContent(lang) {
    // Fallback data embedded in the frontend
    const fallback = {
        en: {
            'hero.title': 'Qurban Kəsdir: Simple. Transparent. Secure.',
            'hero.subtitle': 'Qurbani in the Digital Age',
            'hero.description': 'Select an animal in the Qurban Kəsdir app, choose delivery, and pay. The animal is slaughtered tomorrow with your name called out loud!',
            'problems.title': 'Three Major Problems with Sacrificing in Baku',
            'problems.problem1.title': 'Finding Reliable Butchers is Difficult',
            'problems.problem1.description': 'Trusting someone with your sacrifice is difficult. Who is the butcher? What is their quality? Are you satisfied with the result?',
            'problems.problem2.title': 'No Price Certainty',
            'problems.problem2.description': 'First they quote one price, then it changes. Hidden costs appear. Wasted money...',
            'problems.problem3.title': 'No Transparency or Proof',
            'problems.problem3.description': 'How was the animal slaughtered? Where is the meat? Is the animal dead? Do you know? You have no video. No proof.',
            'mission.title': 'Our Mission',
            'mission.subtitle': 'Over 60,000+ people sacrifice in Baku every year',
            'mission.description': 'Qurban Kəsdir digitizes the traditional sacrificial process for over 60,000 participants in Baku annually. Our mission is to serve every Muslim with complete transparency, Sharia compliance, veterinary oversight, and unwavering respect for their faith.',
            'purpose.title': 'Our Purpose',
            'purpose.list.item1': '✓ Sharia Compliance',
            'purpose.list.item2': '✓ Veterinary Oversight',
            'purpose.list.item3': '✓ Complete Transparency',
            'purpose.list.item4': '✓ Reliable Butchers',
            'purpose.list.item5': '✓ Fixed Prices',
            'purpose.list.item6': '✓ Video Proof',
            'howitworks.title': 'How It Works',
            'howitworks.step1.title': 'Step 1: Select Your Animal',
            'howitworks.step1.description': 'Choose an animal by breed, weight, and specifications in the Qurban Kəsdir app.',
            'howitworks.step2.title': 'Step 2: Choose Delivery',
            'howitworks.step2.description': 'Where should the meat and hide be delivered? To you, family, or as charity?',
            'howitworks.step3.title': 'Step 3: Pay',
            'howitworks.step3.description': 'Pay securely and your sacrifice process begins with your name.',
            'charity.title': 'The Charity Option',
            'charity.subtitle': 'One animal, two videos, one life-changing decision',
            'charity.description': 'Choose "Charity" in the Qurban Kəsdir app and your animal is sacrificed on your behalf to the most needy in Baku (orphanages, nursing homes). You receive two videos: the slaughter and the delivery moment.',
            'charity.list.item1': '✓ Support orphans',
            'charity.list.item2': '✓ Care for the elderly',
            'charity.list.item3': '✓ Full Sharia compliance',
            'charity.list.item4': '✓ Receive video proof',
            'cta.primary': 'Download the App',
            'cta.appstore': 'Download on App Store',
            'cta.playstore': 'Get it on Google Play',
            'cta.whatsapp': 'Contact via WhatsApp',
            'nav.home': 'Home',
            'nav.mission': 'Mission',
            'nav.how': 'How It Works',
            'nav.charity': 'Charity',
            'footer.about': 'About Qurban Kəsdir',
            'footer.company': '© 2024 Qurban Kəsdir. All rights reserved.',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',
            'footer.contact': 'Contact Us'
        },
        az: {
            'hero.title': 'Qurban Kəsdir: Sadə. Şəffaf. Güvənli.',
            'hero.subtitle': 'Rəqəm dövründə Qurban təqdimi',
            'hero.description': 'Qurban Kəsdir tətbiqində həyvan seçin, çatdırılma üsulunu seçin və ödəyin. Heyvan sabahkı gün Sizin adınızla kəsilir!',
            'problems.title': 'Bakıda Qurban Kəsmənin Üç Böyük Problemi',
            'problems.problem1.title': 'Problem 1: Etibarlı Qasapları Tapmaq Çətin',
            'problems.problem1.description': 'Kimindir xidmətinə güvənmək çətin. Qasap kimdir? Onun keyfiyyəti nədir? Neticə ilə razısınız?',
            'problems.problem2.title': 'Problem 2: Qiymət Müəyyənliyi Yoxdur',
            'problems.problem2.description': 'Əvvəl qiymət söyləyirlər, sonra dəyişir. Əlavə xərclər gəlir. Səmərəsiz xərclər...',
            'problems.problem3.title': 'Problem 3: Şəffaflıq və Sübut Yoxdur',
            'problems.problem3.description': 'Həyvan necə kəsildi? Ət haradır? Zəka kəsilmədi? Bilesiniz? Videonuz yoxdur. Sübut yoxdur.',
            'mission.title': 'Missiyon',
            'mission.subtitle': 'Bakıda 60,000+ insan hər il Qurban kəsir',
            'mission.description': 'Qurban Kəsdir Bakıdakı ənənəvi Qurban prosesini rəqəmsallaşdırır. Bizim məqsəd hər Müsəlmanın inanclarına və etibarına hörmət edərək, Şəriət əstili ilə, veterinar nəzarəti altında, tamamilə şəffaf bir xidmət verməkdir.',
            'purpose.title': 'Məqsəd',
            'purpose.list.item1': '✓ Şəriət uyğunluğu',
            'purpose.list.item2': '✓ Veterinar Nəzarəti',
            'purpose.list.item3': '✓ Tam Şəffaflıq',
            'purpose.list.item4': '✓ Etibarlı Qasaplar',
            'purpose.list.item5': '✓ Sabit Qiymətlər',
            'purpose.list.item6': '✓ Video Sübut',
            'howitworks.title': 'Necə İşləyir?',
            'howitworks.step1.title': 'Addım 1: Heyvanı Seçin',
            'howitworks.step1.description': 'Qurban Kəsdir tətbiqində cins, ağırlıq və xüsusiyyətlər əsasında heyvan seçin.',
            'howitworks.step2.title': 'Addım 2: Çatdırılma Seçin',
            'howitworks.step2.description': 'Ət və dərini nəyə çatdırmalı? Siz, eytib, yoxsa həmdə bağış?',
            'howitworks.step3.title': 'Addım 3: Ödəyin',
            'howitworks.step3.description': 'Güvenli ödəniş sistemində Sizin adınızla prosesi başlayın.',
            'charity.title': 'Sosial Təsir: Bağış Seçəni',
            'charity.subtitle': 'Bir heyvan, iki video, bir həyat dəyişən qərar',
            'charity.description': 'Qurban Kəsdir tətbiqində "Bağış" seçəndə, Bakının ən ehtiyaclı yerlərində (uşaq evləri, qocaman evləri) sizin adınızda heyvan kəsilir. Siz iki video alırsınız: Kəsmə anı və ət/dərin çatdırılma anı.',
            'charity.list.item1': '✓ Yetim uşaqları dəstəkləyin',
            'charity.list.item2': '✓ Qocamanları qoruyin',
            'charity.list.item3': '✓ Tam Şəriət uyğunluğu',
            'charity.list.item4': '✓ Video sübut alın',
            'cta.primary': 'Tətbiqi Yükləyin',
            'cta.appstore': 'App Store-dan Yükləyin',
            'cta.playstore': 'Google Play-dən Yükləyin',
            'cta.whatsapp': 'WhatsApp ilə Əlaqə',
            'nav.home': 'Əsas',
            'nav.mission': 'Missiyon',
            'nav.how': 'Necə İşləyir',
            'nav.charity': 'Bağış',
            'footer.about': 'Qurban Kəsdir haqqında',
            'footer.company': '© 2024 Qurban Kəsdir. Bütün hüquqlar qorunur.',
            'footer.privacy': 'Məxfilik Siyasəti',
            'footer.terms': 'Şərtlər',
            'footer.contact': 'Bizimlə Əlaqə'
        }
    };
    return fallback[lang] || fallback['en'];
}

/**
 * Update all page content with fetched data
 */
function updatePageContent() {
    // Find all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        if (contentData[key]) {
            // Update text content
            if (element.tagName === 'INPUT' && element.type === 'button') {
                element.value = contentData[key];
            } else {
                element.textContent = contentData[key];
            }
        }
    });
}

/**
 * Update page direction (RTL for Azerbaijani, LTR for English)
 */
function updatePageDirection(lang) {
    const htmlElement = document.documentElement;
    
    if (lang === 'az') {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'az');
    } else {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'en');
    }
}

/**
 * Smooth scroll for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for download buttons or external links
        if (!href.includes('http') && href !== '#download') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Log for debugging
console.log('Qurban Kəsdir Language Switcher Loaded');
console.log('Current Language:', currentLanguage);
