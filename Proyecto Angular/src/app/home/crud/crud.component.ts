import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { userCreated, UserToCreated } from "src/app/interfaces/create.user";
import { CrudService } from "src/app/services/crud.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-crud",
  templateUrl: "./crud.component.html",
  styleUrls: ["./crud.component.scss"],
})
export class CrudComponent implements OnInit {
  public displayedColumns: string[] = ["id", "name", "job", "action"];
  public dataSource;
  public form: FormGroup;
  public viewForm: boolean;
  public addOrUpdate: boolean = false;
  public users: userCreated[] = [];
  public user: userCreated;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private crudService: CrudService
  ) {}

  ngOnInit(): void {
    this.viewForm = false;
    this.createForm();
    this.getAllUsers();
  }

  public createForm() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      job: ["", Validators.required],
    });
  }

  public showDialog(action: string): boolean {
    if (this.viewForm === false && action === "add") {
      this.addOrUpdate = false;
      return (this.viewForm = true);
    } else if (action === "update") {
      this.addOrUpdate = true;
      return (this.viewForm = true);
    } else {
      this.resetForm();
      return (this.viewForm = false);
    }
  }

  public resetForm() {
    this.form.reset();
  }

  public addUser() {
    if (this.form.invalid) {
      return this.toastService.error("Faltan ingresar valores en los campos");
    } else {
      const userToAdd: UserToCreated = {
        name: this.form.value["name"],
        job: this.form.value["job"],
      };
      this.crudService.createUser(userToAdd).subscribe(
        (res) => {
          this.crudService.adduserStorage(res);
          this.getAllUsers();
          this.showDialog("close");
        },
        (error) => {
          return this.toastService.error("Hubo un error al lanzar la petición");
        }
      );
    }
  }

  public updateUserStorage(user: userCreated) {
    this.user = user;
    this.showDialog("update");
    this.form.controls["name"].setValue(user.name);
    this.form.controls["job"].setValue(user.job);
  }

  public updateUser() {
    this.user.name = this.form.value["name"];
    this.user.job = this.form.value["job"];
    this.crudService.updateUserStorage(this.user);
    this.getAllUsers();
    this.showDialog("close");
  }

  public deleteUser(id: string) {
    this.crudService.deleteUserStorage(id);
    this.getAllUsers();
  }

  public async getAllUsers() {
    this.users = this.crudService.getAllUsers();
    this.dataSource = new MatTableDataSource<any>(this.users);
  }
}
