document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const modalContent = document.querySelector('.modal-content');
    const modalInputs = document.querySelectorAll('.modal-body .form-control');
    const currentTheme = localStorage.getItem('theme');

    // Устанавливаем начальную тему при загрузке
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateThemeToggleBtn(currentTheme);
        applyModalTheme(currentTheme); // Применяем тему к модальному окну при загрузке
    } else {
        // По умолчанию ставим темную тему, если ничего не сохранено
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
        updateThemeToggleBtn('dark-theme');
        applyModalTheme('dark-theme');
    }

    // Функция для обновления состояния кнопки
    function updateThemeToggleBtn(theme) {
        if (theme === 'dark-theme') {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i> Светлая тема';
            themeToggleBtn.classList.remove('btn-light-outline-custom');
            themeToggleBtn.classList.add('btn-dark-outline-custom');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i> Темная тема';
            themeToggleBtn.classList.remove('btn-dark-outline-custom');
            themeToggleBtn.classList.add('btn-light-outline-custom');
        }
    }

    // Функция для применения темы к модальному окну и его элементам
    function applyModalTheme(theme) {
        if (modalContent) {
            if (theme === 'dark-theme') {
                modalContent.classList.remove('bg-light', 'text-dark');
                modalContent.classList.add('bg-dark', 'text-white');
                modalContent.querySelector('.modal-header').classList.remove('border-bottom-light');
                modalContent.querySelector('.modal-header').classList.add('border-bottom-secondary');
                modalContent.querySelector('.btn-close').classList.remove('btn-close-dark');
                modalContent.querySelector('.btn-close').classList.add('btn-close-white');
            } else {
                modalContent.classList.remove('bg-dark', 'text-white');
                modalContent.classList.add('bg-light', 'text-dark');
                modalContent.querySelector('.modal-header').classList.remove('border-bottom-secondary');
                modalContent.querySelector('.modal-header').classList.add('border-bottom-light');
                modalContent.querySelector('.btn-close').classList.remove('btn-close-white');
                modalContent.querySelector('.btn-close').classList.add('btn-close-dark');
            }
        }
        modalInputs.forEach(input => {
            if (theme === 'dark-theme') {
                input.classList.remove('bg-light', 'text-dark');
                input.classList.add('bg-secondary', 'text-white');
            } else {
                input.classList.remove('bg-secondary', 'text-white');
                input.classList.add('bg-light', 'text-dark');
            }
        });
    }

    // Обработчик события клика по кнопке
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeToggleBtn('light-theme');
            applyModalTheme('light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeToggleBtn('dark-theme');
            applyModalTheme('dark-theme');
        }
    });
});