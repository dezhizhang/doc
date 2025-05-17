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

### 2. 查找字物体

```csharp
	Transform child = this.transform.Find("bb");
	Debug.Log("子物体:" + child.name);
```

## 3. 设置物体显示与隐藏

```csharp
 void OnGUI()
    {
        if (GUILayout.Button("按钮"))
        {
            AudioSource audio = this.GetComponent<AudioSource>();
            if (audio.isPlaying)
            {
                audio.Stop();
                return;
            }

            audio.Play();
        }
    }

```

## 4. Application 常用类

```csharp
    // 游戏数据文件夹路径
    Debug.Log(Application.dataPath);
    // 持久化文件夹路径
    Debug.Log(Application.persistentDataPath);
    // streamingAssetsPath 文件夹路径(只读)
    Debug.Log(Application.streamingAssetsPath);
    //temporaryCachePath 临时文件
    Debug.Log(Application.temporaryCachePath);
    // 控制是否在后台运行
    Debug.Log(Application.runInBackground);
    // 打开一个链接
    Application.OpenURL("https://aint.top");
    // 退出游戏
    Application.Quit();
```
