(function(){
    'use strict';

     angular.module("NarrowItDownApp",[])
     .controller("NarrowItDownController",NarrowItDownController)
     .service("MenuSearchService",MenuSearchService)
     .constant("API","https://davids-restaurant.herokuapp.com/menu_items.json")
     .directive("foundItems",FoundItems);

     function FoundItems(){
         var ddo={
            templateUrl:'foundItems.html',
            scope:{
                found:'<',
                onRemove:'&',
                nothing:'&'
            },
            
            controller:FoundItemsController,
            controllerAs:'list',
            bindToController:true
         };
         return ddo;
     }
     
     function FoundItemsController(){
        var list=this;
        list.nothing=function(){
            console.log("Search Term - ",list.search_term)
            if (list.found.length==0){
                return true;
            }
            return false;
        };
     }
     NarrowItDownController.$inject=["MenuSearchService"];
     function NarrowItDownController(MenuSearchService){
        var list =this;
        list.search_term="";
       
        list.find=function(search_term){
            list.found= MenuSearchService.getMatchedMenuItemsfunction(search_term);
            console.log(list.found);
        }
        list.onRemove=function($index){
            MenuSearchService.onRemove($index);
        }
       
     }

     MenuSearchService.$inject=['$http','API'];
     function MenuSearchService($http,API){
        var service =this;
        
        var found=[];
        service.getMatchedMenuItemsfunction=function(search_term){
            found=[];
            if (search_term==''){
                
            }
            else{
                var response = $http({
                    method: "GET",
                    url: API
                    
                  }).then(function(response){
                   
                    for(var i=0;i<response.data.menu_items.length;i++){
                        if(response.data.menu_items[i].description.indexOf(search_term)!=-1){
                           
                           found.push(response.data.menu_items[i]);
                        }
        
                    }
                    
                 }).catch(function(error){
                    console.log(error);
                 });
            }
           
            return found;
        }
        service.onRemove=function($index){
            found.splice($index,1);
        }
     }
    
    //  function MyFactory(){
    //      var factory=function(){
    //          return new MyService();
    //      }
    //      return factory;
    //  }

})();