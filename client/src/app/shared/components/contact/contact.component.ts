import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../../../core/Services/email.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
formgroup:FormGroup;
loading:boolean = false;
  constructor(private emailservice:EmailService,private toastrservice :ToastrService,private router :Router ) { }

  ngOnInit(): void {
   this.generateFormGroup();
  }
  generateFormGroup() {
    this.formgroup= new FormGroup({
      name: new FormControl('',[Validators.required,
        Validators.pattern('[^A-Za-z0-9_@\.]|@{2,}|\.{5,}')]),
        emailAddress : new FormControl('',[Validators.required, Validators
              .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      phoneNumber:new FormControl('',[Validators.pattern('^([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)$')]),
      message:new FormControl('',Validators.required)
    })
        }
SendContactMessage(){
  this.loading = true;
   this.emailservice.sendEmail(this.formgroup.value).subscribe(Response => {
     this.toastrservice.success('meesage send Sucssesfly')
     this.router.navigateByUrl('/shop')
     this.loading =false
   },error => {
        this.toastrservice.error('Error By Sending Message' );
        console.log(error)
        this.loading = false;
   })
  }
}
