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