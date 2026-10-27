function pausePlayer(iframe) {
    iframe?.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
        'https://www.youtube.com'
    );
}

function pausePageMedia(section) {
    section.querySelectorAll('video').forEach(video => video.pause());
    section.querySelectorAll('iframe[src*="youtube.com/embed"]').forEach(pausePlayer);
}

function goTo(pageId) {
    const target = document.getElementById(pageId);
    if (!target || !target.classList.contains('page')) return;
    if (pageId !== 'workbox') pausePageMedia(document.getElementById('workbox'));
    document.querySelectorAll('.page').forEach(page => page.classList.toggle('active', page === target));
    document.querySelectorAll('[data-nav-page]').forEach(button => {
        const current = button.dataset.navPage === pageId;
        if (current) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
    });
}

document.querySelectorAll('[data-nav-page]').forEach(button => {
    button.addEventListener('click', () => goTo(button.dataset.navPage));
});

const translations = {
    pt: {
        pageTitle: 'Portfólio de Robert', home: 'INÍCIO', about: 'SOBRE', works: 'TRABALHOS',
        greeting: 'Olá, eu sou Robert', profession: 'Editor de Vídeos', contactMe: 'Entre em contato',
        videoTitle: 'Meus vídeos', carouselControls: 'Controles do carrossel', previousVideo: 'Vídeo anterior',
        nextVideo: 'Próximo vídeo', videoCarousel: 'Carrossel de vídeos', videoUnsupported: 'Seu navegador não suporta vídeo.',
        project1: 'Projeto 01', project2: 'Projeto 02', project3: 'Projeto 03',
        projectDescription: 'Adicione um título e uma descrição para este trabalho.',
        aboutText: 'Sou Robert, editor de vídeos. Este espaço apresenta meus trabalhos e meu estilo de edição.',
        socialTitle: 'Minhas redes sociais', contactPageTitle: 'Portfólio: Contato', contactHeading: 'Contato',
        languagePicker: 'Idioma', githubAlt: 'Acessar GitHub', lightMode: 'Ativar modo claro', darkMode: 'Ativar modo escuro',
        contactIntro: 'Fale comigo por um destes canais:', emailLabel: 'E-mail',
        backHome: '← Início', contactEyebrow: 'VAMOS TIRAR SUA IDEIA DO PAPEL', contactHeadline: 'Vamos conversar',
        contactDescription: 'Tem um projeto em mente ou quer saber mais sobre meu trabalho? Escolha um canal e fale comigo.',
        contactOptionsLabel: 'Canais de contato', sendEmail: 'Enviar mensagem',
        viewProfile: 'Ver perfil', contactFooter: 'Obrigado por visitar meu portfólio.',
        discordLabel: 'Discord', discordSearchTip: 'Procure por este usuário no Discord', discordCopy: 'Copiar usuário',
        discordCopied: 'Usuário copiado', discordCopyFailed: 'Não foi possível copiar', openDiscord: 'Abrir Discord ↗',
        aboutKicker: 'SOBRE MIM', aboutTitle: 'Conheça meu trabalho', aboutContact: 'Vamos conversar',
        editingTimelineLabel: 'Ilustração de uma linha do tempo de edição', timelineCaption: 'Imagem · áudio · montagem',
        nichesTitle: 'Filtrar por nicho', allNiches: 'Todos', nicheGames: 'Jogos', nicheOther: 'Outros',
        nicheFiltersLabel: 'Filtrar vídeos por nicho', gameVideo1: 'Jogo 01', gameVideo2: 'Jogo 02',
        otherVideo1: 'Outro vídeo 01', otherVideo2: 'Outro vídeo 02', otherVideo3: 'Outro vídeo 03',
        youtubeShortDescription: 'Edição para YouTube Shorts.'
    },
    en: {
        pageTitle: "Robert's Portfolio", home: 'HOME', about: 'ABOUT', works: 'WORK',
        greeting: "Hi, I'm Robert", profession: 'Video Editor', contactMe: 'Get in touch',
        videoTitle: 'My videos', carouselControls: 'Carousel controls', previousVideo: 'Previous video',
        nextVideo: 'Next video', videoCarousel: 'Video carousel', videoUnsupported: 'Your browser does not support video.',
        project1: 'Project 01', project2: 'Project 02', project3: 'Project 03',
        projectDescription: 'Add a title and description for this project.',
        aboutText: "I'm Robert, a video editor. This space showcases my work and editing style.",
        socialTitle: 'My social media', contactPageTitle: 'Portfolio: Contact', contactHeading: 'Contact',
        languagePicker: 'Language', githubAlt: 'Visit GitHub', lightMode: 'Enable light mode', darkMode: 'Enable dark mode',
        contactIntro: 'Get in touch through one of these channels:', emailLabel: 'Email',
        backHome: '← Home', contactEyebrow: "LET'S GET YOUR IDEA MOVING", contactHeadline: "Let's talk",
        contactDescription: 'Have a project in mind or want to learn more about my work? Choose a channel and get in touch.',
        contactOptionsLabel: 'Contact channels', sendEmail: 'Send a message',
        viewProfile: 'View profile', contactFooter: 'Thanks for visiting my portfolio.',
        discordLabel: 'Discord', discordSearchTip: 'Search for this user on Discord', discordCopy: 'Copy username',
        discordCopied: 'Username copied', discordCopyFailed: 'Could not copy username', openDiscord: 'Open Discord ↗',
        aboutKicker: 'ABOUT ME', aboutTitle: 'Get to know my work', aboutContact: 'Let’s talk',
        editingTimelineLabel: 'Illustration of a video editing timeline', timelineCaption: 'Picture · audio · edit',
        nichesTitle: 'Filter by niche', allNiches: 'All', nicheGames: 'Gaming', nicheOther: 'Other',
        nicheFiltersLabel: 'Filter videos by niche', gameVideo1: 'Gaming edit 01', gameVideo2: 'Gaming edit 02',
        otherVideo1: 'Other edit 01', otherVideo2: 'Other edit 02', otherVideo3: 'Other edit 03',
        youtubeShortDescription: 'Edited for YouTube Shorts.'
    }
};

let activeLanguage = 'pt';
function updatePageLinks() {
    document.querySelectorAll('[data-contact-link]').forEach(link => {
        link.href = `contact.html?lang=${activeLanguage}&theme=${document.body.dataset.theme || 'dark'}`;
    });
    const homeLink = document.getElementById('home-link');
    if (homeLink) homeLink.href = `index.html?lang=${activeLanguage}&theme=${document.body.dataset.theme || 'dark'}`;
}

function setLanguage(language) {
    activeLanguage = translations[language] ? language : 'pt';
    const dictionary = translations[activeLanguage];
    document.documentElement.lang = activeLanguage === 'en' ? 'en' : 'pt-BR';
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const translated = dictionary[element.dataset.i18n];
        if (translated) element.textContent = translated;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const translated = dictionary[element.dataset.i18nAria];
        if (translated) element.setAttribute('aria-label', translated);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const translated = dictionary[element.dataset.i18nAlt];
        if (translated) element.setAttribute('alt', translated);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const translated = dictionary[element.dataset.i18nTitle];
        if (translated) element.setAttribute('title', translated);
    });
    document.querySelectorAll('[data-discord-status]').forEach(status => { status.textContent = ''; });
    document.querySelectorAll('[data-lang-choice]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.langChoice === activeLanguage));
    });
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
        const label = document.body.dataset.theme === 'light' ? dictionary.darkMode : dictionary.lightMode;
        button.setAttribute('aria-label', label);
        button.title = label;
    });
    try { localStorage.setItem('portfolio-language', activeLanguage); } catch (error) {}
    updatePageLinks();
}

document.querySelectorAll('[data-lang-choice]').forEach(button => {
    button.addEventListener('click', () => setLanguage(button.dataset.langChoice));
});
let savedLanguage = new URLSearchParams(window.location.search).get('lang') || 'pt';
try { savedLanguage = new URLSearchParams(window.location.search).get('lang') || localStorage.getItem('portfolio-language') || 'pt'; } catch (error) {}
setLanguage(savedLanguage);

function setTheme(theme) {
    const activeTheme = theme === 'light' ? 'light' : 'dark';
    document.body.dataset.theme = activeTheme;
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
        button.textContent = activeTheme === 'light' ? '☾' : '☼';
        button.setAttribute('aria-pressed', String(activeTheme === 'light'));
        const label = activeTheme === 'light' ? translations[activeLanguage].darkMode : translations[activeLanguage].lightMode;
        button.setAttribute('aria-label', label);
        button.title = label;
    });
    try { localStorage.setItem('portfolio-theme', activeTheme); } catch (error) {}
    updatePageLinks();
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.content = activeTheme === 'light' ? '#F4F4F0' : '#1C1C1C';
}

document.querySelectorAll('[data-theme-toggle]').forEach(button => {
    button.addEventListener('click', () => setTheme(document.body.dataset.theme === 'light' ? 'dark' : 'light'));
});
let savedTheme = new URLSearchParams(window.location.search).get('theme') || 'dark';
try { savedTheme = new URLSearchParams(window.location.search).get('theme') || localStorage.getItem('portfolio-theme') || 'dark'; } catch (error) {}
setTheme(savedTheme);

document.querySelectorAll('[data-discord-copy]').forEach(button => {
    button.addEventListener('click', async () => {
        let copied = false;
        try {
            await navigator.clipboard.writeText('robinss22');
            copied = true;
        } catch (error) {
            const field = document.createElement('textarea');
            field.value = 'robinss22';
            field.setAttribute('readonly', '');
            field.style.position = 'fixed';
            field.style.opacity = '0';
            document.body.appendChild(field);
            field.select();
            try { copied = document.execCommand('copy'); } catch (copyError) {}
            field.remove();
        }
        const status = button.closest('.contact-card')?.querySelector('[data-discord-status]');
        if (status) status.textContent = copied ? translations[activeLanguage].discordCopied : translations[activeLanguage].discordCopyFailed;
    });
});

document.querySelectorAll('.niche-filter').forEach(button => {
    button.addEventListener('click', () => {
        const selectedNiche = button.dataset.nicheFilter;
        document.querySelectorAll('.niche-filter').forEach(filter => {
            const active = filter === button;
            filter.classList.toggle('active', active);
            filter.setAttribute('aria-pressed', String(active));
        });
        document.querySelectorAll('.workbox2 .Works').forEach(card => {
            const visible = selectedNiche === 'all' || card.dataset.niche === selectedNiche;
            if (!visible) {
                card.querySelector('video')?.pause();
                pausePlayer(card.querySelector('iframe'));
            }
            card.hidden = !visible;
        });
        document.querySelector('.workbox2')?.scrollTo({ left: 0, behavior: 'smooth' });
    });
});

document.querySelectorAll('.carousel-button').forEach(button => {
    button.addEventListener('click', () => {
        const carousel = document.querySelector('.workbox2');
        const card = carousel.querySelector('.Works:not([hidden])');
        if (!card) return;
        const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
        carousel.scrollBy({ left: (card.getBoundingClientRect().width + gap) * Number(button.dataset.direction), behavior: 'smooth' });
    });
});
