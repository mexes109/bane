using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace comicalDotNet.Models
{
    public class Issue
    {
        public int Id;
        public string Title;
        public string Description;
        public int SeriesNumber;
        public DateTime PublicationDate;
        public int Publisher;
        public int[] Creators;
        public Stock[] Stock;
    }
}