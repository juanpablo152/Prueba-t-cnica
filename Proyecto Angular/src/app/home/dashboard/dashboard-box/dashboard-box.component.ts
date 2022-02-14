import { Component, Input, OnInit } from "@angular/core";
import { userCreated } from "src/app/interfaces/create.user";
import { DashboardItem } from "../../../interfaces/dashboard.item.type";
import { DashboardComponent } from "../dashboard.component";

@Component({
  selector: "app-dashboard-box",
  templateUrl: "./dashboard-box.component.html",
  styleUrls: ["./dashboard-box.component.css"],
})
export class DashboardBoxComponent implements OnInit {
  @Input() public data: userCreated;
  @Input() public mainRef: DashboardComponent;
  public expanded = false;
  public color: string = '#9469AD';

  constructor() {}

  public ngOnInit(): void {
  }

  /**
   * changePanel
   */
  public changePanel() {
    this.expanded = !this.expanded;
  }
}
