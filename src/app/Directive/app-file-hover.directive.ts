import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAppFileHover]'
})
export class AppFileHoverDirective {

  constructor(private el: ElementRef) {}

  @HostListener('mouseover') onMouseOver() {
    this.el.nativeElement.style.transform = 'scale(7)'; // Adjust scale as needed
  }

  @HostListener('mouseout') onMouseOut() {
    this.el.nativeElement.style.transform = 'scale(1)'; // Reset to original size
  }
}
