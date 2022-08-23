import DataTable from "./DataTable";
import { v4 as uuid } from "uuid";


function TablesContainer({tables}){
   
  return (
    <table className=" grid items-center justify-items-center ">
      <thread>
      <h1 className=" items-center justify-items-center ">
      Information
      </h1>
        { tables.map( table => (
          <th key={uuid()}>
            <tr className="grid items-center justify-items-center pb-8">{Object.keys(table)[0]} </tr>
            <DataTable table={table}/>
          </th>
        ))}
      </thread>
    </table>
  )
}

export default TablesContainer;