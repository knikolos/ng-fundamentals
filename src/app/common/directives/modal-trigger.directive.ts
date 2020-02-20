import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQUERY_TOKEN } from '../services/jQuery.service';

@Directive({
    selector: '[modal-trigger]'
})
export class ModalTriggerDirective implements OnInit {
    private element: HTMLElement;
    @Input("modal-trigger") modalId: string;

    constructor(private elementRef: ElementRef, @Inject(JQUERY_TOKEN) private $: any) {
        this.element = elementRef.nativeElement;
    }

    ngOnInit(): void {
        this.element.addEventListener("click", () => this.$(`#${this.modalId}`).modal());
    }
}