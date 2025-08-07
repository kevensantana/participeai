import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogService } from '../../../service/blog.service';
import { CommonModule } from '@angular/common';
// import { BlogCategory } from '../../../service/blog.service';

@Component({
  selector: 'app-write-post',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.css'
})
export class WritePostComponent {
 writeForm: FormGroup;
  categories$: Observable<any[]>;
  activeTab = 'write';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router
  ) {
    this.categories$ = this.blogService.getCategories();
    
    this.writeForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      excerpt: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', [Validators.required, Validators.minLength(100)]],
      categorySlug: ['', Validators.required],
      tags: [''],
      author: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['']
    });
  }

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  estimateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }

  getWordCount(content: string): number {
    return content.split(' ').length;
  }

  getCharacterCount(text: string): number {
    return text.length;
  }

  onSubmit(action: 'draft' | 'review'): void {
    if (this.writeForm.valid) {
      this.isSubmitting = true;
      
      const formValue = this.writeForm.value;
      const tagsArray = formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [];
      
      // Simular envio
      setTimeout(() => {
        console.log('Artigo enviado:', { ...formValue, tags: tagsArray, action });
        this.isSubmitting = false;
        
        if (action === 'review') {
          alert('Artigo enviado para revisão com sucesso!');
          this.router.navigate(['/blog']);
        } else {
          alert('Rascunho salvo com sucesso!');
        }
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.writeForm.controls).forEach(key => {
      const control = this.writeForm.get(key);
      control?.markAsTouched();
    });
  }

  formatPreviewContent(content: string): string {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br>');
  }

  getCategoryName(slug: string): string {
    // Implementar busca do nome da categoria pelo slug
    const categories = {
      'food-waste': 'Desperdício de Alimentos',
      'waste-disposal': 'Gestão de Resíduos',
      'water-consumption': 'Conservação da Água',
      'energy-consumption': 'Eficiência Energética'
    };
    return categories[slug as keyof typeof categories] || '';
  }

  getCategoryColor(slug: string): string {
    const colors = {
      'food-waste': '#4CAF50',
      'waste-disposal': '#8A6240',
      'water-consumption': '#00796B',
      'energy-consumption': '#AAA713'
    };
    return colors[slug as keyof typeof colors] || '#01403A';
  }
}
