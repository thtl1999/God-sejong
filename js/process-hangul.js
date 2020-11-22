chosung = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ]
jungsung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ]
jongsung = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ]

function is_hangul(hangul){
    var c = hangul.charCodeAt();
    if( 0x1100<=c && c<=0x11FF ) return true;
    if( 0x3130<=c && c<=0x318F ) return true;
    if( 0xAC00<=c && c<=0xD7A3 ) return true;
    return false;
}

function is_word_hangul(word){
    if (word === undefined){
        console.log('This word is undefined')
        return false
    }
    for(var i=0;i<word.length;i++){
        if (is_hangul(word[i]) == false)
            return false
    }

    return true
}

function disassemble_hangul(hangul){
    if (chosung.includes(hangul))
        return [hangul, -1, 0]
    if (jungsung.includes(hangul))
        return [-1, hangul, 0]

    var charcode = hangul.charCodeAt() - 44032
    var cho = chosung[Math.floor(charcode / 28 / 21)]
    var jung = jungsung[Math.floor(charcode / 28 % 21)]
    var jong = jongsung[Math.floor(charcode % 28)]

    return [cho, jung, jong]
}

function assemble_hangul(arr){
    if (arr[0] === -1)  //only jungsung
        return arr[1]
    if (arr[1] === -1)  //only chosung
        return arr[0]

    return String.fromCharCode(0xAC00 + 21*28*chosung.indexOf(arr[0]) + 28*jungsung.indexOf(arr[1]) + jongsung.indexOf(arr[2]))
}




function hangul_test(str){
    var arr = str.split('')
    var txt = ''
    for(var i=0;i<arr.length;i++){
        if (is_hangul(arr[i])){
            var dis = disassemble_hangul(arr[i])
            txt += assemble_hangul(dis)
        }
        else
            txt += arr[i]
    }
}