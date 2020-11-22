function addPraise(paragraph){
    var praises = [
        '대단해요',
        '완벽해요',
        '최고에요',
        '대단합니다',
        '완벽합니다',
        '최고입니다',
        '놀랍습니다',
        '비교할 수 없습니다'
    ]

    var pre = praises[Math.floor(Math.random()*praises.length)]
    var post = praises[Math.floor(Math.random()*praises.length)]

    return pre + '. ' + paragraph + ' ' +post + '.'
}