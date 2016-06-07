/**
 * Created by wendy on 30-04-16.
 */
angular.module('animalModule', ['ui.router', 'ngResource', 'animalCRUD.controllers', 'animalCRUD.services']);

angular.module('animalModule').config(function($stateProvider) {
    $stateProvider.state('animals', {
        url: '/animals',
        templateUrl: 'partials/animals.html',
        controller: 'AnimalListController'
    }).state('home', {
            url: '/home',
            templateUrl: 'partials/home.html'
    }).state('newAnimal', {
        url: '/animals/new',
        templateUrl: 'partials/animal-add.html',
        controller: 'AnimalCreateController'
    }).state('editAnimal',{
            url:'/animals/:id/edit',
            templateUrl:'partials/animal-edit.html',
            controller:'AnimalEditController'
    }).state('viewAnimal', {
            url:'/animals/:id/view',
            templateUrl:'partials/animal-view.html',
            controller:'AnimalViewController'
    }).state('uncataloguedAnimals', {
        url:'/uncatalogued',
        templateUrl:'partials/uncataloguedanimals.html',
        controller:'UncataloguedListController'

    }).state('lostAnimals', {
        url:'/lost',
        templateUrl:'partials/lost.html',
        controller:'LostAnimalsListController'

    }).state('valorationAnimals', {
        url:'/valoration',
        templateUrl:'partials/valoration.html',
        controller:'ValorationAnimalsListController'

    }).state('adoptionAnimals', {
        url:'/adoptions',
        templateUrl:'partials/adoptions.html',
        controller:'AdoptionListController'

    }).state('adoptedAnimals', {
        url:'/adopted',
        templateUrl:'partials/adopted.html',
        controller:'AdoptedListController'

    }).state('newSpecies',{
        url:'/species/new',
        templateUrl:'partials/species-add.html',
        controller:'SpeciesCreateController'

    }).state('newStatusAnimal',{
        url:'/:id/statusAnimal/new',
        templateUrl:'partials/statusanimal-add.html',
        controller:'StatusAnimalCreateController'

    }).state('newBreed',{
            url:'/breeds/new',
            templateUrl:'partials/breed-add.html',
            controller:'BreedCreateController'
    }).state('newVet',{
        url:'/vets/new',
        templateUrl:'partials/vet-add.html',
        controller:'VetCreateController'
    }).state('initValorations',{
        url:'/animals/:id/initValoration',
        templateUrl:'partials/initValorations.html',
        controller:'initValorationsController'
    }).state('viewValorations',{
        url:'/valorations/:id/view',
        templateUrl:'partials/valorations.html',
        controller:'ValorationsListController'
    }).state('newVolunteer',{
        url:'/volunteer/new',
        templateUrl:'partials/volunteer-add.html',
        controller:'VolunteerCreateController'
    }).state('animalAdoption',{
        url:'/animals/:id/adoption',
        templateUrl:'partials/adoption.html',
        controller:'AnimalAdoptionController'
    }).state('animalViewAdoption',{
        url:'/animals/:id/adoption/view',
            templateUrl:'partials/adoption-view.html',
            controller:'AnimalAdoptionListController'
    });
}).run(function($state) {
    $state.go('home');
});
//helpers
