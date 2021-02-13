import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButton]',
})
export class ButtonDirective implements OnInit {
  @Input() label!: string;

  @Input() cta!: boolean;

  @Input() outline!: boolean;

  @Input() hoverEffect!: boolean;

  @Input() mini!: boolean;

  constructor(private er: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const label = document.createElement('span');
    label.innerHTML = this.label;
    this.renderer.appendChild(this.er.nativeElement, label);
    this.renderer.addClass(this.er.nativeElement, 'my-button');
    if (this.cta) {
      this.renderer.addClass(this.er.nativeElement, 'cta');
    }
    if (this.outline) {
      this.renderer.addClass(this.er.nativeElement, 'outline-button');
    }
    if (this.mini) {
      this.renderer.addClass(this.er.nativeElement, 'mini-button');
    }
  }

  @HostListener('mouseenter') onMouseEnter(event: any): void {
    if (this.hoverEffect) {
      if (this.outline) {
        this.renderer.removeClass(this.er.nativeElement, 'outline-button');
      } else {
        this.renderer.addClass(this.er.nativeElement, 'outline-button');
      }
    }
  }

  @HostListener('mouseleave') onMouseLeave(event: any): void {
    if (this.hoverEffect) {
      if (this.outline) {
        this.renderer.addClass(this.er.nativeElement, 'outline-button');
      } else {
        this.renderer.removeClass(this.er.nativeElement, 'outline-button');
      }
    }
  }
}
