import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'autocomplete-auto-active-first-option-example',
  templateUrl: 'autocomplete-auto-active-first-option-example.html',
  styleUrls: ['autocomplete-auto-active-first-option-example.css'],
})
export class AutocompleteAutoActiveFirstOptionExample implements OnInit {
  constructor(private httpClient: HttpClient) { 

  }
  SERVER_URL = 'https://ganeshghag.pythonanywhere.com/';
  //SERVER_URL = 'https://demo7389702.mockable.io/trypost1';
  
  myControl = new FormControl();
  options: string[] = ['One', 'Two'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    console.log('from ngInit GG ');
    this.sendPostRequest('James 9823456567 paid on 25/12/2020 and 1,234.23 to ganesh@email.com').subscribe(
      res => {
        console.log('RESP IS '+JSON.stringify(res));
        var emails = res[0];        var mobiles = res[1];
        var dates = res[2];        var amounts = res[3];
        var names = res[4];
        console.log(emails);console.log(mobiles);console.log(dates);console.log(amounts);console.log(names);
        this.filteredOptions = res[0];
        //this.options = ['FIFTY','FORTY'];
      }
       
    );
    this.options = ['FIFTY','FORTY'];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private sendPostRequest(data: any): Observable<any> {
     return this.httpClient.post<any>(this.SERVER_URL, data);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */