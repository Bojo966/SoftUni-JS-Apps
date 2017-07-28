function attachEvents() {
    let phonebookElement = $('#phonebook');
    let personInputElement = $('#person');
    let phoneInputElement = $('#phone');

    function recieveContacts() {
        phonebookElement.text('')
        $.ajax({
            url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
            success: function(data) {
                for (var id in data) {
                    if (data.hasOwnProperty(id)) {
                        var contact = data[id];
                        phonebookElement.append(
                            $('<li>')
                            .text(`${contact.person}: ${contact.phone}`)
                            .attr('id-db', `${id}`)
                            .append(
                                $('<button>')
                                .text('[Delete]')
                                .click(deleteContact)
                            )
                        )
                    }
                }
            }
        })
    }

    function deleteContact(eventData) {
        let selectedLi = $(eventData.target).parent()
        let dbId = selectedLi.attr('id-db')

        $.ajax({
            method: 'DELETE',
            url: `https://phonebook-nakov.firebaseio.com/phonebook/${dbId}.json`
        })

        selectedLi.remove();
    }

    function postContact() {
        let person = personInputElement.val();
        let phone = phoneInputElement.val();

        $.ajax({
            url: 'https://phonebook-nakov.firebaseio.com/phonebook.json',
            method: 'POST',
            data: JSON.stringify({
                person,
                phone
            })
        })

        personInputElement.val('')
        phoneInputElement.val('')

        recieveContacts();
    }

    $('#btnLoad').click(recieveContacts)

    $('#btnCreate').click(postContact)
}