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

## GitHub 版本管理

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
