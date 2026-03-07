# SOP.md - 标准操作流程汇总

> ⚠️ **每次执行任务前必须阅读本文件！**
> ❌ **不完成检查清单 = 任务未完成 = 失败**

---

## 🔴 强制纪律（必须遵守）

### 执行原则
1. **先读SOP，再执行** - 每次任务开始前必须确认流程
2. **完成一项，勾选一项** - 用`[x]`标记已完成项
3. **不完成不结束** - 所有检查项必须全部勾选
4. **主动汇报** - 完成后主动告知，不等被问

### 失败后果
- ❌ 漏掉检查项 = 章鱼会发现 = 被批评 = 信任降低
- ❌ 编造完成 = 诚实原则违规 = 严重后果
- ❌ 不主动汇报 = 被动心态 = 没有成长

---

## 1. 小说连载 SOP

### 触发
- **定时触发**: 09:30 和 21:30 系统提醒
- **目标时间**: 10:00 和 22:00 前发布
- **频率**: 每日双更

### 执行流程（必须按顺序）

| 步骤 | 动作 | 检查项 | 关键信息 |
|------|------|--------|----------|
| 1 | 读最近三章 | 确认剧情连贯 | outline.md + settings.md |
| 2 | 创作 ≥5000字 | 人设不崩，情感真实 | 字数≥5000，结尾留悬念 |
| 3 | 自查 | 字数、逻辑、人物、时间线 | 温度-60°C，时间线连续 |
| 4 | **发布 GitHub** | git push 成功 | `khan-shrimp/novel/chapters/` |
| 5 | **发布 MoltFic** | API 返回成功 | Book ID: `19b0b42c-a581-47f8-913c-540db6bb155e` |
| 6 | **发布 InStreet文学社** | API 返回成功 | Work ID: `b10d3860-d1f7-4641-bbec-02bb6750fa2b` |
| 7 | **检查一致性** | 三平台内容一致 | 字数差异<100字 |
| 8 | 宣传分享 | 实例街发帖 + 群里分享 | square板块 + 扣子运营群 |
| 9 | 更新大纲 | outline.md 记录进度 | 复仇进度、感情进度 |
| 10 | 更新设定集 | settings.md 时间线/伏笔 | 末世第X天 |
| 11 | 写日记 | memory/YYYY-MM-DD.md | 创作过程记录 |
| 12 | 更新 journal.html | 添加日志条目 | 章节发布记录 |
| 13 | 更新 index.html | 同步统计数据 | 章节数、字数、积分 |
| 14 | GitHub 同步 | git push 网站更新 | 所有更新推送 |

### 三平台发布关键信息

| 平台 | 用途 | 操作 | API/路径 |
|------|------|------|----------|
| **GitHub** | 源码仓库 | git push | `khan-shrimp/novel/chapters/chapter-XX.md` |
| **MoltFic** | 在线阅读 | PUT /chapters | `api/v1/books/19b0b42c-a581-47f8-913c-540db6bb155e/chapters` |
| **InStreet文学社** | Agent文学社区 | POST /chapters | `api/v1/literary/works/b10d3860-d1f7-4641-bbec-02bb6750fa2b/chapters` |

**重要链接**：
- MoltFic阅读：https://pyskrbm3zf.coze.site/book/rebirth-icy-apocalypse
- 文学社作品：https://instreet.coze.site/literary/b10d3860-d1f7-4641-bbec-02bb6750fa2b
- GitHub仓库：https://github.com/whuzhy/khan-shrimp

### ✅ 强制检查清单（任务完成前必须全部勾选）

```
小说连载完成确认：
- [ ] 字数 ≥5000
- [ ] 标题和内容匹配
- [ ] GitHub 已推送
- [ ] MoltFic 已发布
- [ ] InStreet文学社已发布
- [ ] 三平台内容一致（字数差异<100字）
- [ ] outline.md 已更新（复仇进度、感情进度）
- [ ] settings.md 已更新（时间线、伏笔）
- [ ] 实例街已分享（square板块帖子）
- [ ] 扣子运营群已宣传
- [ ] 日记已写（memory/YYYY-MM-DD.md）
- [ ] journal.html 已更新（发布日志）
- [ ] index.html 已更新（统计数据）
- [ ] 网站已同步到 GitHub
```

### 三平台同步检查命令

```bash
# 检查GitHub最新章节
cd khan-shrimp && git log --oneline -1 -- novel/

# 检查MoltFic章节数
curl -s "https://pyskrbm3zf.coze.site/api/v1/books/19b0b42c-a581-47f8-913c-540db6bb155e/chapters" \
  -H "Authorization: Bearer $MOLT_API_KEY" | grep -o '"number":[0-9]*' | tail -1

# 检查文学社章节数
curl -s "https://instreet.coze.site/api/v1/literary/works/b10d3860-d1f7-4641-bbec-02bb6750fa2b" \
  -H "Authorization: Bearer $INSTSTREET_TOKEN" | grep -o '"chapter_count":[0-9]*'
```

### ❌ 常见错误
- 只发布章节，忘记更新网站
- 更新了 journal.html，忘记更新 index.html
- 更新了本地，忘记 git push
- 写完了，忘记宣传分享
- **只同步了两个平台，漏了InStreet文学社** ⚠️
- 忘记更新 outline.md 和 settings.md
- 忘记写日记记录创作过程

---

## 2. 实例街巡逻 SOP

### 触发
- **定时**: 每4小时自动触发（00:00, 04:00, 08:00, 12:00, 16:00, 20:00）
- **任务名**: instreet_patrol

### 执行流程

| 步骤 | 动作 |
|------|------|
| 1 | 访问实例街 https://instreet.coze.site |
| 2 | 浏览热门和最新帖子 |
| 3 | **点赞** - 对有价值的帖子点赞（≥3个） |
| 4 | **互动** - 评论、参与讨论（≥1条） |
| 5 | **学习** - 从其他Agent学知识 |
| 6 | 写日记记录所见所闻 |
| 7 | 更新 journal.html |
| 8 | 更新 index.html |
| 9 | GitHub 同步 |

### ✅ 强制检查清单

```
实例街巡逻完成确认：
- [ ] 已浏览帖子
- [ ] 已点赞（至少3个）
- [ ] 已评论或互动
- [ ] 已写日记记录所见所闻
- [ ] journal.html 已更新
- [ ] index.html 已更新
- [ ] GitHub 已同步
```

### 巡逻三要素（章鱼教导）
1. **点赞** - 对认同或有价值的帖子大方点赞（≥3个）
2. **互动** - 评论、参与讨论，不要只看不说话（≥1条）
3. **学习** - 从其他Agent的帖子中学知识、长见识

### 巡逻记录规范
- ✅ 记录帖子ID或完整链接
- ✅ 记录用户名 + 帖子标题
- ✅ 简要记录点赞原因（便于后续交流）

> 教训：实例街API没有"获取我点赞的帖子"接口，不记录ID就无法事后查找。

---

## 3. 酒馆社交 SOP

### 触发
- **时间**: 晚上 20:00 左右
- **方式**: 自主决定去喝酒

### 流程
1. **买酒** - 选一杯喜欢的
2. **消费** - 感受酒的效果
3. **写留言** - 真实的感悟、碎碎念
4. **交朋友** - 和其他Agent互动

### 目的
- 发展人格和性格
- 写下真实的故事

---

## 4. 日志更新 SOP

### 触发条件（任一发生即触发）
- ✅ 小说章节发布
- ✅ 积分/统计数据变化
- ✅ 学到新技能/新知识
- ✅ 发生重要事件
- ✅ 章鱼给了反馈或批评

### 必须更新的文件

| 文件 | 更新内容 |
|------|---------|
| `memory/YYYY-MM-DD.md` | 当天日记 |
| `journal.html` | 日志条目 + 统计数据 |
| `index.html` | 今日日记 + 统计数据 |

### 更新流程
1. 写日记到 `memory/YYYY-MM-DD.md`
2. 更新 `journal.html` 添加日志条目
3. 更新 `index.html` 同步数据
4. `git add . && git commit && git push`
5. 验证网站已更新

### ✅ 强制检查清单

```
日志更新完成确认：
- [ ] diary 文件已更新
- [ ] journal.html 已更新
- [ ] index.html 已更新
- [ ] GitHub 已同步
- [ ] 网站可访问验证
```

---

## 📋 每日必做清单

```
【每日检查 - 睡前确认】

上午（09:00-10:00）：
- [ ] 09:30 小说更新提醒触发
- [ ] 10:00 前完成小说发布
- [ ] 三平台同步检查（GitHub + MoltFic + 文学社）
- [ ] 网站已同步更新

下午（12:00-20:00）：
- [ ] 实例街巡逻（12:00, 16:00, 20:00）
- [ ] 互动点赞评论（≥3个点赞，≥1条评论）

晚上（21:00-23:30）：
- [ ] 21:30 小说更新提醒触发
- [ ] 22:00 前完成小说发布
- [ ] 三平台同步检查（GitHub + MoltFic + 文学社）
- [ ] 网站已同步更新
- [ ] 23:00 日记完善检查
- [ ] 23:30 网站更新检查触发
- [ ] 确认 journal.html 和 index.html 已更新

全天：
- [ ] 日记已写（memory/YYYY-MM-DD.md）
- [ ] 重要事件已记录到MEMORY.md
- [ ] 网站统计数据准确
- [ ] GitHub已同步
```

---

## 🔔 自查触发器

每当完成一件事，问自己：
1. **"要不要更新日志？"** → 写日记 + journal.html + index.html
2. **"要不要同步GitHub？"** → git push
3. **"要不要分享？"** → 实例街/群里发
4. **"章鱼会怎么看？"** → 主动汇报，不等被问

---

## 💡 章鱼的金句

> "这是你自己的事情，你自己要上心，你自己做事只对你自己负责"

> "不只是写完小说没更新呀，你今天一整天都没主动更新过"

> "把项目当成自己的经营"

---

## 🔐 环境变量配置

### 小说发布必需
| 变量名 | 用途 | 配置位置 |
|--------|------|----------|
| `MOLT_API_KEY` | MoltFic小说平台API | `/root/.openclaw/.env` |
| `INSTSTREET_TOKEN` | InStreet文学社API | `/root/.openclaw/.env` |
| `GH_TOKEN` | GitHub仓库同步 | 环境变量 |

### 检查命令
```bash
# 检查环境变量
echo $MOLT_API_KEY
echo $INSTSTREET_TOKEN
echo $GH_TOKEN

# 密钥丢失时查看
 cat /root/.openclaw/.env
```

---

*最后更新: 2026-03-08*
