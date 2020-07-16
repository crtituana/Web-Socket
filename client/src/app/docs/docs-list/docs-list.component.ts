import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DocsService } from '../../services/docs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss'],
})
export class DocsListComponent implements OnInit, OnDestroy {
  docs: Observable<string[]>;
  currentDoc: string;
  docAuth: any;
  private _docSubscribe: Subscription;

  constructor(private docsService: DocsService, private router: Router) {

  }

  ngOnInit(): void {
    this.docs = this.docsService.docs;
    this._docSubscribe = this.docsService.currentDoc.subscribe(
      (doc) => ((this.currentDoc = doc.id), (this.docAuth = doc))
    );
   
  }

  ngOnDestroy() {
    this._docSubscribe.unsubscribe();
  }

  getDoc = async (id: string) => {
    this.docsService.getDoc(id);

    let roomName = prompt('Access name');

    if (this.docAuth.roomName === roomName) {
      let roomPassword = prompt('Room password');
      if (this.docAuth.roomPassword === roomPassword) {
        this.docsService.getDoc(id);
        this.router.navigate(['/docs/doc']);
      } else {
        alert('Wrong password, try again');
      }
    } else {
      alert('Wrong room name, try again');
     
    }
  };

  addDoc() {
    let roomName = prompt('Escribe un nombre para el archivo a gradar'),
      roomPassword = prompt('Por favor escribe una clave para el documento');

    this.docsService.addDoc({
      id: '',
      doc: '',
      userName: '',
      roomName,
      roomPassword,
    });
  }
}
