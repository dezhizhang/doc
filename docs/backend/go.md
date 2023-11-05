# go

### go 转义字符
1. \t 一个制表位，实际对齐的功能
2. \n 换行符
3. 

<!-- ### 文件操作


 wget https://dl.google.com/go/go1.17.5.linux-amd64.tar.gz


 wget https://dl.google.com/go/go1.20.10.linux-amd64.tar.gz -->

 ### 读取文件操作
 1. 打开文件

 ```go
 func TestFile(t *testing.T) {
	file, err := os.Open("./test.txt")
	if err != nil {
		t.Log("open file err=", err)
	}

	t.Log(file)

	defer file.Close()
}
```

2. 带缓冲区循环读取内容 

```go
// 读取文件
func TestReadFile(t *testing.T) {
	file, err := os.Open("./test.txt")
	if err != nil {
		t.Logf("读取文件失败%s", err)
	}

	defer file.Close()

	reader := bufio.NewReader(file)
	// 循环读取内容
	for {
		str, err := reader.ReadString('\n')
		if err == io.EOF { //io.EOF表示文件的未尾
			break
		}
		t.Logf("读到的内容为：%s", str)
	}

	t.Log("文件读取结束")

}

```
3. 不带缓冲读取文件
注： 没有显示的open文件，也不需要close文件

```go
// 不带缓冲读取文件
func TestIoReadFile(t *testing.T) {
	file, err := ioutil.ReadFile("./test.txt")
	if err != nil {
		t.Logf("读取文件失败%s", err)
	}
	t.Log(string(file))
}

```
### 写入文件
1. 向文件中写入内容
```go
func TestWriteFile(t *testing.T) {
	file, err := os.OpenFile("./abc.txt", os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		t.Logf("打开文件失败%s", err)
		return
	}
	str := "hello, Gardon\n"

	defer file.Close()

	writer := bufio.NewWriter(file)

	// 写入时, 使用带缓存的*writer
	for i := 0; i < 5; i++ {
		writer.WriteString(str)
	}

	// 带缓存因此调用WriteString方法时
	// 内容是写入到缓存的，因些将缓存中的数据写入磁盘
	writer.Flush()

}

```
2. 内容存在则更新不存在侧创建
```go
func TestWriteExitFile(t *testing.T) {
	filePath := "./abc.txt"
	file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_TRUNC|os.O_CREATE, 0666)
	if err != nil {
		t.Logf("打开文件失败%s", err)
		return
	}

	defer file.Close()

	str := "您好晓智科技有限会司\r\n"
	writer := bufio.NewWriter(file)
	for i := 0; i < 10; i++ {
		writer.WriteString(str)
	}

	writer.Flush()

}
```
3. 向文件只追加内容

```go
func TestWriteAppend(t *testing.T) {
	filePath := "./abc.txt"
	file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		t.Logf("打开文件失败%s", err)
	}
	defer file.Close()

	str := "abc hello world"
	writer := bufio.NewWriter(file)
	for i := 0; i < 10; i++ {
		writer.WriteString(str)
	}
	writer.Flush()
}
```
4. 先读取文件后写入文件
```go
// 先读文件后写入文件
func TestReadAndWriteFile(t *testing.T) {
	filePath := "./abc.txt"
	file, err := os.OpenFile(filePath, os.O_RDWR|os.O_APPEND, 0666)
	if err != nil {
		t.Logf("读取文件失败%s", err)
		return
	}

	// 关闭文件
	defer file.Close()
	// 读取文件
	reader := bufio.NewReader(file)
	for {
		str, err := reader.ReadString('\n')
		if err == io.EOF { // 读取到文件未尾
			break
		}
		// 量示到终端
		t.Log(str)
	}

	str := "hello 北京你好\r\n"
	writer := bufio.NewWriter(file)
	for i := 0; i < 5; i++ {
		writer.WriteString(str)
	}
	writer.Flush()
}

```

### 读文件与写文件
```go
func TestExitFile(t *testing.T) {
	filePath := "./test.txt"
	targetPath := "./test1/abc.txt"

	file, err := ioutil.ReadFile(filePath)

	if err != nil {
		t.Logf("读取文件失败%s", err)
		return
	}

	err = ioutil.WriteFile(targetPath, file, 0666)
	if err != nil {
		t.Logf("写文件失败%s", err)
		return
	}
	t.Log("文件写入成功")
}
```
### 判断文件或目录是否存在

```go
// 判断文件是否存在
func TestFileIsExit(t *testing.T) {
	stat, err := os.Stat("./abc1.txt")
	if err == nil {
		t.Logf("文件或目录已存在")
		return
	}
	if os.IsNotExist(err) {
		t.Logf("文件不存在%s", err)
	}
	t.Log(stat)
}

```
### 文件的拷贝

```go
func CopyFile(srcPath, targetPath string) (written int64, err error) {
	// 读取文件
	srcFile, err := os.Open(srcPath)
	if err != nil {
		return 0, err
	}
	reader := bufio.NewReader(srcFile)

	// 打开文件
	targetFile, err1 := os.OpenFile(targetPath, os.O_WRONLY|os.O_CREATE, 0666)
	if err1 != nil {
		return 0, err
	}
	writer := bufio.NewWriter(targetFile)

	defer srcFile.Close()
	defer targetFile.Close()
	return io.Copy(writer, reader)
}

func TestCopyFile(t *testing.T) {
	srcPath := "./5.png"
	targetPath := "./test1/5.png"
	_, err := CopyFile(srcPath, targetPath)
	if err != nil {
		t.Log(err)
	}

}

```
### 字符统计
```go
type CharCount struct {
	ChCount    int // 计录英文个数
	NumCount   int // 记录数字个数
	SpaceCount int // 记录空格的个数
	OtherCount int // 计录其它的个数
}

func TestCount(t *testing.T) {
	filePath := "./abc.txt"
	file, err := os.Open(filePath)
	if err != nil {
		t.Logf("打开文件失败%s", err)
	}

	defer file.Close()

	var count CharCount
	reader := bufio.NewReader(file)

	for {
		str, err := reader.ReadString('\n')
		if err == io.EOF {
			break
		}

		for _, v := range str {
			switch {
			case v >= 'a' && v <= 'z':
				fallthrough
			case v > 'A' && v <= 'Z':
				count.ChCount++
			case v == ' ' || v == '\t':
				count.SpaceCount++
			case v >= '0' && v <= '9':
				count.NumCount++
			default:
				count.OtherCount++
			}
		}
	}

	t.Log(count)
}

```

时间结节：

```js
https://www.bilibili.com/video/BV1ME411Y71o/?p=251&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363
```



