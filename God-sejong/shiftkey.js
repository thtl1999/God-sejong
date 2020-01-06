shiftkey_dic = [
    {
        'ㄱ':'ㄲ',
        'ㄷ':'ㄸ',
        'ㅈ':'ㅉ',
        'ㅂ':'ㅃ',
        'ㅅ':'ㅆ',
    },

    {
        'ㅗ':'ㅛ',
        'ㅓ':'ㅕ',
        'ㅏ':'ㅑ',
        'ㅜ':'ㅠ',
        'ㅐ':'ㅒ',
        'ㅔ':'ㅖ'
    },

    {
        'ㄱ':'ㄲ',
        'ㅂ':'ㅄ',
        'ㅅ':'ㅆ',
    }
]

function shiftkey(hangul){
    var cjj = disassemble_hangul(hangul)
    for(var i=0;i<3;i++){
        if (cjj[i] in shiftkey_dic[i])
            cjj[i] = shiftkey_dic[i][cjj[i]]
    }

    return cjj
}

function shift_test(str){
    var arr = str.split('')
    var txt = ''
    for(var i=0;i<arr.length;i++){
        if (is_hangul(arr[i])){
            var cjj = shiftkey(arr[i])
            txt += assemble_hangul(cjj)
        }
        else
            txt += arr[i]
    }

    console.log(txt)
}