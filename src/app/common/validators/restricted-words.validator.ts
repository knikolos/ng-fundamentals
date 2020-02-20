import { FormControl } from '@angular/forms';

export function restrictedWords(words?: string[]) {
    return (control: FormControl): { [key: string]: any } => {
        let foundWords = [];

        if (words) {
            words.forEach(word => {
                if (control.value.includes(word))
                    foundWords.push(word);
            });
        }

        return foundWords && foundWords.length ? { "restrictedWords": foundWords } : null;
    }
}