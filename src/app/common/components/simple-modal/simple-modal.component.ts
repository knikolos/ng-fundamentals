import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQUERY_TOKEN } from '../../services/jQuery.service';

@Component({
  selector: 'simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.css']
})
export class SimpleModalComponent {
  @Input()
  elementId: string;
  @Input()
  title: string;
  @Input()
  closeOnBodyClick: string;
  @ViewChild("modalContainer", { static: false })
  modalContainer: ElementRef;

  constructor(@Inject(JQUERY_TOKEN) private $: any) { }

  closeModal() {
    if (this.closeOnBodyClick.toLocaleLowerCase() === "true") {
      this.$(this.modalContainer.nativeElement).modal("hide");
    }
  }
}
