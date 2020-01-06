function cambridge(str){
    if (str.length < 4)
        return str

    var first = str[0]
    var last = str.slice(-1)
    var middles = str.slice(1, -1)

    return first + shuffle_string(middles) + last
}

function shuffle_string(str){
    var new_str = str.split('').sort(function(){return 0.5-Math.random()}).join('')
    if (new_str === str)
        return shuffle_string(str)
    else
        return new_str
}