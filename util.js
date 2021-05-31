function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max)) + min;
}

function stopScreen(milSeconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(true)
    }, milSeconds);
  })
}

module.exports = {
  getRandomInt,
  stopScreen
}