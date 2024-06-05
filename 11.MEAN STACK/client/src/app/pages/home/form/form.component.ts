import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { UsersService } from '../../../services/users/users.service';


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public userList:any;
  public userC:any;
  public validateUser: boolean = false;
  public errorUser: boolean = false;
  public messageError: string;
  public messageSuccess: string;

  constructor( private _usersService: UsersService) {
    this.userList = {
      username:null,
      password:null,
      email:null
    }

   }

  ngOnInit(): void {

    //Validar Formulario
    (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Get the forms we want to add validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

    $('.icheck').iCheck({
          checkboxClass: "icheckbox_flat-blue",
          radioClass: "iradio_flat-blue"
    })
  }

  storeUser(f: NgForm) {
    this._usersService.storeUser(this.userList).subscribe(data => {
      this.userC = data;
      
      if(this.userC["status"] == 200){
        this.validateUser = true;
        this.errorUser = false;
        this.messageSuccess = this.userC["message"];
      }
    },(err) => {
      this.errorUser = true;
      this.validateUser = false;
      this.messageError = err["error"]["message"];
    });
  }

}
