using static KitchenKanban.Models.Enums.DocumentEnum;

namespace KitchenKanban.BusinessServices.Interfaces
{
    public interface IDocumentSequenceService
    {
        string GetDocumentNumber(DocumentType documentType);
    }
}
