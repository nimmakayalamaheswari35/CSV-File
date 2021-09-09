import { Component, OnInit } from '@angular/core';
import  * as XLSX from 'xlsx';
@Component({
  selector: 'app-excel-sheet',
  templateUrl: './excel-sheet.component.html',
  styleUrls: ['./excel-sheet.component.css']
})
export class ExcelSheetComponent  {

  searchOption = '';
  searchString = '';

  data = [];
  dataKeys: string[] = [];
  file: any;
  uploadingFile(event:any) {
    let workBook: any = null;
    let jsonData: any = null;
    let dataString : any = null;
    this.file = event.target.files[0];
    const reader = new FileReader();
   
    reader.readAsBinaryString(this.file);
    reader.onload = (e) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary'});

      jsonData =  workBook.SheetNames.reduce((initial:any, name: any) => {
                                              const sheet = workBook.Sheets[name];
                                              name = 'Sheet1';
                                              initial[name] = XLSX.utils.sheet_to_json(sheet);
                                              return initial;
                                            },{});
      dataString  = JSON.stringify(jsonData.Sheet1);
      dataString = JSON.parse(dataString);
      this.data = dataString;
      
      if(this.data[0]) {
        const keys = Object.keys(this.data[0]);
        this.dataKeys = keys;
      }
      
     
    };
    
  }

}