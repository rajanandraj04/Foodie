﻿using System;
using System.Collections.Generic;

namespace Food_api.Models;

public partial class UserDto
{
    

    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public string? Password { get; set; }

    public string? ConfirmPassword {get; set;}

    public string? Role { get; set; }
}