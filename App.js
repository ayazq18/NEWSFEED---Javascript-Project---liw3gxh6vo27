
const fetchData = async ()=>{
    const result = await fetch("https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews")
    const data = await result.json()
    return data
}

const newData = document.getElementById('newNews')
newData.innerHTML = ''

const loadBtn = document.getElementById('loadNewBtn')
loadBtn.addEventListener('click', async ()=>{
    const data = await fetchData()
    
    const randomIndex = Math.floor(Math.random() * data.length)
    const randomNews = data[randomIndex]
    
        const newDiv =  document.createElement('div')
        newDiv.innerHTML = `
        <h1 id="new-author">By ${randomNews.author}</h1>
        <p id="new-content">${randomNews.content}</p>
        <a id="new-url" href="${randomNews.url}">Read More.</a>
        `
        newData.appendChild(newDiv)
});