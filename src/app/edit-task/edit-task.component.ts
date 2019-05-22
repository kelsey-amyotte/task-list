import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TasklistComponent } from "../tasklist/tasklist.component";
import { TaskService } from './../services/task.service';
import { ListService } from './../services/list.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
    providers: [ ListService ]
})

export class EditTaskComponent {

    title: string;
    id: string;
    name: string;
    listName: string;
    lists;

    constructor(public listService: ListService, public taskService: TaskService,
                private dialogRef: MatDialogRef<TasklistComponent>,
                @Inject(MAT_DIALOG_DATA) data) {

        this.title = "Edit Task";
        this.id = data.id;
        this.name = data.name;
        this.listName = data.listName;

        this.lists = listService.lists;
    }

    save() {
        this.taskService.edit(this.id, this.name, this.listName);
    }

    close() {
        this.dialogRef.close();
    }

}