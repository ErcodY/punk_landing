document.querySelector('.modal-footer button[type="submit"]').addEventListener('click', async function (event) {
    event.preventDefault();

    const messageBox = document.getElementById('registrationMessage');
    const tokenInput = document.getElementById('regToken');
    const termsCheck = document.getElementById('termsCheck');

    // Очистим предыдущее сообщение
    messageBox.style.display = 'none';
    messageBox.textContent = '';
    messageBox.style.backgroundColor = '';
    messageBox.style.color = '';

    if (!tokenInput.value.trim()) {
        showMessage('Пожалуйста, введите токен.', 'red');
        return;
    }
    if (!termsCheck.checked) {
        showMessage('Необходимо согласиться с условиями использования.', 'red');
        return;
    }

    try {
        const response = await fetch(`https://token-service-dph6fcdwhdepajbe.canadacentral-01.azurewebsites.net/check-token?token=${encodeURIComponent(tokenInput.value.trim())}`);
        const data = await response.json();

        if (data.exists) {
            showMessage('Токен успешно зарегистрирован!', 'green');
        } else {
            showMessage('Токен неверный или не найден.', 'red');
        }
    } catch (error) {
        showMessage('Ошибка сервера. Попробуйте позже.', 'red');
    }

    function showMessage(text, color) {
        messageBox.textContent = text;
        messageBox.style.display = 'block';
        if (color === 'green') {
            messageBox.style.backgroundColor = '#d4edda';
            messageBox.style.color = '#155724';
            messageBox.style.border = '1px solid #c3e6cb';
        } else if (color === 'red') {
            messageBox.style.backgroundColor = '#f8d7da';
            messageBox.style.color = '#721c24';
            messageBox.style.border = '1px solid #f5c6cb';
        }
    }
});
