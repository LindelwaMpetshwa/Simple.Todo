using Simple.Todo.Tasks;
using Simple.Todo.Users;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Simple.Todo.Tasks.Dtos;
using Shouldly;
using Microsoft.EntityFrameworkCore;
using Simple.Todo.People;

namespace Simple.Todo.Tests.Tasks
{
    public class PersonAppService_Tests : TodoTestBase
    {
        private readonly IPersonAppService _personAppService;

        public PersonAppService_Tests()
        {
            _personAppService = Resolve<IPersonAppService>();
        }

        [Fact]
        public async void GetPeople_Test()
        {
            // Act
            var output = await _personAppService.GetAllPeople();

            // Assert
            output.People.Count.ShouldBeGreaterThan(0);
        }
        
        
    }
}
