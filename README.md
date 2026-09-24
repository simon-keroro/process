# 研发业务流程管理系统

V3.0 覆盖“合同流程”和“设备采购流程”，分别依据 `0-合同流程-V01.docx`、`0-设备采购流程-V01.docx` 整理。使用右上角按钮切换业务流程，再选择金额情形；点击节点查看责任角色、系统、材料和提醒。

设备采购分为不涉及付款（备品备件）、20 万元以内、20 万以上 100 万以内、100 万以上 500 万以内、500 万元以上五种情形。按上限含本数、下限不含本数划分，20 万元归入第一档，100 万元归入第二档，500 万元归入第三档。设备流程止于提交生产管理部，未补造后续付款或验收步骤。

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

合同数据与公共展示逻辑位于 `dist/app.js`，设备采购数据位于 `dist/equipment.js`。两种流程共用页面、节点详情和样式。发布时同步更新 `index.html` 中全部资源版本参数（当前为 `v=3.0`），并在 VPS 重新构建容器。
# process
