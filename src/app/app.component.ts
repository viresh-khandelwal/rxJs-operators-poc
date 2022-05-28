import { Component, VERSION } from '@angular/core';
import { combineLatest, concatMap, forkJoin, mergeMap, of } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { catchError, switchMap } from 'rxjs/operators';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular' + VERSION.major;
  constructor(private httpClient:HttpClient){}

  ngOnInit(): void{
      let obs1 = of(1,2,3,14);
      let obs2 = of(1,2,3,4);
      let obs3 = this.httpClient.get('https://jsonplaceholder.typicode.com/users/1').pipe(
        catchError((err) =>  of('error handled'))
      );
      let obs4 = this.httpClient.get('https://jsonplaceholder.typicode.com/user/2').pipe(
        catchError((err) => of('error handled'))
      );
      let obs5 = of(3,78,9,10);
      
      obs1.pipe(
        mergeMap((id) => this.httpClient.get('https://jsonplaceholder.typicode.com/users/'+id))
      ).subscribe(
        (data) => console.log(data),
        (err) => console.log(err)
      )

      obs1.pipe(
        concatMap((id) => this.httpClient.get('https://jsonplaceholder.typicode.com/users/'+id))
      ).subscribe((data) => console.log(data))

      obs5.pipe(
        switchMap((id) => this.httpClient.get('https://jsonplaceholder.typicode.com/users/'+id))
      ).subscribe((data) => console.log(data))

      forkJoin([obs3,obs4]).subscribe((data) => console.log(data))

      combineLatest([obs1,obs2]).subscribe((data) => console.log(data))


  }
}


