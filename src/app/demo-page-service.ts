import { Injectable } from '@angular/core';
import { TableRow } from './shared/components/table/table';

@Injectable({ providedIn: 'root' })
export class DemoPageService {
  // Sustituir por una petición HTTP que reciba page y pageSize y devuelva items y total.
  async getPage(page: number, pageSize: number): Promise<{ items: TableRow[]; total: number }> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const total = 600;
    const start = (page - 1) * pageSize;
    return {
      total,
      items: Array.from({ length: Math.max(0, Math.min(pageSize, total - start)) }, (_, index) => {
        const id = start + index + 1;
        return {
          id,
          nombre: `Producto ${id}`,
          categoria: ['Bebidas', 'Alimentos', 'Insumos'][id % 3],
          estado: id % 4 === 0 ? 'Agotado' : 'Disponible',
        };
      }),
    };
  }
}
