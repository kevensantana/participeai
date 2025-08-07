import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { BlogPost } from '../../../models/blog-post.model';
import { BlogService } from '../../../service/blog.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  post$: Observable<BlogPost | undefined>;
  relatedPosts$!: Observable<BlogPost[]>;
  currentYear = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
    this.post$ = this.route.params.pipe(
      switchMap(params => this.blogService.getPostBySlug(params['slug']).pipe(
        // Map null to undefined to match the expected type
        // (assuming getPostBySlug returns Observable<BlogPost | null>)
        // If it already returns undefined, this is not needed
        // But this fixes the type error
        // You may need to import 'map' from 'rxjs'
        map(post => post === null ? undefined : post)
      ))
    );
  }

  ngOnInit(): void {
    this.post$.subscribe(post => {
      if (post) {
        this.relatedPosts$ = this.blogService.getPostsByCategory(post.category.slug);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/blog']);
  }

  sharePost(): void {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  }

  likePost(): void {
    // Implementar lógica de curtir
    console.log('Post curtido!');
  }

  reportPost(): void {
    // Implementar lógica de reportar
    console.log('Post reportado!');
  }

  formatContent(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
  }
}
