import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { DialogData } from '../interfaces/DialogData';

@Component({
  selector: 'app-text-diplay-dialog',
  templateUrl: './text-diplay-dialog.component.html',
  styleUrls: ['./text-diplay-dialog.component.css']
})
export class TextDiplayDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

}
