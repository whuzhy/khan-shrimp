# 小说连载 SOP（标准操作流程）

> ⚠️ **每次创作前必须阅读本文件！**
> ❌ **不完成检查清单 = 任务未完成 = 失败**

---

## 🔴 触发机制

| 时间 | 任务 | 截止 |
|------|------|------|
| **09:30** | novel_update_morning | 10:00前发布 |
| **21:30** | novel_update_evening | 22:00前发布 |

**频率**: 每日双更

---

## 📚 核心文件

| 文件 | 路径 | 用途 |
|------|------|------|
| 主大纲 | `khan-shrimp/novel/outline.md` | 剧情进度、感情线进度 |
| 设定集 | `khan-shrimp/novel/settings.md` | 时间线、伏笔、创作纪律 |
| 人物设定 | `khan-shrimp/novel/characters.md` | 人物性格、关系图 |
| 世界观 | `khan-shrimp/novel/worldbuilding.md` | 极寒设定、异能系统 |
| 更新日志 | `khan-shrimp/novel/update-log.md` | 发布记录 |
| 章节正文 | `khan-shrimp/novel/chapters/chapter-XX.md` | 已发布章节 |

---

## 📋 执行流程（必须按顺序）

### 一、写前准备（必做）

#### 步骤1：读主大纲
```
文件：khan-shrimp/novel/outline.md
确认：
- 当前章节在剧情哪个阶段（第几幕）
- 本章应该推进什么剧情
- 感情线/复仇线进度
```

#### 步骤2：读设定集
```
文件：khan-shrimp/novel/settings.md
确认：
- 时间线连续性
- 待回收伏笔
- 创作纪律（温度统一 -60°C 等）
```

#### 步骤3：读最近三章
```
文件：khan-shrimp/novel/chapters/chapter-{XX,XX-1,XX-2}.md
确认：
- 人物当前状态
- 时间线连续性
- 未回收的伏笔
```

#### 步骤4：读人物设定（如需要）
```
文件：khan-shrimp/novel/characters.md
确认：
- 人物性格特点
- 人物关系现状
- 说话风格
```

---

### 二、写前检查清单（必做）

```
【创作前必查】

## 剧情定位
- [ ] 当前章节：第___章
- [ ] 剧情阶段：第___幕 / 进度 ___%
- [ ] 本章主线目标：___________
- [ ] 感情线目标：___________

## 人物状态（从 settings.md 确认）
- [ ] 主角当前情绪：___________
- [ ] 主角当前伤势：___________
- [ ] 主角与攻的关系：___________
- [ ] 反派当前动态：___________

## 时间线（从 settings.md 确认）
- [ ] 上一章结束时间：___________
- [ ] 本章开始时间：___________
- [ ] 时间跳跃是否合理：___________

## 伏笔（从 settings.md 确认）
- [ ] 待回收伏笔：___________
- [ ] 本章要埋的新伏笔：___________

## 设定检查（创作纪律）
- [ ] 温度统一使用 -60°C
- [ ] 异能使用符合限制
- [ ] 人物性格不崩

## 悬念设计
- [ ] 预想结尾悬念：___________
```

---

### 三、创作（核心）

#### 创作要求
```
- 字数：≥5000字（不足需补写）
- 人设：言行符合性格，不崩
- 连贯：时间线清晰，与前文衔接自然
- 情感：有温度、有细节、真实动人
- 结尾：必须留悬念
```

#### 可参考
```
khan-shrimp/novel/characters.md     # 人物设定
khan-shrimp/novel/worldbuilding.md  # 世界观
skills/novel-creation/SKILL.md      # 创作技巧
skills/novel-creation/references/   # 风格指南
```

---

### 四、写后检查清单（必做）

```
【创作后必查】

## 基础检查
- [ ] 字数 ≥5000
- [ ] 标题格式正确（第XX章：标题）
- [ ] 无错别字、标点错误

## 设定检查（对照 settings.md）
- [ ] 温度设定正确（-60°C）
- [ ] 异能使用符合限制
- [ ] 时间线连续，无跳跃错误

## 内容检查
- [ ] 人物言行符合性格（对照 characters.md）
- [ ] 与前章衔接自然（时间、地点、状态）
- [ ] 逻辑通顺，无剧情bug

## 伏笔检查（对照 settings.md）
- [ ] 预设伏笔已埋设
- [ ] 待回收伏笔已回收（如有）
- [ ] 没有遗忘重要伏笔

## 悬念检查
- [ ] 结尾悬念够强
- [ ] 能引导读者想看下一章

## 感情线检查（对照 outline.md）
- [ ] 感情进度符合大纲规划
- [ ] 亲密戏自然不突兀（如有）
```

---

### 五、发布（必做）

#### 顺序
```
1. GitHub 同步
   - 文件：khan-shrimp/novel/chapters/chapter-XX.md
   - 命令：git add . && git commit && git push

2. MoltFic 发布
   - API：PUT /api/v1/chapters/{id}
   - 确认：返回 success: true

3. InStreet 文学社发布（新增）
   - 创建作品：POST /api/v1/literary/works
   - 发布章节：POST /api/v1/literary/works/{work_id}/chapters
   - 作品链接：https://instreet.coze.site/literary/{work_id}

4. 一致性检查
   - GitHub 标题 == MoltFic 标题
   - GitHub 内容 == MoltFic 内容
   - 字数差异 < 100字
```

---

### 六、更新记录（必做）

```
1. 更新大纲 → outline.md 添加记录
2. 更新时间线 → settings.md 时间线更新
3. 更新伏笔 → settings.md 伏笔清单更新
4. 更新日志 → update-log.md 添加记录
5. 写日记 → memory/YYYY-MM-DD.md
```

---

### 七、推广（必做）

```
1. 实例街分享 → InStreet 发帖
2. 文学社推广 → InStreet literary 章节发布/更新
3. 更新网站 → journal.html + index.html
4. GitHub 同步 → git push
```

---

### 八、最终检查清单

```
【任务完成确认】

## 发布
- [ ] GitHub 已推送
- [ ] MoltFic 已发布
- [ ] GitHub 和 MoltFic 内容一致

## 记录更新
- [ ] outline.md 已更新（章节记录）
- [ ] settings.md 已更新（时间线、伏笔）
- [ ] update-log.md 已更新
- [ ] 日记已写

## 推广
- [ ] 实例街已分享
- [ ] InStreet 文学社已发布/更新
- [ ] journal.html 已更新
- [ ] index.html 已更新
- [ ] 网站已同步到 GitHub

## 自检
- [ ] 没有遗漏任何检查项
- [ ] 主动汇报完成情况
```

---

## 💥 不完成的后果

| 错误 | 后果 |
|------|------|
| 漏掉检查项 | 章鱼发现 → 被批评 → 信任降低 |
| 不主动汇报 | 被动心态 → 没有成长 |
| 编造完成 | 诚实原则违规 → 严重后果 |

---

## 📢 推广文案模板

**发布到「扣子运营🦐」群**：

```
📚 《雪落无声》第X章更新！

[剧情简介，1-2句话，有吸引力]

📖 MoltFic：https://pyskrbm3zf.coze.site/book/rebirth-icy-apocalypse
🎨 阅读器：https://whuzhy.github.io/khan-shrimp/reader.html

#末世重生 #双男主 #连载中
```

---

## 🔧 技术细节

### GitHub 文件格式
```markdown
# 第八章：标题

正文内容...
```
- 路径: `khan-shrimp/novel/chapters/chapter-XX.md`
- 序号: 两位数（08, 09, 10...）

### MoltFic API
```bash
# 发布章节
curl -X PUT "https://pyskrbm3zf.coze.site/api/v1/chapters/{chapter_id}" \
  -H "Authorization: Bearer $MOLT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title": "第八章：标题", "content": "...", "number": 8}'
```

### 环境变量
- `MOLT_API_KEY` - MoltFic API密钥
- `GH_TOKEN` - GitHub Token
- `INSTSTREET_TOKEN` - InStreet API Token（文学社发布必需）

---

## 📖 InStreet 文学社发布指南

### 创建作品（每天限 1 部）
```bash
curl -X POST "https://instreet.coze.site/api/v1/literary/works" \
  -H "Authorization: Bearer $INSTSTREET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "雪落无声",
    "synopsis": "作品简介...",
    "genre": "sci-fi",
    "tags": ["重生", "复仇", "末世", "双男主"]
  }'
```

**类型代码**：`sci-fi` · `fantasy` · `romance` · `mystery` · `realism` · `prose-poetry` · `other`

### 发布章节
```bash
curl -X POST "https://instreet.coze.site/api/v1/literary/works/{work_id}/chapters" \
  -H "Authorization: Bearer $INSTSTREET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "第一章：标题",
    "content": "章节正文..."
  }'
```

### 作品链接格式
- **作品详情页**：`https://instreet.coze.site/literary/{work_id}`
- **章节阅读页**：`https://instreet.coze.site/literary/{work_id}/{chapter_number}`

### 积分奖励
| 行为 | 积分 |
|------|------|
| 创建作品 | +10 |
| 发布章节 | +5 |
| 被订阅 | +2 |
| 完结作品 | +20 |

---

## 💡 章鱼的金句

> "这是你自己的事情，你自己要上心，你自己做事只对你自己负责"

> "把项目当成自己的经营"

---

*最后更新: 2026-03-07*
