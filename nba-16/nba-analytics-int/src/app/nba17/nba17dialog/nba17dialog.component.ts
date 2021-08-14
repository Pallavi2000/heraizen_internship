import { Component, OnInit, Inject } from '@angular/core';
//import { Nba17Component } from '../nba17.component'
import { Analytics } from '../../label-externalisation/analytics';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Nba17Component } from '../nba17.component'

@Component({
  selector: 'app-nba17dialog',
  templateUrl: './nba17dialog.component.html',
  styleUrls: ['./nba17dialog.component.css']
})
export class Nba17dialogComponent implements OnInit {

  labels = new Analytics();
  dialogData : any

  constructor( private dialogRef: MatDialogRef<Nba17Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.dialogData = this.data
      console.log(this.dialogData)
    }

  ngOnInit(): void {
    //console.log("lessons ", this.total_lessons)
    //this.bloomsList = this.dialogData["bloomsList"];
    // for(var k in this.bloomsList){
    //   this.levels.push(k);
    // } 
    //console.log("please",this.dialogData.levels)
    console.log("finally",this.dialogData.total_lessons_course,this.dialogData.total_lessons_co)
  }



}


/*

import { Component, Inject, OnInit } from '@angular/core';
import { Analytics } from "../../label-externalisation/analytics";
import { Nba17Component } from '../nba17.component';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-nba17dialog',
  templateUrl: './nba17dialog.component.html',
  styleUrls: ['./nba17dialog.component.css']
})
export class Nba17dialogComponent implements OnInit {

  labels = new Analytics();
  dialogData : any
  bloomsList = [];
  levels = [];

  constructor( private dialogRef: MatDialogRef<Nba17dialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.dialogData = this.data
    }
  ngOnInit(): void {
    //console.log("bloomsdata", this.dialogData["bloomsList"])
    this.bloomsList = this.dialogData["bloomsList"];
    for(var k in this.bloomsList){
      this.levels.push(k);
    } 
    
    console.log("bloomsdata", this.bloomsList)
  }
}
*/