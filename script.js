import * as THREE from 'https://esm.sh/three@0.158.0';
import { GLTFLoader } from 'https://esm.sh/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    40, window.innerWidth / window.innerHeight, 1, 100
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    canvas: document.getElementById('WebGL'), 
    alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xFFFFFF, 10);
light.position.set(5, 5, 5);
scene.add(light);

const planetGroup = new THREE.Group();
scene.add(planetGroup);

let model;
loader.load(
  'Nike_Air_Max.glb',
  (gltf) => {
    model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);

    planetGroup.add(model);
    animate();
  },
  undefined,
  (error) => {
    console.error('Erreur chargement GLTF :', error);
  }
);

const keyframes = [
  {
    start: 0,
    end: 300,
    from: {
      x: 0, y: -1, z: 0,
      scale: 0.5,
      rotation: { x: 0, y: 0, z: 1 }
    },
    to: {
      x: -2, y: -0.5, z: 0,
      scale: 0.6,
      rotation: { x: 0, y: 3, z: 1 }
    }
  },
  {
    start: 300,
    end: 1000,
    from: {
      x: -2, y: -0.5, z: 0,
      scale: 0.6,
      rotation: { x: 0, y: 3, z: 1 }
    },
    to: {
      x: -2, y: -0.5, z: 0,
      scale: 0.6,
      rotation: { x: 0, y: 3, z: 1 }
    }
  },
  {
    start: 1000,
    end: 1700,
    from: {
      x: -2, y: -0.5, z: 0,
      scale: 0.6,
      rotation: { x: 0, y: 3, z: 1 }
    },
    to: {
      x: 2, y: -0.5, z: 0,
      scale: 1,
      rotation: { x: 0, y: -0.6, z: 1 }
    }
  },
  {
    start: 1700,
    end: 2500,
    from: {
      x: 2, y: -0.5, z: 0,
      scale: 1,
      rotation: { x: 0, y: -0.6, z: 1 }
    },
    to: {
      x: 0, y: -0.5, z: 2,
      scale: 0.3,
      rotation: { x: 0, y: 1, z: 0 }
    }
  },
];

const mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

function sigmoid(x) {
  return 1 / (1 + Math.exp(-12 * (x - 0.5)));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const getFrameAtScroll = (scrollY) => {
  for (let frame of keyframes) {
    if (scrollY >= frame.start && scrollY <= frame.end) {
      const t = (scrollY - frame.start) / (frame.end - frame.start);
      const s = sigmoid(t);

      return {
        x: lerp(frame.from.x, frame.to.x, s),
        y: lerp(frame.from.y, frame.to.y, s),
        z: lerp(frame.from.z, frame.to.z, s),
        scale: lerp(frame.from.scale, frame.to.scale, s),
        rotation: {
          x: lerp(frame.from.rotation.x, frame.to.rotation.x, s),
          y: lerp(frame.from.rotation.y, frame.to.rotation.y, s),
          z: lerp(frame.from.rotation.z, frame.to.rotation.z, s)
        }
      };
    }
  }

  const last = keyframes[keyframes.length - 1];
  return {
    x: last.to.x,
    y: last.to.y,
    z: last.to.z,
    scale: last.to.scale,
    rotation: {
      x: last.to.rotation.x,
      y: last.to.rotation.y,
      z: last.to.rotation.z
    }
  };
};

const animate = () => {
  requestAnimationFrame(animate);

  const scrollY = window.scrollY;
  const target = getFrameAtScroll(scrollY);

  const targetPosX = target.x + mouse.x * 0.05;
  const targetPosY = target.y + mouse.y * 0.05;
  const targetPosZ = target.z;

  planetGroup.position.x += (targetPosX - planetGroup.position.x) * 0.1;
  planetGroup.position.y += (targetPosY - planetGroup.position.y) * 0.1;
  planetGroup.position.z += (targetPosZ - planetGroup.position.z) * 0.1;

  planetGroup.scale.setScalar(
    planetGroup.scale.x + (target.scale - planetGroup.scale.x) * 0.1
  );

  planetGroup.rotation.x += (target.rotation.x - planetGroup.rotation.x) * 0.1;
  planetGroup.rotation.y += (target.rotation.y - planetGroup.rotation.y) * 0.1;
  planetGroup.rotation.z += (target.rotation.z - planetGroup.rotation.z) * 0.1;

  renderer.render(scene, camera);
};

window.addEventListener('scroll', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
