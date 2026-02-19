import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService, Serie } from '../../services/series.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  series: Serie[] = [];
  loading = true;
  error = '';

  message = '';
  messageType = '';

  constructor(private seriesService: SeriesService) {
    const navigation = history.state;
    if (navigation && navigation.message) {
      this.message = navigation.message;
      this.messageType = navigation.type;

      // Clear message after 3 seconds
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
    }
  }

  ngOnInit(): void {
    this.seriesService.getAll().subscribe({
      next: (data) => {
        this.series = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el listado de series.';
        this.loading = false;
      },
    });
  }
}
