using System;
using System.ComponentModel.DataAnnotations;

namespace KitchenKanban.Models
{
    public abstract class BaseModel
    {
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }

        [MaxLength(128)]
        public string CreatedBy { get; set; }

        [MaxLength(128)]
        public string UpdatedBy { get; set; }
    }
}
