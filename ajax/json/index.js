$(document).ready(function() {
    fetchBooks()
})

function fetchBooks() {
    onBeforeSend()

    let xhr = new XMLHttpRequest()
    xhr.open('GET', './books.json', true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                handleResults(JSON.parse(xhr.responseText))
            }
            else {
                onAPIError()
            }
        }   
    }

    xhr.send()
}

function onBeforeSend() {
    hideError()
}

function handleResults(response) {
    if (!response) {
        consol
        showError()
        return
    }

    let books = response.library.book
    handleBooks(books)
}

function handleBooks(books) {
    let output = `<tr>
                    <th>Title</th><th>Author</th>
                  </tr>`
    
    for (const book of books) {
        let title = book.title
        let author = book.author
        output += `<tr>
                        <td>${title}</td><td>${author}</td>
                    </tr>`
    }
    
    $('.books').html(output)
}

function onAPIError() {
    console.log("Error in API")
}

function showError() {
    $('.error.hidden').clone().removeClass('hidden').appendTo($('.outer'))
}

function hideError() {
    $('.outer').find('.error').remove()
}