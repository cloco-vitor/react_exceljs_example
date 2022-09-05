import React from 'react';
import * as Excel from "exceljs";
import logo from './logo.svg';
import './App.css';

function App() {
  const [fileJson, setFileJson] = React.useState<Array<any>>([]);

  const handleChange = (files: FileList | null) => {
    if (files == null) return

    handleImport(files[0])
  }

  const handleImport = (file: Blob) => {
    const wb = new Excel.Workbook();
    const reader = new FileReader()
    const arrResult: Array<any> = []

    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      const buffer = reader.result;
      if (buffer == null || typeof buffer === 'string') return
      wb.xlsx.load(buffer).then(workbook => {
        console.log(workbook, 'workbook instance')
        workbook.eachSheet((sheet, id) => {
          sheet.eachRow((row, rowIndex) => {
            arrResult.push(row.values)
            // console.log(row.values, rowIndex)
          })
        })
        console.log('arrResult')
        console.log(arrResult)
        setFileJson(arrResult)
      })
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Result of file upload:
          {JSON.stringify(fileJson)}
        </p>
        <input type="file" onChange={(e) => handleChange(e.target.files)}/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
