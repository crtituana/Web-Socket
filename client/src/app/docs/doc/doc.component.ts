import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DocsService } from '../../services/docs.service';
import { Docs } from '../../models/docs';
import jwt_decode from 'jwt-decode';
import { PermissionsService } from '../../services/permissions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit, OnDestroy {
  currentUserName: Observable<string>;
  document: Docs;
  private _docSubscribe: Subscription;

  constructor(
    private docsService: DocsService,
    private permissions: PermissionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._docSubscribe = this.docsService.currentDoc
      .pipe(
        startWith({
          id: '',
          doc: 'Select or create a document',
          userName: '',
          roomName: '',
          roomPassword: '',
        })
      )
      .subscribe((document) => (this.document = document));
  }

  ngOnDestroy() {
    this._docSubscribe.unsubscribe();
  }

  editDoc() {
    this._getuser();
    this.docsService.editDoc(this.document);
  }

  private _getuser() {
  
    let decoded = jwt_decode(sessionStorage.getItem('token'));

    this.document.userName = decoded.data.name;
  }

  goDocsList() {
    this.router.navigate(['/docs/docs_list']);
  }
}
