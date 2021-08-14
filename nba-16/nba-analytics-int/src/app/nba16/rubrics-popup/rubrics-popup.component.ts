import { Component, OnInit,EventEmitter, Input, Output, Inject } from '@angular/core';
import { Analytics } from "../../label-externalisation/analytics";
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rubrics-popup',
  templateUrl: './rubrics-popup.component.html',
  styleUrls: ['./rubrics-popup.component.css']
})
export class RubricsPopupComponent implements OnInit {
  analytics: Analytics = new Analytics();
  all_methods = [];

  constructor(public dialogRef: MatDialogRef<RubricsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    console.log("Pop Up Open")

    if(!this.data.comp.rwd_screen){
      this.updatePosition();
    }
    
    console.log(this.data);
        this.data['comp']['directMethods'].forEach(method=>{
            this.all_methods.push({"methodName":method.methodName,
            "target":method.target,"methodRules":method.rules,"methodType":"Direct Method"});
        })
        this.data['comp']['indirectMethods'].forEach(method=>{
          this.all_methods.push({"methodName":method.methodName,
          "target":method.target,"methodRules":method.rules,"methodType":"Indirect Method"});
        })
        console.log(this.all_methods);
    }

    close_popOut(){
      this.dialogRef.close();
    }
    updatePosition(){
      this.dialogRef.updatePosition({ top: '75px', left: '30%' });
    }
}
