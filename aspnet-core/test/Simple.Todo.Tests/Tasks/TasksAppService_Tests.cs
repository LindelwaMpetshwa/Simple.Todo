using Simple.Todo.Tasks;
using Simple.Todo.Users;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using Simple.Todo.Tasks.Dtos;
using Shouldly;
using Microsoft.EntityFrameworkCore;
namespace Simple.Todo.Tests.Tasks
{
    public class TasksAppService_Tests : TodoTestBase
    {
        private readonly ITaskAppService _taskAppService;

        public TasksAppService_Tests()
        {
            _taskAppService = Resolve<ITaskAppService>();
        }

        [Fact]
        public void GetTasks_Test()
        {
            // Act
            var output = _taskAppService.GetTasks(new GetTasksInput { State = TaskState.Active});

            // Assert
            output.Tasks.Count.ShouldBeGreaterThan(0);
        }
        
        [Fact]
        public async void CreateTask_Test()
        {
            // Act
             _taskAppService.CreateTask(
                new CreateTaskInput
                {
                    Description="Review Pull Request",
                    AssignedPersonId=1,
                });
            // Assert
            await UsingDbContextAsync(async context =>
            {
                var taskDetails = await context.Task.FirstOrDefaultAsync(i=>i.Description == "Review Pull Request" && i.AssignedPersonId==1);
                taskDetails.ShouldNotBeNull();
            });
        }
        [Fact]
        public async void UpdateTask_Test()
        {
            // Act
            _taskAppService.UpdateTask(
              new UpdateTaskInput { 
              TaskId=1,
               State=TaskState.Completed
              });

            // Assert
            await UsingDbContextAsync(async context =>
            {
                var taskDetails = await context.Task.FirstOrDefaultAsync(i => i.Id ==1 && i.State == TaskState.Completed);
                taskDetails.ShouldNotBeNull();
            });
        }
    }
}
