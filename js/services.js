/**
 * Created by wendy on 30-04-16.
 */

angular.module('animalCRUD.services', [])
    .factory('Animal', function($resource) {
    return $resource('http://homeformeapi.localhost/animals/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}).factory('Species', function($resource) {
    return $resource('http://homeformeapi.localhost/species/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}).factory('Breed', function($resource) {
    return $resource('http://homeformeapi.localhost/breeds/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}).factory('Uncatalogued',function($resource)
{
    return $resource('http://homeformeapi.localhost/uncatalogued/:id', { id: '@id' });

}).factory('Lost',function($resource)
{
    return $resource('http://homeformeapi.localhost/lostanimal/:id', { id: '@id' });

}).factory('Adopted',function($resource)
{
    return $resource('http://homeformeapi.localhost/adopted/:id', { id: '@id' });

}).factory('Adoptions',function($resource)
{
    return $resource('http://homeformeapi.localhost/adoptions/:id', { id: '@id' });

}).factory('Valoration',function($resource)
{
    return $resource('http://homeformeapi.localhost/valoration/:id', { id: '@id' });

}).factory('StatusAnimal',function($resource)
{
    return $resource('http://homeformeapi.localhost/animalstatus/:id', { id: '@id' });
}).factory('newRegisterServices',function()
{
    var _species_id=0;
    var _breed_id=0;
    return {
        getSpeciesId: function () {
            return _species_id;
        },
        setSpeciesId: function(value) {
            _species_id = value;
        },
        getBreedId: function () {
            return _breed_id;
        },
        setBreedId: function(value) {
            _breed_id= value;
        }

    };

}).factory('newMVServices',function()
{
    var _vet_id=0;
    return {
        getVetId: function () {
            return _vet_id;
        },
        setVetId: function(value) {
            _vet_id = value;
        }

    };

}).factory('newBOServices',function()
{
    var _volunteer_id=0;
    return {
        getVolunteerId: function () {
            return _volunteer_id;
        },
        setVolunteerId: function(value) {
            _volunteer_id = value;
        }

    };

}).factory('GlobalAnimalServices',function()
{
    var _animal_id=0;
    return {
        getAnimalId: function () {
            return _animal_id;
        },
        setAnimalId: function(value) {
            _animal_id = value;
        }

    };

}).factory('newBreedServices',function()
{
    var _species_id=0;
    return {
        getSpeciesId: function () {
            return _species_id;
        },
        setSpeciesId: function(value) {
            _species_id = value;
        }

    };

}).factory('Vet',function($resource){
    return $resource('http://homeformeapi.localhost/vets/:id', { id: '@id' });
}).factory('Volunteer',function($resource){
    return $resource('http://homeformeapi.localhost/volunteers/:id', { id: '@id' });
}).factory('MedicalValoration',function($resource){
    return $resource('http://homeformeapi.localhost/medicalobs/:id', { id: '@id' });
}).factory('BehaviorObservation',function($resource){
    return $resource('http://homeformeapi.localhost/behaviorobs/:id', { id: '@id' });
}).factory('Adoption',function($resource){
    return $resource('http://homeformeapi.localhost/adoption/:id', { id: '@id' });
});

