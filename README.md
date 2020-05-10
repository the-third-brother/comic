# pic

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Preface

There are some reasons that I choose `flask` web framework to build this project. First of all, I need to use spider to scratch comic resources from specific website and provide `RESTFUL` API to font-end. And `flask` not only can use `python spider library` easily, but also generate `RESTFUL` API quickly. Besides, the whole project doesn't need complicated logic in back-end.

<!--more-->

# Preview

You can check out the website [here](http://manhua.ssange.com/)

![](/images/ComicHome.jpg)

![](/images/ComicImgHome.jpg)

![](/images/ComicPlot.jpg)

![](/images/ComicContent.jpg)



# Back-end Configurations and Deployment

## Mysql Table Design

```sql
CREATE TABLE `comics` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `c` int(11) DEFAULT NULL COMMENT 'comic id',
  `name` varchar(100) DEFAULT NULL COMMENT 'comic subject',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=1725 DEFAULT CHARSET=utf8;
```



## Spider Codes

### Search Comic ID by Comic Subject

```python
@app.route('/nSearch/<name>')
def search_comic(name):
    db = pymysql.connect("xxx.com", "root", "xxx", "comic")
    cursor = db.cursor()
    sql = "select c,name from comics where name = '%s'" % name
    cursor.execute(sql)
    comic = cursor.fetchone()

    json = {'cid': comic[0], 'title': comic[1]}

    cursor.close()
    db.close()
    return json
```

### Query Comic List From Database

```python
@app.route('/all')
def get_all_comics():
    db = pymysql.connect("xxx.com", "root", "xxx", "comic")
    cursor = db.cursor()
    sql = "select c,name from comics"
    cursor.execute(sql)
    result = cursor.fetchall()
    comics = []
    for i in result:
        item = {'cid': i[0], 'name': i[1]}
        comics.append(item)

    json = {'comics': comics}
    return json
```

### Search Comic Contents By Comic Subject And Plot Title

```python
@app.route('/get/<c>/<t>')
def get_content_by_title(c, t):
    # Get comic id by comic subject
    db = pymysql.connect("xxx.com", "root", "xxx", "comic")
    cursor = db.cursor()
    sql = "select c from comics where name = '%s'" % c
    cursor.execute(sql)
    result = cursor.fetchone()
    for i in result:
        cid = i

    # get comic episodes details by comic id
    img_urls = []
    for i in range(130):
        i = i+1
        p = '%04d' % i
        url = 'http://img.mljzmm.com/comic/'+str(cid)+'/'+t+'/'+p+'.jpg'
        img_urls.append(url)
    json = {'title': t, 'urls': img_urls}
    return json
```

###　Search Comic Plots By Comic ID

```python
# Get all titles of specified subject
@app.route('/v/<v>', methods=['GET'])
def get_episodes_info(v):
    url = "https://www.ohmanhua.com/"+v

    res_obj = requests.get(url)
    res = res_obj.text
    res_code = res_obj.status_code
    html = etree.HTML(res)
    # scratch comic subject
    name = html.xpath("//dd/h1/text()")
    epi_title = html.xpath("//div[@class='all_data_list']/ul/li/a/@title")
    # print(epi_title)
    json_title = {'name': name, 'res_code': res_code, 'titles': epi_title}
    return json_title
```

### Scratch Comic Subjects From Specific Website

```python
@app.route('/scratch/<start>/<end>')
def scratch_all_comics(start,end):
    url = "https://www.ohmanhua.com/"

    db = pymysql.connect("xxx.com", "root", "xxx", "comic")
    cursor = db.cursor()

    i = int(start)
    while i <= int(end):
        i = i + 1
        time.sleep(7)
        res = requests.get(url + str(i))
        # scratch comic subject
        html = etree.HTML(res.text)
        names = html.xpath("//dd/h1/text()")
        for n in names:
            name = n
        if res.url != url:
            sql = "insert into comics (c, name) values (%d, '%s')" % (i, name)
            print(sql)
            cursor.execute(sql)
            db.commit()
            print(name)
    return "executing"
```

## Deployment

### Install Environment

```
yum install python-pip
pip install flask
pip install gunicorn
```

### Simple Deployment

In this way, you just need to upload `app.py` to your server and then run it to serve. Just like this:

```
python app.py
```

> Note: You are suppose to run this command at its current path

### Recommended Deployment

If you have tried to use simple deployment, you will find that you can't keep it running at the server background. This is why I recommend you to use `gunicorn` deployment.

After you install `gunicorn`, you can test it if it is successfully installed.

```
gunicorn -h
```

Then change the current path to the path of `app.py`

```
gunicorn -w 2 -b 127.0.0.1:8000 -daemon true app:app
//-daemon allows you to run at background
```

You can visit `gunicorn` official website for more details.

## Nginx Proxy

Let's say you have installed `nginx`, but you've just forgot where it is. You will find it with the following command:

```
nginx -t
```

We need to add a server in nginx configuration if we want to use `nginx proxy` to pass the request to `gunicorn server` .

```
    server {
        listen 80; 
        server_name api.myserver.com; 

        location / { 
            proxy_pass http://127.0.0.1:8000;
        }
    }
```

You are suppose to restart your `nginx` service after you change the `nginx` configuration. On `CentOS 7` system, it is like:

```
systemctl nginx restart
```



