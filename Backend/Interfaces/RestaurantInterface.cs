using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Food_api.Models;

namespace Food_api.Interfaces
{
    
    public interface RestaurantInterface
    {
        public Task<IEnumerable<Restaurant>> displayForUser(int Id);

        public Task<IEnumerable<Restaurant>> displayAllRestaurant();

       public Task<MenuItem> addMenuItem(int RestaurantID);

        public Task<Restaurant> AddRestaurant(RestaurantDto restaurantDto);

        public Task<Restaurant> DeleteRestaurant(int id);

        public Task<Restaurant> GetRestaurantByResID(int id);
        
    }
}