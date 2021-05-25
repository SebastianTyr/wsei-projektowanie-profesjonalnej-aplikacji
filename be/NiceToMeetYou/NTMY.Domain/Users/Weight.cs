using System;
using System.Collections.Generic;

namespace NTMY.Domain.Users
{
    public struct Weight : IEquatable<Weight>
    {
        public decimal Value { get; private set; }
        public string Unit { get; private set; }

        public static string Kilograms = "kg";
        public static string Grams = "g";
        public static string Tons = "t";

        private static readonly Dictionary<string, decimal> _availableUnits = new Dictionary<string, decimal>()
        {
            {Grams, 1},
            {Kilograms, 1000},
            {Tons, 1000000}
        };

        public Weight(decimal value, string unit)
        {
            ValidateValue(value);
            ValidateUnit(unit);
            Value = value;
            Unit = unit.ToLower();
        }

        public bool CanConvert(string unit) => _availableUnits.ContainsKey(unit);

        public bool Equals(Weight other)
        {
            return Convert(other, Unit).Value == Value;
        }

        public static Weight Convert(Weight weight, string unit)
        {
            if (!weight.CanConvert(unit))
            {
                throw new ArgumentException("Weight unit not supported");
            }

            var multiplier = _availableUnits[weight.Unit] / _availableUnits[unit];

            return new Weight(weight.Value * multiplier, unit);
        }

        public override bool Equals(object obj)
        {
            return obj is Weight other && Equals(other);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Value, Unit);
        }

        public override string ToString() => $"{Value} {Unit}";

        public static Weight Empty() => new Weight(0, Kilograms);

        private static void ValidateValue(decimal value)
        {
            if (value < 0)
            {
                throw new ArgumentException("Weight value should be positive");
            }
        }

        private static void ValidateUnit(string unit)
        {
            if (unit == null || !_availableUnits.ContainsKey(unit.ToLower()))
            {
                throw new ArgumentException("Weight unit not supported");
            }
        }

    }
}