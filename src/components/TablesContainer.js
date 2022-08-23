import DataTable from "./DataTable";
import { v4 as uuid } from "uuid";


function TablesContainer({tables}){
  return (
    <table className=" grid items-center justify-items-center ">
      <thread>
      <h1 className=" items-center justify-items-center ">
      Lean Data
      </h1>
        {tables.map( table => (
          <th key={uuid()}>
            <tr className="text-center">{Object.keys(table)[0]}</tr>
            <DataTable table={table}/>
          </th>
        ))}
      </thread>
    </table>
  )
}

export default TablesContainer;