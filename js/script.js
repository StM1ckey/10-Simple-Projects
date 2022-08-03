/*---------------------------------------------Split-Landing-Page-------------------------------------------*/

const body = document.querySelector('.p1__body')
const left = document.querySelector('.left')
const right = document.querySelector('.right')

left.addEventListener('mouseenter', () => body.classList.add('hover-left'))
left.addEventListener('mouseleave', () => body.classList.remove('hover-left'))

right.addEventListener('mouseenter', () => body.classList.add('hover-right'))
right.addEventListener('mouseleave', () => body.classList.remove('hover-right'))

/*---------------------------------------------Form-Input-Animation-------------------------------------------*/

const labels = document.querySelectorAll('.form-control label')

labels.forEach(function(label){
    label.innerHTML = label.innerText
        .split('')
        .map((letter, index) => `<span style="transition-delay:${index * 50}ms">${letter}</span>`)
        .join('')
})

const box = document.querySelector('.p2__form')

window.addEventListener('scroll', checkBox)

checkBox()

function checkBox(){
    const triggerBottom = window.innerHeight * 4 / 5
    const boxTop = box.getBoundingClientRect().top * 0.8

    if (boxTop < triggerBottom) {
        box.classList.add('show')
    }    

}

/*---------------------------------------------Sound-Board--------------------------------------------*/

const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong']

sounds.forEach(sound => {
    const btn = document.createElement('button')
    btn.classList.add('p3__btn')

    btn.innerText = sound

    btn.addEventListener('click', function(){

        stopSongs()
        document.getElementById(sound).play()
    
    })

    document.getElementById('buttons').appendChild(btn)
})

function stopSongs(){
    sounds.forEach(sound => {
        const song = document.getElementById(sound)
        song.pause()
        song.currentTime = 0;
    })
}

/*---------------------------------------------Hidden-Search--------------------------------------------*/

const search = document.querySelector('.search');
const btn = document.querySelector('.p4__btn');
const input = document.querySelector('.input');

btn.addEventListener('click', function(){
    search.classList.toggle('active');
    input.focus();
})

/*---------------------------------------------Jokes--------------------------------------------*/

const jokeEl = document.getElementById('joke')
const jokeBtn = document.getElementById('p5__btn')

jokeBtn.addEventListener('click', generateJoke)

generateJoke()

function generateJoke(){
    fetch('http://api.icndb.com/jokes/random')
        .then((res) => res.json())
        .then((data) => {
            jokeEl.innerHTML = data.value.joke
        })
}

/*---------------------------------------------KeyCodes--------------------------------------------*/

const insert = document.getElementById('insert')

window.addEventListener('keydown', (event) => {
    insert.innerHTML = 
        `<div class="key">
            ${event.key === ' ' ? 'Space' : event.key}
        <small>event.key</small>
        </div>

        <div class="key">
            ${event.keyCode}
            <small>event.keyCode</small>
        </div>

        <div class="key">
            ${event.code}
            <small>event.Code</small>
        </div>`
})

/*---------------------------------------------FAQ--------------------------------------------*/

const p6Buttons = document.querySelectorAll('.faq-toggle')

p6Buttons.forEach((button) => {
    button.addEventListener('click', function(){
        button.parentNode.classList.toggle('faq__active');
    })
})

/*---------------------------------------------Choice-Picker--------------------------------------------*/

const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelect()
    }
})

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    
    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function randomSelect() {
    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()
	
	if (randomTag !== undefined) {
        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
	}
    }, 100);

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)

    }, times * 100)
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}

/*---------------------------------------------Expanding-Cards--------------------------------------------*/

const cards = document.querySelectorAll('.p9__card');

cards.forEach(function(card){
    card.addEventListener('click', function(){
        removeActiveClasses();
        card.classList.add('p9__card_active');
    })
})

function removeActiveClasses(){
    cards.forEach(function(card){
        card.classList.remove('p9__card_active');
    })
}

/*---------------------------------------------Incrementing-Counter--------------------------------------------*/

const counters = document.querySelectorAll('.counter')
const p10Btn = document.getElementById('p10Btn')

p10Btn.addEventListener('click', function(){
    counters.forEach(counter => {

        counter.innerText = '0'
        p10Btn.innerText = 'Start'
    
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target')
            const c = +counter.innerText
            const increment = target / 300
    
            if(c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`
                setTimeout(updateCounter, 3)
            } else {
                counter.innerText = target
                p10Btn.innerText = 'Restart'
            }
        }
        updateCounter()
    })
})











