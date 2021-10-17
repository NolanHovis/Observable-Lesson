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
  candyLimiter = false;

  constructor(private candyService: CandyService) {}

  ngOnInit(): void {
    this.candyList = this.candyService.getCandy();
    this.bucket = this.candyService.getBucket();

    this.candyService.bucketLimit.subscribe((data) => {
      console.log(data);
    });
  }

  onClickCandy(candy) {
    this.candyService.bucketLimit.next(this.bucket.length + 1);
    if (this.candyLimiter === false) {
      this.candyService.saveCandy(candy);
    }
    if (this.bucket.length == 5) {
      this.candyLimiter = true;
      this.candyService.bucketLimit.complete();
    }
    if (this.bucket.length > 5) {
      this.candyService.bucketLimit.error('Too Much Candy');
    }
  }
}
