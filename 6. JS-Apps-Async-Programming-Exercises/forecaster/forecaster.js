function attachEvents() {
    let locationInputElement = $('#location');
    let dbUrl = 'https://judgetests.firebaseio.com/locations.json'
    $('#submit').click(getWeather);
    let forecastElement = $('#forecast');
    let currentWheatherElement = $('#current')
    let upcomingWheatherElement = $('#upcoming')

    function getWeather() {
        forecastElement.css('display', 'block')
        $.get(dbUrl)
            .then(function(data, status, xhr) {
                let locationExists = false;
                data.forEach(function(locationObject) {
                    let location = locationInputElement.val();
                    if (locationObject.name == location) {
                        locationExists = true;
                        displayTodayForecast(locationObject.code)
                        displayThreeDaysForecast(locationObject.code)
                    }
                }, this);

                if (!locationExists) {
                    showError('some err')
                }
            }).fail(showError)
    }

    function displayTodayForecast(locationCode) {
        let forecastUrlForToday = `https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`;

        $.get(forecastUrlForToday)
            .then(function(data, status, xhr) {

                currentWheatherElement
                    .append(
                        $('<span>')
                        .addClass('condition symbol')
                        .html(getSymbolForCondition(data.forecast.condition))
                    ).append(
                        $('<span>')
                        .addClass('condition')
                        .append(
                            $('<span>')
                            .addClass('forecast-data')
                            .html(data.name)
                        ).append(
                            $('<span>')
                            .addClass('forecast-data')
                            .html(`${data.forecast.low}${getSymbolForCondition('Degrees')}/${data.forecast.high}${getSymbolForCondition('Degrees')}`)
                        ).append(
                            $('<span>')
                            .addClass('forecast-data')
                            .html(data.forecast.condition)
                        )
                    )
            })
    }

    function displayThreeDaysForecast(locationCode) {
        let threeDayForecastUrl = `https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`;

        $.get(threeDayForecastUrl)
            .then(function(data, status, xhr) {
                data.forecast.forEach(function(currentForecast) {
                    upcomingWheatherElement
                        .append(
                            $('<span>')
                            .addClass('upcoming')
                            .append(
                                $('<span>')
                                .addClass('symbol')
                                .html(getSymbolForCondition(currentForecast.condition))
                            )
                            .append(
                                $('<span>')
                                .addClass('forecast-data')
                                .html(`${currentForecast.low}${getSymbolForCondition('Degrees')}/${currentForecast.high}${getSymbolForCondition('Degrees')}`)
                            ).append(
                                $('<span>')
                                .addClass('forecast-data')
                                .html(currentForecast.condition))
                        )
                }, this);
            })
    }

    function getSymbolForCondition(condition) {
        if (condition == 'Sunny') {
            return '&#x2600';
        } else if (condition == 'Partly sunny') {
            return '&#x26C5';
        } else if (condition == 'Overcast') {
            return '&#x2601';
        } else if (condition == 'Rain') {
            return '&#x2614';
        } else if (condition == 'Degrees') {
            return '&#176';
        }
    }

    function showError(err) {
        forecastElement.html('Error')
    }
}