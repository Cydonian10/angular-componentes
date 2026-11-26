import { Component, computed, inject, signal } from '@angular/core';
import { form, FormField, submit, validate } from '@angular/forms/signals';
import { injectMutation, injectQuery } from '@tanstack/angular-query';
import { PlaceHolderApi } from '../../placeholder/service/placeholder/placeholder.service';
import { Table, TableColumn, TableRow } from '../../shared/components/table/table';
import { Pagination } from '../../shared/components/pagination/pagination';
import { Input } from '../../shared/components/input/input';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-posts-page',
  imports: [Table, Pagination, Input, Button, FormField],
  templateUrl: './posts.html',
})
export class PostsPage {
  private readonly api = inject(PlaceHolderApi);

  protected readonly query = injectQuery(() => this.api.list());

  protected readonly mutation = injectMutation(() => this.api.create());

  protected readonly model = signal({ title: '', body: '', userId: '1' });

  protected readonly postForm = form(this.model, (path) => {
    validate(path.title, ({ value }) =>
      value().trim() ? undefined : { kind: 'required', message: 'Ingresa un título.' },
    );
    validate(path.body, ({ value }) =>
      value().trim() ? undefined : { kind: 'required', message: 'Ingresa el contenido.' },
    );
    validate(path.userId, ({ value }) =>
      /^[1-9]\d*$/.test(value()) && Number.isSafeInteger(Number(value()))
        ? undefined
        : { kind: 'invalid', message: 'Ingresa un ID de usuario entero mayor que cero.' },
    );
  });
  protected readonly page = signal(1);

  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'userId', label: 'Usuario' },
    { key: 'title', label: 'Título' },
    { key: 'body', label: 'Contenido' },
  ];
  protected readonly posts = computed(() => [...this.api.created(), ...(this.query.data() ?? [])]);

  protected readonly totalPages = computed(() => Math.ceil(this.posts().length / 10));

  protected readonly rows = computed<TableRow[]>(() =>
    this.posts()
      .slice((this.page() - 1) * 10, this.page() * 10)
      .map((post) => ({ ...post })),
  );

  protected create(): void {
    if (this.mutation.isPending()) return;
    void submit(this.postForm, async () => {
      const { title, body, userId } = this.model();
      try {
        await this.mutation.mutateAsync({
          title: title.trim(),
          body: body.trim(),
          userId: Number(userId),
        });
        this.model.update((value) => ({ ...value, title: '', body: '' }));
        this.postForm().reset(this.model());
        this.page.set(1);
      } catch {
        // Mutation state displays the error and leaves the form available for retry.
      }
    });
  }
}
