using comicalDotNet.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace comicalDotNet.Controllers
{
    public class issuesController : ApiController
    {

        private Issue[] getJsonStringFromFile1()
        {
            Issue[] items;
            string json;
            using (StreamReader r = new StreamReader("C:/Users/stuart.callen/Documents/dotnet/bootcamp2016-bane.DotNet/comicalDotNet/comicalDotNet/Issues.json"))
            {
                json = r.ReadToEnd();
                items = JsonConvert.DeserializeObject<Issue[]>(json);
            }
            return items;
        }

        private Issue getJsonStringFromFileAtPosition(int ID)
        {
            Issue[] items = getJsonStringFromFile1();
            foreach (var item in items)
            {
                if (item.Id == ID)
                    return item;
            }

            return null;
        }

    /*    public Issue[] pagenation(int pageNumber, int pageSize)
        {
            int startIndex= pageNumber * pageSize;
            int index = startIndex+pageSize;
            Issue[] items;
            Issue[] itemsReturned;
            for (int i = startIndex; i < index; i++)
            {

            }

        }*/

        // GET api/<controller>
        public IEnumerable<Issue> Get()
        {

            return getJsonStringFromFile1();
        }

        public IEnumerable<Issue> Get(int pageNumber, int pageSize)
        {

            return getJsonStringFromFile1();
        }

        // GET api/<controller>/5
        public Issue Get(int id)
        {

            return getJsonStringFromFileAtPosition(id);
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}