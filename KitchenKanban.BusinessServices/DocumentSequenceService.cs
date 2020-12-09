using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
using KitchenKanban.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using static KitchenKanban.Models.Enums.DocumentEnum;

namespace KitchenKanban.BusinessServices
{
    public class DocumentSequenceService : IDocumentSequenceService
    {
        private readonly IServiceScope _scope;
        private readonly KitchenKanbanDB _databaseContext;
        private IUserInfo _userInfo;

        public DocumentSequenceService(IServiceProvider services, IUserInfo userInfo)
        {
            _userInfo = userInfo;
            _scope = services.CreateScope();
            _databaseContext = _scope.ServiceProvider.GetRequiredService<KitchenKanbanDB>();
        }

        public string GetDocumentNumber(DocumentType documentType)
        {
            DateTime currentDate = DateTime.Now;
            var documentSequence = _databaseContext.DocumentSequences.Where(x => x.DocumentType == documentType).FirstOrDefault();
            if (documentSequence == null)
            {
                documentSequence = Initialize(documentType);
            }
            var runningSequence = documentSequence.CurrentSequenceNumber + 1;
            documentSequence.CurrentSequenceNumber = runningSequence;
            _databaseContext.DocumentSequences.Update(documentSequence);
            _databaseContext.SaveChanges();

            string zeroAppender = "D" + documentSequence.SequenceLength;
            string monthPrefix = currentDate.Day.ToString("D2") + currentDate.Month.ToString("D2") + currentDate.Year.ToString();
            string documentNumber = documentSequence.DocumentPrefix + monthPrefix + "-" + runningSequence.ToString(zeroAppender);

            return documentNumber;
        }

        private DocumentSequence Initialize(DocumentType documentType)
        {
            switch (documentType)
            {
                case DocumentType.Order:
                    var documentSequence = new DocumentSequence
                    {
                        DocumentSequenceId = Guid.NewGuid().ToString(),
                        CurrentSequenceNumber = 0,
                        DocumentPrefix = "",
                        DocumentType = DocumentType.Order,
                        SequenceLength = 4,
                        SequenceNumberLastResetOn = DateTime.Now
                    };
                    _databaseContext.DocumentSequences.Add(documentSequence);
                    _databaseContext.SaveChanges();
                    return documentSequence;
                default:
                    throw new NotImplementedException("Document number configuration not found.");
            }
        }
    }
}
