/**
 * Created by wendy on 09-05-16.
 */
angular.module('animalCRUD.directives',[])
    .directive('ng-file',function(){
       return{
           scope:{
               file:'='
           },
           link: function (scope,el,attrs) {
               el.bind('change', function (event) {
                   var file=event.target.files[0];
                   scope.file=file?file:undefined;
                   scope.$apply();
               });
           }
       };
    });


