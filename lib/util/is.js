var config;

function includes(arr, item) {
  for (var i = 0; i < arr.length; i++)
    if (arr[i] === item) return true;
  return false;
}

exports.master = function (name) {
  return includes(config.masters, name);
};

exports.scum = function (name) {
  return includes(config.scum, name);
};

exports.setUp = function (conf) {
  config = conf;
};
