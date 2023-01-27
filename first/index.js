const switchx = document.querySelector('.switch')

switchx.onclick = () => {
    const body = document.querySelector('body')
    const container = document.querySelector('.container')
    if (container.classList.length == 1) {
        body.style.backgroundColor = "#000"
        container.className = 'container dark'
        switchx.style.backgroundColor = "#fff"
    }
    else {
        body.style.backgroundColor = "#fff"
        container.className = 'container'
        switchx.style.backgroundColor = "#000"
    }
}