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

module.exports = generateCode
