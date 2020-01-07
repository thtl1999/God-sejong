function convert_text(){
    console.log('convert')
    var input = document.getElementById('input-area').value
    var punctuation = ['.', ',', '!', '?', ';']
    var strings = input.split(' ')
    var new_strings = []
    for (var i=0;i<strings.length;i++){
        new_strings.push(cambridge(strings[i]));
    }

    document.getElementById('output-area').value = new_strings.join(' ')
}

function copy_to_clipboard(){
    console.log('copy')
}

function convert_sentence(){

}

function convert_word(){    //save punctuations and only call hangul

}

function translate(){
    var text = document.getElementById('output-area').value
    var encoded = encodeURI(text)
    window.open('https://translate.google.com/?sl=ko&tl=en&text=' + text)
}