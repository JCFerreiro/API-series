import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new.html',
})
export class NewComponent {
  message = '';
  submitting = false;
  messageType = 'success'; // 'success' or 'danger'

  private fb = inject(FormBuilder);
  private seriesService = inject(SeriesService);
  private router = inject(Router);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    channel: ['', [Validators.required]],
    rating: [null as number | null, [Validators.required, Validators.min(0), Validators.max(10)]],
    image: ['', []],
  });

  constructor() { }

  submit(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.message = '';

    const payload = {
      title: this.form.value.title as string,
      channel: this.form.value.channel as string,
      rating: Number(this.form.value.rating),
      image: this.form.value.image as string,
    };

    this.seriesService.create(payload).subscribe({
      next: (res) => {
        this.router.navigate(['/home'], {
          state: {
            message: `Serie creada correctamente. ID devuelto: ${res.id}`,
            type: 'success'
          }
        });
      },
      error: () => {
        this.message = 'Error al crear la serie (POST).';
        this.messageType = 'danger';
        this.submitting = false;
      },
    });
  }

  get title() { return this.form.get('title'); }
  get channel() { return this.form.get('channel'); }
  get rating() { return this.form.get('rating'); }
  get image() { return this.form.get('image'); }
}
