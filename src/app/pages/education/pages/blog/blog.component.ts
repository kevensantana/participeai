import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, startWith, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { BlogPost, Category, BlogStats } from '../../models/blog-post.model';
import { BlogService } from '../../service/blog.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  searchControl = new FormControl('');
  activeFilter = new BehaviorSubject<string>('all');
  
  posts$: Observable<BlogPost[]>;
  featuredPosts$: Observable<BlogPost[]>;
  categories$: Observable<Category[]>;
  stats$: Observable<BlogStats>;
  
  filteredPosts$: Observable<BlogPost[]>;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.posts$ = this.blogService.getAllPosts();
    this.featuredPosts$ = this.blogService.getFeaturedPosts();
    this.categories$ = this.blogService.getCategories();
    this.stats$ = this.blogService.getBlogStats();

    // Combine search and filter
    this.filteredPosts$ = combineLatest([
      this.posts$,
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.activeFilter.asObservable()
    ]).pipe(
      map(([posts, searchTerm, filter]) => {
        let filtered = [...posts];

        // Apply category filter
        if (filter !== 'all') {
          if (filter === 'recent') {
            filtered = filtered
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .slice(0, 6);
          } else if (filter === 'popular') {
            filtered = filtered
              .sort((a, b) => b.views - a.views)
              .slice(0, 6);
          } else {
            filtered = filtered.filter(post => post.category.slug === filter);
          }
        }

        // Apply search filter
        if (searchTerm && searchTerm.trim()) {
          const term = searchTerm.toLowerCase().trim();
          filtered = filtered.filter(post =>
            post.title.toLowerCase().includes(term) ||
            post.excerpt.toLowerCase().includes(term) ||
            post.tags.some(tag => tag.toLowerCase().includes(term)) ||
            post.author['toLowerCase']().includes(term)
          );
        }

        return filtered;
      })
    );
  }

  ngOnInit(): void {
    // Check for category filter in query params
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.setFilter(params['category']);
      }
    });
  }

  setFilter(filter: string): void {
    this.activeFilter.next(filter);
    
    // Update URL without reloading
    if (filter !== 'all') {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { category: filter },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        queryParamsHandling: 'merge'
      });
    }
  }

  navigateToPost(slug: string): void {
    this.router.navigate(['/blog', slug]);
  }

  navigateToWrite(): void {
    this.router.navigate(['/escrever']);
  }
}
