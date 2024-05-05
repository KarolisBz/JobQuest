// this class would contain an array of sorting algorithms, but we just need quick sort for this program
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingAlgorithmsService {
  constructor() { }

  // much faster the bubble sort
  // programmed after watching video https://www.youtube.com/watch?v=Hoixgm4-P4M&t=246s , 
  // this quicksort has been modified to only work with likeablness as there is no comparators in typescript
  quickSort(objectArray: any): any[] {
    // CANNOT SORT A ARRAY OF SIZE 1
    if (objectArray.length <= 1) {
      return objectArray;
    }

    // finding pivit point from median of 3
    const pivot = this.getPivot(objectArray);
    console.log(pivot);
    let left = []; // larger
    let right = []; // smaller
    let equals = []; // to keep duplicates too

    // we are ordering this in descending order, so larger numbers go to left instead
    for (let i = 0; i < objectArray.length; i++) {
      if (objectArray[i]['totalScore'] > pivot['totalScore']) {
        left.push(objectArray[i]);
      } else if (objectArray[i]['totalScore'] < pivot['totalScore']) {
        right.push(objectArray[i]);
      } else {
        equals.push(objectArray[i]);
      }
    }

    // we concatinate the left, middle and right array in this order using the spread operator which unpacks the elements
    return [...this.quickSort(left), ...equals, ...this.quickSort(right)];
  }

  private getPivot(objectArray: any): any {
    // if less then 3 entries exist, return the first one
    if (objectArray.length < 3)
      return objectArray[0];

    // we find the pivot via the median of 3
    let tempArry: any = [
      objectArray[0],
      objectArray[Math.floor(objectArray.length / 2)],
      objectArray[objectArray.length-1],
    ]

    // sorting values using a silly bubble sort, only three values so it's okay though (maybe? it could be better just to use the middle value of the array)
    // ( data structures nerds would kill me)
    for (let i = 0; i < 3; i++) {
      for (let i2 = 0; i2 < 3; i2++) {
        if (tempArry[i]['totalScore'] < tempArry[i2]['totalScore']) {
          let tempVal = tempArry[i2];
          tempArry[i2] = tempArry[i];
          tempArry[i] = tempVal;
        }
      }
    }

    return tempArry[1];
  }
}
