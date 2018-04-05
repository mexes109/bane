using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using comicalDotNet.Models;

namespace comicalDotNet.Repository
{
    public interface IRepository
    {
        void Add(Issue issue);
        IEnumerable<Issue> GetAll();
        Issue Get(int id);
        Issue Remove(int id);
        void Update(Issue issue);
        IEnumerable<Issue> getIssueByName(String Name);
        Issue getIssueByPublicationDate(DateTime date);
        Issue getIssueByPublisher(int publisher);
    }
}