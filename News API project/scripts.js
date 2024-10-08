const apiKey = 'dc9774ace1e242b58854f08ab646ba35'
const blogContainer = document.querySelector('.articles')
const searchField = document.querySelector('#searchInput')

const searchButton = document.querySelector('#searchButton')

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles
    }
    catch (error){
        console.log('Error fetching random news', error)
        return {}
    }
}

searchButton.addEventListener('click',async ()=>{
    const query = searchField.value.trim()
    if(query != ''){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlocks(articles)
        }
        catch(error){
            console.log('Error searching for articles by query', error)
        }
    }
})


async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&from=2024-08-05&sortBy=publishedAt&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles
    }
    catch (error){
        console.log('Error fetching query news', error)
        return {}
    }
}



function displayBlocks(articles){
    blogContainer.innerHTML = ''
    articles.forEach(article => {
        const articleBlock = document.createElement('div')
        articleBlock.classList.add('blogCard')

        const img = document.createElement('img')
        img.src = article.urlToImage
        img.alt = article.title

        const title = document.createElement('h2')
        const truncatedTitle = 
            article.title.length > 30 ? 
            article.title.slice(0, 30) + '...'
            : article.title
            
        title.textContent = truncatedTitle

        const description = document.createElement('p')
        
        const truncatedDes = 
            article.description.length > 120
            ? article.description.slice(0, 120) + '...'
            : article.description;
            
        description.textContent = truncatedDes

        articleBlock.appendChild(img)
        articleBlock.appendChild(title)
        
        articleBlock.appendChild(description)
        articleBlock.addEventListener('click',()=>{
            window.open(article.url, '_blank')
        })
        blogContainer.appendChild(articleBlock)
})
}



(async ()=>{
    try{
        const articles = await fetchRandomNews()
        displayBlocks(articles)
    }
    catch(error){
        console.log('Error getting news from API', error)
    }
})();









