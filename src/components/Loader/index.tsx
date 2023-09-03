import { Rings } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Loader = () => {
  const isLoad = useSelector((state: RootState) => state.loader.isLoad);

  if (!isLoad) return <></>;

  return (
    <div className="h-screen w-screen bg-[#000000ba] fixed top-0 left-0 z-[9999] flex justify-center items-center">
      <Rings
        height="100"
        width="100"
        color="#1585ed"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader;
