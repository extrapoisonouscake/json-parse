import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import type { Person } from "./types";

export function ResultTable({ data }: { data: Person[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Last Name</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Province</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ firstName, lastName, province }, i) => (
          <TableRow key={i}>
            <TableCell>{lastName}</TableCell>
            <TableCell>{firstName}</TableCell>
            <TableCell>{province}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
