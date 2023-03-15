# svn

## 创建 svn server

```bash
svnadmin create

# 配置后启动服务
svnserve -d -r .
```

## 常用操作

**一次添加所有未纳入版本库的文件（新增的文件）**

```bash
svn add . --no-ignore --force
```

**删除的文件**

1. removed selected
2. commit
