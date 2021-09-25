import {Component, ViewChild} from '@angular/core';
import * as ClassicEditor from '@nvdunginest/ckeditor5-custom-build'

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ckeditor-demo';
  public Editor = ClassicEditor as any;
  content = ""
  @ViewChild('myEditor') myEditor: any;


  private getArticleContent() {
    if (this.myEditor && this.myEditor.editorInstance) {
      return this.myEditor.editorInstance.getData();
    }

    return '';
  }

  getContent() {
    this.content = this.getArticleContent();
  }

  htmlToPDF() {
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#result")).then(canvas => {

      var pdf = new jspdf('p', 'pt', [canvas.width, canvas.height]);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, 0, 0, canvas.width, canvas.height);
      pdf.save('converteddoc.pdf');
    });

  }
}
