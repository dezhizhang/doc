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

1. 从高到低进行排序

```bash
SELECT * FROM employees ORDER BY salary DESC;
```
2. 排序+筛选

```bash
SELECT * FROM employees WHERE department_id >=90 ORDER BY hiredate ASC
```
3. 按字节进行排序

```bash
SELECT LENGTH(last_name) last_name,salary FROM employees ORDER BY LENGTH(last_name) DESC;

```
4. 模糊查询排序

```bash
SELECT *,LENGTH(email) FROM employees WHERE email LIKE '%e%' ORDER BY LENGTH(email) DESC, department_id ASC;
```

### 字符函数

1. 获取字符串的字节个数

```bash
SELECT LENGTH("hello world");
```

2. 拼接字符口串

```bash
SELECT CONCAT(last_name,'_',first_name) as 姓名 FROM employees;
```
3. upper,lower 将字符串变大写，小写

```bash 
SELECT CONCAT(UPPER(last_name),UPPER(first_name)) as 姓名 FROM employees;
 
```
4. substr 截取从指定索引处后面的所有字符

```bash
SELECT SUBSTR("李莫悉爱上了陆展元",7) as out_put;
SELECT SUBSTR("李莫悉爱上了陆展元",1,3) as out_put;
```
5. instr 返回子串第一次出现的索引，如果找不到返回0

```bash
SELECT INSTR('杨不悔爱上了六侠','六侠') as out_put;
```
6. trim 
```

```
7. lpad 用指定的字符实现左填充指定长度

```bash
SELECT LPAD("刘德华",10,"*") as out_put;

```
8. rpad 用指定的字符实现右填充指定的长度

```bash
SELECT RPAD("刘德华",10,"*") as out_put;
```
9. replace 替换

```bash
SELECT REPLACE("张无忌爱上周芷若","周芷若","赵敏") as out_put;
 
```
### 常用数学函当我

1. round 四舍五入
```
SELECT ROUND(1.55) as out_put;
 
```
2. ceil 向上取整

```bash
SELECT CEIL(1.01) as out_put;
```
3. floor 向下取整

```bash
SELECT FLOOR(1.65) as out_out;
```
4. truncate 截断

```bash
SELECT TRUNCATE(1.65,1) as out_put;
```
5. mod 取余

```bash
SELECT MOD(10,3) as out_put;
```
### 日期函数
1. now 返回当前系统日期+时间

```bash
SELECT NOW() as out_put;
```

2. curdate 返回当前系统日期，不包含时间

```bash
SELECT CURDATE();
```

3. curtime 返回当前日间，不包含日期
```bash
SELECT curtime();
```
4. 指定返回年，月，日，时 ，分，秒

```bash
SELECT YEAR(NOW()) as out_put;
```
### 流程控制函数
1. if 函数

```bash
SELECT IF(10 > 5,'大','小');
SELECT last_name,commission_pct,IF(commission_pct IS NULL,'没奖金,呵呵','有奖金,嘻嘻')  备注 FROM employees;
```

2. case 函数

```bash
SELECT salary 原始工资,department_id,
CASE department_id
	WHEN 20 THEN salary * 1.1
	WHEN 40 THEN salary * 1.2
	WHEN 50 THEN salary * 1.3
	ELSE salary
END AS 新工资 FROM employees;

```

### 分组函数
1. sum求合

```bash
SELECT SUM(salary) FROM employees;
```
2. avg求平均值

```bash
SELECT AVG(salary) FROM employees;
```
3. distinct 去重

```bash
SELECT SUM(DISTINCT salary) FROM employees;
```

4. count 统计
```bash
SELECT COUNT(DISTINCT salary) FROM employees;
```
5. 求最大值，最小值，总合

```bash
SELECT MAX(salary) as 最大值,MIN(salary) as 最小值,SUM(salary) as 总合 from employees;
```

6. 求两个时间相差的天数
```bash
SELECT DATEDIFF(MAX(hiredate),MIN(hiredate)) as 差异 FROM employees;
```
7. 统计某个部门id的个数

```bash
SELECT COUNT(*) 个数 FROM employees WHERE department_id = 90;
```
### group by函数

1. 查询每个工种的最高工资

```bash
SELECT MAX(salary),job_id FROM employees GROUP BY job_id;
```

2. 查询每个位置上的部门数
```bash
SELECT COUNT(*),location_id FROM departments GROUP BY location_id;
 
```

3. 查询每个部门的平均工资

```bash
SELECT AVG(salary),department_id FROM employees GROUP BY department_id;
```

4. 查询有奖金的每个领导手下员工的最高工资
```bash
SELECT MAX(salary),manager_id FROM employees WHERE commission_pct IS NOT NULL GROUP BY manager_id;
```
5. 查询每个部门员工数大于2的

```bash
SELECT COUNT(*),department_id FROM employees GROUP BY department_id HAVING COUNT(*) > 2
```
### join连接查询

1. 查询员工名对应的部门名

```bash
SELECT last_name,department_name FROM employees,departments WHERE employees.department_id = departments.department_id;

```
2. 查询员工名，工种号，工种名

```bash
SELECT last_name,employees.job_id,job_title FROM employees,jobs WHERE employees.job_id = jobs.job_id;

```
3. 查询有奖金的员工名，部门名

```bash
SELECT last_name,department_name,commission_pct FROM employees e,departments d WHERE e.department_id = d.department_id AND e.commission_pct IS NOT NULL;
 
```




[last](https://www.bilibili.com/video/BV1iq4y1u7vj?p=11&vd_source=e38cd951f2ee7bda48ec574f4e9ba363)

