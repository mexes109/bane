using comicalDotNet.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using comicalDotNet.Repository;

namespace comicalDotNet.Controllers
{
    public class issuesController : ApiController
    {
        static readonly IRepository repository = new Repository.Repository();

        // GET /<controller>
        public IEnumerable<Issue> Get()
        {
            return repository.GetAll();
        }
        public issuesController()
        { }
        public IEnumerable<Issue> find(int pageNumber, int pageSize)
        {

            return repository.GetAll();
        }

        // GET /<controller>/5
        public Issue Get(int id)
        {

            return repository.Get(id);
        }

        public IEnumerable<Issue> getByTitle(String id)
        {
            return repository.getIssueByName(id);
        }
        public Issue getByPublisher(int id)
        {
            return repository.getIssueByPublisher(id);
        }
        public Issue getByPublicationDate(DateTime id)
        {
            return repository.getIssueByPublicationDate(id);
        }
        // POST /<controller>
        public void SaveIssue([FromBody]string value)
        {
            //repository.Add(value);
        }

        // PUT /<controller>/5
        public void UpdateIssue(int id, [FromBody]string value)
        {
            //Issue issue = repository.Get(id);
            //issue.
            //repository.Update(
        }

        // DELETE api/<controller>/5
        public void remove(int id)
        {
            repository.Remove(id);
        }
    }
}