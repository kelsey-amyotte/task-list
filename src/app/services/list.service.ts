import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from "./task.service";
import { List } from "../tasklist/tasklist.component";

@Injectable({
  providedIn: 'root'
})
export class ListService {

    private listCollection: AngularFirestoreCollection<List>;

    lists: Observable<List[]>;


  constructor(private afs: AngularFirestore, private taskService: TaskService) {
      this.listCollection = afs.collection<List>('lists');
      this.get();
  }

    create(id: string) {
        this.listCollection.doc(id).set({});
    }

    // deletes old list (firestore doesn't allow document ID changes), makes new list document, then
    // changes all references to that list in the items collection
    edit(id: string, prevId: string) {
        this.listCollection.doc(prevId).delete();
        this.listCollection.doc(id).set({});
        this.taskService.editAllFromList(id, prevId);
    }

    // deletes list, then deletes all tasks associated with the list
    delete(id: string) {
        this.listCollection.doc(id).delete();
        this.taskService.deleteAllFromList(id);
    }

    get() {
        this.lists = this.listCollection.snapshotChanges().pipe(
            map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as List;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });
            })
        );
    }
}
