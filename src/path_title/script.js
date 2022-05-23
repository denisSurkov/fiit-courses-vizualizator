async function fill_page_with_titles(){
    let response = await fetch("./path_title/storage.json")
    let json = await response.json()
    for (let info of json){
        add_title_to_page(info.title, info.description, info.href)
    }
}

function add_title_to_page(title, description, href){
    let block_link = document.createElement('a')
    block_link.className = "block-link"
    block_link.href = href

    let block = document.createElement('div')
    block.className = "block"

    let block_title = document.createElement('p')
    block_title.className = 'block-title'
    block_title.innerText = title

    let block_description = document.createElement('p')
    block_description.className = 'block-description'
    block_description.innerText = description

    block.appendChild(block_title)
    block.appendChild(block_description)
    block_link.appendChild(block)

    document.querySelector('.blocks-container').append(block_link)
}

fill_page_with_titles()