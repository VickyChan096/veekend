export function errAlert(str) {
  swal({
    title: 'Σ(ﾟдﾟ) 哇糟糕了',
    text: str,
    icon: 'warning',
    button: '確定',
    className: 'swalBtn',
  }).then(function () {
    window.location.href = 'index.html';
  });
}
