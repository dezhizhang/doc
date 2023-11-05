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
