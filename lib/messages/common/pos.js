/* PointOfSale common body */
module.exports = function (data) {
    return {
        Location: {
            CountryCode: data.countryCode,
            CityCode: data.cityCode,
        },
        RequestTime: {
            _Zone: 'EST',
            _: data.now.toISOString()
        },
        TouchPoint: {
            Device: {
                Code: '2',
                Definition: 'Web Browser',
                Position: {
                    Latitude: data.latitude,
                    Longitude: data.longitude,
                    NAC: '8KD7V PGGM0',
                }
            },
            Event: {
                Code: '9',
                Definition: 'Shop',
            }
        }
    };
}