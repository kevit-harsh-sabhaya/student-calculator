import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Subject {
  id: number;
  Subjectname: string;
  marks: number;
}

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-marks-calculator',
  styleUrl: './marks-calculator.css',
  templateUrl: './marks-calculator.html',
})
export class MarksCalculator {
  subjectName = '';
  subjectMarks: number | null = null;

  subjects: Subject[] = [
    { id: 101, Subjectname: 'Maths', marks: 80 },
    { id: 102, Subjectname: 'Science', marks: 70 },
    { id: 103, Subjectname: 'English', marks: 65 },
  ];

  addSubjects() {
    const subjectTitle = this.subjectName.trim();

    if (subjectTitle === '' || this.subjectMarks === null) {
      return;
    }

    const nextId = this.subjects.length > 0 ? Math.max(...this.subjects.map(s => s.id)) + 1: 101;

    const subject : Subject = {
      id : nextId,
      Subjectname : subjectTitle,
      marks : this.subjectMarks,
    }

    this.subjects.push(subject);

    this.subjectName = '';
    this.subjectMarks = null;
  }

  deleteSubject(id: number) {
    this.subjects = this.subjects.filter((subject) => subject.id !== id);
  }

  updateMarks(id: number, marks: number) {
    const subject = this.subjects.find((s) => s.id === id);
    if(subject){
      subject.marks = marks;
    }
  }

  get totalMarks() : number {
    return this.subjects.reduce((total, subject) => total + subject.marks, 0);
  }

  get percentage() : number {
    if(this.subjects.length === 0) return 0;
    const maxMarks = this.subjects.length * 100;
    return Number(((this.totalMarks / maxMarks) * 100).toFixed(2));
  }

  get result() : string {
    if(this.subjects.length === 0) return 'NA';
    const hasFailedAny = this.subjects.some((s) => s.marks < 35);
    return hasFailedAny ? 'Fail': 'Pass';
  }
}
