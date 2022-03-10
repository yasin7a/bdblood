import MapBar from "./MapBar";
import Map from "./Map";
const Homes = () => {


  return (
    <>
      <div className="w-full flex h-screen overflow-hidden">
        <div className="mapbar w-[28%]  h-full p-2 border-r border-slate-400">
          <MapBar />
        </div>
        <div className="map w-[72%]  h-full">
          <Map />
        </div>
      </div>
    </>
  );
};

export default Homes;
