/**
 * Created by wendy on 30-04-16.
 */
angular.module('animalCRUD.controllers',[])
    .controller
    (
    'AnimalListController',
        function($scope, Animal)
        {
            $scope.animals = Animal.query();
        }
    ).controller
    (
        'AnimalCreateController',
        function($scope,$state,$stateParams,Animal,newRegisterServices,$http)
        {
            $scope.addAnimal=function()
            {
                $scope.animal.species_id=newRegisterServices.getSpeciesId();
                $scope.animal.breed_id=newRegisterServices.getBreedId();

                console.log($scope);
                var formData=new FormData();
                formData.append('name',$scope.animal.name);
                formData.append('gender',$scope.animal.gender);
                formData.append('arrivalState',$scope.animal.arrivalState);
                $datetime=Date.now();
                formData.append('arrivalDateTime',$datetime);
                formData.append('responsiblePerson',$scope.animal.responsiblePerson);
                formData.append('responsiblePersonContact',$scope.animal.responsiblePersonContact);
                formData.append('responsiblePersonType',$scope.animal.responsiblePersonType);
                formData.append('generalDescription',$scope.animal.generalDescription);
                formData.append('foundAddress',$scope.animal.foundAddress);
                formData.append('species_id',$scope.animal.species_id);
                formData.append('breed_id',$scope.animal.breed_id);
                formData.append('foundAddressStreet',$scope.animal.foundAddressStreet);
                formData.append('age',$scope.age+" "+$scope.ageType);
                formData.append('height',$scope.animal.height);

                var file=document.getElementById('file-select').files;
                formData.append('profile_image',file[0]);

                var xhr=new XMLHttpRequest();
                xhr.open('POST','http://homeformeapi.localhost/animals',true);
                xhr.onload=function()
                {
                    if(xhr.status===200)
                    {
                        if($scope.animal.arrivalState=="Perdido")
                        {
                            $state.go('lostAnimals');
                        }
                        else
                        {
                            $state.go('uncataloguedAnimals');
                        }
                    }
                    else {
                        alert("not ok :(")
                    }
                };
                xhr.send(formData);
            };

        }
    ).controller(
        'AnimalViewController',
        function($scope,$stateParams,Animal)
        {
            var date=new Date();
            $scope.animal=Animal.get({id:$stateParams.id});


            var img=document.getElementById('pi');
            console.log($scope.animal);
            var path=$scope.animal.profileimage;

        }
    ).controller
    (
        'AnimalEditController',
        function($scope,$state,$stateParams,Animal)
        {
            $scope.updateAnimal=function()
            {
                $scope.animal.$update();

            };
            $scope.loadAnimal=function()
            {
                $scope.animal=Animal.get({id:$stateParams.id});
            };
            $scope.loadAnimal();
        }
    ).controller(
        'UncataloguedListController',
    function($scope,Uncatalogued)
    {
            $scope.uncatalogued=Uncatalogued.query();
    }).controller(
    'LostAnimalsListController',
    function($scope,Lost)
    {
        $scope.lost=Lost.query();
    }).controller(
    'AdoptionListController',
    function($scope,Adoptions)
    {
        $scope.adoptions=Adoptions.query();
    })
    .controller(
        'ValorationAnimalsListController',
        function($scope,Valoration)
        {
            $scope.valoration=Valoration.query();
        }).
        controller(
    'AdoptedListController',
    function($scope,Adopted)
    {
        $scope.adopted=Adopted.query();
    })
    .controller
    (
     'SpeciesCreateController',
        function($scope,$state,$stateParams,Species)
        {
            $scope.species=new Species();
            $scope.addSpecies=function()
            {
                $scope.species.$save(function()
                {
                    $state.go('newAnimal');
                });
            };
        }

    ).controller
(
    'BreedCreateController',
    function($scope,$state,$stateParams,Breed,newBreedServices)
    {
        $scope.breed=new Breed();
        $scope.addBreed=function()
        {
            $scope.breed.species_id=newBreedServices.getSpeciesId();
            console.log($scope);
            $scope.breed.$save(function()
            {
                $state.go('newAnimal');
            });
        };
    }

).controller
    (
    'SpeciesListController',
        function($scope, Species,newRegisterServices,newBreedServices)
        {
            $scope.species = Species.query();
            $scope.speciesupdate=function()
            {
                newRegisterServices.setSpeciesId($scope.sp.id);
            };
            $scope.speciesupdateforbreed=function()
            {
                newBreedServices.setSpeciesId($scope.sp.id);
            };
            $scope.breedupdate=function()
            {
                newRegisterServices.setBreedId($scope.bd.id);
            };

        }
    ).controller(

    'StatusAnimalCreateController',
        function($scope,$http,$stateParams)
        {
            var today=new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }
            var today = yyyy+'-'+mm+'-'+dd;


            $scope.addStatusAnimal=function(obj)
            {
                $scope.statusanimal={};
                $scope.statusanimal.animal_id=obj;
                $scope.statusanimal.status="Valorando";
                $scope.statusanimal.date=today;
                console.log($scope);
                $http(
                    {
                        method:'POST',
                        url:'http://homeformeapi.localhost/animalstatus',
                        data:$scope.statusanimal
                    }
                );
            }


        }

        ).controller('StatusAnimalListController',
            function($scope, $state, $stateParams, StatusAnimal)
            {
                $scope.t=StatusAnimal.query();
                $scope.statusanimal=array();
                for(var i=0; i<$scope.t.length;i++)
                {
                    var item=$scope.t[i];
                    if(item.id == $stateParams.id)
                    {
                        array_add($scope.statusanimal,item);
                    }
                }

            }
    ).controller('VetCreateController',
        function($scope,$state,$stateParams,Vet)
        {
            $scope.vet=new Vet();
            $scope.addVet=function()
            {
                console.log($scope);
                $scope.vet.$save();
            }
        }
    ).controller('VolunteerCreateController',
    function($scope,$state,$stateParams,Volunteer)
    {
        $scope.volunteer=new Volunteer();

        $scope.addVolunteer=function()
        {
            $today=new Date();
            $scope.volunteer.enrollmentDate=$today;
            $scope.volunteer.$save();
        }
    }).controller('VetListController',
        function($scope,Vet,newMVServices)
        {
            $scope.vets=Vet.query();
            $scope.vetsUpdate=function()
            {
            newMVServices.setVetId($scope.vd.id);

            };
        }
    ).controller('VolunteerListController',
    function($scope,Volunteer,newBOServices)
    {
        $scope.volunteers=Volunteer.query();
        $scope.volunteerUpdate=function()
        {
            newBOServices.setVolunteerId($scope.vol.id);

        };
    }
).controller('initValorationsController',
        function($http,$stateParams,GlobalAnimalServices,StatusAnimal,$scope,Animal)
        {
                GlobalAnimalServices.setAnimalId($stateParams.id);
                $scope.animal=Animal.get({id:$stateParams.id});

                var today = new Date();
                $scope.statusanimal={};
                $scope.statusanimal.animal_id=$stateParams.id;
                $scope.statusanimal.status="Valorando";
                $scope.statusanimal.date=today;
                $scope.statusanimal.state=1;
                console.log($scope);
                $http(
                {
                    method:'POST',
                    url:'http://homeformeapi.localhost/animalstatus',
                    data:$scope.statusanimal
                }
            );
        }
).controller('BehaviorObservationCreateController',
    function($scope,$state,BehaviorObservation,GlobalAnimalServices,newBOServices){
        $scope.bo=new BehaviorObservation();
        $scope.addBO=function()
        {
            $scope.bo.datetime=new Date();
            $scope.bo.volunteer_id=newBOServices.getVolunteerId();
            $scope.bo.animal_id=GlobalAnimalServices.getAnimalId();
            console.log($scope);
            $scope.bo.$save(function(){
                $state.go('viewValorations');
            });

        };
}).controller('MedicalValorationCreateController',
    function($scope,$state,$stateParams,MedicalValoration,GlobalAnimalServices,newMVServices)
    {
        $scope.mv=new MedicalValoration();
        $scope.opteyes=[{name:'Supuracion'},{name:'Ulcera'},{name:'Bizquera'}];
        $scope.optmouth=[{name:'Gingivitis'},{name:'Dientes ensarrados'},{name:'Diente caido/roto'}];
        $scope.optskin=[{name:'Alopecia'},{name:'Pulgas'},{name:'Heridas'},{name:'Dermatitis'}];
        $scope.optears=[{name:'Acaros'},{name:'Supuracion'},{name:'Hematoma'},{name:'Lastimado'}];
        $scope.optnosethroat=[{name:'Secrecion'},{name:'Estornudos'},{name:'Resfrio'}];
        $scope.optfeet=[{name:'Sin garras'},{name:'Uña encarnada'}];
        $scope.mv.pain="Si";
        $scope.eyes="Normal";
        $scope.mouth="Normal";
        $scope.mv.abdomen="Normal";
        $scope.skin="Normal";
        $scope.ears="Normal";
        $scope.nosethroat="Normal";
        $scope.mv.neuro="Normal";
        $scope.feet="Normal";
        $scope.addMV=function()
        {
            $scope.mv.date=new Date();
            $scope.mv.vet_id=newMVServices.getVetId();
            $scope.mv.animal_id=GlobalAnimalServices.getAnimalId();
            // from model $scope.medicalCares
            //from model $scope.mv.pain
            //from model $scope.mv.weight
            //from model $scope.mv.bodycondition;
            if($scope.eyes=="Anormal")
            {
                $scope.mv.eyes="";
                angular.forEach($scope.opteyes,function(opt)
                {
                    if(opt.selected)
                    {
                        $scope.mv.eyes=$scope.mv.eyes+opt.name+";";
                    }
                });
            }
            else {$scope.mv.eyes="Normal";}
            if($scope.mouth=="Anormal")
            {
                $scope.mv.mouth="";
                angular.forEach($scope.optmouth,function(opt)
                {
                    if(opt.selected)
                    {
                        $scope.mv.mouth=$scope.mv.mouth+opt.name+";";
                    }
                });
            }
            else {$scope.mv.mouth="Normal";}
            if($scope.skin=="Anormal")
            {
                $scope.mv.skin="";
                angular.forEach($scope.optskin,function(opt)
                {
                    if(opt.selected)
                    {
                        $scope.mv.skin=$scope.mv.skin+opt.name+";";
                    }
                });
            }
            else {$scope.mv.skin="Normal";}
            if($scope.ears=="Anormal")
            {
                $scope.mv.ears="";
                angular.forEach($scope.optears,function(opt)
                {
                    if(opt.selected)
                    {
                        $scope.mv.ears=$scope.mv.ears+opt.name+";";
                    }
                });
            }
            else {$scope.mv.ears="Normal";}
            if($scope.nosethroat=="Anormal")
            {
                $scope.mv.nosethroat="";
                angular.forEach($scope.optnosethroat,function(opt)
                {
                    if(opt.selected)
                    {
                        $scope.mv.nosethroat=$scope.mv.nosethroat+opt.name+";";
                    }
                });
            }
            else {$scope.mv.nosethroat="Normal";}
            if($scope.feet=="Anormal")
            {
                $scope.mv.feet="";
                angular.forEach($scope.optfeet,function(opt)
                {
                    if(opt.selected)
                    {
                        $scope.mv.feet=$scope.mv.feet+opt.name+";";
                    }
                });
            }
            else {$scope.mv.feet="Normal";}
            console.log($scope);
            $scope.mv.$save();
        };
    }).controller('ValorationsListController',function($scope,$stateParams,GlobalAnimalServices,Animal)
        {
                //todo: create service to pass animal_id as parameter
                GlobalAnimalServices.setAnimalId($stateParams.id);
            $scope.animal=Animal.get({id:$stateParams.id});
        }).controller('MedicalValorationsListController', function ($scope,GlobalAnimalServices,MedicalValoration)
        {
             //todo: get animal_id then do: $scope.medValorations=MV.get(animal_id:foundanimalid);

                $scope.animal_id=GlobalAnimalServices.getAnimalId();
                $scope.medVal=[];
                $scope.max=0;
                $scope.mv=MedicalValoration.query({}, function (data) {
                    angular.forEach(data,function(value)
                    {
                        if(value.animal_id==$scope.animal_id)
                        {
                            console.log("Enter the if");
                            $scope.medVal.push(value);
                            $scope.max=$scope.max+1;
                        }

                    });
                });
                console.log($scope.max);


        })
    .controller('BehaviorObservationListController', function ($scope,GlobalAnimalServices,BehaviorObservation)
{
    //todo: get animal_id then do: $scope.medValorations=MV.get(animal_id:foundanimalid);

    $scope.animal_id=GlobalAnimalServices.getAnimalId();
    $scope.bhObs=[];
    $scope.max=0;
    $scope.bo=BehaviorObservation.query({}, function (data) {
        angular.forEach(data,function(value)
        {
            if(value.animal_id==$scope.animal_id)
            {
                console.log("Enter the if");
                $scope.bhObs.push(value);
                $scope.max=$scope.max+1;
            }

        });
    });
    console.log($scope.max);
}).controller('AnimalToAdoptionController',function($scope,$state,GlobalAnimalServices,StatusAnimal,$http)
{


    $scope.toAdoption=function()
    {
        var today = new Date();
        $scope.statusanimal={};
        $scope.statusanimal.animal_id=GlobalAnimalServices.getAnimalId();
        $scope.statusanimal.status="Adopcion";
        $scope.statusanimal.date=today;
        $scope.statusanimal.state=1;
        console.log($scope);
        $http(
            {
                method:'POST',
                url:'http://homeformeapi.localhost/animalstatus',
                data:$scope.statusanimal
            });
        $state.go('adoptionAnimals');
    };

}).controller('AnimalAdoptionController',function($scope,$state,$stateParams,Adoption,StatusAnimal,Animal)
{

    $scope.docs=[{name:'Factura luz'},{name:'Factura agua'},{name:'Fotocopia Carnet'},{name:'Permiso (Depto o alquiler)'}];
    $scope.adoption=new Adoption();

    $scope.statusanimal=new StatusAnimal();

    $scope.animal=Animal.get({id:$stateParams.id});

    $scope.addAdoption=function()
    {
        $scope.adoption.animal_id=$stateParams.id;
        $dateFixed=Date.parse($scope.adoption.birthDate,'MM-DD-YYYY');
        console.log($dateFixed);

        $scope.adoption.docs="";
        angular.forEach($scope.docs,function(opt)
        {
            console.log("inside for");
            if(opt.selected)
            {
                $scope.adoption.docs=$scope.adoption.docs+opt.name+";";
            }
        });
        $scope.statusanimal.animal_id=$stateParams.id;
        $scope.statusanimal.status="Adoptado";
        $scope.statusanimal.date=Date.now();
        $scope.statusanimal.state=1;
        console.log($scope);
        $scope.adoption.$save();

        $scope.statusanimal.$save(function()
        {
            $state.go('adoptedAnimals')
        });

    }


}).controller('AnimalAdoptionListController',function($scope,$stateParams,Adopted)
{
    $scope.animal=Adopted.get({id:$stateParams.id});
});
