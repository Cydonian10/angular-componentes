import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

export interface SelectOption { value: string; label: string; disabled?: boolean; }

@Component({
  selector: 'app-search-select',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option],
  templateUrl: './search-select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchSelect implements FormValueControl<string | string[]> {
  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly options = input.required<readonly SelectOption[]>();
  readonly multiple = input(false);
  readonly placeholder = input('Buscar opciones…');
  readonly value = model<string | string[]>('');
  readonly disabled = input(false);
  readonly required = input(false);
  readonly invalid = input(false);
  readonly touched = input(false);
  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
  readonly touch = output<void>();
  protected readonly query = signal('');
  protected readonly expanded = signal(false);
  protected readonly selected = computed(() => Array.isArray(this.value()) ? this.value() as string[] : this.value() ? [this.value() as string] : []);
  protected readonly selectedOptions = computed(() => this.selected().map(value => this.options().find(option => option.value === value) ?? { value, label: value }));
  protected readonly filtered = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    return this.options().filter(option => option.label.toLocaleLowerCase().includes(query));
  });
  protected update(values: string[]): void {
    const visible = new Set(this.filtered().map(option => option.value));
    const previous = this.selected();
    const kept = previous.filter(value => !visible.has(value));
    const next = this.multiple() ? [...kept, ...values] : values.length ? [values[values.length - 1]] : kept;
    if (next.length === previous.length && next.every((value, index) => value === previous[index])) return;
    this.value.set(this.multiple() ? next : next[0] ?? '');
    this.query.set('');
    if (!this.multiple()) this.expanded.set(false);
  }
  protected remove(value: string): void {
    if (!this.disabled()) {
      const remaining = this.selected().filter(item => item !== value);
      this.value.set(this.multiple() ? remaining : remaining[0] ?? '');
    }
  }
  protected onFocusOut(event: FocusEvent): void {
    if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) this.touch.emit();
  }
}
