import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  mobileView: boolean = false;

  constructor() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnInit(): void {
    this.mobileView = window.innerWidth > 700 ? true : false;
    this.toggleMenu();
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  toggleMenu() {
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerOptions = document.querySelector('.burger-options');

    burgerBtn.addEventListener('click', () => {
      burgerBtn.classList.toggle('open');
      burgerOptions.classList.toggle('show');
    });
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (!burgerBtn.contains(target) && !burgerOptions.contains(target)) {
        burgerOptions.classList.remove("show");
        burgerBtn.classList.remove("open");
      }
    });
  }

  handleResize() {
    this.mobileView = window.innerWidth > 700 ? true : false;
  }

}
