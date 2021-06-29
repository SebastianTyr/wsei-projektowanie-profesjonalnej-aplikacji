using System;

namespace NTMY.Domain.Users
{
    public struct Address : IEquatable<Address>
    {
        public string Street { get; private set; }
        public string City { get; private set; }
        public string PostCode { get; private set; }
        public string Country { get; private set; }

        public bool Equals(Address other)
        {
            return Street == other.Street && City == other.City && PostCode == other.PostCode && Country == other.Country;
        }

        public override bool Equals(object obj)
        {
            return obj is Address other && Equals(other);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Street, City, PostCode, Country);
        }

        public override string ToString() => $"{Street}, {PostCode}, {City}, {Country}";
    }
}