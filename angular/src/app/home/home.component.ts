import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
    PagedListingComponentBase,
    PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
    TaskServiceProxy,
    TaskDto,
    TaskDtoPagedResultDto,
    TaskState,
    UpdateTaskInput
} from '@shared/service-proxies/service-proxies';
import { CreateTaskDialogComponent } from './create-task/create-task-dialog.component';
class PagedTasksRequestDto extends PagedRequestDto {
    keyword: TaskState;
    isActive: boolean | null;
}
@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent extends PagedListingComponentBase<TaskDto> {
   
    tasks: TaskDto[];
    keyword = TaskState._1;
    p
    constructor(
        injector: Injector,
        private _taskService: TaskServiceProxy,
        private _modalService: BsModalService 
    ) {
        super(injector);
    }

    completeTask(task: TaskDto): void {
        let taskInput = <UpdateTaskInput>{};
        taskInput.taskId = task.id;
        taskInput.state = TaskState._2;
        this._taskService
            .updateTask(taskInput)
            .pipe(
                finalize(() => {
                    abp.notify.success(this.l('Task Successfully Updated'));
                    this.refresh();
                })
            )
            .subscribe(() => { });
                
          
    }
    createTask(): void {
        this.showCreateTaskDialog();
    }
    showCreateTaskDialog(id?: number): void {
        let createTaskDialog: BsModalRef;
      
        createTaskDialog = this._modalService.show(
                CreateTaskDialogComponent,
                {
                    class: 'modal-lg',
                }
        );
        createTaskDialog.content.onSave.subscribe(() => {
            this.ngOnInit();
        });
        
        }

    list(
        request: PagedTasksRequestDto,
        pageNumber: number,
        finishedCallback: Function
    ): void {
        
       
        this._taskService.getTasks(this.keyword,undefined)
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: TaskDtoPagedResultDto) => {
                this.tasks = result.items;

            });
    }
    protected delete(entity: TaskDto): void {
        //throw new Error("Method not implemented.");
    }

    
}
