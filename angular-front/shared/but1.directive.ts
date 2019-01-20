import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appBut1]'
})
export class But1Directive implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    const button = this.el.nativeElement;

    this.renderer.setStyle(button, 'display', 'block');
    this.renderer.setStyle(button, 'font-size', '20px');
    this.renderer.setStyle(button, 'padding', '8px');
    this.renderer.setStyle(button, 'margin', '4px');
    this.renderer.setStyle(button, 'border-radius', '15px');
    this.renderer.setStyle(button, 'background-color', '#B57676');
    this.renderer.setStyle(button, 'color', 'white');
  }
}
