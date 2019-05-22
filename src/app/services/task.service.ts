import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Task } from "../tasklist/tasklist.component";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    private taskCollection: AngularFirestoreCollection<Task>;

    tasks: Observable<Task[]>;

    constructor(private afs: AngularFirestore) {
        this.taskCollection = afs.collection<Task>('items');
        this.get();
    }

    check(e) {
        console.log(e);
        const id = e.option.value;
        const checked = e.option.selected;
        this.taskCollection.doc(id).update({
            "completed": checked
        });
    }

    create(name: string, listName: string) {
        let id = this.afs.createId();
        let item: Task = { name:name, listName:listName, completed:false };
        this.taskCollection.doc(id).set(item);
    }

    delete(id: string) {
        this.taskCollection.doc(id).delete();
    }

    // used exclusively by ListService.delete()
    deleteAllFromList(listName: string) {
        let task_query = this.taskCollection.ref.where('listName','==', listName);
        task_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        });
    }

    edit(id: string, name: string, listName: string) {
        this.taskCollection.doc(id).update({
            "name": name,
            "listName": listName
        });
    }

    // used exclusively by ListService.edit()
    editAllFromList(listName: string, prevListName: string) {
        let task_query = this.taskCollection.ref.where('listName','==', prevListName);
        task_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.update({
                    "listName": listName
                });
            });
        });
    }

    get() {
        this.tasks = this.taskCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as Task;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }
}
