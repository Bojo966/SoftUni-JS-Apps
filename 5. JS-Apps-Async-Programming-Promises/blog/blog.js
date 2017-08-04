function attachEvents() {
    const postsUrl = 'https://baas.kinvey.com/appdata/kid_SkE5BlTIZ/posts';
    const commentsUrl = 'https://baas.kinvey.com/appdata/kid_SkE5BlTIZ/comments';
    let selectDropdownElement = $('#posts');

    function loadPosts() {
        selectDropdownElement.html('');

        $.ajax({
                url: postsUrl,
                method: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa('Bojo:bojo'));
                },
            })
            .then(function(data, status, xhr) {
                data.forEach(function(post) {
                    selectDropdownElement.append($('<option>').val(post._id).text(post.title))
                }, this);
            })
            .fail(function(err) {
                console.log(err);
            })
    }

    function viewPost() {
        let selectedPostId = selectDropdownElement.children('option:selected').val();
        let postUrl = `https://baas.kinvey.com/appdata/kid_SkE5BlTIZ/posts/${selectedPostId}`;
        let postCommentsUrl = `https://baas.kinvey.com/appdata/kid_SkE5BlTIZ/comments/?query={"post_id":"${selectedPostId}"}`;

        loadFullPostInfo(postUrl);
        loadAllCommentsForPost(postCommentsUrl);
    }

    function loadAllCommentsForPost(postCommentsUrl) {
        $.ajax({
                url: postCommentsUrl,
                method: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa('Bojo:bojo'));
                }
            })
            .then(function(data, status, xhr) {
                let listOfComments = $('#post-comments');
                data.forEach(function(comment) {
                    listOfComments.append($('<li>').text(comment.text))
                }, this);
            })
            .fail(function(err) {
                console.log(err);
            })
    }

    function loadFullPostInfo(postUrl) {

        $.ajax({
                url: postUrl,
                method: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa('Bojo:bojo'));
                }
            })
            .then(function(data, status, xhr) {
                $('#post-title').text(data.title);
                $('#post-body').text(data.body);
            })
            .fail(function(err) {
                console.log(err);
            })
    }

    $('#btnLoadPosts').click(loadPosts)
    $('#btnViewPost').click(viewPost)
}