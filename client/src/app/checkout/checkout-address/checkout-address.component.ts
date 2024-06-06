import { IAddress } from './../../shared/Models/IAddress';
import { AccountService } from './../../account/account.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit {
@Input() checoutform : FormGroup;
loading:boolean = false;

  constructor(private accountservice:AccountService,private toasterservice:ToastrService) { }

  ngOnInit(): void {
  }
SaveUserAddress(){
this.loading = true;
this.accountservice.updateUserAddress(this.checoutform.get('addressform').value).subscribe((address:IAddress) =>{
  this.checoutform.get('addressform').reset(address)
  this.toasterservice.success('Address saved Sucsessfly')
   this.loading = false;
},error => {
  this.toasterservice.error(error.message, null, {
    timeOut: 3000,
  });
  console.log(error)
this.loading = false;

})
}


}
