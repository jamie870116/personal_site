/* eslint-disable no-unused-vars */
import React from 'react'
import '../css/resume.css'
import { Document, Page } from 'react-pdf'
import resume_pdf from '../assets/Kevin_Resume_software.pdf'
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function Resume() {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);



  return (
    <div className='resume'>
      <div className="Example__container">
        <div className="Example__container__document">
          <Document file={resume_pdf} >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
      {/* <embed className='resume-file' src={resume_pdf} type="application/pdf" /> */}
    </div>

  )
}

export default Resume