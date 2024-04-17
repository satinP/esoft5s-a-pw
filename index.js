const lsKey = "local-key"

const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
};

function formatDate(date, opt = dateOptions) {
    const formated = new Intl.DateTimeFormat("pt-BR", opt).format(date)
    return formated
}

document.addEventListener('DOMContentLoaded', function () {
    initializeLocalStorage()
})

// {count: 0, lastVisit: "texto ex a."}

function initializeLocalStorage() {
    const date = new Date()
    const lsValue = localStorage.getItem(lsKey)

    if (!lsValue) {
        const newValue = {
            count: 1,
            lastVisit: formatDate(date)
        }
        localStorage.setItem(lsKey, JSON.stringify(newValue))
    } else {
        const parsedValue = JSON.parse(lsValue)
        
        parsedValue.count++
        parsedValue.lastVisit = formatDate(date)

        localStorage.setItem(lsKey, JSON.stringify(parsedValue))
    }
    addLastVisitOnFooter()
}

function addLastVisitOnFooter() {
    const lsValue = localStorage.getItem(lsKey)
    const parsedValue = JSON.parse(lsValue)
    
    const footer = document.querySelector("footer")
    
    const p = document.createElement('p')
    p.textContent = `Esta página foi visitada ${parsedValue.count} vezes. A última visita foi: ${parsedValue.lastVisit}`

    footer.appendChild(p)
}