const crypto = require('crypto')
const connection = require('../connection')

generateToken = (input) => {
    date = new Date()
    input = input + date
    var hash = crypto.createHash('md5').update(input).digest('hex')
    return hash
}

randomString = (len) => {
    charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var randomString = ''
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPoz, randomPoz + 1)
    }
    return randomString
}

const generateCode = () => {
    const chars = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
    ]

    function generateString() {
        let result = ''
        for (let i = 0; i < 5; i++) {
            result += chars[Math.floor(Math.random() * 36)]
        }
        return result
    }

    let string = ''
    for (let i = 0; i < 3; i++) {
        if (string === '') {
            string += generateString()
        } else {
            string += `-${generateString()}`
        }
    }

    return string
}

module.exports = {
    generateToken,
    randomString,
    generateCode
}
