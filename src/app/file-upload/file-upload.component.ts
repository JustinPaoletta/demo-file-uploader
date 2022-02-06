import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('displayUpload') displayUpload!: ElementRef; 
  fileName: string;

  constructor(private http: HttpClient) {
    this.fileName = '';
  }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("selectedfile", file);

      const upload$ = this.http.post("http://localhost:7200/uploadFile", formData);

      upload$.subscribe((data: any) => { 
        this.displayUpload.nativeElement.src = `http://localhost:7200/${data.path}`;
        this.fileName = data.path;
      });
    }
  }

}
