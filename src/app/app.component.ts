import { Component, Input, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @Input() val: any;
  title = "NgRx Workshop";
  links = [{ path: "/books", icon: "book", label: "Books" }];

  constructor(private elementRef: ElementRef) {
    const test = this.elementRef.nativeElement.getAttribute("val");
    console.log(test);
  }
}
