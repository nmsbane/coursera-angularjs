(function() {
      'use strict';

      angular.module('LunchCheck', [])
             .controller('LunchCheckController', checkLunch);


      checkLunch.$inject = ["$scope"];

      function checkLunch($scope) {
        $scope.inputData = '';
        $scope.emptyMessage = '';
        $scope.validMessage = '';

        $scope.check = function(){
          // if the check box is clicked and the inputData is empty then show the message
          // "Please enter data first" should be displayed.
          if($scope.inputData === '') {
            $scope.emptyMessage =  "Please enter data first";
          } else {
              var b = /([^,]+)/g;
              var data = $scope.inputData.match(b);
              if(data.length <= 3) {
                $scope.validMessage = "Enjoy!";
              } else {
                $scope.validMessage = "Too much!";
              }
              $scope.emptyMessage = '';
          }
        }

  }
}
)();
