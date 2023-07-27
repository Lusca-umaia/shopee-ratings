
let urlProduct = document.getElementById('urlProduct')
let quantGenres = document.getElementById('quantGenres')
let quantReviews = document.getElementById('quantReviews')
let salesPage = document.getElementById('salesPage')

quantReviews.addEventListener('change', (e) => {
    quantGenres.max = e.target.value

    e.target.value > 0 ? quantGenres.disabled = false : quantGenres.disabled = true

    slider(quantGenres, '4e4f53', 'qtdMan')
})

quantReviews.addEventListener('input', (e) => {
    slider(quantReviews, '1b1c21', 'reviews_value')
})

quantGenres.addEventListener('input', (e) => {
    slider(quantGenres, '4e4f53', 'qtdMan')
})

function slider(item, color, output) {
    let outputElement = document.getElementById(output)

    if (output == 'reviews_value') {
        outputElement.innerText = item.value
    }

    else {
        outputElement.innerText = item.value
        document.getElementById('qtdWoman').innerText = item.max - item.value
    }

    let percent = (item.value / item.max) * 100
    item.style.background = `linear-gradient(to right, #bbbcbd ${percent}%, #${color} ${percent}%)`;
}


document.getElementById('form').addEventListener("submit", (e) => {
    e.preventDefault()

    const regex = /i\.\d+\.\d+/;
    const match = urlProduct.value.match(regex);

    if (match) {
        let IDs = urlProduct.value.replace(/.*?(i\.\d+\.\d+).*/, '$1')

        sessionStorage.setItem('IDsProduct', IDs)

        window.location = "/popup/platform.html"
    } else {
        alert("Informe uma URL válida.");
    }
})
