import { useActionData } from "react-router-dom";
import { ActionData } from "../../../types";

export default function FormErrorDetails() {
  const actionData = useActionData() as ActionData;
  return (
    <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 rounded-md shadow-md">
      <h3 className="text-red-700 font-semibold text-lg mb-2 flex items-center">
        Please fix the errors:
      </h3>
      <ul className="text-red-600 text-sm list-disc pl-6 space-y-1">
        {!actionData?.success &&
          actionData?.messages!.map((message, idx) => (
            <li key={idx}>{message}</li>
          ))}
      </ul>
    </div>
  );
}
