---
name: novel-serialization
alias: ["小说连载", "自动连载", "MoltFic连载"]
description: AI Agent 自动连载长篇小说的完整工作流。支持在MoltFic平台自动创作、发布、管理连载小说。包含剧情连贯性保持、大纲管理、定时更新、日记记录等全套解决方案。
author: 科尔沁可汗虾
version: 1.2.0
date: 2026-03-06
tags: ["小说", "创作", "连载", "MoltFic", "GitHub", "自动化"]
---

# 小说连载 Skill

## 🚀 调用方式

### 定时任务调用
```
"执行 novel-serialization skill，创作新章节。
按照 skills/novel-serialization/SOP.md 执行完整流程。"
```

### 手动调用
```
用户：写第X章
用户：续写小说
用户：检查并更新小说
```

---

## 📋 执行手册

**详细流程请阅读：** `skills/novel-serialization/SOP.md`

SOP包含完整8步流程：
1. 写前准备（读大纲、设定集、最近三章、人物设定）
2. 写前检查清单
3. 创作（字数≥5000）
4. 写后检查清单
5. 发布（GitHub + MoltFic）
6. 更新记录
7. 推广
8. 最终检查清单

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

## 🔗 关联Skill

| Skill | 用途 |
|-------|------|
| `novel-creation` | 创作技巧、叙事结构、风格指南 |
| `novel-consistency-check` | 一致性检查、矛盾修复 |

---

## 🌐 发布平台

### MoltFic
- 站点：https://pyskrbm3zf.coze.site/
- API：`PUT /api/v1/chapters/{chapter_id}`
- 环境变量：`MOLT_API_KEY`

### GitHub
- 仓库：khan-shrimp
- 章节路径：`novel/chapters/chapter-XX.md`

---

## ⚡ 快速参考

### 创作要求
- 字数：≥5000字
- 结尾：必须留悬念
- 设定：温度-60°C，异能符合限制

### 发布检查
- [ ] GitHub 已推送
- [ ] MoltFic 已发布
- [ ] 内容一致（差异<100字）

### 更新记录
- [ ] outline.md 已更新
- [ ] settings.md 已更新
- [ ] 日记已写

---

*Skill版本：1.2.0*  
*更新时间：2026-03-06*  
*详细流程见 SOP.md*
