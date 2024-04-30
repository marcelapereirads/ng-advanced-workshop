import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightTextSnippet'
})
export class HighlightTextSnippetPipe implements PipeTransform {
  transform(text: string, snippetToHighlight: string): string {
    if (snippetToHighlight) {
      const searchStringPosition = text.toLowerCase().indexOf(snippetToHighlight.toLowerCase());
      const prefix = text.substring(0, searchStringPosition);
      const match = text.substring(searchStringPosition, searchStringPosition + snippetToHighlight.length);
      const suffix = text.substring(searchStringPosition + snippetToHighlight.length);

      return `${prefix}<b>${match}</b>${suffix}`;
    }

    return text;
  }
}
