import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogStats, BlogPost } from './models/blog-post.model';
import { BlogService } from './service/blog.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { StatsSectionComponent } from './components/stats-section/stats-section.component';
import { NewsletterSectionComponent } from './components/newsletter-section/newsletter-section.component';
import { ContentTabsComponent } from "./components/content-tabs/content-tabs.component";
import { TipsSectionComponent } from "./components/tips-section/tips-section.component";
import { CalculatorComponent } from "./components/calculator/calculator.component";

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroSectionComponent,
    StatsSectionComponent,
    NewsletterSectionComponent,
    ContentTabsComponent,
    TipsSectionComponent,
    CalculatorComponent
],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})

export class EducationComponent {

title = 'educational-blog';

blogStats$: Observable<BlogStats>;
  featuredPosts$: Observable<BlogPost[]>;

  constructor(private blogService: BlogService) {
    this.blogStats$ = this.blogService.getBlogStats();
    this.featuredPosts$ = this.blogService.getFeaturedPosts();
  }

  ngOnInit(): void {}
}
