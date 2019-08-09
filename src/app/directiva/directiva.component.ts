import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  listaCurso: String[] = ['TypesCript', 'JavaSript', 'Java SE', 'C#', 'PHP'];
  habilitar: true;

  constructor() { }

  ngOnInit() {
  }

}
