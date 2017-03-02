/** * Created by Damith on 2/17/2017. */agentApp.factory('contactService', function ($http, baseUrls) {    var getAllContacts = function () {        return $http({            method: 'GET',            url: baseUrls.contactUrl + "Contacts"        }).then(function (response) {            if (response.data) {                return response.data;            } else {                return {};            }        });    };    var createNewContact = function (name, contact) {        var obj =  {"contact":contact,"type":"work","name":name};        return $http({            method: 'POST',            data: obj,            url: baseUrls.contactUrl + "Contact"        }).then(function (response) {            if (response.data && response.data.IsSuccess) {                return response.data;            } else {                return undefined;            }        });    };    return {        getAllContacts: getAllContacts,        CreateNewContact:createNewContact    }});