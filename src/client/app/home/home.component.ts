import { Component, ViewChild } from '@angular/core';
import { NameListService } from '../shared/name-list/name-list.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { ModalComponent } from '../modal/modal.component';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent{ 

  tel:any;
  @ViewChild(ModalComponent)
    modalHtml: ModalComponent;

    open() {
        this.modalHtml.open();
    }
    constructor() {
    }
}