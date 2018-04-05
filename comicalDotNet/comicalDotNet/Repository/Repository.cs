using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using comicalDotNet.Models;
using System.IO;
using Newtonsoft.Json;

namespace comicalDotNet.Repository
{
    public class Repository : IRepository
    {
        List<Issue> issueList;

        public Repository()
        {
            string json;
            using (StreamReader r = new StreamReader("C:/Users/timothy.snayers/Documents/.NET Boot Camp/bootcamp2016-bane.DotNet/comicalDotNet/comicalDotNet/comicalDotNet/Issues.json"))
            {
                json = r.ReadToEnd();
                issueList = JsonConvert.DeserializeObject<List<Issue>>(json);
            }
        }

        public IEnumerable<Issue> GetAll()
        {
            return issueList;
        }

        public Issue Get(int id)
        {
            foreach (var issue in issueList)
            {
                if (issue.Id == id)
                    return issue;
            }

            return null;
        }

        public void Add(Issue issue)
        {
            issueList.Add(issue);
        }

        public Issue Remove(int id)
        {
            Issue issue = issueList[id];
            issueList.RemoveAt(id);
            return issue;
        }
        //New method
        public IEnumerable<Issue> getIssueByName(String Name)
        {
            List<Issue> issueByTitleList = new List<Issue>();
            foreach (Issue issue in issueList)
            {
                if (issue.Title.ToUpper().Contains(Name.ToUpper()))
                {
                    issueByTitleList.Add(issue);
                }
                    
            }

            if (issueByTitleList.Count < 1)
            {
                return null;
            }else
            {
                return issueByTitleList;
            }
        }
        //New Method
        public Issue getIssueByPublisher(int publisher)
        {
             foreach (Issue issue in issueList)
            {
                if (issue.Publisher == publisher)
                    return issue;
            }
            return null;
        }
        //New Method
        public Issue getIssueByPublicationDate(DateTime date)
        {
            foreach (Issue issue in issueList)
            {
                if (issue.PublicationDate == date)
                    return issue;
            }
            return null;
        }

        public void Update(Issue issue)
        {
            issueList[issueList.IndexOf(issue)] = issue;
        }
    }
}