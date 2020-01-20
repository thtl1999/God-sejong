punctuations = ['.', ',', '!', '?', ';']

function convert_text(){
    console.log('convert')
    var input = document.getElementById('input-area').value
    var sentence_pos = [0]
    // var strings = input.split(' ')
    // var new_strings = []
    // for (var i=0;i<strings.length;i++){
    //     new_strings.push(cambridge(strings[i]));
    // }
    // document.getElementById('output-area').value = new_strings.join(' ')

    var is_punc = false
    for (var i=0;i<input.length;i++){
        if (i == input.length - 1){
            sentence_pos.push(i+1)
            break
        }

        if (punctuations.includes(input[i])){
            is_punc = true
            continue
        }

        if (is_punc === true && input[i] != ' '){
            sentence_pos.push(i)
            is_punc = false
            continue
        }
            
    }
    console.log(sentence_pos)

    //slice string
    var sentences = []
    for (var i=0;i<sentence_pos.length - 1;i++){
        sentences.push(input.slice(sentence_pos[i],sentence_pos[i+1]))
    }
    console.log(sentences)

    //import engines
    var engines = []
    var engine_list = document.getElementsByClassName('options')
    for (let engine of engine_list){
        var iele = engine.childNodes[0]
        if (iele.checked)
            engines.push(window[iele.id])
    }
    console.log(engines)
    if (engines.length === 0){
        alert('Please check engines')
        return
    }

    var sequence = randomize(sentences.length, engines)
    console.log(sequence)
    var new_sentence = ''
    for(var i=0;i<sentences.length;i++){
        new_sentence += convert_sentence(sentences[i], sequence[i])
    }
    console.log(new_sentence)
    
    document.getElementById('output-area').value = new_sentence
}

function copy_to_clipboard(){
    document.getElementById('output-area').select()
    document.execCommand('copy')
    document.getSelection().removeAllRanges()

}

function translate(){
    var text = document.getElementById('output-area').value
    var encoded = encodeURI(text)
    window.open('https://translate.google.com/?sl=ko&tl=en&text=' + text)
}

//number of sentence
function randomize(nos, engines){
    var sequence = []
    while(nos > 0){
        nos = nos - engines.length
        sequence = sequence.concat(engines.sort(function(){return 0.5-Math.random()}))
    }
    
    return sequence
}

function convert_sentence(sentence, engine){
    var strings = sentence.split(' ')
    var new_strings = []
    for (var i=0;i<strings.length;i++){
        new_strings.push(convert_word(strings[i], engine));
    }
    
    return new_strings.join(' ')
}

function convert_word(word, engine){    //save punctuations and only call hangul
    if (is_word_hangul(word))
        return engine(word)
    else
        return word
}

