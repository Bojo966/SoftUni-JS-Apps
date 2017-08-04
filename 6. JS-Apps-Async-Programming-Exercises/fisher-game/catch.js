function attachEvents() {
    const listAllCatches = 'https://baas.kinvey.com/appdata/kid_ByMgOulvZ/biggestCatches'

    let loadButtonElement = $('.load');
    let addFormFieldSetElement = $('#addForm');
    let addButtonElement = $('.add');
    let catches = $('#catches')

    loadButtonElement.click(loadBiggestCatches)
    addButtonElement.click(addCatch)

    function loadBiggestCatches() {

        $.ajax({
                url: listAllCatches,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa('ivan' + ":" + 'ivan'));
                },
            })
            .then(function(data, status, xhr) {
                catches.html('');
                displayBiggestCatches(data);
            }).fail(function(err) {
                console.log(err);
            })
    }

    function displayBiggestCatches(catchesArr) {
        catchesArr.forEach(function(catchData) {
            let catchDivElement = createCatchDivElement(catchData);
            catches.append(catchDivElement);
        }, this);
    }

    function createCatchDivElement(catchData) {
        return $('<div>')
            .addClass('catch')
            .attr('data-id', catchData._id)
            .append($('<label>')
                .html('Angler')
            ).append($('<input>')
                .attr('type', 'text')
                .addClass('angler')
                .val(catchData.angler)
            ).append($('<label>')
                .html('Weight')
            ).append($('<input>')
                .attr('type', 'number')
                .addClass('weight')
                .val(catchData.weight)
            ).append($('<label>')
                .html('Species')
            ).append($('<input>')
                .attr('type', 'text')
                .addClass('species')
                .val(catchData.species)
            ).append($('<label>')
                .html('Location')
            ).append($('<input>')
                .attr('type', 'text')
                .addClass('location')
                .val(catchData.location)
            ).append($('<label>')
                .html('Bait')
            ).append($('<input>')
                .attr('type', 'text')
                .addClass('bait')
                .val(catchData.bait)
            ).append($('<label>')
                .html('Capture Time')
            ).append($('<input>')
                .attr('type', 'number')
                .addClass('captureTime')
                .val(catchData.captureTime)
            ).append($('<button>')
                .addClass('update')
                .click(updateCatch)
                .html('Update')
            ).append($('<button>')
                .addClass('delete')
                .click(deleteCatch)
                .html('Delete')
            )
    }

    function addCatch() {
        let catchObject = {}
        catchObject.angler = addFormFieldSetElement.children('.angler').val();
        catchObject.weight = addFormFieldSetElement.children('.weight').val();
        catchObject.species = addFormFieldSetElement.children('.species').val();
        catchObject.location = addFormFieldSetElement.children('.location').val();
        catchObject.bait = addFormFieldSetElement.children('.bait').val();
        catchObject.captureTime = addFormFieldSetElement.children('.captureTime').val();

        $.post({
            url: listAllCatches,
            data: catchObject,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa('ivan' + ":" + 'ivan'));
            }
        }).then(function(data, status, xhr) {
            let divElement = createCatchDivElement(data);
            catches.append(divElement);
        }).fail(function(err) {
            console.log(err);
        })
    }

    function updateCatch(eventData) {
        let selectedCatchElement = $(eventData.target).parent();
        let selectedCatchId = selectedCatchElement.attr('data-id');
        let selectedCatchAngler = selectedCatchElement.children('.angler').val();
        let selectedCatchWeight = selectedCatchElement.children('.weight').val();
        let selectedCatchSpecies = selectedCatchElement.children('.species').val();
        let selectedCatchLocation = selectedCatchElement.children('.location').val();
        let selectedCatchBait = selectedCatchElement.children('.bait').val();
        let selectedCatchCaptureTime = selectedCatchElement.children('.captureTime').val();

        $.ajax({
                url: `https://baas.kinvey.com/appdata/kid_ByMgOulvZ/biggestCatches/${selectedCatchId}`,
                method: 'PUT',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa('ivan' + ":" + 'ivan'));
                },
                data: {
                    angler: selectedCatchAngler,
                    weight: selectedCatchWeight,
                    species: selectedCatchSpecies,
                    location: selectedCatchLocation,
                    bait: selectedCatchBait,
                    captureTime: selectedCatchCaptureTime
                }
            })
            .then(function(data, status, xhr) {
                console.log(data);
            })
            .fail(function(err) {
                console.log(err);
            })
    }

    function deleteCatch(eventData) {
        let selectedCatchElement = $(eventData.target).parent();
        let selectedCatcheId = selectedCatchElement.attr('data-id');
        $.ajax({
                url: `https://baas.kinvey.com/appdata/kid_ByMgOulvZ/biggestCatches/${selectedCatcheId}`,
                method: 'DELETE',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa('ivan' + ":" + 'ivan'));
                }
            })
            .then(function(data, status, xhr) {
                console.log(data);
                selectedCatchElement.remove();
            })
            .fail(function(err) {
                console.log(err);
            })

    }
}