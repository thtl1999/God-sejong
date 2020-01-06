function convert_text(){
    console.log('convert')
    var input = document.getElementById('input-area').value
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