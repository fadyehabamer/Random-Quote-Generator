const text = document.querySelector('.quote')
const author = document.querySelector('.author')
const nextBtn =  document.querySelector('.next')
const tweetbtn = document.querySelector('.twitter-share-button')

// type.fit no longer sends CORS headers (and only serves 5 quotes),
// so browsers block the request. DummyJSON is CORS-enabled.
const QUOTE_API = 'https://dummyjson.com/quotes/random'

const getQuote = async () => {
    nextBtn.disabled = true
    try {
        const res = await fetch(QUOTE_API)
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        const item = await res.json()

        const quote = item.quote
        const authorName = item.author || 'Unknown'

        text.innerText = quote
        author.innerText = authorName

        tweetbtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${authorName}`)}`
    } catch (err) {
        console.error(err)
        text.innerText = "Couldn't load a quote. Please check your connection and try again."
        author.innerText = ''
    } finally {
        nextBtn.disabled = false
    }
}

nextBtn.addEventListener("click" , getQuote)
getQuote()
