function attachEvents() {
    $('#submit').click(function(eventData) {
        let author = $('#author').val();
        let content = $('#content')
        let time = Date.now()

        $.post("https://messenger-bojo.firebaseio.com/messenger.json", JSON.stringify({
            author: author,
            content: content.val(),
            timestamp: time
        }));

        content.val('');
    })

    $('#refresh').click(function(eventData) {
        let messages = $('#messages');
        messages.text('');
        let allMessagesString = '';

        $.ajax({
            url: "https://messenger-bojo.firebaseio.com/messenger.json",
            success: function(data, status, xhr) {
                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        var message = data[prop];
                        allMessagesString += `${message.author}: ${message.content}\n`;
                    }
                }

                messages.text(allMessagesString);
            }
        })

    })
}