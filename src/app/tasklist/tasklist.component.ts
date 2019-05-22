import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CreateEditListComponent } from "../create-edit-list/create-edit-list.component";
import { EditTaskComponent } from "../edit-task/edit-task.component";
import { ListService } from '../services/list.service';
import { TaskService } from '../services/task.service';

export interface Task {
    name: string;
    listName: string;
    completed: boolean;
}

export interface List {
    name: string;
}

@Component({
    selector: 'app-tasklist',
    templateUrl: './tasklist.component.html',
    styleUrls: ['./tasklist.component.css']
})

export class TasklistComponent implements OnInit {

    constructor(public listService: ListService, public taskService: TaskService, private dialog: MatDialog) {}

    ngOnInit() {
    }

    createEditListDialog(id: string = "") {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        let title = (id == "") ? "Add New List" : "Edit List";

        dialogConfig.data = {
            title: title,
            id: id
        }

        this.dialog.open(CreateEditListComponent, dialogConfig);
    }

    editTaskDialog(id: string, name: string, listName: string) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: id,
            name: name,
            listName: listName,
        }

        this.dialog.open(EditTaskComponent, dialogConfig);
    }


    title = "TaskList";
}