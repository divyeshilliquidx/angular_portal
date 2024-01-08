// profile-navigation.component.ts
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-navigation',
  templateUrl: './profile-navigation.component.html',
  styleUrls: ['./profile-navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ProfileNavigationComponent implements OnInit {
  @Input() link: string = '/';
  @Input() label: string = '';

  isActive: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isActive = this.router.isActive(this.link, true);
    });
  }
}

