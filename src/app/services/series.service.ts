import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Serie {
  id: number;
  title: string;
  channel: string;
  rating: number;
  creator?: string;
  dates?: string;
  image?: string;
}

export interface CreateSeriePayload {
  title: string;
  channel: string;
  rating: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private readonly baseUrl = 'https://peticiones.online/api/series';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseUrl);
  }

  create(payload: CreateSeriePayload): Observable<Serie> {
    return this.http.post<Serie>(this.baseUrl, payload);
  }
}
