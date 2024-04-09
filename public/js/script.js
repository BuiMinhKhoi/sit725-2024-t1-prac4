


const clickMe = () => {
    $('#modal1').modal('open');
}

const submitForm = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.image = $('#image').val();
    formData.description = $('#description').val();
    formData.size = 'medium'

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/api/cat";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json);
        }
    };
    var data = JSON.stringify(formData);
    xhr.send(data);

    console.log("Form Data Submitted: ", formData);
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'
            + '<div class="card ' + item.size + '"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'
            + item.image + '">'
            + '</div><div class="card-content">'
            + '<span class="card-title activator grey-text text-darken-4">'
            + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">'
            + item.link + '</a></p></div>' + '<div class="card-reveal">'
            + '<span class="card-title grey-text text-darken-4">'
            + item.title
            + '<i class="material-icons right">close</i></span>'
            + '<p class="card-text">' + item.desciption + '</p>'
            + '</div></div></div>';
        $(".card-section").append(itemToAppend)
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        submitForm();
    });
    $('#clickMeButton').click(() => {
        clickMe();
    })

    fetch('http://localhost:3000/api/cats')
        .then(res => res.json())
        .then(data => {
            addCards(data.data);
        });
    $('.modal').modal();
});