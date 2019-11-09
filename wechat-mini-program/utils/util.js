const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// const serverAdress = 'http://localhost:8088/';
// const serverAdress = 'http://bingying.online:8088/sinology/';
const serverAdress = 'https://bingying.online/sinology/';


module.exports = {
  formatTime: formatTime,
  server: serverAdress
}

