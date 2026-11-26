import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { mutationOptions, queryOptions } from '@tanstack/angular-query';
import { lastValueFrom } from 'rxjs';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export type NewPost = Omit<Post, 'id'>;

@Injectable({ providedIn: 'root' })
export class PlaceHolderApi {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com/posts';
  readonly created = signal<Post[]>([]);

  list() {
    return queryOptions({
      queryKey: ['posts'],
      queryFn: () => {
        return lastValueFrom(this.http.get<Post[]>(this.url));
      },
    });
  }

  create() {
    return mutationOptions({
      mutationFn: (post: NewPost) => lastValueFrom(this.http.post<Post>(this.url, post)),
      onSuccess: (result) => {
        this.created.update((post) => [result, ...post]);
      },
    });
  }
}
