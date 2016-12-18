(function() {
      'use strict';

      angular.module('ShoppingListCheckOff', [])
             .controller('ToBuyController', toBuyController)
             .controller('AlreadyBoughtController', alreadyBoughtController)
             .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

      toBuyController.$inject = ['ShoppingListCheckOffService']

      function toBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.toBuyItems;

        toBuy.removeItem = function(index) {
          ShoppingListCheckOffService.addItem(ShoppingListCheckOffService.boughtItems, toBuy.items[index]);
          ShoppingListCheckOffService.removeItem(ShoppingListCheckOffService.toBuyItems, index);
        }
      }

      alreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

      function alreadyBoughtController( ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.boughtItems;

      }

      function ShoppingListCheckOffService() {
        var service = this;

        service.toBuyItems = [{ name: "cookies", quantity: 10 },
          { name: "cookies", quantity: 20 },
          { name: "cookies", quantity: 30 },
          { name: "cookies", quantity: 40 },
          { name: "cookies", quantity: 50 },
          { name: "cookies", quantity: 60 }
        ];
        service.boughtItems = [];

        service.addItem = function(referenceArray, item) {
          referenceArray.push(item);
        }

        service.removeItem = function(referenceArray, index) {
          referenceArray.splice(index, 1);
        }

      }
}
)();
