# Unity

Unity 是一款跨平台的游戏开发引擎，支持 3D、2D、VR、AR 等多种游戏类型。Unity 支持 C#、C++、JavaScript、ShaderLab 等多种编程语言，可用于开发各种类型的游戏，包括 2D、3D、VR、AR、RPG、动作游戏、策略游戏、模拟游戏等。

## 1. 添加组件

```csharp
 private void OnGUI()
    {
        if (GUILayout.Button("按钮"))
        {
            GameObject lightGo = new GameObject();
            Light light = lightGo.AddComponent<Light>();
            light.color = Color.red;
            light.type = LightType.Point;
        }
    }
```
