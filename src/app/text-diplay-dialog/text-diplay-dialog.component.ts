import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-diplay-dialog',
  templateUrl: './text-diplay-dialog.component.html',
  styleUrls: ['./text-diplay-dialog.component.css']
})
export class TextDiplayDialogComponent implements OnInit {

  constructor() { }
  @Input() text: string;
  ngOnInit(): void {
  }

}
