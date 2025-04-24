// main/static/main/js/scripts.js

/**
 * Основной модуль для инициализации скриптов.
 */
const App = (() => {
    // Приватные методы и переменные
    const init = () => {
        console.log('Скрипт scripts.js успешно загружен!');
        setupNavLinks();
        setupThemeToggle();
        lazyLoadImages();
        checkIcons(); // Проверка иконок
        // Здесь можно добавлять другие инициализации
    };

    /**
     * Настройка обработчиков событий для ссылок в навигации.
     */
    const setupNavLinks = () => {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });
    };

    /**
     * Обработчик клика по ссылке в навигации.
     * @param {Event} event - Событие клика.
     */
    const handleNavLinkClick = event => {
        const link = event.currentTarget;
        console.log(`Переход на страницу: ${link.href}`);
        event.preventDefault(); // Отключаем стандартное поведение
        // Плавный переход к странице
        document.body.classList.add('fade-out');
        setTimeout(() => {
            window.location.href = link.href;
        }, 500); // Задержка для анимации
    };

    /**
     * Настройка переключателя темы.
     */
    const setupThemeToggle = () => {
        const themeToggle = document.createElement('button');
        themeToggle.textContent = 'Темная тема';
        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDarkTheme = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        });

        // Восстановление темы при загрузке страницы
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    };

    /**
     * Ленивая загрузка изображений.
     */
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => observer.observe(img));
    };

    /**
     * Проверка наличия иконок.
     */
    const checkIcons = () => {
        const icons = document.querySelectorAll('.fab');
        icons.forEach(icon => {
            if (icon.classList.contains('fa-facebook') || icon.classList.contains('fa-whatsapp') || icon.classList.contains('fa-vk')) {
                console.log(`Иконка ${icon.classList} загружена успешно.`);
            }
        });
    };

    // Публичные методы
    return {
        init
    };
})();

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', App.init);
