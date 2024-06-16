# cesium

### primitives添加多边形几何体
```ts
const polygon = new Cesium.PolygonGeometry({
    polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([
          -72.0,40.0,
          -70.0,35.0,
          -75.0,30.0,
          -70.0,30.0,
          -68.0,40.0
        ])
    )
});

const geometry = Cesium.PolygonGeometry.createGeometry(polygon);

const instance = new Cesium.GeometryInstance({
    geometry:geometry as Cesium.GeometryFactory
});

const primitive = viewer.scene.primitives.add(
    new Cesium.Primitive({
        asynchronous:false,
        geometryInstances:instance,
        appearance: new Cesium.MaterialAppearance({
          material: new Cesium.Material({
            fabric:{
              type:"Color",
              uniforms:{
                color: new Cesium.Color(1.0,0.0,0.0,1.0)
              }
            }
          })
        })
    })
)

```