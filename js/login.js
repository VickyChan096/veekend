const _loginButton = document.getElementById('loginButton');

_loginButton.addEventListener('click', function () {
  const formElement = document.querySelector('.login__content');
  swal({
    title: 'Σ(ﾟдﾟ) 哇糟糕了',
    text: '帳號密碼錯誤',
    icon: 'warning',
    button: '確定',
    className: 'swalBtn',
  });
  formElement.reset();
});
