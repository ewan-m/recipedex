import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useAuth, useAuthRedirection } from "./useAuth";

export const AppContainer: FC<
  {
    title?: string;
    subtitle?: string;
    breadcrumb?: {
      text: string;
      to: string;
    };
  } & PropsWithChildren
> = ({ subtitle, title, breadcrumb, children }) => {
  useAuthRedirection();

  const auth = useAuth();

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-t from-blue-200 to-indigo-900 p-5">
      {!title ? (
        children
      ) : (
        <div className="h-full w-full">
          <div className="mb-5 flex flex-row items-stretch justify-between">
            <div className="flex flex-col items-start justify-center">
              {breadcrumb && (
                <span className="text-gray-600">
                  <Link
                    className="font-light text-gray-200"
                    to={breadcrumb.to}
                    style={{ viewTransitionName: "library" }}
                  >
                    {breadcrumb.text}{" "}
                  </Link>{" "}
                  /
                </span>
              )}
              <span className="flex flex-wrap items-baseline">
                <h1 className="line-clamp-2 pb-1 text-4xl font-bold text-gray-200 sm:text-5xl md:text-7xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="m-w-25 ml-2 line-clamp-2 shrink-0 font-light text-gray-300	">
                    {subtitle}
                  </p>
                )}
              </span>
            </div>
            {auth.isLoggedIn && <></>}
          </div>
          {children}
        </div>
      )}
    </main>
  );
};
