import React from "react";
import { Table } from "reactstrap";

function DataTable({table}){

  if(Object.keys(table).length<1){
    return (
      <Table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr>
          </tr>
        </tbody>
      </Table>
    )
  }

  const tableName = Object.keys(table)[0];
  const rows = table[tableName];
  const columnNames = rows[0] ? Object.keys(rows[0]) : [];

  return (
      <Table className=" border-separate border-spacing-2 border border-slate-500 mx-8 ">
        <thead>
          <tr>
            {
              columnNames.map( column => (
                <th className="border border-slate-600 p-4" key={`${tableName}-${column}`}>
                  {column}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rows.map( (row, idx) => (
              <tr key={`${tableName}-${idx}`}>
                {
                  Object.keys(row).map( e => (
                    <td className="border border-slate-700 p-4"  key={`${tableName}-${idx}-${e}`}>
                      {row[e]}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </Table>
  )
}

export default DataTable;