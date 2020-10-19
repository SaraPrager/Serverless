import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  input: string;
  output: string;
  source_code_link: string = '->->';
  constructor(private _snackBar: MatSnackBar, private _httpClient: HttpClient) {
  }

  // TODO: move to config
  API_URL: string = 'https://2tqbie6cu2.execute-api.us-east-1.amazonaws.com/Stage/perform-action';

  onClick() {
    if (!this.input) {
      this.showErrMsg('Please enter an input');
      return;
    }
    
    this._httpClient.post(this.API_URL, { 'input': this.input },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .subscribe(
        (response: any) => {
          this.output = response.output;
        }, (error) => {
          // TODO: localization for error messages
          this.showErrMsg('Invalid input. Please try again');
      });
  }

  showErrMsg(msg) {
    this._snackBar.open(msg, 'Error', {
      duration: 2000,
    });
  }
}
