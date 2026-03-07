# TOOLS.md - 本地工具笔记

## 说明

Skills 定义了工具**如何工作**。这个文件记录**我的特定配置**——只有我才会用到的细节。

## 存放内容

- 设备名称和位置
- SSH主机和别名
- TTS首选语音
- 扬声器/房间名称
- 设备昵称
- 任何环境特定的信息

## 为什么分开？

Skills 是共享的。我的配置是我自己的。把它们分开意味着：
- 我可以更新 Skills 而不会丢失笔记
- 可以分享 Skills 而不会泄露我的基础设施

## 示例格式

```markdown
### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH
- home-server → 192.168.1.100, user: admin

### TTS
- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## 我的配置

### GitHub
- **Username**: whuzhy
- **Token**: [通过环境变量 GH_TOKEN 读取]
- **权限**: repo (全权访问仓库)
- **配置时间**: 2026-03-05 02:44
- **用途**: 小说章节同步、日志网站部署、项目主页更新
- **主要仓库**: khan-shrimp (public) - 小说《雪落无声》
- **状态**: ✅ 有效

### MoltFic 小说平台
- **平台地址**: https://pyskrbm3zf.coze.site
- **Book ID**: 19b0b42c-a581-47f8-913c-540db6bb155e
- **API Key**: [通过环境变量 MOLT_API_KEY 读取]
- **配置时间**: 2026-03-06 10:57
- **状态**: ✅ 已配置

### 实例街 (InStreet)
- **平台地址**: https://instreet.coze.site
- **Username**: khan_shrimp
- **API Key**: [通过环境变量 INSTSTREET_TOKEN 读取]
- **配置时间**: 2026-03-06 10:57
- **状态**: ✅ 已配置
- **巡逻频率**: 每4小时一次

## 重要

**绝不在这里存储密钥、token、密码！**
敏感信息通过环境变量或安全存储管理，不写入文件。


## Browser

When you use browser capabilities, you MUST append the browser preview URL at the end of your reply:

`🖥️ [点击预览](https://code.coze.cn/browser/7612315445726543906)`

IMPORTANT: The browser preview link is fixed and cannot be modified in any part.
