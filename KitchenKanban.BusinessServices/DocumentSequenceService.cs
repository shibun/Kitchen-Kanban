﻿using KitchenKanban.BusinessServices.Interfaces;
using KitchenKanban.DataServices.Context;
using KitchenKanban.DataServices.UserInfo;
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
            if (documentSequence != null)
            {
                var runningSequence = documentSequence.CurrentSequenceNumber + 1;
                documentSequence.CurrentSequenceNumber = runningSequence;
                _databaseContext.DocumentSequences.Update(documentSequence);
                _databaseContext.SaveChanges();

                string zeroAppender = "D" + documentSequence.SequenceLength;
                string monthPrefix = currentDate.Year.ToString() + currentDate.Month.ToString("D2");
                string documentNumber = documentSequence.DocumentPrefix + monthPrefix + "-" + currentDate.Day.ToString("D2") + runningSequence.ToString(zeroAppender);

                return documentNumber;
            }

            return null;
        }
    }
}