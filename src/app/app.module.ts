import { Component, NgModule, Input, OnInit, OnChanges } from "@angular/core";
import Rx from "rxjs";
import { BrowserModule } from "@angular/platform-browser";
import { ApiService } from "./ApiService";

@Component({
  selector: "[header]",
  template: `
    <th>№</th>
    <th>Name</th>
    <th>Score</th>
    <th>Note</th>
  `
})
export class HeaderComponent {}

@Component({
  selector: "[item-detail]",
  template: `
    <td>{{item.id}}</td>
    <td>{{item.name}}</td>
    <td>{{item.score}}</td>
    <td><input size="7" /></td>
  `
})
export class RowComponent implements OnChanges {
  @Input("item-detail") item;
  ngOnChanges() {
    console.log("inputs changes");
  }
}

@Component({
  selector: "app",
  providers: [ApiService],
  template: `<table border="2" cellpadding="5">
    <thead>
      <tr header></tr>
    </thead>
    <tbody>
      <tr *ngFor="let item of items" [item-detail]='item'></tr>
    </tbody>
  </table>`
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.handleChanges(changes => {
      this.items = this.calcScore(changes);
    });
  }
  calcScore(items) {
    return items.map(item => ({
      ...item,
      score: Math.round(item.rate / 100 * 5)
    }));
  }
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, RowComponent, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
