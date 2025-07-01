import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slideCount = 3;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.clearAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => this.nextSlideInternal(), 10000);
  }

  clearAutoSlide(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  resetAutoSlide(): void {
    this.clearAutoSlide();
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.nextSlideInternal();
    this.resetAutoSlide();
  }

  previousSlide(): void {
    this.previousSlideInternal();
    this.resetAutoSlide();
  }

  private nextSlideInternal(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slideCount;
  }

  private previousSlideInternal(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
  }

  isActive(index: number): boolean {
    return this.currentSlide === index;
  }
}
