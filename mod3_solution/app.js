(function() {
      'use strict';

angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowItDownCtrl = this;
  narrowItDownCtrl.error = false;
  narrowItDownCtrl.getMenuItems = function() {
    narrowItDownCtrl.error = false;
    if(narrowItDownCtrl.searchTerm) {
      MenuSearchService.getMatchedMenuItems(narrowItDownCtrl.searchTerm).then(function(result) {
        narrowItDownCtrl.found = result;
        if(result.length == 0) {
          narrowItDownCtrl.error = true;
        }
      });
    } else {
      narrowItDownCtrl.error = true;
    }
  }

  narrowItDownCtrl.removeItemFromFound = function (itemIndex) {
    narrowItDownCtrl.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: 'GET',
      url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
    }).then(function(result) {
      // process result and only keep items that match
      var foundItems = [];
      result.data.menu_items.forEach(function(menuItem) {
        if(menuItem.description.indexOf(searchTerm) != -1){
          foundItems.push(menuItem);
        }
      });
      return foundItems;
    })
  };
}

function FoundItemDirective() {
    var ddo = {
      templateUrl: 'foundItem.html',
      scope: {
        foundItem: '<', // one-way binding
        onRemove: '&'
      },
      replace: true
    };
    return ddo;
}

})();
