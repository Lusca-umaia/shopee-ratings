let loading = document.getElementById('loading')

async function getReviews(IDs) {
    try {
        const response = await fetch(`https://corsproxy.io/?https://shopee.com.br/api/v2/item/get_ratings?itemid=${IDs[2]}&shopid=${IDs[1]}`)

        if (!response.ok) throw new Error('Erro na requisição')

        const data = await response.json()

        loading.style.display = 'none'

        document.getElementById("starAverage").innerText = getAvarare(data.data.item_rating_summary)

        generateEffectStars(getAvarare(data.data.item_rating_summary), 'starAverage')

        const ratings = data.data.ratings

        ratings.length > 0 ? ratings.map((item, index) => {
            element = `
                    <div class="review">
                        <i class="bi bi-x-circle-fill"></i>
                        <div class="groupLeft">
                            <h2>${item.author_username}</h2>
                            <p>${item.comment}</p>
                        </div>
                        <div class="groupRight">
                            <div class="imgs">
                                ${item.images.map((link) => {
                return `<img src='https://down-lum-br.img.susercontent.com/${link}'
                                            alt="reviewImage">`;
            }).join('')}
                            </div>
                            <div class="startGroup">
                                <i class="bi bi-star-fill star starEffect${index}"></i>
                                <i class="bi bi-star-fill star starEffect${index}""></i>
                                <i class="bi bi-star-fill star starEffect${index}""></i>
                                <i class="bi bi-star-fill star starEffect${index}""></i>
                                <i class="bi bi-star-fill star starEffect${index}""></i>
                            </div>
                        </div>
                    </div>
    `
            document.getElementById('reviews').insertAdjacentHTML("beforeend", element);
            generateEffectStars(item.rating_star, `starEffect${index}`)
        }) : document.getElementById('reviews').innerHTML = `<p id='text'>Infelizmente não há comentários :(</p>`;

        buttonsRemove = document.getElementsByClassName('bi-x-circle-fill')

        for (const buttonRemove of buttonsRemove) {
            buttonRemove.addEventListener('click', () => {
                buttonRemove.parentNode.classList.add('effectRemove')

                setTimeout(() => {
                    buttonRemove.parentNode.remove()

                }, 400);

            })
        }
    }

    catch (error) {
        console.log('Erro:' + error)
        document.getElementById('reviews').innerHTML = `<p id='text'>Algo deu errado, verifique o link inserido :(</p>`;
    }
}

function getAvarare(item) {
    avarage = 0

    for (i = 0; item.rating_count.length > i; i++) {
        avarage = avarage + (item.rating_count[i] * (i + 1))
    }

    avarage = avarage / item.rating_total

    return avarage.toFixed(1)
}

function generateEffectStars(avarage, name_Class) {
    elements = document.getElementsByClassName(name_Class)

    for (i = 0; elements.length > i; i++) {
        let percent = 0

        if (avarage >= i + 1) {
            percent = 100
        }

        else if ((i + 1) - avarage > 0) {
            percent = 100 - (((i + 1) - avarage) * 100)
        }

        elements[i].style.backgroundImage = `linear-gradient(to right, #b5b6b8 ${percent}%, #1b1c1f ${percent}%)`
    }
}

if (sessionStorage.getItem('IDsProduct') !== null) {
    getReviews(sessionStorage.getItem('IDsProduct').split('.'))
}

else {
    loading.style.display = 'none'
    document.getElementById('reviews').insertAdjacentHTML("beforeend", `<p id='text'>Algo deu errado, verifique o link inserido :(</p>`);
}

