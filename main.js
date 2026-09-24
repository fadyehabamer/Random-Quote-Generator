const text = document.querySelector('.quote')
const author = document.querySelector('.author')
const nextBtn =  document.querySelector('.next')
const tweetbtn = document.querySelector('.twitter-share-button')
const loader = document.querySelector('.loader')
const copyBtn = document.querySelector('.copy')
const copyLabel = document.querySelector('.copy-label')
const copyStatus = document.querySelector('.copy-status')

let currentQuoteText = ''
let copyResetTimer

// type.fit no longer sends CORS headers (and only serves 5 quotes),
// so browsers block the request. DummyJSON is CORS-enabled.
const QUOTE_API = 'https://dummyjson.com/quotes/random'

const getQuote = async () => {
    nextBtn.disabled = true
    if (!text.innerText) loader.classList.remove('hide')
    try {
        const res = await fetch(QUOTE_API)
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
        const item = await res.json()

        const quote = item.quote
        const authorName = item.author || 'Unknown'

        text.innerText = quote
        author.innerText = authorName

        currentQuoteText = `"${quote}" - ${authorName}`
        copyBtn.disabled = false

        tweetbtn.href = `https://x.com/intent/post?text=${encodeURIComponent(`"${quote}" - ${authorName}`)}`
    } catch (err) {
        console.error(err)
        text.innerText = "Couldn't load a quote. Please check your connection and try again."
        author.innerText = ''
        currentQuoteText = ''
        copyBtn.disabled = true
    } finally {
        nextBtn.disabled = false
        loader.classList.add('hide')
    }
}

const copyWithFallback = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value)
        return
    }
    const area = document.createElement('textarea')
    area.value = value
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    if (!ok) throw new Error('Copy command was rejected')
}

const copyQuote = async () => {
    if (!currentQuoteText) return
    let message
    try {
        await copyWithFallback(currentQuoteText)
        message = 'Copied!'
    } catch (err) {
        console.error(err)
        message = 'Copy failed'
    }
    copyLabel.innerText = message
    copyStatus.innerText = message === 'Copied!' ? 'Quote copied to clipboard' : 'Could not copy the quote'
    clearTimeout(copyResetTimer)
    copyResetTimer = setTimeout(() => {
        copyLabel.innerText = 'Copy'
        copyStatus.innerText = ''
    }, 2000)
}

copyBtn.addEventListener("click", copyQuote)
nextBtn.addEventListener("click" , getQuote)
getQuote()
