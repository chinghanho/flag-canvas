const fs = require('fs')
const request = require('request')

const LENGTH = 25
const BASE_URL = 'http://samesex.blockstudio.tw/flag/'

function times(x) {
  return function (callback) {
    let iterator = function (index) {
      if (index === x) {
        return
      }
      callback(index)
      iterator(index + 1)
    }
    return iterator(0)
  }
}

function download(uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(`./images/${filename}`)).on('close', callback)
  })
}

function getFileName(index) {
  return `FLAG${index}.png`
}

// Let's go!
times(LENGTH)(function (index) {
  let fileName = getFileName(index + 1)
  let uri = `${BASE_URL}${fileName}`
  download(uri, fileName, () => console.log('done'))
})
