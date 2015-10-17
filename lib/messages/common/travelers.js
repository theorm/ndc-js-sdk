module.exports = function Travelers(data, travelerRoot, travelerKey) {
    var travelers = {};
    travelerRoot = travelerRoot || 'Traveler';
    travelerKey = travelerKey || 'RecognizedTraveler';
    travelers[travelerRoot] = (data.travelers && data.travelers.length ?
        data.travelers.map(function (traveler) {
            if (traveler.anonymous) {
                return {
                    AnonymousTraveler: {
                        _ObjectKey: traveler.key,
                        PTC: {
                            _Quantity: traveler.count || 1,
                            _: traveler.type
                        }
                    }
                };
            } else {
                var _traveler = {};
                _traveler[travelerKey] = {
                    _ObjectKey: traveler.key,
                    PTC: {
                        _Quantity: 1,
                        _: traveler.type
                    },
                    ResidenceCode: traveler.residenceCode,
                    Age: (!!traveler.age ? {
                        BirthDate: traveler.age.birthDate
                    } : null),
                    Name: (traveler.name ? {
                        Title: traveler.name.title,
                        Surname: traveler.name.surname,
                        Given: traveler.name.given,
                        Middle: traveler.name.middle
                    } : null),
                    ProfileID: traveler.profileID,
                    Contacts: (traveler.contact ? {
                        Contact: (function () {
                            if (traveler.contact.email || traveler.contact.phone || traveler.contact.address) {
                                var contacts = [];
                                if (traveler.contact.email) {
                                    contacts.push({
                                        EmailContact: {
                                            Address: traveler.contact.email
                                        }
                                    });
                                }
                                if (traveler.contact.phone) {
                                    contacts.push({
                                        PhoneContact: {
                                            Application: 'Emergency',
                                            Number: traveler.contact.phone
                                        }
                                    });
                                }
                                if (traveler.contact.address) {
                                    contacts.push({
                                        AddressContact: {
                                            Application: 'AddressAtOrigin',
                                            Street: traveler.contact.address.street,
                                            CityName: {
                                                CityCode: traveler.contact.address.city
                                            },
                                            PostalCode: traveler.contact.address.postalCode,
                                            CountryCode: traveler.contact.address.country
                                        }
                                    });
                                }
                                return contacts;
                            }
                        })()
                    } : null),
                    Languages: (traveler.languages && traveler.languages.length ? {
                        LanguageCode: traveler.languages
                    } : null),
                    FQTVs: (traveler.fqtvs && traveler.fqtvs.length ? {
                      ProgramID: traveler.fqtvs[0].programID,
                      AirlineID: traveler.fqtvs[0].providerID,
                      Account: {
                          Number: traveler.fqtvs[0].accountNumber
                      }
                        //
                        // FQTV_ProgramCore: traveler.fqtvs.map(function (fqtv) {
                        //     return {
                        //         ProgramID: fqtv.programID,
                        //         AirlineID: fqtv.providerID,
                        //         Account: {
                        //             Number: fqtv.accountNumber
                        //         }
                        //     };
                        // })
                    } : null),
                    Gender: traveler.gender,
                    PassengerIDInfo: (traveler.foids && traveler.foids.length ? {
                        FOID: traveler.foids.map(function (foid) {
                            return {
                                Type: foid.type,
                                ID: foid.id
                            };
                        })
                    } : null)
                };

                return _traveler;
            }
        }) : null);
    return travelers;
};
