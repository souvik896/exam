import { Component, OnInit } from '@angular/core';
import{FormBuilder,Validators,FormArray,FormGroup} from '@angular/forms';
import{ServiceService} from '../service.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
stateArrayobj=['westbengal','karnataka','delhi']
// stateArrayobj=[{statee:'westbengal'},{statee:'karnataka'},{statee:'karnataka'}]
  constructor(private fbuilder:FormBuilder,private srvc:ServiceService) { }
  myform:any;
  DetailsArray:FormArray;
  formval:any;
  userespnce;
  errblock;
  ngOnInit(): void {
    this.myform=this.fbuilder.group({
      firstname:[null,Validators.required],
      lastname:[null,Validators.required],
      phone:[null,Validators.required],
      address:[null,Validators.required],
      DetailsArray:this.fbuilder.array([]),
      statename:[null,Validators.required],
      email:[null,[Validators.required,Validators.pattern('^([a-zA-Z0-9.-]+)@([a-zA-Z.]{5,12}).([a-zA-Z.]{2,20})$')]],
      password:[null,[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{4,12}$')]],
      confirmPassword:[null,Validators.required]
    })
  }
  

  createAddress():FormGroup{
    return  this.fbuilder.group({
  
      streetnumber:[null,Validators.required],
      streetname:[null,Validators.required],
      pincode:[null,Validators.required],
      landmark:[null,Validators.required]
  
    })
  
  }
  
  DetailsValuefetch()
    {
  this.DetailsArray.push(this.createAddress());
  
    }
    
  
  
    get Details()
  {
  
    this.DetailsArray=this.myform.get('DetailsArray') as FormArray;
  return this.myform.get('DetailsArray')['controls'];
  
  } 
  
  dlt(i)
  {
  this.DetailsArray.removeAt(i);
  }
  valueSend()
  {
    console.log(this.myform.value);
this.formval=this.myform.value;
    this.srvc.getData(this.formval).subscribe(p=>{
      this.userespnce=p;
      console.log(this.userespnce);
      alert(this.userespnce.id)
    },
    (errRes)=>{
      this.errblock=errRes;
      console.log(this.errblock)
    }
    )
  }
}
