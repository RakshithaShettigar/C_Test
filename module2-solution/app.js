(function(){

    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller("ToBuyController",ToBuyController)
    .controller("AlreadyBoughtController",AlreadyBoughtController)
    .service("ShoppingListCheckOffService",ShoppingListCheckOffService);

    ToBuyController.$inject=["ShoppingListCheckOffService"];

    function ToBuyController (ShoppingListCheckOffService){
        var buy=this;
        
        buy.buy_items=ShoppingListCheckOffService.getBuy_items();

        buy.checkOff=function(index){

            ShoppingListCheckOffService.checkOff(index);
        }
    }
    AlreadyBoughtController.$inject=["ShoppingListCheckOffService"];

    function AlreadyBoughtController (ShoppingListCheckOffService){
        var bought=this;
        
        bought.b_items=ShoppingListCheckOffService.getBought_items();

    }
    function ShoppingListCheckOffService(){
        var service=this;
        var buy_items=[
            {
                name:'Chocolates',
                quantity:'10 bags'
            },
            {
                name:'Ice-Cream',
                quantity:'10 packets'
            
            },
            {
                name:'Cheese',
                quantity:'5 cubes'
            
            },
            {
                name:'Oil',
                quantity:'1 Bottle'
            
            },
            {
                name:'Soap',
                quantity:'3 boxes'
            
            },

        ];

        var bought=[];
        service.getBuy_items=function()
        {
            return buy_items;
        }
        service.checkOff=function(index){
            bought.push(buy_items[index]);
            buy_items.splice(index,1);

            console.log(bought);
            console.log(buy_items);
        }
        service.getBought_items=function(){
            return bought;
        }
    }
})();