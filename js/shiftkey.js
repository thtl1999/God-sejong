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

function shiftkey(word){
    var new_word = ''
    for(var i=0;i<word.length;i++){
        var hangul = word[i]
        var cjj = disassemble_hangul(hangul)
        for(var j=0;j<3;j++){
            if (cjj[j] && cjj[j] in shiftkey_dic[j]){
                cjj[j] = shiftkey_dic[j][cjj[j]]
            }
        }

        new_word += assemble_hangul(cjj)
    }

    return new_word
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

}