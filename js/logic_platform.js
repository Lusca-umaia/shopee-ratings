elements = document.getElementsByClassName('inputRadio')
buttonNext = document.getElementById('buttonNext')
let plataform

for (const element of elements) {
    element.addEventListener("change", (e) => {
        plataform = e.target.value
        check()
    })
}

function check() {
    plataform ? buttonNext.disabled = false : buttonNext.disabled = true
}

check()
