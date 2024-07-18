import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="h-full w-full flex flex-grow items-center justify-center">
        <div className="rounded-lg bg-white p-8 text-center shadow-xl">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="text-gray-600">
            Oops! The page you are looking for could not be found.
          </p>
          <Link
            href={"/"}
            className="mt-4 inline-block rounded bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-800"
          >
            {" "}
            Go back to Home{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
