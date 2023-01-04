import { Outlet } from 'react-router-dom';

function Auth() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-[#FFAA33] p-10">
      <div className="w-full md:w-2/3 rounded-lg bg-white shadow-xl">
        <div className="flex flex-row items-center">
          <div className="w-1/2 hidden xl:block">
            <img
              src="../images/login.jpg"
              className="h-full w-full rounded-l-lg object-cover"
              alt=""
            />
          </div>

          <div className="w-full xl:w-1/2 p-10 mx-auto">
            <div className="flex flex-col">
              <div className="flex items-center justify-center gap-x-2">
                <img src="../images/paw.png" alt="" />
              </div>

              <div className="flex flex-col gap-y-2">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
