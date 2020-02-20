import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IToastr, TOASTR_TOKEN } from 'src/app/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(
    private auth: AuthService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: IToastr) { }

  ngOnInit() {
    this.firstName = new FormControl(this.auth.currentUser.firstName,
      [
        Validators.required,
        Validators.pattern("[a-zA-Z].*")
      ]);
    this.lastName = new FormControl(this.auth.currentUser.lastName,
      [
        Validators.required,
        Validators.pattern("[a-zA-Z].*")
      ]);
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  saveProfile(formValues) {
    this.auth.updateProfile(formValues.firstName, formValues.lastName)
      .subscribe(() => {
        this.router.navigate(["events"]);
        this.toastr.success("Profile updated");
      });
  }

  validateFirstName(): boolean {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName(): boolean {
    return this.lastName.valid || this.lastName.untouched;
  }

  cancel() {
    this.router.navigate(["events"]);
  }

  logout() {
    this.auth.logout()
      .subscribe(() => this.router.navigate(["user/login"]));
  }
}
