# mysql

### 地址:[mysql](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)

### mysql 常见命令

1. 显示所有数据库

```bash
show databases;
```

2. 进入某人数据库

```bash
use databases;
```

3. 查看数据库里的表

```bash
show tables;
```

4. 查看在某个数据库

```bash
slect database()
```

5. 创建一个表

```bash
create table info(id int name varchar(20));
```

6. 查看表结构

```bash
desc ifof(表名)

```
7. 查看数据

```bash
select * from info(表名)
```

8. 查看数据库版本

```bash
select version()
```

### mysql语法规范
1. 不区分大小写，但关建议关键字，表名，列名小写
2. 每条命令最好用分号结尾
3. 每条命令根据需要，可以进行缩进或换行

### DQL 查询语言
1. 查询表中单个字段

```bash
SELECT last_name (字段名) FROM employees;
```
2. 查询表中多个字段

```bash
SELECT last_name,salary,email from employees;
```
3. 查询表中所有字段

```bash
SELECT * FROM employees;
```
4. 查询常量值

```bash
SELECT 100;
```
5. 查询表过式

```bash
SELECT 100 * 98;
```
6. 查询函数

```bash
SELECT VERSION()
```

7. 起别名

```bash
SELECT 100%92 as 结果;
SELECT last_name as 姓,first_name as 名 FROM employees;
```
8. 去重

```bash
SELECT DISTINCT department_id from employees
```
9. 字符串的拼接

```bash
SELECT CONCAT(last_name,first_name) as 姓名 FROM employees;

```

[last](https://www.bilibili.com/video/BV12b411K7Zu?p=27&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)

