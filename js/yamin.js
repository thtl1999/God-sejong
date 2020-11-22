yamin_dic_cho_jung = {
    '대':'머',
    '머':'대',
    '귀':'커',
    '커':'귀',
    '파':'과',
    '과':'파',
    '피':'끠',
    '끠':'피',
    '비':'네',
    '네':'비',
    '며':'댸',
    '댸':'며',
    '거':'지',
    '지':'거',
    '겨':'저',
    '저':'겨',
    '교':'꼬',
    '꼬':'교'
    
}

yamin_dic_chosungless = {
    '유':'윾',
    '우':'윽',
    '웃':'읏',
    '을':'울',
    '왕':'앟',
    '왱':'앻',
    '욍':'잏',
    '왓':'앛',
    '왯':'앷',
    '욋':'잋',

}

yamin_dic_match = {
    'ㅇ':'O',
    'ㄱ':'7',
    'ㄹ':'2',
    '디':'ㅁ',
    '구':'ㅋ',
    '너':'ㅂ',
    '빅':'븨',
    '근':'ㄹ',
    '긘':'리'
}

function yamin(word){
    var new_word = ''

    for(var i=0;i<word.length;i++){
        var cjj = disassemble_hangul(word[i])

        cjj = cj_yamin(cjj)
        cjj = jj_yamin(cjj)
        cjj = match_yamin(cjj)

        new_word += assemble_hangul(cjj)
    }

    return new_word
}

function cj_yamin(hangul){
    var cvt_hangul = assemble_hangul([hangul[0], hangul[1], ''])
    if (cvt_hangul in yamin_dic_cho_jung){
        var yamin_hangul = disassemble_hangul(yamin_dic_cho_jung[cvt_hangul])
        return [yamin_hangul[0], yamin_hangul[1], hangul[2]]
    }
    else
        return hangul
}

function jj_yamin(hangul){
    var cvt_hangul = assemble_hangul(['ㅇ', hangul[1], hangul[2]])
    if (cvt_hangul in yamin_dic_chosungless){
        var yamin_hangul = disassemble_hangul(yamin_dic_chosungless[cvt_hangul])
        return [hangul[0], yamin_hangul[1], yamin_hangul[2]]
    }
    else
        return hangul
}

function match_yamin(hangul){
    if (assemble_hangul(hangul) in yamin_dic_match){
        return disassemble_hangul(yamin_dic_match[assemble_hangul(hangul)])
    }
    else
        return hangul
}