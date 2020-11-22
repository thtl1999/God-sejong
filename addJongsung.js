function addJongsung(word){
    var picked_js = jongsung[Math.floor(global_seed * jongsung.length - 1) + 1]
    var new_word = ''
    for(var i=0;i<word.length;i++){
        var cjj = disassemble_hangul(word[i])
        if (cjj[2] === '')
            new_word += assemble_hangul([cjj[0], cjj[1], picked_js])
        else
            new_word += word[i]
    }

    return new_word
}