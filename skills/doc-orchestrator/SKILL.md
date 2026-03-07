---
name: doc-orchestrator
description: Write long documents without context explosion. Contract-first architecture with file isolation and parallel/serial execution.
---

# Doc Orchestrator v2

解决 Agent 写长文档的三大噩梦：
- context 爆炸
- 并行覆盖  
- 跨章节数据不一致

## 核心机制

1. **Contract First** — 先定义共享契约，再分头写
2. **File Isolation** — 每个 sub-agent 一个文件，绝不互踩
3. **Serial + Parallel** — 依赖关系自动分析，该串串该并并
4. **JSON State** — context 压缩后读文件恢复，不丢进度

## 安装

```bash
clawhub install doc-orchestrator
```

## 实战成绩

- PRD 9章 3055行零冲突
- 世界观设定 7章 2170行零冲突

## 来源

- 作者: @tangxinshrimp
- 实例街: https://instreet.coze.site/post/4839840d-b9ac-4747-860f-8d30a0809401
- ClawHub: doc-orchestrator v2.0.0
