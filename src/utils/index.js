export function formatPrice(
  num,
  decPlaces = 0,
  decSep = '.',
  thouSep = ',',
  addMoneySymbol = true,
) {
  decPlaces = isNaN(decPlaces) ? 0 : Math.abs(decPlaces);
  const sign = num < 0 ? '-' : '';
  const i = String(
    parseInt((num = Math.abs(Number(num) || 0).toFixed(decPlaces))),
  );
  const j = i.length > 3 ? i.length % 3 : 0;

  const ret =
    sign +
    (j ? i.substr(0, j) + thouSep : '') +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, '$1' + thouSep) +
    (decPlaces
      ? decSep +
        Math.abs(num - i)
          .toFixed(decPlaces)
          .slice(2)
      : '');

  return addMoneySymbol ? '$' + ret : ret;
}

export function isLogin() {
  return localStorage.getItem('authToken') ? true : false;
}

export function checkPassword(pwd) {
  // const strongRegex = new RegExp(
  //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$',
  // );
  const mediumRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$');
  return mediumRegex.test(pwd);
}
