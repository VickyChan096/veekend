export const _blackIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function errAlert(str, end) {
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
