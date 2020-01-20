import { Pipe, PipeTransform } from '@angular/core';

export interface IProduct{
    productId: number,
    productName: string,
    productCode: string,
    releaseDate: string,
    description: string,
    price: number,
    starRating: number,
    imageUrl: string
}

@Pipe({
    name: 'convertToSpaces' 
})
export class convertToSpacePipe implements PipeTransform{
    transform(value: string, character: string): string{
        return value.replace(character,' ');
    }
}