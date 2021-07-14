var $ = require('jquery');
var toastr = require('toastr')
require('bootstrap/dist/css/bootstrap.min.css');
require('toastr/build/toastr.css');
require('bootstrap/dist/js/bootstrap.min.js');
require('popper.js');
require('bootstrap/dist/js/bootstrap.bundle.js');
require('toastr/build/toastr.min.js');

$('#TambahModal').on('click', function(){
    $('#FormTambah')[0].reset();
    // electron
    // .notificationApi
    // .sendNotification('Menambahkan Data');
    $('#exampleModalCenter').modal('show');
})

$(document).on('submit', '#FormTambah', function(event){
    event.preventDefault();
    var IdTitle = $('#title').val();
    var IdBody = $('#body').val();
    var arr = $(this).serializeArray();
    // console.log(arr);
        if (IdTitle === '') {
            toastr.warning('Title Kosong')
        }

        if (IdBody === '') {
            toastr.warning('Body Kosong')
        }

        if (IdTitle !== '' && IdBody !== '') {
            console.log('Title ' + IdTitle + ' Body ' + IdBody);
            fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: IdTitle,
                body: IdBody,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => console.log(json));

            toastr.success('Berhasil Disimpan')

            $('#exampleModalCenter').modal('hide');
            $('#FormTambah')[0].reset();
        }
});
