using System;
using static KitchenKanban.Models.Enums.DocumentEnum;

namespace KitchenKanban.Models
{
    public class DocumentSequence
    {
        public string DocumentSequenceId { get; set; }
        public DocumentType DocumentType { get; set; }
        public string DocumentPrefix { get; set; }
        public int CurrentSequenceNumber { get; set; }
        public int SequenceLength { get; set; }
        public DateTime? SequenceNumberLastResetOn { get; set; }
    }
}
