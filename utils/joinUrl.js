function joinUrl (url, option) {
  if (option) {
    url = url + '?' + (function (opt) {
      let str = '';
      for (var key in opt) {
        str += key + '=' + opt[key] + '&';
      }
      return str.slice(0, str.length-1);
    })(option)
  }
  return url;
}
module.exports = joinUrl;