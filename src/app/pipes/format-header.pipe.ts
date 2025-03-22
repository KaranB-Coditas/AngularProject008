import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHeader'
})
export class FormatHeaderPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/([A-Z])/g, ' $1') // Insert space before capital letters
                .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  }

}
