import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TasklistComponent } from "../tasklist/tasklist.component";
import { ListService } from './../services/list.service';

@Component({
  selector: 'app-create-edit-list',
  templateUrl: './create-edit-list.component.html',
  styleUrls: ['./create-edit-list.component.css']
})

export class CreateEditListComponent {

    title: string;
    listName: string;
    oldListName: string;
    isEdit: boolean;

    constructor(public listService: ListService,
                private dialogRef: MatDialogRef<TasklistComponent>,
                @Inject(MAT_DIALOG_DATA) data) {

        this.title = data.title;
        console.log(data.id);
        if (data.id == undefined || data.id == "") {
            this.listName = "";
            this.isEdit = false;
        }
        else {
            this.listName = data.id;
            this.oldListName = data.id;
            this.isEdit = true;
        }
    }

    save() {
        this.listService.edit(this.listName, this.oldListName);
    }

    close() {
        this.dialogRef.close();
    }

    create() {
        this.listService.create(this.listName);
    }
}
