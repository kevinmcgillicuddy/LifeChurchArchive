import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metadata'
})
export class MetadataPipe implements PipeTransform {

   transform(value: any): any {

return  value.then(res=>{
    return res.customMetadata.uuid
  })
      







    }

}
