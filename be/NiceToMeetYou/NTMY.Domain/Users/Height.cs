using System;
using System.Collections.Generic;

namespace NTMY.Domain.Users
{
    public struct Height : IEquatable<Height>
    {
        public decimal Value { get; private set; }
        public string Unit { get; private set; }

        public static string Millimeter = "mm";
        public static string Centimeters = "cm";
        public static string Meters = "m";

        private static readonly Dictionary<string, decimal> _availableUnits = new Dictionary<string, decimal>()
        {
            {Millimeter, 1},
            {Centimeters, 10},
            {Meters, 1000}
        };

        public Height(decimal value, string unit)
        {
            ValidateValue(value);
            ValidateUnit(unit);
            Value = value;
            Unit = unit.ToLower();
        }

        public bool CanConvert(string unit) => _availableUnits.ContainsKey(unit);

        public bool Equals(Height other)
        {
            return Convert(other, Unit).Value == Value;
        }

        public static Height Convert(Height Height, string unit)
        {
            if (!Height.CanConvert(unit))
            {
                throw new ArgumentException("Height unit not supported");
            }

            var multiplier = _availableUnits[Height.Unit] / _availableUnits[unit];

            return new Height(Height.Value * multiplier, unit);
        }

        public override bool Equals(object obj)
        {
            return obj is Height other && Equals(other);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Value, Unit);
        }

        public override string ToString() => $"{Value} {Unit}";

        public static Height Empty() => new Height(0, Centimeters);

        private static void ValidateValue(decimal value)
        {
            if (value < 0)
            {
                throw new ArgumentException("Height value should be positive");
            }
        }

        private static void ValidateUnit(string unit)
        {
            if (unit == null || !_availableUnits.ContainsKey(unit.ToLower()))
            {
                throw new ArgumentException("Height unit not supported");
            }
        }

    }
}