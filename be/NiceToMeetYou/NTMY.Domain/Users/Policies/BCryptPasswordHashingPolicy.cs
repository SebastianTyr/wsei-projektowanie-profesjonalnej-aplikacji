﻿namespace NTMY.Domain.Users.Policies
{
    public class BCryptPasswordHashingPolicy : IPasswordHashingPolicy
    {
        public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);
        public bool VerifyPassword(string password, string passwordHash) => BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }
}