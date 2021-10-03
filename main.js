const text = document.querySelector('.quote')
const author = document.querySelector('.author')
const nextBtn =  document.querySelector('.next')
const tweetbtn = document.querySelector('.twitter-share-button')

const getQuote = async () => {
    const res = await fetch('https://type.fit/api/quotes');
    const quotes = await res.json()
    //   console.log(quotes)
    const num = Math.floor(Math.random() * quotes.length)
    // console.log(num)

    const item = quotes[num];
    // console.log(item , num)
    
    const quote = item.text
    const authorName = item.author

    text.innerText = quote
    author.innerText = authorName

    tweetbtn.href = `https://twitter.com/intent/tweet?text=${quote} - ${authorName}`

}

nextBtn.addEventListener("click" , getQuote)
getQuote()