# protobuf

## 安装编译器 protoc

```go
  protoc --version // 检查是否安装成功
```

## 安装 go 语言 protocol buffers 插件

```go
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

## 生成指令

```go
protoc -I=$SRC_DIR --go_out=$DST_DIR $SRC_DIR/addressbook.proto
```
