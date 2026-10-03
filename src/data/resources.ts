import type { Locale } from '../i18n/ui';
export interface Resource {
  revision: string; title: Record<Locale, string>; description: Record<Locale, string>;
  kind: 'model' | 'drawing' | 'note'; url: string;
}
export const resources: Resource[] = [];
