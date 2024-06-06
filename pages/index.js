import { NextSeo } from "next-seo";
import { useRouter } from "next/navigation";
import styles from "@/styles/Color.module.css";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Md3dRotation } from "react-icons/md";
import { TbRotate3D } from "react-icons/tb";
import { LiaAdSolid } from "react-icons/lia";
import { GrChatOption } from "react-icons/gr";
import { FaImages } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoMdOptions } from "react-icons/io";
import { SiAnswer } from "react-icons/si";
import { FaLongArrowAltRight } from "react-icons/fa";
import React from "react";
export default function Home() {
  const router = useRouter();
  const containerRef = useRef();
  const bodyColorRef = useRef();
  const detailsColorRef = useRef();
  const glassColorRef = useRef();

  useEffect(() => {
    let camera, scene, renderer, grid, controls;
    const wheels = [];
    let animationId;

    const init = () => {
      const container = containerRef.current;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setAnimationLoop(render);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.85;
      container.appendChild(renderer.domElement);

      window.addEventListener("resize", onWindowResize);

      camera = new THREE.PerspectiveCamera(
        40,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      );
      camera.position.set(4.25, 1.4, -4.5);

      controls = new OrbitControls(camera, container);
      controls.maxDistance = 9;
      controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
      controls.target.set(0, 0.5, 0);
      controls.update();

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x333333);

      new RGBELoader().load(
        "/venice_sunset_1k.hdr",
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
        },
        undefined,
        (err) => {
          console.error("An error happened while loading the HDR texture", err);
        }
      );

      scene.fog = new THREE.Fog(0x333333, 10, 15);

      grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
      grid.material.opacity = 0.2;
      grid.material.depthWrite = false;
      grid.material.transparent = true;
      scene.add(grid);

      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        metalness: 1.0,
        roughness: 0.5,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
      });

      const detailsMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 1.0,
        roughness: 0.5,
      });

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.25,
        roughness: 0,
        transmission: 1.0,
      });

      bodyColorRef.current.addEventListener("input", function () {
        bodyMaterial.color.set(this.value);
      });

      detailsColorRef.current.addEventListener("input", function () {
        detailsMaterial.color.set(this.value);
      });

      glassColorRef.current.addEventListener("input", function () {
        glassMaterial.color.set(this.value);
      });

      const shadow = new THREE.TextureLoader().load("/ferrari_ao.png");

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/gltf/");

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        "/ferrari.glb",
        (gltf) => {
          const carModel = gltf.scene.children[0];

          carModel.getObjectByName("body").material = bodyMaterial;
          carModel.getObjectByName("rim_fl").material = detailsMaterial;
          carModel.getObjectByName("rim_fr").material = detailsMaterial;
          carModel.getObjectByName("rim_rr").material = detailsMaterial;
          carModel.getObjectByName("rim_rl").material = detailsMaterial;
          carModel.getObjectByName("trim").material = detailsMaterial;
          carModel.getObjectByName("glass").material = glassMaterial;

          wheels.push(
            carModel.getObjectByName("wheel_fl"),
            carModel.getObjectByName("wheel_fr"),
            carModel.getObjectByName("wheel_rl"),
            carModel.getObjectByName("wheel_rr")
          );

          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
            new THREE.MeshBasicMaterial({
              map: shadow,
              blending: THREE.MultiplyBlending,
              toneMapped: false,
              transparent: true,
            })
          );
          mesh.rotation.x = -Math.PI / 2;
          mesh.renderOrder = 2;
          carModel.add(mesh);

          scene.add(carModel);
        },
        undefined,
        (err) => {
          console.error("An error happened while loading the GLTF model", err);
        }
      );
    };

    const onWindowResize = () => {
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    const render = () => {
      controls.update();
      const time = -performance.now() / 1000;

      for (let i = 0; i < wheels.length; i++) {
        wheels[i].rotation.x = time * Math.PI * 2;
      }

      grid.position.z = -time % 1;
      renderer.render(scene, camera);
    };

    init();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      if (renderer) {
        renderer.dispose();
        containerRef.current.removeChild(renderer.domElement);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <>
      <NextSeo
        title="3d-AutoBazar"
        description="3dautobazar.com!"
        viewport="width=device-width, initial-scale=1"
        canonical="https://3dautobazar.com"
        openGraph={{
          url: "https://3dautobazar.com",
          title: "3d-AutoBazar",
          description: "3dautobazar",
        }}
      />
      <main className={`text-white bg-gray-100 top-0 `}>
        <div className="">
          <section>
            <div className={styles.heroSection}>
              <div className={`hidden absolute ${styles.info}`}>
                <br />
                <br />
                <span className={styles.colorPicker}>
                  <input
                    ref={bodyColorRef}
                    id="body-color"
                    type="color"
                    defaultValue="#ff0000"
                  />
                  <br />
                  Body
                </span>
                <span className={styles.colorPicker}>
                  <input
                    ref={detailsColorRef}
                    id="details-color"
                    type="color"
                    defaultValue="#ffffff"
                  />
                  <br />
                  Details
                </span>
                <span className={styles.colorPicker}>
                  <input
                    ref={glassColorRef}
                    id="glass-color"
                    type="color"
                    defaultValue="#ffffff"
                  />
                  <br />
                  Glass
                </span>
              </div>
              <div ref={containerRef} className={styles.container}></div>
            </div>
          </section>
          <section className="hidden md:flex">
            <div
              className={`absolute top-0 right-0 h-[60vh] px-3 py-2 z-10 ${styles.gradientBg2}`}
            >
              <div className=" flex items-center justify-center  h-full w-full">
                <h2 className="text-lg font-bold text-white rotate-90">
                  The Future Is Here
                </h2>
              </div>
            </div>
          </section>

          <section className="absolute w-full px-1 z-50 md:left-1/2 md:transform md:-translate-x-1/2 -mt-5 ">
            <div className="flex justify-center text-center text-black ">
              <div className=" flex justify-center text-center gap-1 md:gap-2">
                <div className="flex py-1 md:py-2  text-center border rounded-full px-5 bg-white">
                  <IoSearchSharp className="text-4xl" />
                  <input
                    type="text"
                    placeholder="Search Make or Model..."
                    className="w-full text-black md:w-80 px-1 h-10  "
                  />
                </div>
                <div className=" text-gray-900 py-1 md:py-2 border rounded-full px-5 flex justify-center gap-3 text-center bg-white">
                  <div className="text-lg pt-1">Filters</div>
                  <IoMdOptions className="flex text-4xl" />
                </div>
              </div>
            </div>
          </section>

          <section className={` ${styles.gradientBg}`}>
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-center content-center py-16">
                <div className="max-w-sm p-6 rounded-lg">
                  <TbRotate3D className="text-5xl pb-2 text-green-500" />

                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    3D Model Generation
                  </h5>

                  <p className="mb-3 font-normal text-gray-900">
                    Upload images of your car from various angles and instantly
                    generate a detailed 3D model for visualization and analysis.
                  </p>
                </div>

                <div className="max-w-sm p-6 rounded-lg">
                  <Md3dRotation className="text-5xl pb-2 text-red-800" />

                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    3D Virtual Tour
                  </h5>

                  <p className="mb-3 font-normal text-gray-900">
                    Take a 3D virtual tour of the car's interior and exterior.
                    Experience the car as if you are actually there.
                  </p>
                </div>

                <div className="max-w-sm p-6 rounded-lg ">
                  <GrChatOption className="text-5xl pb-2 text-blue-500" />

                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Chat With Sellers
                  </h5>

                  <p className="mb-3 font-normal  text-gray-900">
                    Direct chat with sellers, and kow about their vehicles
                    specifications.
                  </p>
                </div>
              </div>
            </div>

            <section className="max-w-screen-xl mx-auto justify-center ">
              <div className="flex text-black justify-center text-center">
                <div className="">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-2">
                    Ads
                  </h2>
                </div>
              </div>
              <div className={`flex justify-center `}>
                <div className="grid gap-1  pb-6 md:grid-cols-3 lg:grid-cols-4">
                  <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
                    <a className="relative flex h-60 overflow-hidden" href="#">
                      <img
                        className="absolute top-0 right-0 h-full w-full object-cover"
                        src="https://cache1.pakwheels.com/system/car_generation_pictures/5361/original/Corolla-X-Cars-Cropped-Pictures-for-Website.jpg?1606903674"
                        alt="product image"
                      />
                    </a>
                    <div className="mt-4 px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-bold tracking-tight text-slate-900">
                          Lululemon Comfort Tee - White
                        </h5>
                      </a>
                      <div className="mt-2  flex items-center justify-between">
                        <p>
                          <span className="text-sm  text-slate-900">
                            PKR:7 MILLIAN
                          </span>
                        </p>
                      </div>
                      <h5 className="text-xl tracking-tight text-slate-900">
                        Lahore
                      </h5>
                    </div>
                  </div>

                  <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
                    <a className="relative flex h-60 overflow-hidden" href="#">
                      <img
                        className="absolute top-0 right-0 h-full w-full object-cover"
                        src="https://cache1.pakwheels.com/system/car_generation_pictures/5361/original/Corolla-X-Cars-Cropped-Pictures-for-Website.jpg?1606903674"
                        alt="product image"
                      />
                    </a>
                    <div className="mt-4 px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-bold tracking-tight text-slate-900">
                          Lululemon Comfort Tee - White
                        </h5>
                      </a>
                      <div className="mt-2  flex items-center justify-between">
                        <p>
                          <span className="text-sm  text-slate-900">
                            PKR:7 MILLIAN
                          </span>
                        </p>
                      </div>
                      <h5 className="text-xl tracking-tight text-slate-900">
                        Lahore
                      </h5>
                    </div>
                  </div>

                  <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
                    <a className="relative flex h-60 overflow-hidden" href="#">
                      <img
                        className="absolute top-0 right-0 h-full w-full object-cover"
                        src="https://cache1.pakwheels.com/system/car_generation_pictures/5361/original/Corolla-X-Cars-Cropped-Pictures-for-Website.jpg?1606903674"
                        alt="product image"
                      />
                    </a>
                    <div className="mt-4 px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-bold tracking-tight text-slate-900">
                          Lululemon Comfort Tee - White
                        </h5>
                      </a>
                      <div className="mt-2  flex items-center justify-between">
                        <p>
                          <span className="text-sm  text-slate-900">
                            PKR:7 MILLIAN
                          </span>
                        </p>
                      </div>
                      <h5 className="text-xl tracking-tight text-slate-900">
                        Lahore
                      </h5>
                    </div>
                  </div>

                  <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
                    <a className="relative flex h-60 overflow-hidden" href="#">
                      <img
                        className="absolute top-0 right-0 h-full w-full object-cover"
                        src="https://cache1.pakwheels.com/system/car_generation_pictures/5361/original/Corolla-X-Cars-Cropped-Pictures-for-Website.jpg?1606903674"
                        alt="product image"
                      />
                    </a>
                    <div className="mt-4 px-5 pb-5">
                      <a href="#">
                        <h5 className="text-xl font-bold tracking-tight text-slate-900">
                          Lululemon Comfort Tee - White
                        </h5>
                      </a>
                      <div className="mt-2  flex items-center justify-between">
                        <p>
                          <span className="text-sm  text-slate-900">
                            PKR:7 MILLIAN
                          </span>
                        </p>
                      </div>
                      <h5 className="text-xl tracking-tight text-slate-900">
                        Lahore
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section className="max-w-screen-xl mx-auto justify-center">
            <h1 className="text-3xl font-bold text-center mb-8">
              Tips For Selling Your Car
            </h1>

            <div className="flex flex-col md:flex-row justify-center py-8 gap-8">
              <div className="bg-white rounded-lg shadow-md  w-full md:w-1/5">
                <div className="bg-blue-500 rounded-t-lg mb-1">
                  <img
                    src="austin_image.jpg"
                    alt="Showcase Car"
                    className="w-full p-6  h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6 flex justify-center text-center">
                  <div className="text-center">
                    <h2 className="text-lg text-black font-semibold mb-2">
                      Showcase Your Car's Best Features
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Highlighting the best features... visually appealing...
                    </p>
                    <span className=" text-black hover:bg-green-700  font-bold border-b-4 border-r-4  border-green-500 rounded ">
                      <button className=" text-black border hover:bg-green-700 font-bold  px-4 rounded ">
                        Read More
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-screen-lg mx-auto justify-center">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-green-500 before:to-transparent">
              <div className="relative">
                <div className="md:flex items-center md:space-x-4 mb-3">
                  <div className="">
                    <div className=" flex items-center justify-center bg-green-500 w-10 h-10 rounded-full shadow md:order-1">
                      <MdOutlineManageAccounts className="text-lg" />
                    </div>
                  </div>

                  <div className="text-slate-500 ml-14">
                    <span className="text-slate-900 font-bold">
                      Set Up an Account
                    </span>{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className=" bg-white   text-slate-500  ml-14 ">
                    <p>
                      Sign Up: New users can create an account using their email
                      or social media profiles. Login: Existing users can log in
                      with their credentials to access their personalized
                      dashboard. Start Listing
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-auto">
                    <img
                      src="/images/respond-inquiries.png"
                      alt="Respond to Inquiries"
                      className="h-24 w-24 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="md:flex items-center md:space-x-4 mb-3">
                  <div className=" ">
                    <div className=" flex items-center justify-center bg-green-500 w-10 h-10 rounded-full shadow md:order-1">
                      <LiaAdSolid className="text-lg" />
                    </div>
                  </div>

                  <div className="text-slate-500 ml-14">
                    <span className="text-slate-900 font-bold">
                      Create a Listing
                    </span>{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className=" bg-white p-4    text-slate-500  ml-14 ">
                    <p>
                      Sign Up: New users can create an account using their email
                      or social media profiles. Login: Existing users can log in
                      with their credentials to access their personalized
                      dashboard. Start Listing
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-auto">
                    <img
                      src="/images/respond-inquiries.png"
                      alt="Respond to Inquiries"
                      className="h-24 w-24 object-contain"
                    />
                  </div>{" "}
                </div>
              </div>

              <div className="relative">
                <div className="md:flex items-center md:space-x-4 mb-3">
                  <div className=" ">
                    <div className=" flex items-center justify-center bg-green-500 w-10 h-10 rounded-full shadow md:order-1">
                      <FaImages className="text-lg" />
                    </div>
                  </div>

                  <div className="text-slate-500 ml-14">
                    <span className="text-slate-900 font-bold">
                      Upload 2D Images
                    </span>{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className=" bg-white p-4    text-slate-500  ml-14 ">
                    <p>
                      Upload standard 2D images of the vehicle along with a
                      detailed description. This allows for a quick and easy ad
                      posting for those who prefer traditional listings.
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-auto">
                    <img
                      src="/images/respond-inquiries.png"
                      alt="Respond to Inquiries"
                      className="h-24 w-24 object-contain"
                    />
                  </div>{" "}
                </div>
              </div>

              <div className="relative">
                <div className="md:flex items-center md:space-x-4 mb-3">
                  <div className=" ">
                    <div className=" flex items-center justify-center bg-green-500 w-10 h-10 rounded-full shadow md:order-1">
                      <Md3dRotation className="text-lg" />
                    </div>
                  </div>

                  <div className="text-slate-500 ml-14">
                    <span className="text-slate-900 font-bold">
                      3D Image Generation
                    </span>{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className=" bg-white p-4    text-slate-500  ml-14 ">
                    <p>
                      Capture Multiple Angles: To create a 3D model, users need
                      to take a series of images from multiple angles, ensuring
                      every aspect of the car is covered (front, back, sides,
                      top, and interior). Automated Processing: Our system
                      processes these images to generate an interactive 3D
                      model.
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-auto">
                    <img
                      src="/images/respond-inquiries.png"
                      alt="Respond to Inquiries"
                      className="h-24 w-24 object-contain"
                    />
                  </div>{" "}
                </div>
              </div>

              <div className="relative">
                <div className="md:flex items-center md:space-x-4 mb-3">
                  <div className=" ">
                    <div className=" flex items-center justify-center bg-green-500 w-10 h-10 rounded-full shadow md:order-1">
                      <SiAnswer text-lg />
                    </div>
                  </div>

                  <div className="text-slate-500 ml-14">
                    <span className="text-slate-900 font-bold">
                      Respond To Inquiries
                    </span>{" "}
                  </div>
                </div>
                <div className="flex">
                  <div className=" bg-white p-4    text-slate-500  ml-14 ">
                    <p>
                      Monitor messages and inquires from potential buyers.
                      Respond quickly and provide additional information.
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-auto">
                    <img
                      src="/images/respond-inquiries.png"
                      alt="Respond to Inquiries"
                      className="h-24 w-24 object-contain"
                    />
                  </div>{" "}
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-screen-xl mx-auto justify-center">
            <h1 className="text-3xl text-black font-bold text-center mb-8">
              Our services
            </h1>

            <div className="flex flex-col md:flex-row justify-center py-8 gap-1 md:gap-16">
              <div
                className={` rounded-lg   w-full md:w-1/5 ${styles.gradientBg2}`}
              >
                <div className=" rounded-t-lg mb-1">
                  <img
                    src="austin_image.jpg"
                    alt="Showcase Car"
                    className="w-full p-6  h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-2 flex justify-center text-center">
                  <div className="text-center">
                    <h2 className="text-lg text-black font-semibold mb-2">
                      Sell Your Car With 3d View
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Sell Your Car with 100% free and 3d View On AutoBazar
                    </p>
                    <span className=" text-black  flex justify-center  font-bold   border-green-500 rounded ">
                      <FaLongArrowAltRight className="text-5xl font-bold" />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={` rounded-lg   w-full md:w-1/5 ${styles.gradientBg2}`}
              >
                <div className=" rounded-t-lg mb-1">
                  <img
                    src="austin_image.jpg"
                    alt="Showcase Car"
                    className="w-full p-6  h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-2 flex justify-center text-center">
                  <div className="text-center">
                    <h2 className="text-lg text-black font-semibold mb-2">
                      Sell Your Car With 3d View
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Sell Your Car with 100% free and 3d View On AutoBazar
                    </p>
                    <span className=" text-black  flex justify-center  font-bold   border-green-500 rounded ">
                      <FaLongArrowAltRight className="text-5xl font-bold" />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={` rounded-lg   w-full md:w-1/5 ${styles.gradientBg2}`}
              >
                <div className=" rounded-t-lg mb-1">
                  <img
                    src="austin_image.jpg"
                    alt="Showcase Car"
                    className="w-full p-6  h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-2 flex justify-center text-center">
                  <div className="text-center">
                    <h2 className="text-lg text-black font-semibold mb-2">
                      Sell Your Car With 3d View
                    </h2>
                    <p className="text-gray-600 mb-2">
                      Sell Your Car with 100% free and 3d View On AutoBazar
                    </p>
                    <span className=" text-black  flex justify-center  font-bold   border-green-500 rounded ">
                      <FaLongArrowAltRight className="text-5xl font-bold" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="max-w-screen-xl text-red-800 mx-auto justify-center py-2 ">
              <div className={`p-12 rounded-lg ${styles.gradientBg2}`}>
                <div className=" ">
                  <h2 className="font-bold text-3xl">
                    Join Our Auto Enthusiast Community
                  </h2>
                </div>
                <div className="flex text-black">
                  <div>
                    {" "}
                    <div>
                      If you need to use a one-off gap value that doesn’t make
                      sense to include in your theme, use square brackets to
                      generate a property on the fly using any arbitrary
                      value.If you need to use a one-off gap value that doesn’t
                      make sense to include in your theme, use square brackets
                      to generate a property on the fly using any arbitrary
                      value.
                    </div>
                    <div className="md:p-12 py-12">
                      <div className="bg-white items-center rounded-full mx-auto md:mb-3  max-w-screen-sm flex sm:space-y-0">
                        <div className="relative w-full">
                          <label
                            for="email"
                            className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Email address
                          </label>

                          <input
                            className="block py-2 pl-10 w-full text-sm text-gray-900  rounded-full   "
                            placeholder="Enter your email"
                            type="email"
                            id="email"
                            required=""
                          />
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="py-3 bg-red-800 px-5 w-full text-sm font-medium text-center text-white border cursor-pointer bg-primary-700 border-primary-600  rounded-full hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
