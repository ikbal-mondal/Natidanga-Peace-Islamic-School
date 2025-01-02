import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center py-32">
      <div className="">
        <h1 className=" text-7xl font-extrabold mb-8">Error {status || 404}</h1>
        <p className="lg:text-3xl text-red-500">{error?.message}</p>
        <button className="btn bg-pink-400 text-white mt-8 font-bold">
          <Link to="/">Home Page</Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
