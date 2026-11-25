import { Component, signal } from '@angular/core';
import { MarksCalculator } from './marks-calculator/marks-calculator'

@Component({
  imports: [ MarksCalculator],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('student-marks-cal');
}
