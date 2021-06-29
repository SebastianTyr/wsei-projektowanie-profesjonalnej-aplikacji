namespace NTMY.SharedKernel
{
    public interface IDomainEntity
    {
        int No { get; }
        bool IsArchived { get; }

        void MarkAsArchived();
    }
}
