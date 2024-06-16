import { useRouter } from "next/navigation";
import styles from "@/styles/Color.module.css";

import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GiClockwork } from "react-icons/gi";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

import React from "react";

export default function Home() {
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
        containerRef?.current?.removeChild(renderer.domElement);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <>
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
    </>
  );
}
