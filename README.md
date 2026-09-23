# 研发业务流程管理系统

第一版覆盖“合同流程”，依据 `0-主要流程-V01.docx` 整理。页面按合同情形切换办理路线，点击任一流程节点可查看责任角色、系统、材料清单和办理提醒。

## 本地预览

在项目目录运行：

```bash
python3 -m http.server 8080 -d dist
```

然后访问 `http://localhost:8080`。

## VPS 部署

服务器安装 Docker 后，在项目目录执行：

```bash
docker compose up -d --build
```

默认使用服务器 `8080` 端口。生产环境可由现有 Nginx 或 Caddy 反向代理到该端口并配置 HTTPS。

### 更新与缓存

发布新版本时，应同步更新 `dist/index.html` 中 CSS、JavaScript 和图标资源地址后的版本参数，例如 `styles.css?v=2.2`。项目内置的 Nginx 配置会要求浏览器重新验证这些文件，避免线上继续显示旧版页面。

重新部署时使用：

```bash
docker compose up -d --build --force-recreate
```

## GitHub 版本管理

### 版本号规则

- 只修改标题、步骤名称、说明、材料名称等文本内容时，仅增加小数版本号，例如 `V1.0` 升级为 `V1.1`。
- 修改流程、业务逻辑、数据库结构或其他功能性内容时，增加大版本号，例如 `V1.1` 升级为 `V2.0`。

```bash
git init
git add .
git commit -m "feat: contract workflow v1"
git branch -M main
git remote add origin <你的 GitHub 仓库地址>
git push -u origin main
```

## 后续扩展

当前数据与界面逻辑集中在 `dist/app.js`。新增设备采购、请示、验证等流程时，建议下一版拆分为独立流程配置文件，并增加流程目录页。
# process
