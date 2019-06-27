const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/ddb214a46163b88c8bdb29071d1d11ff/${latitude},${longitude}`;

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather server', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast;