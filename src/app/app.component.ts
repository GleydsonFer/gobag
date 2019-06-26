import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mySlideOptions={
    margin:25,
    dot: false, 
    nav: true,    
    responsiveClass: true,
    responsive: {
      0: {
        items: 3,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 3,
        nav: true,
        loop: false
      },
      1500: {
        items: 4,
        nav: true,
        loop: false
      }
    }
  };

  mySlideImages = [
    {
      text: "slide1",
      image: "assets/banners/banner1.png"
    },
    {
      text: "slide2",
      image: "assets/banners/banner2.png"
    },
    {
      text: "slide3",
      image: "assets/banners/banner3.png"
    },
    {
      text: "slide4",
      image: "assets/banners/banner1.png"
    }
  ]
}
