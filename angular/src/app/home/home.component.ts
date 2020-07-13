import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
    PagedListingComponentBase,
    PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  TaskServiceProxy,
    GetTasksOutput,
    TaskDto,
    TenantDtoPagedResultDto,
    TaskState
} from '@shared/service-proxies/service-proxies';
import { CreateTaskDialogComponent } from './create-task/create-task-dialog.component';
class PagedTasksRequestDto extends PagedRequestDto {
    keyword: TaskState._1;
    isActive: boolean | null;
}
@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent extends AppComponentBase {

    tasks: TaskDto[] = [];
    keyword = TaskState._1;
    constructor(
        injector: Injector,
        private _taskService: TaskServiceProxy,
        private _modalService: BsModalService 
    ) {
        super(injector);
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
        //createTaskDialog.content.onSave.subscribe(() => {
        //    this.refresh();
        //});
        
        }

    //list(
    //    request: PagedTasksRequestDto,
    //    pageNumber: number,
    //    finishedCallback: Function
    //): void {
    //    request.keyword = this.keyword;
    //    request.isActive = this.isActive;

    //    this._taskService
    //        .getTasks(
    //            request.keyword,

    //        )
    //        .pipe(
    //            finalize(() => {
    //                finishedCallback();
    //            })
    //        )
    //        .subscribe((result: TenantDtoPagedResultDto) => {
    //            this.tasks = result.items;
    //            this.showPaging(result, pageNumber);
    //        });
    //}
    
}
