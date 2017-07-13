# 1.Version

```
    $ docker -v
    $ docker --version
```
# 2.information
顯示詳細資訊
```
    $ docker info
```
# 3.取得想要的Image

```
    $ docker pull <image_name>:<image_version>

    example:
    $ docker pull ubuntu:16.04
    $ docker pull hello-world
```
# 4.讀取擁有哪些images

```
    $ docker images
    $ docker images -a
    指令中的 -a 為選擇性參數，此處 -a 表示 all 的意思
```
# 5.Docker Run

```
    $ docker run <image_name>
    $ docker run <image_id>
    $ docker run <image_name>:<image_version>

    example:
    $ docker run hello-world
    $ docker run 94df4f0ce8a4
    $ docker run ubuntu:16.04
```
# 6.Docker Run進階

```
    $ docker run -tid ubuntu:16.04 bash

    簡單介紹下面幾個選擇性參數：
        -i 表示使用互動模式，始終保持輸入串流
        -t 表示分配一個偽終端，通常都與 -i 一起使用
        -d 表示以背景模式執行
        bash 表示分配一個偽終端執行 bash 指令，讓使用者可以與容器(container)進行互動
```
# 7.Docker Exec
進入container

```
    $ docker exec -ti <container_id> bash

    example:
    $ docker exec -ti 53c5dd293e65 bash

    ps:如果您不知道 container id ，可以透過 docker ps 查詢！！
```
# 8.Docker Ps
取得當下有哪些container正在執行

```
    $ docker ps
```
顯示執行過與正在執行的container
```
    $ docker ps -a
```
# 9.Container操作
啟動

```
    $ docker start <container_id>
```
停止

```
    $ docker stop <container_id>
```
重新啟動

```
    $ docker restart <container_id>
```
刪除

```
    $ docker rm <container_id>
```
# 10.Image操作
刪除

```
    $ docker rmi <image_id>

    ps:若該 image 正在被 container 所使用時，必須先停止且移除 container
```
刪除多個 Images

```
    $ docker rmi $(docker images -a -q)
```
刪除多個 Containers

```
    $ docker rm $(docker ps -a -q)

    ps:了解 -a 以後，其實可以搭配 -q 一起使用，您會發現這個 command line 會顯示您現有的所有 Images(Containers) ，在搭配 docker 刪除語法即可一次刪除全部！！
```





# 除錯
若使用任何指令出現以下狀況

```
Cannot connect to the Docker daemon. Is the docker daemon running on this host?
```
執行

```
    $ sudo usermod -aG docker <user_name>
```

# 清除所有Container歷史紀錄
```
    $ sudo docker rm $(docker ps -qa)
```
