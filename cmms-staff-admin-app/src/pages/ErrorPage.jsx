import { useRouteError } from "react-router-dom";
import Page from "../components/Page";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Page title="Error">
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-lg mb-4">
            Sorry, an unexpected error has occurred.
          </p>
          <p className="text-gray-600 mb-8">
            <i>{error.statusText || error.message}</i>
          </p>
          <Link to="/" className="text-blue-500 hover:underline">
            Go back to Home
          </Link>
        </div>
      </div>
    </Page>
  );
}
