import { TbRotate3D } from "react-icons/tb";
import { GrChatOption } from "react-icons/gr";
import { Md3dRotation } from "react-icons/md";
import styles from "@/styles/Color.module.css";
const Hero = () => (
    <div className="container mx-auto">
    <div className="flex flex-wrap justify-center content-center py-16">
      <div className="max-w-sm p-6 rounded-lg">
        <TbRotate3D className="text-5xl pb-2 text-green-500" />

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900   ">
          3D Model Generation
        </h5>

        <p className="mb-3 font-normal text-gray-900">
          Upload images of your car from various angles and instantly
          generate a detailed 3D model for visualization and analysis.
        </p>
      </div>

      <div className="max-w-sm p-6 rounded-lg">
        <Md3dRotation className="text-5xl pb-2 text-red-800" />

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900   ">
          3D Virtual Tour
        </h5>

        <p className="mb-3 font-normal text-gray-900">
          Take a 3D virtual tour of the car's interior and exterior.
          Experience the car as if you are actually there.
        </p>
      </div>

      <div className="max-w-sm p-6 rounded-lg ">
        <GrChatOption className="text-5xl pb-2 text-blue-500" />

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900   ">
          Chat With Sellers
        </h5>

        <p className="mb-3 font-normal  text-gray-900">
          Direct chat with sellers, and kow about their vehicles
          specifications.
        </p>
      </div>
    </div>
  </div>
);
export default Hero;