import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavbar';
import Form from '../components/Form';

const CreatePage= () => {

  const token = localStorage.getItem("token")

  useEffect(() => {
  }, [token]);

  return (
    <>
      <div className="screen">
        <Navbar />
        <main className="container-fluid mx-0 grid grid-cols-5 screen h-screen sm:">
          <div className="col-span-1 mt-28">
            <div className="w-full top-28">
              <div className="fixed">
                <Form />
              </div>
            </div>
          </div>
          <div className="col-span-3 mt-28 px-28">
          </div>
          <div className="col-span-1 mt-28 lg:block md:block sm:hidden">
            <div className="w-full">
              <div className="fixed">
              </div>
            </div>
          </div>
          <div className="lg:hidden md:hidden sm:block">
            <BottomNavbar />
          </div>
        </main>
      </div>
    </>

  );
};

export default CreatePage;