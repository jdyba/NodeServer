import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appInp1]'
})
export class Inp1Directive implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const input = this.el.nativeElement;

    this.renderer.setStyle(input, 'padding', '4px');
    this.renderer.setStyle(input, 'margin', '4px');
  }

}
