import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import BottomNavbar from '../components/BottomNavbar'
// import GoogleMapp from '../components/GoogleMap'
import LeafletMap from '../components/LeafletMap'

const MapPage = () => {
    return (
        <>
            <div className="flex h-screen flex-col">
                <div className="h-20"><Navbar /></div>
                <div className="relative flex-1 overflow-y-auto">
                    <div className="lg:grid lg:grid-cols-5 gap-0 md:grid md:grid-cols-5 sm:flex sm:flex-col">
                        <div className="first top-20 col-span-1">
                            <div className="fixed w-1/5">

                            </div>
                        </div>
                        <div className="lg:col-span-3 md:col-span-3">
                            <LeafletMap/>
                        </div>
                        <div className="third right-0 top-20 lg:col-span-1 md:col-span-1 hidden lg:block">
                            <div className="fixed w-1/5">
                                <Sidebar />
                            </div>
                        </div>
                        <div className="lg:hidden md:hidden bottom-0">
                            <div className="fixed w-1/5">
                                <BottomNavbar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MapPage