import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bookstore-frontend');
}

//**********Prepare Angular modules you’ll need
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// // (CLI already declared your components)

// @NgModule({
//   declarations: [
//     AppComponent,
//     // all your generated components (CLI adds them automatically)
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,     // for backend API calls later
//     FormsModule,          // template-driven forms
//     ReactiveFormsModule   // reactive forms (fixes "Can't bind to formGroup")
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

