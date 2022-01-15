import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css'],
})
export class SurveyListComponent implements OnInit {
  public isLoading = false;
  public questionIndex: number;
  public questions = [
    { id: '1', text: 'Do you have a petrol/diesel car?' },
    {
      id: '2',
      text: 'Shall SLEZ apply to PHEVs (Plug-in hybrid electric vehicles)?',
    },
    { id: '3', text: 'What should be the proposed boundaries of SLEZ?' },
  ];

  public options = [];
  constructor() {}

  ngOnInit(): void {}

  public openQuestion(i: number) {
    this.questionIndex = i;
    this.isLoading = true;
    this.options = [
      { id: '1', text: 'Inside the inner ring road.' },
      { id: '2', text: 'Outskrit of the town inside outer ring road.' },
      { id: '3', text: 'Town centre postcodes starting with SL only.' },
    ];

    this.isLoading = false;
  }
}
