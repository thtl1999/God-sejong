function addJunk(word){
    if (word.length < 2)
        return word
    
    var junk_list = [
        '여행', '체험', '뚜껑'
    ]


    var junk = junk_list[Math.floor(global_seed*junk_list.length)]
    var index = Math.floor(Math.random()*(word.length - 2)) + 1
    var new_word = word.slice(0,index) + junk + word.slice(index,word.length)
    return new_word
}