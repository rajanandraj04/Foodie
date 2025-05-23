using Food_api.Models;
namespace Food_api;

public interface LoginInterface
{
    public Task<IEnumerable<User>> GetUser();

    public Task<User> NormalUserLogin(int UserId,string Password);

    public Task<User> UserLogin(string Email,string Password);

    public Task<User> AddEmployee(UserDto user);
}
