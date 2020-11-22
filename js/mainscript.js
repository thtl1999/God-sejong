punctuations = ['.', ',', '!', '?', ';','\n']
global_seed = 0.5

document.getElementById('input-area').value = '요번에 오랜만에 외국여행을 친구들이랑 왔는데 여기 집주인이 아주 아니에요. 가격도 그렇게 싼 편이 아닌데 서비스가 엉망이고요, 화장실도 더럽고 우리가 뭐라 하니 화만 내네요 ㅠ.ㅠ 여기 주변 음식점도 다 맛 없고 분위기도 별로에요.\n\n여기 리뷰 잘 써주면 할인해준다고는 해서 쓰고있는데 이 리뷰 보시고 다들 잘 거르시길 바랍니다...'

function convert_text(){
    global_seed = Math.random()
    var input = document.getElementById('input-area').value
    var sentence_pos = [0]

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
    // console.log('sentence slice position')
    // console.log(sentence_pos)

    //slice string
    var sentences = []
    for (var i=0;i<sentence_pos.length - 1;i++){
        sentences.push(input.slice(sentence_pos[i],sentence_pos[i+1]))
    }
    // console.log('sentences sliced')
    // console.log(sentences)

    //import engines
    var engines = []
    var engine_list = document.getElementsByClassName('engines')
    for (var engine of engine_list){
        if (engine.checked)
            engines.push(window[engine.id])
    }
    // console.log('main process engines checked list')
    // console.log(engines)
    if (engines.length === 0){
        alert('Please check engines')
        return
    }

    //main processing
    var sequence = randomize(sentences.length, engines)
    // console.log('list of engines to be applied')
    // console.log(sequence)
    var new_sentence = ''
    for(var i=0;i<sentences.length;i++){
        new_sentence += convert_sentence(sentences[i], sequence[i])
    }
    // console.log('finished main processing')
    // console.log(new_sentence)

    //post processing
    var p_engines = []
    var p_engine_list = document.getElementsByClassName('post-engines')
    for (var engine of p_engine_list){
        if (engine.checked)
            p_engines.push(window[engine.id])
    }

    for (var i=0;i<p_engines.length;i++){
        new_sentence = p_engines[i](new_sentence)
    }
    
    //display to html
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
    var new_word = []
    var index = 0

    for(var i=0;i<word.length;i++){
        if (is_hangul(word[i])){
            if (!new_word[index])
                new_word.push(word[i])
            else
                new_word[index] += word[i]
        }
        else{
            index++
            new_word.push(word[i])
            index++
        }
    }
    
    for(var i=0;i<new_word.length;i++){
        if (is_word_hangul(new_word[i])){
            new_word[i] = engine(new_word[i])
        }
    }

    return new_word.join('')
}


/* note */
/*
숫자를 한글로 바꾸기?

*/