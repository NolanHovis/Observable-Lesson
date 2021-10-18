import { Component, OnInit } from '@angular/core';
import { CandyService } from './candy.service';

@Component({
  selector: 'app-candy',
  templateUrl: './candy.component.html',
  styleUrls: ['./candy.component.css'],
})
export class CandyComponent implements OnInit {
  candyList: string[];
  bucket: string[];

  constructor(private candyService: CandyService) {}

  ngOnInit(): void {
    this.candyList = this.candyService.getCandy();
    this.bucket = this.candyService.getBucket();
  }

  onClickCandy(candy) {
    this.candyService.saveCandy(candy);
  }
}
