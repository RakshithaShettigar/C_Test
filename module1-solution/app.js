(function (){
    'use strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject= ['$scope'];

    function LunchCheckController($scope){
        $scope.list="";
        $scope.output="";
        $scope.Check =function(){
            if ($scope.list==""){
                $scope.output="Please enter data first";
            }
            var item_list=$scope.list.split(",").filter(Boolean);
            if (item_list.length <= 3 && item_list.length!=0)
            {
                $scope.output="Enjoy!";
            }
            else if(item_list.length > 3){
                $scope.output="Too much!";
            }           
        }
        
        
        

    }
})();