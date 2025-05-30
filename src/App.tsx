import { AlertCircleIcon, Check } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { ResultTable } from "./result-table";
import { type Person } from "./types";

enum Files {
  File1 = "file1",
  File2 = "file2",
}
const filesLabels: Record<Files, string> = {
  [Files.File1]: "File 1",
  [Files.File2]: "File 2",
};
export default function App() {
  const [currentFile, setCurrentFile] = useState<Files | null>(null);
  const [data, setData] = useState<Person[] | null>(null);
  const [isError, setIsError] = useState(false);
  const fetchFile = async (fileName: Files) => {
    setCurrentFile(fileName);
    setData(null);
    setIsError(false);
    try {
      const response = await fetch(`/files/${fileName}.json`).then((res) =>
        res.json()
      );
      setData(response);
    } catch {
      setIsError(true);
    }
  };
  return (
    <div className="mx-auto flex flex-col gap-4 justify-center items-center p-8 w-full max-w-[800px]">
      <div className="flex flex-col gap-2 items-center">
        <p className="text-center text-sm">Select the file:</p>
        <div className="flex gap-2 flex-wrap">
          {Object.values(Files).map((fileName) => (
            <Button onClick={() => fetchFile(fileName)}>
              {filesLabels[fileName]}
              {fileName === currentFile && <Check />}
            </Button>
          ))}
        </div>
      </div>
      {isError && <ErrorMessage />}
      {data && <ResultTable data={data} />}
    </div>
  );
}
function ErrorMessage() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Something went wrong.</AlertTitle>
      <AlertDescription>
        <p>Please try again later.</p>
      </AlertDescription>
    </Alert>
  );
}
