import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { addDays, nextMonday, nextTuesday } from 'date-fns';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule 
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  selectedDate: Date | null = null;

  setToday() {
    this.selectedDate = new Date();
  }

  setNextMonday() {
    this.selectedDate = nextMonday(new Date());
  }

  setNextTuesday() {
    this.selectedDate = nextTuesday(new Date());
  }

  setAfterOneWeek() {
    this.selectedDate = addDays(new Date(), 7);
  }

  cancel() {
    this.selectedDate = null;
  }

  save() {
    alert(`Selected date: ${this.selectedDate}`);
  }

}
