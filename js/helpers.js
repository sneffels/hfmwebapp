/**
 * Created by wendy on 04-05-16.
 */
angular.module('animalModule', []);

function replaceString($scope)
{
    $scope.setText=function(obj)
    {
        if(obj=="4")
        {
            return obj.replace("4","Perdido");
        }

    };
}

