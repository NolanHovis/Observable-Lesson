import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CandyService {
  private candy: string[] = [
    'Snickers',
    'Kit Kat',
    'Twix',
    'Butterfinger',
    '100 Grand',
    '3 Musketeer',
    'Carmello',
  ];

  private bucket: string[] = [];

  constructor() {}

  getCandy() {
    return this.candy;
  }

  saveCandy(candy) {
    console.log(candy);
    this.bucket.push(candy);
    console.log(this.bucket.length);
  }

  getBucket() {
    return this.bucket;
  }
}
