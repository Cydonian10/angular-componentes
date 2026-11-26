import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { LucideEye, LucideEyeOff } from '@lucide/angular';

type InputType =
  'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time';

@Component({
  selector: 'app-input',
  imports: [LucideEye, LucideEyeOff],
  templateUrl: './input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input implements FormValueControl<string> {
  readonly label = input.required<string>();
  readonly type = input<InputType>('text');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly placeholder = input('');
  readonly hint = input('');
  readonly name = input('');
  readonly autocomplete = input('');
  readonly required = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly value = model('');
  readonly touch = output<void>();
  protected readonly showPassword = signal(false);
}
