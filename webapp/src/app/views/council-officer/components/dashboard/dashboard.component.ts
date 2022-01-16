import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { AddCouponsComponent } from '../../modals/add-coupons/add-coupons.component'
import { AddEditQuestionsComponent } from '../../modals/add-edit-questions/add-edit-questions.component'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isLoading = false;
  public questionIndex: number;
  public questions = [
    { id: '1', text: 'Do you have a petrol/diesel car?' },
    { id: '2', text: 'Shall SLEZ apply to PHEVs (Plug-in hybrid electric vehicles)?'},
    { id: '3', text: 'What should be the proposed boundaries of SLEZ?' },
  ];

  public options = [];
  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // console.log('hii');
    
    // this.openAddEditQuestionOptions(0, 'Add');
  }

  public openAddEditQuestionOptions(i: any, qsaction: string): void {
    const dialogRef = this.dialog.open(AddEditQuestionsComponent, {
      data: {
        id: i,
        action: qsaction,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}

