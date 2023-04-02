export function mobileFilters(){
    const unlock_filters = document.querySelector(".hide")
    const spoiler = document.querySelector(".filters__spoiler--mobile")

    
    spoiler?.addEventListener('click', function(){
        unlock_filters?.classList.toggle('unlock__filters')
        spoiler?.classList.toggle('unlock__filters')
    })

}