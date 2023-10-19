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


const avatar = document.querySelector('.new-post .avatar .avatar-image')
const checkbox = document.querySelector('input#anon')

checkbox.onchange = () => {
    if (checkbox.checked) {
        avatar.className = 'anon-image'
    }
    else {
        avatar.className = 'avatar-image'
    }
}


const textfield = document.querySelector('.text-field')
const textarea = document.querySelector('.text-field textarea')
const counter = document.querySelector('.text-field .count')


setInterval(() => {
    if (textarea.value.length <= 512)
        counter.textContent = `${textarea.value.length}`

    if (textarea.value.length > 0)
        counter.style.opacity = 1
    else
        counter.style.opacity = 0

    if (textarea.value.length >= 512) {
        textarea.value = textarea.value.slice(0, 512)
        counter.style.color = 'red'
    } else
        counter.style.color = 'inherit'

    if (textarea.value.length <= 200)
        textfield.style.height = '200px'
    if (200 < textarea.value.length && textarea.value.length <= 350)
        textfield.style.height = '290px'
    if (350 < textarea.value.length)
        textfield.style.height = '370px'

}, 1)


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        }
    })
})


const posts = document.querySelectorAll('.post')
const loader = document.querySelector('.loading')
posts.forEach((e) => observer.observe(e))
observer.observe(loader)



const navbar = document.querySelector('.navbar')
const icon = document.querySelector('#icon')
const navHandle = (e) => {
    if (navbar.classList.length == 1) {
        navbar.classList.add('showNav')
        icon.textContent = 'expand_more'
    } else {
        navbar.classList.remove('showNav')
        icon.textContent = 'expand_less'
    }
}