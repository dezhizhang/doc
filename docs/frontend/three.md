# three



### gui的使用
```js
const config = {
	rotationSpeed:0.01,
	color:'#66ccff',
	wireframe:false,
	envMap:'无'
}

const gui = new dat.GUI();
const f = gui.addFolder('配置');
f.add(config,'rotationSpeed').min(0.01).max(0.1).step(0.01);
f.add(config,'color');
f.add(config,'envMap',['无','全反躲']);
f.add(config,'wireframe')

f.open();
```

### 环境贴图
```js
const cubeTexture = new THREE.CubeTextureLoader().setPath('parliament/').load([
	'negx.jpg',
	'negy.jpg',
	'negz.jpg',
	'posx.jpg',
	'posy.jpg',
	'posz.jpg',
	
]);
scene.background = cubeTexture;
```

### 设置ui
```js
const texture = new THREE.TextureLoader().load('./01.jpg');
const uv = new Float32Array([
	0, 1/4, 1/4, 1/4, 0, 0, 1/4, 0
])

const geometry = new THREE.PlaneGeometry(1,1);
const material = new THREE.MeshBasicMaterial({
	map:texture
});
geometry.setAttribute('uv',new THREE.BufferAttribute(uv,2));
const plane = new THREE.Mesh(geometry,material);
scene.add(plane);

console.log(geometry)
 
```
### 画一条线
```js
import * as THREE from 'three';


const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,500);
camera.position.set(0,0,100);
camera.lookAt(0,0,0);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const material = new THREE.LineBasicMaterial({color:0x0000ff});

const points = [];
points.push(new THREE.Vector3(-10,0,0));
points.push(new THREE.Vector3(0,10,0));
points.push(new THREE.Vector3(10,0,0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry,material);

scene.add(line);
renderer.render(scene,camera);

```