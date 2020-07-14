import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
   CreateTaskInput,
    TaskServiceProxy,
    PersonServiceProxy,
    GetAllPeopleOutput,
    PersonDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: 'create-task-dialog.component.html'
})
export class CreateTaskDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
    task: CreateTaskInput = new CreateTaskInput();
    people: PersonDto[]=[];
  @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _taskService: TaskServiceProxy,
        public _persornService: PersonServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    

    ngOnInit(): void {
        this._persornService.getAllPeople()
            .subscribe((result: GetAllPeopleOutput) => {
                this.people = result.people;

            });

    }
    SetSelectedPerson(selectedVal: any) {
        this.task.assignedPersonId = selectedVal;
    }
    save(): void {
        this.saving = true;

    this._taskService
        .createTask(this.task)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
        this.ngOnInit();
      });
  }
}
