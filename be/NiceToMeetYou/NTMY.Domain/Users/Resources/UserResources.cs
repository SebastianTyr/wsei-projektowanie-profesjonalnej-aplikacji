﻿using System;
using System.Collections.Generic;
using System.Text;

namespace NTMY.Domain.Users.Resources
{
    public static class UserResources
    {
        public const string PasswordsNotMatchMessage = nameof(PasswordsNotMatchMessage);
        public const string PasswordNotMatchRulesMessage = nameof(PasswordNotMatchRulesMessage);
        public const string UserNotFoundMessage = nameof(UserNotFoundMessage);
        public const string UserAlreadyExistsMessage = nameof(UserAlreadyExistsMessage);
        public const string IncorrectCredentialsMessage = nameof(IncorrectCredentialsMessage);
    }
}
