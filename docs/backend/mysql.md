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
### 条件查询
1. 按条件表过式筛选

```bash
SELECT * FROM employees WHERE salary > 12000
```

2. 按逻辑运算符进行筛选

```bash
SELECT last_name,salary,commission_pct FROM employees WHERE salary >=10000 AND salary <=20000;
SELECT * FROM employees WHERE NOT(department_id >=90 AND department_id <=110) OR salary >15000;
```

3. 模糊查询 like between and in is null is not null

```bash
SELECT * FROM employees WHERE last_name LIKE '%a%';

```
4. 查询两者之间between and 包含临界值，临界值的顺序不能错序

```bash
SELECT * FROM employees WHERE employee_id BETWEEN 100 AND 120;

```
5. in 判断某个字段的值是否属于in列表中的某一项

```bash
SELECT last_name,job_id FROM employees WHERE job_id IN('IT_PROT','AD_VP','AD_PRES');
```

6. is null  = 或<>不能用于判断null值

```bash
SELECT last_name,commission_pct FROM employees WHERE commission_pct IS NULL
```
### 排序查询
```

```



[last](https://www.bilibili.com/video/BV12b411K7Zu?p=27&spm_id_from=pageDriver&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)

